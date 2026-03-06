import inquirer from "inquirer";
import ora from "ora";
import { askAI } from "../core/openrouter.js";
import { saveHistory } from "../storage/history.js";
import { printPretty } from "../ui/printer.js";
import { setLastResult } from "../storage/exporter.js";

export async function generate() {
  const { prompt } = await inquirer.prompt([
    { type: "input", name: "prompt", message: "What do you want to generate?" }
  ]);

  const spinner = ora("Generating...").start();
  const result = await askAI(prompt);
  spinner.stop();

  saveHistory("user", prompt);
  saveHistory("ai", result);
  setLastResult(result);

  printPretty(result);
}
