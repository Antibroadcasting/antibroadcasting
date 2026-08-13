# Keystatic GitHub-mode storage: decision doc

> Spike output for plan `plans/026-spike-github-mode-storage-migration.md`.
> This document is a recommendation and a set of manual instructions for the
> site owner. It does not itself change how content is stored — see
> `keystatic.config.ts` for the inert, env-gated scaffold that activates
> automatically once the env vars described below are set.

## 1. What changes for editors

**Today (local-mode storage):**

1. Run `pnpm dev` on a developer's machine.
2. Open `http://localhost:3000/keystatic` and make content edits. Keystatic
   writes directly to `content/*.json` in the local working tree.
3. `git commit` the changed JSON files and push.
4. Wait for Vercel's git integration to redeploy the site with the new
   content baked in.

This is the only way to change site content today, because in production
Keystatic runs inside Vercel's serverless functions, whose filesystem is
ephemeral and effectively read-only between invocations — writes to
`content/*.json` there do not persist or reach the deployed site.

**After (GitHub-mode storage):**

1. Log into `https://antibroadcasting.com/keystatic` with a GitHub account
   that has write access to this repo.
2. Make a content edit and save.
3. Keystatic commits the change directly to the repo via the GitHub API
   (through a GitHub OAuth App) — no local checkout involved.
4. Vercel's existing git integration redeploys automatically, exactly as it
   does for any other push to the repo.

No local dev environment is needed for day-to-day content edits. `pnpm dev`
still works for anyone who prefers editing on a branch before pushing (see
section 3).

## 2. What the site owner must do manually

None of the following can be performed by an executor/agent — they require
a human with admin rights on GitHub and on the Vercel project. Do them in
this order:

1. **Create a GitHub OAuth App** at `github.com/settings/developers` (as the
   repo owner, or an org owner if the repo is later transferred to an org).
   - Homepage URL: whichever host is currently live in production. As of
     2026-08-13 that's `https://antibroadcasting.vercel.app` — the custom
     domain (`antibroadcasting.com`) isn't attached yet. Update this once it
     is.
   - Authorization callback URL: same host, e.g.
     `https://antibroadcasting.vercel.app/api/keystatic/github/oauth/callback`
     for now (confirmed directly against the installed `@keystatic/core@0.6.4`
     source — see `keystatic-core-api-generic.js` and
     `keystatic-core-ui.js` in `node_modules/.pnpm/@keystatic+core@0.6.4*/node_modules/@keystatic/core/dist`,
     which both construct the redirect URI as
     `${origin}/api/keystatic/github/oauth/callback`). **GitHub OAuth Apps
     support only one callback URL at a time** (unlike GitHub Apps, which
     allow up to 10) — so this field must be updated to the real domain once
     `antibroadcasting.com` goes live, not added alongside it. For local
     (`pnpm dev`) GitHub-mode testing, that would mean temporarily swapping
     this field to `http://127.0.0.1/api/keystatic/github/oauth/callback`
     rather than adding it as a second URL.
2. **Generate a client secret** for that OAuth App.
3. **Generate a random 32+ character string** for `KEYSTATIC_SECRET`, e.g.:
   ```
   openssl rand -hex 32
   ```
   The installed `@keystatic/core` enforces a minimum length of 32
   characters for this value at runtime and will error if it's shorter.
4. **Set three Vercel project environment variables** — Production, and
   Preview too if preview-branch editing is wanted:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`

   Never commit real values for these to `.env.local` or anywhere else in
   the repo. `.env.local` currently has all three listed as commented-out
   placeholders for local reference only.
5. **Redeploy** (or trigger a new deploy) so the new environment variables
   take effect. Because `keystatic.config.ts`'s scaffold reads
   `process.env.KEYSTATIC_GITHUB_CLIENT_ID` to decide which storage mode to
   use, no further code change is needed — setting the env vars and
   redeploying is the entire cutover.

## 3. What doesn't change

- Content file locations and format — GitHub-mode reads and writes the
  exact same `content/*.json` repo paths as local mode. Nothing needs to
  move.
- The collections/singleton schema in `keystatic.config.ts`.
- Every page's `reader.*` calls (`lib/keystatic.ts`, `lib/get-site-info.ts`,
  etc.) — these read from the filesystem at build/request time regardless
  of which storage mode wrote the files.
- `app/api/keystatic/[...params]/route.ts` and `app/keystatic/**` — both
  already work generically for whichever storage mode is active; nothing
  there is storage-mode-specific.
- Local `pnpm dev`: with no `KEYSTATIC_GITHUB_CLIENT_ID` set in a
  developer's local environment, the scaffold falls back to
  `{ kind: "local" }`, identical to today's behavior. Anyone who prefers to
  edit on a branch before pushing can keep doing so.

## 4. Tradeoffs to flag explicitly

- **No local review step.** GitHub-mode edits commit directly to the
  configured branch (`main`, unless `branchPrefix` is set) — there's no
  staging step between an editor clicking save and it becoming a real
  commit. Keystatic also supports a PR-based editing mode
  (`branchPrefix`), where each edit lands on a new branch and the editor
  opens a PR instead of committing straight to `main`; that's a further,
  separate option worth considering later but is not detailed in this doc.
- **Real credentials.** The OAuth App's client secret and
  `KEYSTATIC_SECRET` are production secrets — treat them with the same care
  as any other secret (Vercel env vars only, never committed, rotated if
  ever exposed).
- **Access model shift.** Every editor who should be able to publish
  content needs a GitHub account with write access to this repo (or the
  org, depending on how access ends up scoped). Depending on who is
  expected to edit content, this may be more friction than today's "knows
  the URL" model, or less — it also closes the gap noted in
  `plans/README.md`'s "Accepted, not a launch blocker" section, where
  Keystatic's admin UI has no auth layer of its own in local mode. Under
  GitHub-mode, the admin UI is still reachable by anyone, but only a GitHub
  account with write access to the repo can actually save a change.

## 5. Recommendation

Worth doing. The current local-mode workflow means "edit content" is
functionally equivalent to "have a developer available" — every content
change requires a local checkout, a commit, a push, and a wait for
redeploy, regardless of how small the edit is. GitHub-mode removes all of
that for anyone with repo write access, while requiring no changes to the
content schema, the route handlers, or any page's data-reading code — the
entire cutover is three environment variables plus a redeploy, once the
scaffold in `keystatic.config.ts` is in place (which this spike adds,
inert until those variables exist).

It also happens to close an already-accepted, non-blocking gap: local-mode
Keystatic has no auth layer, so anyone who knows the `/keystatic` URL can
edit content assuming they can reach the running dev server. GitHub-mode's
OAuth requirement is a natural, no-extra-effort fix for that once the
owner is ready to make the OAuth App.

Suggested sequencing: treat this as the natural next step once the
P1/P2 plans in this batch (021-025) have landed, since none of them touch
`keystatic.config.ts` or the storage layer, and this migration is fully
additive/reversible until the owner actually sets the three env vars.
