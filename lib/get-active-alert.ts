import { cache } from "react";
import { reader } from "@/lib/keystatic";

export interface ActiveAlert {
  type: "message" | "ticker";
  title: string | null;
  message: string;
  dismissible: boolean;
  ctaLabel: string | null;
  ctaHref: string | null;
}

export const getActiveAlert = cache(async (): Promise<ActiveAlert | null> => {
  const banner = await reader.singletons.alertBanner.read();
  if (!banner || !banner.active) return null;

  const today = new Date().toISOString().slice(0, 10);
  if (banner.expiresAt && banner.expiresAt < today) return null;

  if (banner.content.discriminant === "ticker") {
    if (!banner.content.value.message) return null;
    return {
      type: "ticker",
      title: null,
      message: banner.content.value.message,
      dismissible: false,
      ctaLabel: null,
      ctaHref: null,
    };
  }

  if (!banner.content.value.message) return null;
  return {
    type: "message",
    title: banner.content.value.title || null,
    message: banner.content.value.message,
    dismissible: banner.content.value.dismissible,
    ctaLabel: banner.content.value.ctaLabel || null,
    ctaHref: banner.content.value.ctaHref || null,
  };
});
