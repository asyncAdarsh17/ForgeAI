import inquirer from "inquirer";
import ora from "ora";
import say from "say";
import { askAI } from "../core/openrouter.js";
import { saveHistory } from "../storage/history.js";
import { printPretty } from "../ui/printer.js";
import { setLastResult } from "../storage/exporter.js";

export async function debugCode() {
  const { text } = await inquirer.prompt([
    { type: "input", name: "text", message: "Paste code or error:" }
  ]);
  await debugText(text);
}

export async function debugText(text) {
  const spinner = ora("Debugging...").start();

  const result = await askAI(`
Find the bug, fix it, and explain:

${text}
`);

  spinner.stop();

  saveHistory("user", text);
  saveHistory("ai", result);
  setLastResult(result);

  printPretty(result);
  say.speak(result.substring(0, 500));
}
