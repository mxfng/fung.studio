import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const SOURCE_DIRS = ["public", "src/assets"];
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const OUTPUT_QUALITY = 80;
const MAX_WIDTH = 2400;

async function getFilesRecursively(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFilesRecursively(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) return;

  const outputPath = filePath.replace(ext, ".webp");

  try {
    await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: OUTPUT_QUALITY })
      .toFile(outputPath);

    console.log(`✓ Converted: ${outputPath}`);
  } catch (err) {
    console.error(`✗ Failed: ${filePath}`, err);
  }
}

async function run() {
  for (const dir of SOURCE_DIRS) {
    const files = await getFilesRecursively(dir);
    await Promise.all(files.map(optimizeImage));
  }
}

run().catch((err) => {
  console.error("Image optimization failed", err);
  process.exit(1);
});
