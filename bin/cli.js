import inquirer from "inquirer"

export const runCli = async () => {
  const cliResults = {}
  const cliProvidedName = process.argv[2]
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName
  } else {
    const { appName } = await inquirer.prompt({
      name: "appName",
      type: "input",
      message: "What will your project be called?",
      // validate: validateAppName,
      transformer: (input) => {
        return input.trim()
      }
    })
    cliResults.appName = appName
  }
  const { language } = await inquirer.prompt({
    name: "language",
    type: "list",
    message: "Will you be using Astro or Next?",
    choices: [
      { name: "astro", value: "astro", short: "astro" },
      { name: "next", value: "next", short: "next" }
    ],
    default: "astro"
  })
  if (language === "astro") {
    const { packages } = await inquirer.prompt({
      name: "packages",
      type: "list",
      message: "How will you be handling json?",
      choices: [
        { name: "node", value: "node", short: "node" },
        { name: "python", value: "python", short: "python" }
      ],
      default: "node"
    })
    cliResults.packages = packages
    const { design } = await inquirer.prompt({
      name: "design",
      type: "list",
      message: "Choose a design",
      choices: [
        { name: "default", value: "default", short: "default" },
        { name: "blank", value: "blank", short: "blank" },
        { name: "gists", value: "gists", short: "gists" },
        { name: "scroll", value: "scroll", short: "scroll" },
        { name: "booklet", value: "booklet", short: "booklet" },
        { name: "readme", value: "readme", short: "readme" }
      ],
      default: "default"
    })
    cliResults.design = design
  }
  cliResults.language = language
  return cliResults
}
