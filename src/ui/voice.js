import say from "say";
import inquirer from "inquirer";

export async function speakIfWanted(text) {
  const { voice } = await inquirer.prompt([
    {
      type: "confirm",
      name: "voice",
      message: "🔊 Listen to AI response?",
      default: false
    }
  ]);

  if (voice) {
    say.speak(text);
  }
}
