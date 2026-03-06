import fs from "fs";
import path from "path";

export function readFileContent(filePath) {
  if (!filePath) {
    throw new Error("❌ No file path provided.");
  }

  // ✅ Clean path (remove quotes if user pasted them)
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

  return fs.readFileSync(fullPath, "utf-8");
}
