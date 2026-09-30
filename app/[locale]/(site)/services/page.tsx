import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getActiveServices, ServiceGrid } from "@/features/services";
import { getActiveCategories } from "@/features/categories";
import { getContactSettings } from "@/features/settings";
import { FadeIn } from "@/components/shared";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;
export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const [services, categories, contact] = await Promise.all([
    getActiveServices(),
    getActiveCategories(),
    getContactSettings(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-12 text-center">
          <h1 className="font-sans text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            {t("subheading")}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
          <ServiceGrid
          services={services}
          categories={categories}
          whatsappPhone={contact?.whatsapp}
        />
      </FadeIn>
    </div>
  );
}
