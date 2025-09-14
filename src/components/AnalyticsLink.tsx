"use client";

import React from "react";
import { trackEvent } from "@/lib/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventParams?: Record<string, unknown>;
};

export default function AnalyticsLink({ event, eventParams, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        try { trackEvent({ name: event, params: eventParams }); } catch {}
        onClick?.(e);
      }}
    />
  );
}

