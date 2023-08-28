import yargs from "yargs"
import { hideBin } from "yargs/helpers"

export const argv = yargs(hideBin(process.argv))
  .option("appName", {
    alias: "a",
    type: "string",
    description: "Name of the project"
  })
  .option("framework", {
    alias: "f",
    type: "string",
    choices: ["astro", "next"],
    default: "astro",
    description: "Programming framework"
  })
  .option("packages", {
    alias: "p",
    type: "string",
    choices: ["node", "python"],
    default: "node",
    description: "Backend framework"
  })
  .option("design", {
    alias: "d",
    type: "string",
    choices: ["blank", "default", "gists", "scroll", "booklet", "readme"],
    default: "default",
    description: "Design choice"
  })
  .option("colorScheme", {
    alias: "c",
    type: "string",
    choices: ["detective", "stuttgart"],
    default: "detective",
    description: "Color scheme"
  })
  .parse()
