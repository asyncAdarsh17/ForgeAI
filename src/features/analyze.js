import path from "path";
import ora from "ora";
import { scanProject, readFileContent, chunkContent } from "../storage/fileReader.js";
import { askAI } from "../core/openrouter.js";
import { printPretty } from "../ui/printer.js";
import { saveHistory } from "../storage/history.js";
import { setLastResult } from "../storage/exporter.js";

const MAX_PARALLEL = 3;

const BINARY_EXT = [
  ".png",".jpg",".jpeg",".gif",".bmp",".svg",".ico",
  ".pdf",".zip",".tar",".gz",".rar",".7z",
  ".exe",".dll",".so",".dylib",
  ".mp4",".mp3",".mov",".avi",".wav"
];

const IGNORED_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".next",
  ".cache",
  ".turbo"
];

async function processChunk(file, chunk) {

  try {

    const summary = await askAI(`
Explain briefly what this code does.

File: ${path.basename(file)}

Code:
${chunk}
`);

    return `${path.basename(file)} → ${summary}`;

  } catch {
    return null;
  }

}

async function runParallel(tasks, limit, spinner) {

  const results = [];
  const executing = [];

  let completed = 0;
  const total = tasks.length;

  for (const task of tasks) {

    const p = task().then(r => {

      completed++;

      spinner.text = `🧠 Analyzing code... ${completed}/${total}`;

      executing.splice(executing.indexOf(p), 1);

      return r;

    });

    results.push(p);
    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing);
    }

  }

  return Promise.all(results);
}

export async function analyzeFolder(folderPath) {

  const spinner = ora("🔍 Scanning project...").start();

  let files;

  try {

    files = scanProject(folderPath);

  } catch (err) {

    spinner.fail("Failed to scan folder.");
    throw err;

  }

  if (!files.length) {

    spinner.fail("No files found.");
    return;

  }

  const tasks = [];

  for (const file of files) {

    const ext = path.extname(file).toLowerCase();

    if (BINARY_EXT.includes(ext)) continue;

    const base = path.basename(file);

    if (base.startsWith(".")) continue;

    let content;

    try {

      content = readFileContent(file);

    } catch {

      continue;

    }

    const chunks = chunkContent(content);

    for (const chunk of chunks) {

      tasks.push(() => processChunk(file, chunk));

    }

  }

  if (!tasks.length) {

    spinner.fail("No readable source files found.");
    return;

  }

  spinner.text = `🧠 Preparing analysis (${tasks.length} chunks)...`;

  const summaries = await runParallel(tasks, MAX_PARALLEL, spinner);

  const cleanSummaries = summaries
    .filter(Boolean)
    .slice(0, 50);

  spinner.text = "🧩 Building project explanation...";

  const result = await askAI(`
These are summaries of files in a software project:

${cleanSummaries.join("\n")}

Explain clearly:

1. What this project does
2. Main components/modules
3. How files interact
4. Overall architecture

Keep it structured and developer-friendly.
`);

  spinner.stop();

  saveHistory("user", `analyze: ${folderPath}`);
  saveHistory("ai", result);
  setLastResult(result);

  await printPretty(result);

}
