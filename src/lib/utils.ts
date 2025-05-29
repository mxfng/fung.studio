import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CollectionEntry } from "astro:content";
import type { WorksCategory, WritingCategory } from "../config/categories";
import { getCollection } from "astro:content";

// UI Utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Collection Fetching
export async function getWorks() {
  const works = await getCollection("works");
  return works.sort(sortByDate);
}

export async function getWritings() {
  const writings = await getCollection("writing");
  return writings.sort(sortByDate);
}

// Collection Filtering & Sorting
export function filterByCategory<T extends "writing" | "works">(
  entries: CollectionEntry<T>[],
  category: T extends "writing" ? WritingCategory : WorksCategory
) {
  type CategoryType = T extends "writing" ? WritingCategory : WorksCategory;
  return entries.filter((entry) =>
    (entry.data.categories as CategoryType[]).includes(category)
  );
}

export function sortByDate<T extends "writing" | "works">(
  a: CollectionEntry<T>,
  b: CollectionEntry<T>
) {
  return b.data.date.getTime() - a.data.date.getTime();
}

// Navigation Helpers
export function getPrevNext<T extends "writing" | "works">(
  entries: CollectionEntry<T>[],
  currentSlug: string
) {
  const sortedEntries = [...entries].sort(sortByDate);
  const currentIndex = sortedEntries.findIndex(
    (entry) => entry.slug === currentSlug
  );

  const prevEntry = sortedEntries[currentIndex - 1];
  const nextEntry = sortedEntries[currentIndex + 1];

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

// Similar Entries Finder
export function findSimilarEntries<T extends "writing" | "works">(
  entries: CollectionEntry<T>[],
  currentSlug: string,
  maxResults: number = 3
): CollectionEntry<T>[] {
  const currentEntry = entries.find((entry) => entry.slug === currentSlug);
  if (!currentEntry)
    throw new Error(`Entry with slug "${currentSlug}" not found.`);

  const otherEntries = entries.filter((entry) => entry.slug !== currentSlug);

  const scoredEntries = otherEntries
    .map((entry) => {
      type CategoryType = T extends "writing" ? WritingCategory : WorksCategory;
      const sharedCategories = (entry.data.categories as CategoryType[]).filter(
        (category) =>
          (currentEntry.data.categories as CategoryType[]).includes(category)
      );
      return { entry, score: sharedCategories.length };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  let similarEntries = scoredEntries
    .map(({ entry }) => entry)
    .slice(0, maxResults);

  // Fallback: pad with unscored entries if needed
  if (similarEntries.length < maxResults) {
    const alreadyIncluded = new Set(similarEntries.map((p) => p.slug));
    const fallbackEntries = otherEntries
      .filter((p) => !alreadyIncluded.has(p.slug))
      .slice(0, maxResults - similarEntries.length);
    similarEntries = [...similarEntries, ...fallbackEntries];
  }

  return similarEntries;
}
