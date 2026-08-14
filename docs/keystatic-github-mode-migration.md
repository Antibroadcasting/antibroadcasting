# Keystatic GitHub-mode storage: decision doc

> Spike output for plan `plans/026-spike-github-mode-storage-migration.md`.
> This document is a recommendation and a set of manual instructions for the
> site owner. It does not itself change how content is stored — see
> `keystatic.config.ts` for the inert, env-gated scaffold that activates
> automatically once the env vars described below are set.
>
> **Correction (2026-08-13)**: section 2 below originally instructed
> creating a manual GitHub **OAuth App** at `github.com/settings/developers`.
> That's wrong. Confirmed against Keystatic's own docs
> (`keystatic.com/docs/github-mode`: *"the next step will walk you through
> creating a GitHub App"*) and the installed `@keystatic/core@0.6.4` source
> (`githubLogin` never sends an OAuth `scope` param, so a classic OAuth App
> always gets a zero-scope token — GitHub Apps get permissions at install
> time instead, not via OAuth scopes). A manual OAuth App was actually
> created and wired up here first; it signed in fine but every save failed
> with `[GraphQL] Your token has not been granted the required scopes...
> requires... ['public_repo']`. That app is a dead end and should be
> deleted; section 2 now describes the correct, guided GitHub **App** flow.

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

1. Log into `https://antibroadcasting.vercel.app/keystatic` with a GitHub
   account that has write access to this repo (and to which the GitHub App
   below has been granted repo access).
2. Make a content edit and save.
3. Keystatic commits the change directly to the repo via the GitHub API
   (through a GitHub App installed on this repo) — no local checkout
   involved.
4. Vercel's existing git integration redeploys automatically, exactly as it
   does for any other push to the repo.

No local dev environment is needed for day-to-day content edits once set up.
`pnpm dev` still works for anyone who prefers editing on a branch before
pushing (see section 3) — but see section 2, step 1: a `pnpm dev` session is
also how the GitHub App itself gets created in the first place.

## 2. What the site owner must do manually

None of the following can be performed by an executor/agent — they require
a human clicking through GitHub's own UI and a Vercel project admin. Do them
in this order.

1. **Temporarily enable GitHub-mode in local dev, with no credentials set
   yet.** In `.env.local`, uncomment:
   ```
   NEXT_PUBLIC_KEYSTATIC_GITHUB_ENABLED=1
   ```
   Leave `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and
   `KEYSTATIC_SECRET` commented out/empty — that combination (github-mode
   requested, no client credentials yet, `NODE_ENV=development`) is exactly
   what makes `@keystatic/core` serve its guided "Create GitHub App" screen
   instead of throwing (confirmed against
   `keystatic-core-api-generic.node.js`'s `makeGenericAPIRouteHandler`).
2. **Run `pnpm dev` and open `http://localhost:3000/keystatic`.** Click the
   GitHub sign-in button. You'll land on a "Create GitHub App" screen with a
   field for a **deployed URL** — enter
   `https://antibroadcasting.vercel.app` there. This isn't cosmetic: the
   installed source (`keystatic-core-ui.js`) builds the GitHub App manifest's
   `callback_urls` as `[localhost callback, 127.0.0.1 callback, ...(deployedURL
   ? [deployedURL's callback] : [])]` — GitHub **Apps** support up to 10
   callback URLs (unlike OAuth Apps, which allow only one), so this one App
   ends up valid for both local dev and production without ever needing to
   swap a callback URL later.
3. **Follow the flow through to GitHub.** You'll be asked to name the App
   and confirm creating it, then to install it — install it on this specific
   repo (`travhall/antibroadcasting`), not on all repos, unless you want it
   available more broadly.
4. **GitHub redirects back to your local `pnpm dev` server**, which
   exchanges the manifest code and writes a **new `.env` file** (not
   `.env.local` — a separate file, already covered by this repo's `.env*`
   `.gitignore` pattern) containing real values for:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET` (freshly generated, 40 random bytes hex-encoded)
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — the App's slug. Required
     separately from the three above: `@keystatic/next` hardcodes this exact
     env var name for its own "is the app installed here?" UI checks
     (confirmed in `keystatic-next-api.js`/`keystatic-next-route-handler.js`).
   Never commit this `.env` file.
5. **Set five Vercel project environment variables** — Production, and
   Preview too if preview-branch editing is wanted:
   - The four from `.env` above, copied as-is.
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_ENABLED` — any value (e.g. `1`). Required
     in addition to the four above — `keystatic.config.ts` gates
     `storage.kind` on this specific `NEXT_PUBLIC_`-prefixed var because that
     file is imported by a `"use client"` page, and Next.js only inlines
     `NEXT_PUBLIC_`-prefixed vars into client bundles. Without it, the server
     resolves GitHub-mode (sign-in works) while the browser silently stays on
     local-mode (no collections/singletons load, `/api/keystatic/tree` 404s
     in the console) — this exact split-brain failure happened on first
     setup here, before the OAuth-App/GitHub-App distinction above was even
     found.

   If you previously set `KEYSTATIC_GITHUB_CLIENT_ID`/`KEYSTATIC_GITHUB_CLIENT_SECRET`
   in Vercel from a manually-created **OAuth App** (per this doc's
   pre-2026-08-13 version), **delete those values and replace them** with the
   GitHub App's values from step 4 — the old OAuth App can never get repo-write
   scope no matter what else is configured. Delete the unused OAuth App on
   `github.com/settings/developers` too, or leave it — it's harmless once
   nothing references it.
6. **Trigger a new deployment** (redeploy or push a commit) — the
   `NEXT_PUBLIC_`-prefixed vars are inlined into the client bundle at *build*
   time, not read at request time, so an existing deployment won't pick them
   up just because the env vars now exist.
7. **Revert `.env.local`'s `NEXT_PUBLIC_KEYSTATIC_GITHUB_ENABLED` back to
   commented-out** once the App is created — local dev doesn't need
   GitHub-mode day to day (see section 3); step 1's toggle was only needed to
   reach the one-time creation screen.

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
- Local `pnpm dev`: with `NEXT_PUBLIC_KEYSTATIC_GITHUB_ENABLED` unset in a
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
- **Real credentials.** The GitHub App's client secret and `KEYSTATIC_SECRET`
  are production secrets — treat them with the same care as any other
  secret (Vercel env vars only, never committed, rotated if ever exposed).
- **Access model shift.** Every editor who should be able to publish
  content needs a GitHub account with write access to this repo, and the
  GitHub App needs to be installed on it. Depending on who is expected to
  edit content, this may be more friction than today's "knows the URL"
  model, or less — it also closes the gap noted in `plans/README.md`'s
  "Accepted, not a launch blocker" section, where Keystatic's admin UI has
  no auth layer of its own in local mode. Under GitHub-mode, the admin UI is
  still reachable by anyone, but only a GitHub account with write access
  (via the installed App) can actually save a change.

## 5. Recommendation

Worth doing. The current local-mode workflow means "edit content" is
functionally equivalent to "have a developer available" — every content
change requires a local checkout, a commit, a push, and a wait for
redeploy, regardless of how small the edit is. GitHub-mode removes all of
that for anyone with repo write access, while requiring no changes to the
content schema, the route handlers, or any page's data-reading code — the
entire cutover is the guided GitHub App creation in section 2 plus a
handful of environment variables and a redeploy, once the scaffold in
`keystatic.config.ts` is in place (which this spike adds, inert until those
variables exist).

It also happens to close an already-accepted, non-blocking gap: local-mode
Keystatic has no auth layer, so anyone who knows the `/keystatic` URL can
edit content assuming they can reach the running dev server. GitHub-mode's
sign-in requirement is a natural, no-extra-effort fix for that once the
owner is ready to create the GitHub App.

Suggested sequencing: treat this as the natural next step once the
P1/P2 plans in this batch (021-025) have landed, since none of them touch
`keystatic.config.ts` or the storage layer, and this migration is fully
additive/reversible until the owner actually sets the real env vars.
