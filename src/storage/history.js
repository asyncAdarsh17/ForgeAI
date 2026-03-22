import fs from "fs-extra";
import os from "os";
import path from "path";

const base = path.join(os.homedir(), ".forge-ai-pro");
const historyPath = path.join(base, "history.json");

fs.ensureDirSync(base);

const MAX_HISTORY = 500;

export function saveHistory(role, text) {
  let data = [];

  if (fs.existsSync(historyPath)) {
    data = fs.readJSONSync(historyPath);
  }

  data.push({ role, text, time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });

  // Keep only last 500 entries
  if (data.length > MAX_HISTORY) {
    data = data.slice(data.length - MAX_HISTORY);
  }

  fs.writeJSONSync(historyPath, data, { spaces: 2 });
}

export function getHistory() {
  if (!fs.existsSync(historyPath)) return [];
  return fs.readJSONSync(historyPath);
}

export function clearHistory() {
  fs.writeJSONSync(historyPath, [], { spaces: 2 });
  console.log("✅ History cleared.");
}
