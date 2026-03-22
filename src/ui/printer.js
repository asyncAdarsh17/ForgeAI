import { highlight } from "cli-highlight";
import say from "say";
import inquirer from "inquirer";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed = 8) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(speed);
  }
  console.log("\n");
}

function cleanForSpeech(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

function renderHighlighted(text) {
  const parts = text.split(/(```[\s\S]*?```)/g);

  for (const part of parts) {
    if (part.startsWith("```")) {
      const code = part.replace(/```/g, "");
      console.log("\n");
      console.log(highlight(code));
      console.log("\n");
    } else {
      process.stdout.write(part);
    }
  }

  console.log("\n");
}

export async function printPretty(text) {

  if (!text) return;

  console.log("\n🤖 Forge AI:\n");

  if (text.includes("```")) {
    renderHighlighted(text);
  } else {
    await typeText(text);
  }

  const speechText = cleanForSpeech(text);
  const speech = speechText.slice(0, 1200);

  if (speech.length > 10) {
    console.log("🔊 Speaking... (Press Enter to stop)\n");

    say.speak(speech, null, 1.0, () => {
      console.log("✅ Done speaking.\n");
    });

    await inquirer.prompt([
      { type: "input", name: "stop", message: "Press Enter to stop..." }
    ]);

    say.stop();
  }
}