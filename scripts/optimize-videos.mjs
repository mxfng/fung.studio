import { readdir } from "fs/promises";
import { join, extname, basename, resolve } from "path";
import { spawn } from "child_process";

const TARGET_DIR = process.argv[2] ? resolve(process.argv[2]) : process.cwd();
const SUPPORTED_VIDEO_EXTENSIONS = [".mov", ".mp4"];

async function findVideoFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const dirent of dirents) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      files.push(...(await findVideoFiles(res)));
    } else if (
      SUPPORTED_VIDEO_EXTENSIONS.includes(extname(res).toLowerCase())
    ) {
      files.push(res);
    }
  }

  return files;
}

async function convertToWebP(inputPath) {
  const outputPath = join(
    resolve(inputPath, ".."),
    `${basename(inputPath, extname(inputPath))}.webp`,
  );

  const args = [
    "-i",
    inputPath,
    "-vf",
    "fps=20,scale=800:-1:flags=lanczos",
    "-loop",
    "0",
    "-an",
    "-vsync",
    "0",
    outputPath,
  ];

  return new Promise((resolvePromise, reject) => {
    const ffmpeg = spawn("ffmpeg", args, { stdio: "inherit" });

    ffmpeg.on("exit", (code) => {
      if (code === 0) {
        console.log(`✓ Converted ${inputPath} → ${outputPath}`);
        resolvePromise();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
  });
}

async function run() {
  const videoFiles = await findVideoFiles(TARGET_DIR);

  if (!videoFiles.length) {
    console.log("No .mov or .mp4 files found.");
    return;
  }

  for (const file of videoFiles) {
    try {
      await convertToWebP(file);
    } catch (err) {
      console.error(`✗ Failed to convert ${file}:`, err.message);
    }
  }
}

run().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
