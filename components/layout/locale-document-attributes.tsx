"use client";

import { useEffect } from "react";

export function LocaleDocumentAttributes({ locale }: { locale: "ar" | "en" }) {
  useEffect(() => {
    const documentElement = document.documentElement;
    documentElement.lang = locale;
    documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
