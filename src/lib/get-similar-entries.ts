import type { CollectionEntry } from "astro:content";

function getSharedCount<T>(a: T[], b: T[]): number {
	const setB = new Set(b);
	return a.filter((item) => setB.has(item)).length;
}

function getSimilarEntries<T extends "writing" | "works">(
	entries: CollectionEntry<T>[],
	currentSlug: string,
	maxResults = 3,
): CollectionEntry<T>[] {
	const current = entries.find((e) => e.slug === currentSlug);
	if (!current) throw new Error(`No entry for slug: ${currentSlug}`);

	const others = entries.filter((e) => e.slug !== currentSlug);

	const scored = others
		.map((entry) => {
			const score = getSharedCount(
				(entry.data.categories as string[]) ?? [],
				(current.data.categories as string[]) ?? [],
			);
			return { entry, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score);

	let result = scored.map(({ entry }) => entry).slice(0, maxResults);

	if (result.length < maxResults) {
		const seen = new Set(result.map((e) => e.slug));
		const fallback = others.filter((e) => !seen.has(e.slug)).slice(0, maxResults - result.length);
		result = result.concat(fallback);
	}

	return result;
}

export { getSimilarEntries };
