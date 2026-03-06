import { highlight } from "cli-highlight";

export function printPretty(text) {
  if (!text) return;

  if (text.includes("```")) {
    console.log(highlight(text));
  } else {
    console.log("\n" + text + "\n");
  }
}

