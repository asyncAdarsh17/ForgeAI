#!/usr/bin/env node
import inquirer from "inquirer";
import { showBanner } from "../src/ui/banner.js";
import { explain, explainText } from "../src/features/explain.js";
import { summarize, summarizeText } from "../src/features/summarize.js";
import { generate } from "../src/features/generate.js";
import { debugCode, debugText } from "../src/features/debug.js";
import { chat } from "../src/features/chat.js";
import { exportLast, exportFullHistory } from "../src/storage/exporter.js";
import { readFileContent } from "../src/storage/fileReader.js";

// -------- COMMAND MODE --------
const cmd = process.argv[2];
const arg = process.argv[3];

if (cmd) {
  try {
    if (cmd === "explain" && arg) {
      const content = readFileContent(arg);
      await explainText(content);
      process.exit(0);
    }
    if (cmd === "debug" && arg) {
      const content = readFileContent(arg);
      await debugText(content);
      process.exit(0);
    }
    if (cmd === "summarize" && arg) {
      const content = readFileContent(arg);
      await summarizeText(content);
      process.exit(0);
    }
    if (cmd === "chat") {
      await chat();
      process.exit(0);
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

// -------- MENU MODE --------

while (true) {
  console.clear();
  showBanner();

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "⚡ Select a power:",
      pageSize: 12,
      choices: [
        "⚡ Explain Code (paste)",
        "📂 Explain a File",
        "⚡ Summarize Text (paste)",
        "📂 Summarize a File",
        "⚡ Debug Errors (paste)",
        "📂 Debug a File",
        "⚡ Chat with AI",
        "📥 Export Full History",
        "❌ Exit"
      ]
    }
  ]);

  if (choice.includes("Explain Code")) await explain();
  else if (choice.includes("Explain a File")) {
    const { path } = await inquirer.prompt([{ type: "input", name: "path", message: "File path:" }]);
    const content = readFileContent(path);
    await explainText(content);
  }
  else if (choice.includes("Summarize Text")) await summarize();
  else if (choice.includes("Summarize a File")) {
    const { path } = await inquirer.prompt([{ type: "input", name: "path", message: "File path:" }]);
    const content = readFileContent(path);
    await summarizeText(content);
  }
  else if (choice.includes("Debug Errors")) await debugCode();
  else if (choice.includes("Debug a File")) {
    const { path } = await inquirer.prompt([{ type: "input", name: "path", message: "File path:" }]);
    const content = readFileContent(path);
    await debugText(content);
  }
  else if (choice.includes("Chat")) await chat();
  else if (choice.includes("History")) exportFullHistory();
  else process.exit(0);

  await inquirer.prompt([{ type: "input", name: "c", message: "Press Enter to continue..." }]);
}

