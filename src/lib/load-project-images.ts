import type { ImageMetadata } from "astro";

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projects/*/*.{jpg,jpeg,png,webp,avif,JPG,PNG}",
  { eager: true }
);

const heroImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/hero/*.webp",
  { eager: true }
);

export function loadProjectImages(slug: string): ImageMetadata[] {
  const projectPath = `/src/assets/projects/${slug}/`;
  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(projectPath))
    .map(([_, mod]) => mod.default)
    .sort((a, b) => a.src.localeCompare(b.src));
}

export function loadFirstProjectImage(slug: string): ImageMetadata | undefined {
  const projectPath = `/src/assets/projects/${slug}/`;
  const firstImage = Object.entries(allImages)
    .filter(([path]) => path.startsWith(projectPath))
    .map(([_, mod]) => mod.default)
    .sort((a, b) => a.src.localeCompare(b.src))[0];

  return firstImage;
}

export function loadProjectHero(slug: string): ImageMetadata | undefined {
  const heroPath = `/src/assets/hero/${slug}.webp`;
  return heroImages[heroPath]?.default;
}
