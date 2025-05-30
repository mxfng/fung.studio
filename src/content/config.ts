import { defineCollection, z } from "astro:content";
import { WorksCategory, WritingCategory } from "../config/categories";

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

export const collections = {
	works: worksCollection,
	writing: writingCollection,
};
