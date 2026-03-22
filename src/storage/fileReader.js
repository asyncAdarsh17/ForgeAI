import fs from "fs";
import path from "path";

const MAX_CHARS = 4000;
const IGNORED_DIRS = ["node_modules", ".git", "dist", "build"];

function cleanPath(inputPath) {
  let cleaned = inputPath.trim();

  // Remove surrounding quotes
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }

  // If it's an absolute path, use it directly, don't resolve relative to cwd
  if (path.isAbsolute(cleaned)) {
    return cleaned;
  }

  return path.resolve(process.cwd(), cleaned);
}

export function readFileContent(filePath) {
  if (!filePath) {
    throw new Error("❌ No file path provided.");
  }

  const fullPath = cleanPath(filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error("❌ File not found: " + fullPath);
  }

  if (fs.statSync(fullPath).isDirectory()) {
    throw new Error("❌ Path is a directory, not a file.");
  }

  const content = fs.readFileSync(fullPath, "utf8");

  if (content.length > MAX_CHARS) {
    console.log("⚠️  File truncated to 4000 chars.");
    return content.slice(0, MAX_CHARS);
  }

  return content;
}

export function scanProject(dir) {
  const fullPath = cleanPath(dir);

  if (!fs.existsSync(fullPath)) {
    throw new Error("❌ Folder not found: " + fullPath);
  }

  let results = [];
  const files = fs.readdirSync(fullPath);

  for (const file of files) {
    if (IGNORED_DIRS.includes(file)) continue;

    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(scanProject(filePath));
    } else {
      results.push(filePath);
    }
  }

  return results;
}

export function chunkContent(content) {
  const size = 1500;
  const chunks = [];

  for (let i = 0; i < content.length; i += size) {
    chunks.push(content.slice(i, i + size));
  }

  return chunks;
}