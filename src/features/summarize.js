import inquirer from "inquirer";
import ora from "ora";
import { askAI } from "../core/openrouter.js";
import { saveHistory } from "../storage/history.js";
import { printPretty } from "../ui/printer.js";
import { setLastResult } from "../storage/exporter.js";

function detectInputType(text) {
  const codeIndicators = [
    "function ", "const ", "let ", "var ", "import ", "export ",
    "class ", "def ", "return ", "=>", "{}","()", "#!/",
    "public ", "private ", "void ", "int ", "string "
  ];

  const matches = codeIndicators.filter(indicator => text.includes(indicator));
  return matches.length >= 2 ? "code" : "text";
}

export async function summarize() {
  const { text } = await inquirer.prompt([
    { type: "input", name: "text", message: "Paste text or code:" }
  ]);
  await summarizeText(text);
}

export async function summarizeText(text) {
  const spinner = ora("Summarizing...").start();

  const inputType = detectInputType(text);

  let prompt;

  if (inputType === "code") {
    prompt = `Summarize the following code clearly.
Include:
- What the code does overall
- Key functions or components
- Important logic or patterns
- Any potential issues

Code:
${text}`;
  } else {
    prompt = `Summarize the following text in clear bullet points.
Focus on:
- Main ideas and key concepts
- Important facts or points
- Conclusion or takeaway

Text:
${text}`;
  }

  try {

    const result = await askAI(prompt);

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