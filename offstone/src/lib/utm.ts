export function getHiddenFromLocation() {
  if (typeof window === "undefined") return {} as Record<string, string>;
  const u = new URL(window.location.href);
  return {
    page_url: u.toString(),
    ref: document.referrer || "",
    utm_source: u.searchParams.get("utm_source") || "",
    utm_medium: u.searchParams.get("utm_medium") || "",
    utm_campaign: u.searchParams.get("utm_campaign") || "",
    utm_content: u.searchParams.get("utm_content") || "",
    utm_term: u.searchParams.get("utm_term") || "",
  } as const;
}

