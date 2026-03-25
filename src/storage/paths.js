import os from "os";
import path from "path";
import fs from "fs-extra";

const base = path.join(os.homedir(), ".forge-ai");

export const paths = {
  base,
  config: path.join(base, "config.json"),
  history: path.join(base, "history.json"),
  exports: path.join(base, "exports")
};

export function ensureDirs() {
  fs.ensureDirSync(paths.base);
  fs.ensureDirSync(paths.exports);
}
