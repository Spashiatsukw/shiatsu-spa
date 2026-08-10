const GOOGLE_ADS_ID = "AW-17576384447";
const GOOGLE_ADS_CONVERSION_LABEL = "AW-17576384447/pmRqCKSl694cEL-vib1B";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function isWhatsAppUrl(url: string): boolean {
  return url.includes("wa.me/") || url.includes("api.whatsapp.com");
}

export function trackBookNowConversion(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION_LABEL,
  });
}

export function getGoogleAdsId(): string {
  return GOOGLE_ADS_ID;
}
