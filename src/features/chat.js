import inquirer from "inquirer";
import ora from "ora";
import { askAI } from "../core/openrouter.js";
import { printPretty } from "../ui/printer.js";
import { saveHistory } from "../storage/history.js";
import { setLastResult } from "../storage/exporter.js";

export async function chat() {
  console.log("Type 'exit' to leave chat.");

  while (true) {
    const { msg } = await inquirer.prompt([
      { type: "input", name: "msg", message: "You:" }
    ]);

    if (msg.toLowerCase() === "exit") break;

    const spinner = ora("Thinking...").start();

    try {
      const result = await askAI(msg);
      spinner.stop();

      saveHistory("user", msg);
      saveHistory("ai", result);
      setLastResult(result);

      await printPretty(result);

    } catch (err) {
      spinner.stop();
      console.log("❌ Error:", err.message);
    }
  }
}
