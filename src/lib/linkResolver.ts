// Link resolver for Prismic documents
import { PrismicDocument } from "@prismicio/types";

export function linkResolver(doc: PrismicDocument): string {
  if (doc.type === "press_item") {
    return `/ressources/jonathan-anguelov/presse/${doc.uid}`;
  }
  if (doc.type === "resource_article") {
    if (doc.data?.category === "jonathan-anguelov") {
      return `/ressources/jonathan-anguelov/${doc.uid}`;
    }
    return `/ressources/${doc.data?.category}/${doc.uid}`;
  }
  if (doc.type === "resource_category") {
    return `/ressources/${doc.uid}`;
  }
  return "/";
}
