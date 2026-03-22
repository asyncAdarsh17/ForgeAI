import inquirer from "inquirer";
import ora from "ora";
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

  try {
    const result = await askAI(`
Find the bug, fix it, and explain:

${text}
`);

    spinner.stop();

    saveHistory("user", text);
    saveHistory("ai", result);
    setLastResult(result);

    await printPretty(result);

  } catch (err) {
    spinner.stop();
    console.log("❌ Error:", err.message);
  }
}
