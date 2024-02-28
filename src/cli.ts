import inquirer, { QuestionCollection } from "inquirer"

const choices = [
  { name: "default", value: "default", short: "default" },
  { name: "blank", value: "blank", short: "blank" },
  { name: "gists", value: "gists", short: "gists" },
  { name: "radio", value: "radio", short: "radio" },
  { name: "scroll", value: "scroll", short: "scroll" },
  { name: "booklet", value: "booklet", short: "booklet" },
  { name: "readme", value: "readme", short: "readme" }
]

interface CliResults {
  appName?: string
  framework?: string
  packages?: string
  design?: string
  colorScheme?: string
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
      validate: (input: string) => {
        if (input.trim() === '') {
          return 'App name cannot be blank.'
        }
        return true
      },
      transformer: (input: string) => {
        return input.trim()
      }
    }
    const { appName } = await inquirer.prompt(questions)
    cliResults.appName = appName
  }
  const questionsFramework: QuestionCollection<{ framework: string }> = {
    name: "framework",
    type: "list",
    message: "Will you be using Astro or Next?",
    choices: [
      { name: "astro", value: "astro", short: "astro" },
      { name: "next", value: "next", short: "next" }
    ],
    default: "astro"
  }
  const { framework } = await inquirer.prompt(questionsFramework)
  if (framework === "astro") {
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
      choices,
      default: "default"
    }

    const { design } = await inquirer.prompt(questionsDesign)
    cliResults.design = design

    if (design === "readme") {
      const questionsColorScheme: QuestionCollection<{ colorScheme: string }> = {
        name: "colorScheme",
        type: "list",
        message: "Choose a color scheme for the readme design:",
        choices: [
          { name: "detective", value: "detective", short: "detective" },
          { name: "stuttgart", value: "stuttgart", short: "stuttgart" }
        ],
        default: "detective"
      }
      const colorSchemeResponse = await inquirer.prompt(questionsColorScheme)
      cliResults.colorScheme = colorSchemeResponse.colorScheme
    }
  }
  cliResults.framework = framework
  return cliResults
}
