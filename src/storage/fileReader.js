import fs from "fs";
import path from "path";

const MAX_CHARS = 4000;
const IGNORED_DIRS = ["node_modules", ".git", "dist", "build"];

/*
Read a single file safely
*/
export function readFileContent(filePath) {
  if (!filePath) {
    throw new Error("❌ No file path provided.");
  }

  let cleanedPath = filePath.trim();

  if (
    (cleanedPath.startsWith('"') && cleanedPath.endsWith('"')) ||
    (cleanedPath.startsWith("'") && cleanedPath.endsWith("'"))
  ) {
    cleanedPath = cleanedPath.slice(1, -1);
  }

  const fullPath = path.resolve(process.cwd(), cleanedPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error("❌ File not found: " + fullPath);
  }

  if (fs.statSync(fullPath).isDirectory()) {
    throw new Error("❌ Path is a directory, not a file.");
  }

  const content = fs.readFileSync(fullPath, "utf8");

  if (content.length > MAX_CHARS) {
    return content.slice(0, MAX_CHARS);
  }

  return content;
}

/*
Scan a folder recursively
*/
export function scanProject(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (IGNORED_DIRS.includes(file)) continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(scanProject(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

/*
Split large content into chunks
*/
export function chunkContent(content) {
  const size = 1500;
  const chunks = [];

  for (let i = 0; i < content.length; i += size) {
    chunks.push(content.slice(i, i + size));
  }

  return chunks;
}