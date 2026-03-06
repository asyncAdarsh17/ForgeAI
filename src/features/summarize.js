import inquirer from "inquirer";
import ora from "ora";
import say from "say";
import { askAI } from "../core/openrouter.js";
import { saveHistory } from "../storage/history.js";
import { printPretty } from "../ui/printer.js";
import { setLastResult } from "../storage/exporter.js";

export async function summarize() {
  const { text } = await inquirer.prompt([
    { type: "input", name: "text", message: "Paste text:" }
  ]);
  await summarizeText(text);
}

export async function summarizeText(text) {
  const spinner = ora("Summarizing...").start();

  const result = await askAI(`Summarize this in clear bullet points:\n${text}`);

  spinner.stop();

  saveHistory("user", text);
  saveHistory("ai", result);
  setLastResult(result);

  printPretty(result);
  say.speak(result.substring(0, 500));
}
