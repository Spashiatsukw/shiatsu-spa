"use client";

import { useTransition, type ComponentProps } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type LanguageSwitcherProps = Pick<ComponentProps<"button">, "className">;

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function handleSwitch() {
    startTransition(() => {
      // Use a full navigation so the server renders the new locale from the
      // URL immediately, instead of retaining the previous RSC locale state.
      const localizedPath = pathname === "/" ? `/${nextLocale}` : `/${nextLocale}${pathname}`;
      window.location.assign(localizedPath);
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={nextLocale === "ar" ? t("switchToArabic") : t("switchToEnglish")}
    >
      {nextLocale === "ar" ? "العربية" : "English"}
    </Button>
  );
}
