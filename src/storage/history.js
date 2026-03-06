import fs from "fs-extra";
import os from "os";
import path from "path";

const base = path.join(os.homedir(), ".forge-ai-pro");
const historyPath = path.join(base, "history.json");

fs.ensureDirSync(base);

export function saveHistory(role, text) {
  let data = [];
  if (fs.existsSync(historyPath)) data = fs.readJSONSync(historyPath);

  data.push({ role, text, time: new Date().toISOString() });
  fs.writeJSONSync(historyPath, data, { spaces: 2 });
}
