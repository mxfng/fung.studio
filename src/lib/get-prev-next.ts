import type { CollectionEntry } from "astro:content";

function getPrevNext<T extends "writing" | "works">(
  entries: CollectionEntry<T>[],
  currentSlug: string,
) {
  const currentIndex = entries.findIndex((entry) => entry.slug === currentSlug);

  const prevEntry = entries[currentIndex + 1];
  const nextEntry = entries[currentIndex - 1];

  return {
    prevEntry: prevEntry
      ? {
          slug: prevEntry.slug,
          title: prevEntry.data.title,
        }
      : null,
    nextEntry: nextEntry
      ? {
          slug: nextEntry.slug,
          title: nextEntry.data.title,
        }
      : null,
  };
}

export { getPrevNext };
