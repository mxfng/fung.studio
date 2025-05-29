import { getCollection } from "astro:content";
import { formatCollection } from "./format-collection";

async function getWorks() {
  const works = await getCollection("works");
  return formatCollection<"works">(works, {
    sortBy: "date",
    sortOrder: "desc",
  });
}

async function getWritings() {
  const writings = await getCollection("writing");
  return formatCollection<"writing">(writings, {
    sortBy: "date",
    sortOrder: "desc",
  });
}

export { getWorks, getWritings };
