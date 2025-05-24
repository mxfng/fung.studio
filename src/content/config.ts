import { defineCollection, z } from "astro:content";
import { Category } from "../config/categories";

const worksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    hero: z.string().optional(),
    categories: z.array(z.nativeEnum(Category)),
    date: z.string().transform((str) => new Date(str)),
  }),
});

const writingCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
  }),
});

export const collections = {
  works: worksCollection,
  writing: writingCollection,
};
