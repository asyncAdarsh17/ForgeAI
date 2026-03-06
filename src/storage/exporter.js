import fs from "fs-extra";
import os from "os";
import path from "path";

const baseDir = path.join(os.homedir(), ".forge-ai-pro");
const exportsDir = path.join(baseDir, "exports");
const historyPath = path.join(baseDir, "history.json");

fs.ensureDirSync(exportsDir);

let lastResult = "";

// Save last AI result
export function setLastResult(text) {
  lastResult = text;
}

// Export only last result
export function exportLast() {
  if (!lastResult) {
    console.log("❌ No result to export yet.");
    return;
  }

  const file = path.join(exportsDir, `output_${Date.now()}.md`);
  fs.writeFileSync(file, lastResult, "utf-8");

  console.log("✅ Last result exported to:");
  console.log(file);
}

// Export full chat history
export function exportFullHistory() {
  if (!fs.existsSync(historyPath)) {
    console.log("❌ No history file found.");
    return;
  }

  const history = fs.readJSONSync(historyPath);

  if (!Array.isArray(history) || history.length === 0) {
    console.log("❌ History is empty.");
    return;
  }

  let output = `# 📜 Forge AI Pro - Full History\n\n`;
  output += `Generated on: ${new Date().toLocaleString()}\n\n---\n\n`;

  for (const item of history) {
    output += `## 🕒 ${item.time}\n`;
    output += `**${item.role.toUpperCase()}**:\n\n`;
    output += `${item.text}\n\n---\n\n`;
  }

  const file = path.join(exportsDir, `history_${Date.now()}.md`);
  fs.writeFileSync(file, output, "utf-8");

  console.log("✅ Full history exported to:");
  console.log(file);
}
