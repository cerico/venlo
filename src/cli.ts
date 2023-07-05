import inquirer, { QuestionCollection } from "inquirer"

interface CliResults {
  appName?: string
  language?: string
  packages?: string
  design?: string
}

export const runCli = async (): Promise<CliResults> => {
  const cliResults: CliResults = {}
  const cliProvidedName = process.argv[2]
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName
  } else {
    const questions: QuestionCollection<{ appName: string }> = {
      name: "appName",
      type: "input",
      message: "What will your project be called?",
      transformer: (input: string) => {
        return input.trim()
      }
    }
    const { appName } = await inquirer.prompt(questions)
    cliResults.appName = appName
  }
  const questionsLanguage: QuestionCollection<{ language: string }> = {
    name: "language",
    type: "list",
    message: "Will you be using Astro or Next?",
    choices: [
      { name: "astro", value: "astro", short: "astro" },
      { name: "next", value: "next", short: "next" }
    ],
    default: "astro"
  }
  const { language } = await inquirer.prompt(questionsLanguage)
  if (language === "astro") {
    const questionsPackages: QuestionCollection<{ packages: string }> = {
      name: "packages",
      type: "list",
      message: "How will you be handling json?",
      choices: [
        { name: "node", value: "node", short: "node" },
        { name: "python", value: "python", short: "python" }
      ],
      default: "node"
    }
    const { packages } = await inquirer.prompt(questionsPackages)
    cliResults.packages = packages
    const questionsDesign: QuestionCollection<{ design: string }> = {
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
    }
    const { design } = await inquirer.prompt(questionsDesign)
    cliResults.design = design
  }
  cliResults.language = language
  return cliResults
}
