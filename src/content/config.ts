import { defineCollection, z } from "astro:content";
import { WorksCategory, WritingCategory } from "./categories";

const worksCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		hero: z.string().optional(),
		categories: z.array(z.nativeEnum(WorksCategory)),
		date: z.string().transform((str) => new Date(str)),
	}),
});

const writingCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		categories: z.array(z.nativeEnum(WritingCategory)),
		date: z.string().transform((str) => new Date(str)),
	}),
});

const experienceCollection = defineCollection({
	type: "content",
	schema: z.object({
		company: z.string(),
		position: z.string(),
		startDate: z.string().transform((str) => new Date(str)),
		endDate: z
			.string()
			.transform((str) => new Date(str))
			.optional(),
		location: z.string(),
		logo: z.string(),
	}),
});

export const collections = {
	works: worksCollection,
	writing: writingCollection,
	experience: experienceCollection,
};
