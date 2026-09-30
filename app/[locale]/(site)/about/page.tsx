import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/features/settings";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;
export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <AboutSection locale={locale} />
    </div>
  );
}
