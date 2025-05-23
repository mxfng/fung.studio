import type { ImageMetadata } from "astro";

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projects/*/*.{jpg,jpeg,png,webp,avif,JPG,PNG}",
  { eager: true }
);

export function loadProjectImages(
  slug: string,
  filenames: string[]
): ImageMetadata[] {
  return filenames
    .map((filename) => {
      const path = `/src/assets/projects/${slug}/${filename}`;
      const mod = allImages[path];
      if (!mod) {
        console.warn(`Missing image asset: ${path}`);
        return null;
      }
      return mod.default;
    })
    .filter((img): img is ImageMetadata => img !== null);
}
