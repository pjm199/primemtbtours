import { defineCollection, z } from "astro:content";

const toursCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(["Scenic", "Enduro", "E-MTB", "Custom"]),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    duration: z.string(),
    price: z.string(),
    image: z.string(),
    highlights: z.array(z.string()),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  tours: toursCollection,
};
