// Prismic Link Resolver for Offstone Resources
// Maps Prismic documents to site URLs (used for previews, internal links)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function linkResolver(doc: any): string {
  if (!doc) return "/";
  const type = doc.type || doc._meta?.type;
  const uid = doc.uid || doc._meta?.uid;

  switch (type) {
    case "resource_article": {
      const catUid = doc?.data?.category;
      return catUid ? `/ressources/${catUid}/${uid}/` : `/ressources/`;
    }
    case "case_study":
      return `/ressources/etudes-de-cas/${uid}/`;
    case "glossary_term":
      return `/ressources/glossaire/${uid}/`;
    case "webinar":
      return `/ressources/webinars-videos/${uid}/`;
    case "press_item":
      return `/ressources/jonathan-anguelov/presse/${uid}/`;
    case "interview_item":
      return `/ressources/jonathan-anguelov/interviews-podcasts/${uid}/`;
    case "qvema_episode":
      return `/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/${uid}/`;
    default:
      return "/";
  }
}

export default linkResolver;
