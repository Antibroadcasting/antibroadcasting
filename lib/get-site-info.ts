import { cache } from "react";
import { reader } from "@/lib/keystatic";

function splitLines(value: string | null | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const getSiteInfo = cache(async () => {
  const raw = await reader.singletons.siteInfo.read();
  if (!raw) throw new Error("siteInfo singleton not found in content/site-info.json");

  return {
    company: {
      name: raw.companyName ?? "",
      legalName: raw.companyLegalName ?? "",
      nickname: raw.companyNickname ?? "",
      tagline: raw.companyTagline ?? "",
    },
    contact: {
      phone: raw.phone ?? "",
      phoneHref: raw.phoneHref ?? "",
      email: raw.email ?? "",
      address: {
        street: raw.addressStreet ?? "",
        city: raw.addressCity ?? "",
        state: raw.addressState ?? "",
        zip: raw.addressZip ?? "",
        full: `${raw.addressStreet ?? ""}, ${raw.addressCity ?? ""}, ${raw.addressState ?? ""} ${raw.addressZip ?? ""}`,
        location: `${raw.addressCity ?? ""}, ${raw.addressState ?? ""}`,
      },
    },
    social: {
      instagram: {
        url: raw.instagramUrl ?? "",
        handle: raw.instagramHandle ?? "",
      },
      facebook: {
        url: raw.facebookUrl ?? "",
        handle: raw.facebookHandle ?? "",
      },
      twitter: {
        url: raw.twitterUrl ?? "",
        handle: raw.twitterHandle ?? "",
      },
    },
    business: {
      minimumOrder: raw.minimumOrder ?? 50,
      turnaroundDays: raw.turnaroundDays ?? "7–10",
      maxColors: raw.maxColors ?? 8,
    },
    forms: {
      quote: {
        responseTime: raw.responseTime ?? "1–2 business days",
        garmentOptions: splitLines(raw.garmentOptions),
        timelineOptions: splitLines(raw.timelineOptions),
      },
    },
  };
});

export type SiteInfo = Awaited<ReturnType<typeof getSiteInfo>>;
