import inquirer from "inquirer";
import { hasConfig, saveConfig } from "../storage/config.js";

export async function ensureSetup() {
  if (hasConfig()) return;

  console.log("🚀 First time setup!");
  const { key } = await inquirer.prompt([
    { type: "input", name: "key", message: "Paste your Open Router  API Key:" }
  ]);

  saveConfig({ apiKey: key.trim() });
  console.log("✅ Setup complete!");
}
