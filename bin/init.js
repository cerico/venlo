#! /usr/bin/env node
var TITLE_TEXT = "Venlo"
import chalk from "chalk"
import { execSync, exec } from "child_process"
import { promisify } from "util"
import ora2 from "ora"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import figlet from "figlet"
import gradient from "gradient-string"
import { logger } from "./logger.js"
import { runCli } from "./cli.js"
var execa = promisify(exec)
var __filename = fileURLToPath(import.meta.url)
var distPath = path.dirname(__filename)
var PKG_ROOT = path.join(distPath, "../")

var poimandresTheme = {
  blue: "#FF757D",
  cyan: "#fff"
}

const checkPython = () => {
  try {
    execSync("python3 --version")
    return true
  } catch (error) {
    console.log(error)
    logger.error("You need to install Python, check https://www.python.org/downloads/")
    logger.warn("Defaulting to node for json")
    return false
  }
}
var renderTitle = () => {
  const text = figlet.textSync(TITLE_TEXT, { font: "Small", color: "#FF757D" })
  const t3Gradient = gradient(Object.values(poimandresTheme))
  console.log(t3Gradient.multiline(text))
}

var main = async () => {
  renderTitle()
  let appName, language, packages, design
  const args = process.argv.slice(2, process.argv.length)
  if (args.filter((a) => a.startsWith("-")).length > 0) {
    appName = args.filter((a) => !a.startsWith("-"))[0] || "created-by-venlo"
    language = args.filter((a) => !a.startsWith("-")).filter((a) => ["astro", "next"].includes(a))[0] || "astro"
    packages = args.filter((a) => !a.startsWith("-")).filter((a) => ["node", "python"].includes(a))[0] || "node"
    design =
      args
        .filter((a) => !a.startsWith("-"))
        .filter((a) => ["blank", "default", "gists", "scroll", "booklet", "readme"].includes(a))[0] || "default"
  } else {
    ;({ appName, language, packages, design } = await runCli())
  }
  const projectDir = path.resolve(process.cwd(), appName)
  const languages = {
    next: "template/next",
    astro: "template/astro"
  }
  const srcDir = path.join(PKG_ROOT, languages[language])

  const spinner = ora2(`Scaffolding ${language} app in: ${projectDir} \n`)
  spinner.start()
  await fs.copy(srcDir, projectDir)
  await fs.rename(`${projectDir}/gitignore`, `${projectDir}/.gitignore`)
  await fs.rename(`${projectDir}/vscode`, `${projectDir}/.vscode`)
  if (packages === "python" && checkPython()) {
    const pkgDir = path.join(PKG_ROOT, `template/python`)
    await fs.mkdirSync(`${projectDir}/src/python/`)
    const py = `${pkgDir}/init.py`
    const py2 = `${projectDir}/src/python/init.py`
    const js = `${pkgDir}/prepare.js`
    const js2 = `${projectDir}/src/files/prepare.js`
    await fs.copyFile(py, py2)
    await fs.copyFile(js, js2)
  }
  const designsDir = path.join(projectDir, `src/designs/${design}`)
  const indexDir = path.join(projectDir, "src/pages")
  await fs.copy(designsDir, indexDir)
  const pkgJson = await fs.readJSON(path.join(projectDir, "package.json"))
  pkgJson.name = appName
  await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2
  })
  fs.readFile(path.join(projectDir, `src/layouts/${design}.astro`), "utf-8", function (err, contents) {
    if (err) {
      console.log(err)
      return
    }
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1)
    const replaced = contents.replace(/Page Title/g, newTitle)

    fs.writeFile(path.join(projectDir, `src/layouts/${design}.astro`), replaced, "utf-8", function (err) {
      if (err) {
        console.log(err)
        return
      }
    })
  })
  fs.readFile(path.join(projectDir, "tests/playwright/homepage.spec.ts"), "utf-8", function (err, contents) {
    if (err) {
      console.log(err)
      return
    }
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1)
    const replaced = contents.replace(/Page Title/g, newTitle)

    fs.writeFile(path.join(projectDir, "tests/playwright/homepage.spec.ts"), replaced, "utf-8", function (err) {
      if (err) {
        console.log(err)
        return
      }
    })
  })
  fs.readFile(path.join(projectDir, "tests/cucumber/features/homepage.feature"), "utf-8", function (err, contents) {
    if (err) {
      console.log(err)
      return
    }
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1)
    const replaced = contents.replace(/Page Title/g, newTitle)

    fs.writeFile(path.join(projectDir, "tests/cucumber/features/homepage.feature"), replaced, "utf-8", function (err) {
      if (err) {
        console.log(err)
        return
      }
    })
  })
  fs.readFile(path.join(projectDir, "README.md"), "utf-8", function (err, contents) {
    if (err) {
      console.log(err)
      return
    }
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1)
    const replaced = contents.replace(/title/g, newTitle)

    fs.writeFile(path.join(projectDir, "README.md"), replaced, "utf-8", function (err) {
      if (err) {
        console.log(err)
        return
      }
    })
  })
  const repo = `\nrepo:\n\tgh repo create ${appName} --public --source=. --remote=upstream`
  fs.appendFile(path.join(projectDir, "Makefile"), repo)
  spinner.succeed(`${chalk.cyan.bold(appName)} scaffolded successfully!`)
  const spinner3 = ora2("Installing packages")
  spinner3.start()
  const installCmd = "npm install"
  await execa(installCmd, { cwd: projectDir })
  spinner3.succeed(`${chalk.cyan.bold(appName)} packages installed!`)
  const spinner2 = ora2("Initializing git repo")
  spinner2.start()
  if (design == "gists") {
    const gistCmd = "node gist.js"
    await execa(gistCmd, { cwd: projectDir })
  }
  const initCmd = "git init; git add .; git commit -m 'feat: initialized repo'"
  await execa(initCmd, { cwd: projectDir })
  spinner2.succeed(`${chalk.cyan.bold(appName)} git repo created!`)
  logger.info(
    `✔ ${chalk.cyan.bold(appName)} ${chalk.green.bold(language)} ${chalk.white("app created")} ${
      design ? `${chalk.white("using")} ${chalk.green.bold(design)} ${chalk.white("design")}` : ""
    }`
  )
  logger.steps("Next steps:")
  logger.steps(`  cd ${appName}`)
  logger.steps(`  make start`)
}

main().catch((err) => {
  logger.error("Aborting installation...")
  if (err instanceof Error) {
    logger.error(err)
  } else {
    logger.error("An unknown error has occurred. Please open an issue on github with the below:")
    console.log(err)
  }
  process.exit(1)
})
