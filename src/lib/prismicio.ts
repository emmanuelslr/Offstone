import * as prismic from "@prismicio/client";

export const repoName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || "offstone";

export function createClient(fetcher?: typeof fetch) {
  const endpoint = prismic.getRepositoryEndpoint(repoName);
  return prismic.createClient(endpoint, {
    fetch: fetcher,
    // accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
}
