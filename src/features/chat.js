import inquirer from "inquirer";
import ora from "ora";
import say from "say";
import { askAI } from "../core/openrouter.js";
import { printPretty } from "../ui/printer.js";

export async function chat() {
  console.log("Type 'exit' to leave chat.");

  while (true) {
    const { msg } = await inquirer.prompt([
      { type: "input", name: "msg", message: "You:" }
    ]);

    if (msg.toLowerCase() === "exit") break;

    const spinner = ora("Thinking...").start();
    const result = await askAI(msg);
    spinner.stop();

    printPretty(result);
    say.speak(result.substring(0, 500));
  }
}

