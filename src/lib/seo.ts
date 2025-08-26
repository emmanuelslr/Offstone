export const siteUrl = (process.env.SITE_URL || "https://offstone.fr").replace(/\/$/, "");

export function toCanonical(pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${path}`;
}
