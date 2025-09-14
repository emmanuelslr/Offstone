import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 */
const routes: Route[] = [
  { type: "resource_article", path: "/ressources/:uid" },
  { type: "case_study", path: "/ressources/etudes-de-cas/:uid" },
  { type: "glossary_term", path: "/ressources/glossaire/:uid" },
  { type: "webinar", path: "/ressources/webinars-videos/:uid" },
  { type: "press_item", path: "/ressources/jonathan-anguelov/presse/:uid" },
  { type: "interview_item", path: "/ressources/jonathan-anguelov/interviews-podcasts/:uid" },
  { type: "qvema_episode", path: "/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export function createClient(fetcher?: typeof fetch, config: ClientConfig = {}) {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetch: fetcher,
    // Par défaut, interroger la locale française (peut être surchargée par requête)
    defaultParams: { lang: (process.env.NEXT_PUBLIC_PRISMIC_DEFAULT_LANG || 'fr-fr') as any },
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 0 } }, // Pas de cache en développement pour voir les changements immédiatement
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
