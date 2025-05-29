import type { ImageMetadata } from "astro";

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/works/*/*.{jpg,jpeg,png,webp,avif,JPG,PNG}",
  { eager: true },
);

const heroImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/hero/*.webp",
  { eager: true },
);

function loadWorkImages(slug: string): ImageMetadata[] {
  const workPath = `/src/assets/works/${slug}/`;
  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(workPath))
    .map(([_, mod]) => mod.default)
    .sort((a, b) => a.src.localeCompare(b.src));
}

function loadFirstWorkImage(slug: string): ImageMetadata | undefined {
  const workPath = `/src/assets/works/${slug}/`;
  const firstImage = Object.entries(allImages)
    .filter(([path]) => path.startsWith(workPath))
    .map(([_, mod]) => mod.default)
    .sort((a, b) => a.src.localeCompare(b.src))[0];

  return firstImage;
}

function loadWorkHeroImage(slug: string): ImageMetadata | undefined {
  const heroPath = `/src/assets/hero/${slug}.webp`;
  return heroImages[heroPath]?.default;
}

export { loadWorkImages, loadFirstWorkImage, loadWorkHeroImage };
