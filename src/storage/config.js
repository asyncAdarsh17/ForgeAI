import fs from "fs-extra";
import os from "os";
import path from "path";

const base = path.join(os.homedir(), ".forge-ai-pro");
const configPath = path.join(base, "config.json");

fs.ensureDirSync(base);

export function loadConfig() {
  if (!fs.existsSync(configPath)) {
    console.log("❌ Config not found.");
    console.log("Create file:", configPath);
    process.exit(1);
  }
  return fs.readJSONSync(configPath);
}
