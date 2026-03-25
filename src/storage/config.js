import fs from "fs-extra";
import os from "os";
import path from "path";

const base = path.join(os.homedir(), ".forge-ai");
const configPath = path.join(base, "config.json");

fs.ensureDirSync(base);

export function hasConfig() {
  return fs.existsSync(configPath);
}

export function saveConfig(data) {
  fs.writeJSONSync(configPath, data, { spaces: 2 });
}

export function loadConfig() {
  if (!fs.existsSync(configPath)) {
    console.log("❌ Config not found. Run forge setup first.");
    process.exit(1);
  }
  return fs.readJSONSync(configPath);
}
