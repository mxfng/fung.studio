import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SOURCE_DIRS = ["src/assets"];
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_WIDTH = 2400;
const OUTPUT_QUALITY = 80;

function isSupportedImage(filePath) {
  return SUPPORTED_EXTENSIONS.includes(path.extname(filePath).toLowerCase());
}

function isOptimizedWebp(filePath) {
  return (
    path.extname(filePath).toLowerCase() === ".webp" &&
    /^\d+\.webp$/.test(path.basename(filePath))
  );
}

async function getAllImageFiles() {
  const getFiles = async (dir) => {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((d) => {
        const res = path.resolve(dir, d.name);
        return d.isDirectory() ? getFiles(res) : res;
      })
    );
    return files.flat();
  };

  const all = [];
  for (const dir of SOURCE_DIRS) {
    const found = await getFiles(dir);
    all.push(...found);
  }
  return all;
}

async function optimizeAllImages() {
  const allFiles = await getAllImageFiles();

  // Group files by directory
  const filesByDir = new Map();

  for (const file of allFiles) {
    const dir = path.dirname(file);
    if (!filesByDir.has(dir)) filesByDir.set(dir, []);
    filesByDir.get(dir).push(file);
  }

  // Process each directory
  for (const [dir, files] of filesByDir.entries()) {
    const sorted = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return isSupportedImage(file) || ext === ".webp";
      })
      .sort(
        (a, b) =>
          parseInt(path.basename(a).match(/\d+/)?.[0] || "99999") -
          parseInt(path.basename(b).match(/\d+/)?.[0] || "99999")
      );

    let count = 1;

    for (const file of sorted) {
      const ext = path.extname(file).toLowerCase();
      const outputPath = path.join(dir, `${count}.webp`);

      try {
        if (ext === ".webp") {
          if (!isOptimizedWebp(file)) {
            await fs.rename(file, outputPath);
            console.log(`✓ Renamed ${file} → ${outputPath}`);
          } else {
            console.log(`✓ Skipped ${file} (already optimized name)`);
          }
        } else {
          await sharp(file)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: OUTPUT_QUALITY })
            .toFile(outputPath);

          console.log(`✓ Converted ${file} → ${outputPath}`);
          await fs.unlink(file);
        }

        count++;
      } catch (err) {
        console.error(`✗ Failed on ${file}:`, err.message || err);
      }
    }
  }
}

optimizeAllImages().catch((err) => {
  console.error("Image optimization failed", err);
  process.exit(1);
});
