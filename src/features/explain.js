import inquirer from "inquirer";
import ora from "ora";
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

  try {
    const result = await askAI(`
Explain the following code clearly.

Focus on:
- purpose of the code
- main logic
- important patterns

Code:
${code}
`);

    spinner.stop();

    saveHistory("user", code);
    saveHistory("ai", result);
    setLastResult(result);

    await printPretty(result);

  } catch (err) {
    spinner.stop();
    console.log("❌ Error:", err.message);
  }
}
