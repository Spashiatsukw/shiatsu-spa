"use client";

import * as React from "react";
import { isWhatsAppUrl, trackBookNowConversion } from "@/lib/google-ads";

type TrackableWhatsAppAnchorProps = React.ComponentPropsWithoutRef<"a">;

export const TrackableWhatsAppAnchor = React.forwardRef<
  HTMLAnchorElement,
  TrackableWhatsAppAnchorProps
>(function TrackableWhatsAppAnchor(props, ref) {
  const { href, onClick, ...rest } = props;

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (typeof href === "string" && isWhatsAppUrl(href)) {
      trackBookNowConversion();
    }

    if (onClick) {
      onClick(event);
    }
  };

  return <a ref={ref} href={href} onClick={handleClick} {...rest} />;
});
