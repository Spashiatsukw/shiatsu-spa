import type { Metadata } from "next";
import { HeroSection, AboutTeaser } from "@/features/settings";
import { FeaturedServicesSection } from "@/features/services";
import { BranchesSection } from "@/features/branches";
import { TestimonialsSection } from "@/features/testimonials";
import { GallerySection } from "@/features/gallery";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Shiatsu Spa Kuwait | Quality Touch",
  description:
    "Shiatsu Spa Kuwait — Professional Japanese therapeutic massage, body treatments, and luxury wellness across two Kuwait branches.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <AboutTeaser locale={locale} />
      <FeaturedServicesSection locale={locale} />
      <BranchesSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <GallerySection locale={locale} />
      
    </>
  );
}
