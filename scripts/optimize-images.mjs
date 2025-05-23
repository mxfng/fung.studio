import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SOURCE_DIRS = ["src/assets/works", "src/assets/hero"];
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_WIDTH = 2400;
const OUTPUT_QUALITY = 80;

// Only these dirs will have their output renamed numerically (1.webp, 2.webp, etc.)
const RENAME_FILES_IN_DIRS = ["src/assets/works"];

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

  const filesByDir = new Map();

  for (const file of allFiles) {
    const dir = path.dirname(file);
    if (!filesByDir.has(dir)) filesByDir.set(dir, []);
    filesByDir.get(dir).push(file);
  }

  for (const [dir, files] of filesByDir.entries()) {
    const allowRename = RENAME_FILES_IN_DIRS.some((renamable) =>
      dir.startsWith(path.resolve(renamable))
    );

    const sorted = files
      .filter((file) => isSupportedImage(file))
      .sort(
        (a, b) =>
          parseInt(path.basename(a).match(/\d+/)?.[0] || "99999") -
          parseInt(path.basename(b).match(/\d+/)?.[0] || "99999")
      );

    let count = 1;

    for (const file of sorted) {
      const ext = path.extname(file).toLowerCase();
      const base = path.basename(file, ext);

      const outputPath = allowRename
        ? path.join(dir, `${count}.webp`)
        : path.join(dir, `${base}.webp`);

      try {
        if (ext === ".webp") {
          if (!isOptimizedWebp(file) && allowRename) {
            await fs.rename(file, outputPath);
            console.log(`✓ Renamed ${file} → ${outputPath}`);
          } else {
            console.log(
              `✓ Skipped ${file} (already webp or renaming not allowed)`
            );
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
