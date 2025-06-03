export enum WorksCategory {
	MUSIC = "music",
	SOFTWARE = "software",
	RELEASES = "releases",
	VIDEO = "video",
}

export enum WritingCategory {
	MUSIC = "music",
	CODING = "coding",
	TECHNOLOGY = "technology",
	DESIGN = "design",
	URBANISM = "urbanism",
	PHILOSOPHY = "philosophy",
	ART = "art",
	OTHER = "other",
}

export type Category = WorksCategory | WritingCategory;

export const CATEGORY_MAP = {
	works: WorksCategory,
	writing: WritingCategory,
} as const;

export type CategoryCollectionType = keyof typeof CATEGORY_MAP;
