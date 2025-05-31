import type { WritingCategory, WorksCategory } from "@/config/categories";
import type { CollectionEntry } from "astro:content";

type FormatOptions<T extends "writing" | "works"> = {
	category?: T extends "writing" ? WritingCategory : WorksCategory;
	sortBy?: "date" | "title";
	sortOrder?: "asc" | "desc";
	filterOutFuture?: boolean;
	maxItems?: number;
};

function formatCollection<T extends "writing" | "works">(
	entries: CollectionEntry<T>[],
	options: FormatOptions<T> = {},
): CollectionEntry<T>[] {
	const { category, sortBy, sortOrder = "desc", filterOutFuture = true, maxItems } = options;

	type CategoryType = T extends "writing" ? WritingCategory : WorksCategory;

	let result = [...entries]; // make a copy of the entries

	if (category || filterOutFuture) {
		const now = Date.now();
		result = result.reduce<CollectionEntry<T>[]>((acc, entry) => {
			const { date, categories } = entry.data;

			// Filter out future-dated entries
			if (filterOutFuture && new Date(date).getTime() > now) return acc;

			// Filter out entries that don't match the category
			if (category && !(categories as CategoryType[]).includes(category)) return acc;

			acc.push(entry);
			return acc;
		}, []);
	}

	if (sortBy) {
		const dir = sortOrder === "asc" ? 1 : -1;

		result = [...result].sort((a, b) => {
			switch (sortBy) {
				case "date": {
					const aTime = new Date(a.data.date).getTime();
					const bTime = new Date(b.data.date).getTime();
					return dir * (aTime - bTime);
				}
				case "title":
					return dir * a.data.title.localeCompare(b.data.title);
				default:
					return 0;
			}
		});
	}

	// Apply maxItems limit if specified
	if (maxItems !== undefined && maxItems > 0) {
		result = result.slice(0, maxItems);
	}

	return result;
}

export { formatCollection };
