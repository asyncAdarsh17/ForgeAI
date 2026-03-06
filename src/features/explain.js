import inquirer from "inquirer";
import ora from "ora";
import say from "say";
import { askAI } from "../core/openrouter.js";
import { saveHistory } from "../storage/history.js";
import { printPretty } from "../ui/printer.js";
import { setLastResult } from "../storage/exporter.js";

export async function explain() {
  const { code } = await inquirer.prompt([
    { type: "input", name: "code", message: "Paste code:" }
  ]);
  await explainText(code);
}

export async function explainText(code) {
  const spinner = ora("Explaining...").start();

  const result = await askAI(`
Explain the following code in detail, step by step, including logic and algorithm:

${code}
`);

  spinner.stop();

  saveHistory("user", code);
  saveHistory("ai", result);
  setLastResult(result);

  printPretty(result);
  say.speak(result.substring(0, 500)); // speak first part only
}

