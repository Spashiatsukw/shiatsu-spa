import { buildMapEmbedUrl } from "../lib/google-maps";
import { BranchDetailView } from "./branch-detail-view";
import type { Branch } from "../types";
import type { Locale } from "@/i18n/routing";

function buildFallbackQuery(branch: Branch, locale: string): string {
  const name = locale === "ar" ? branch.name.ar : branch.name.en;
  const address = locale === "ar" ? branch.address.ar : branch.address.en;
  const country = locale === "ar" ? "الكويت" : "Kuwait";
  return [name, address, country].filter(Boolean).join(", ");
}

export async function BranchDetail({ branch, locale }: { branch: Branch; locale: Locale }) {
  const fallbackQuery = buildFallbackQuery(branch, locale);
  const embedUrl = await buildMapEmbedUrl(
    branch.googleMapsUrl,
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY,
    fallbackQuery,
    branch.latitude,
    branch.longitude,
  );

  return <BranchDetailView branch={branch} embedUrl={embedUrl} />;
}
