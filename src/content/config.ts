import { defineCollection, z } from "astro:content";
import { Category } from "../config/categories";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    hero: z.string().optional(),
    images: z.array(z.string()).optional(),
    categories: z.array(z.nativeEnum(Category)),
    date: z.string().transform((str) => new Date(str)),
    details: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
