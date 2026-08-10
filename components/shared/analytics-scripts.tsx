import Script from "next/script";
import { getGoogleAdsId } from "@/lib/google-ads";

/**
 * Injects Google Analytics (GA4), Google Ads, and/or Meta Pixel when the admin
 * has configured `googleAnalyticsId` / `metaPixelId` in the `/settings/website`
 * Firestore document. Google Ads is injected unconditionally using the
 * configured conversion ID; Analytics and Meta Pixel remain optional.
 */
export function AnalyticsScripts({
  googleAnalyticsId,
  metaPixelId,
}: {
  googleAnalyticsId?: string | null;
  metaPixelId?: string | null;
}) {
  const googleAdsId = getGoogleAdsId();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="lazyOnload"
      />
      <Script id="google-ads-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAdsId}');
          ${googleAnalyticsId ? `gtag('config', '${googleAnalyticsId}');` : ""}
        `}
      </Script>

      {metaPixelId && (
        <Script id="meta-pixel-init" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
