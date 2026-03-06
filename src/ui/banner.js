import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";

export function showBanner() {
  const text = figlet.textSync("FORGE AI", { horizontalLayout: "full" });
  const banner = gradient(["#FFD700", "#FFA500"])(text);

  console.log(
    boxen(banner + "\n\n✨ Your AI Dev Companion ✨", {
      padding: 1,
      borderStyle: "round",
      borderColor: "yellow"
    })
  );
}
