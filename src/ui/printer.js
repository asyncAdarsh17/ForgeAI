import { highlight } from "cli-highlight";
import say from "say";

/*
Voice lock system
*/
let speaking = false;
const speechQueue = [];

/*
Sleep helper for typing animation
*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
Typing animation
*/
async function typeText(text, speed = 8) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(speed);
  }
  console.log("\n");
}

/*
Clean text for speech
*/
function cleanForSpeech(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

/*
Highlight code blocks
*/
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

/*
Speech queue system
*/
function speak(text) {

  speechQueue.push(text);

  if (!speaking) runQueue();

}

function runQueue() {

  if (speechQueue.length === 0) {
    speaking = false;
    return;
  }

  speaking = true;

  const speech = speechQueue.shift();

  say.stop(); // stop any previous speech

  say.speak(speech, null, 1.0, () => {
    runQueue();
  });

}

/*
Main printer
*/
export async function printPretty(text) {

  if (!text) return;

  console.log("\n🤖 Forge AI:\n");

  if (text.includes("```")) {

    renderHighlighted(text);

  } else {

    await typeText(text);

  }

  const speechText = cleanForSpeech(text);

  const MAX_VOICE_CHARS = 1200;

  const speech = speechText.slice(0, MAX_VOICE_CHARS);

  if (speech.length > 10) {
    speak(speech);
  }

}