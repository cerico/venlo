#! /usr/bin/env node
import chalk from "chalk"
import { exec } from "child_process"
import { promisify } from "util"
import ora2 from "ora"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import { logger } from "./logger.js"
import { runCli } from "./cli.js"
import { argv } from "./yargs.js"
import { rewriteAppName, checkPython, renderTitle } from "./utils.js"
var execa = promisify(exec)
var __filename = fileURLToPath(import.meta.url)
var distPath = path.dirname(__filename)
var PKG_ROOT = path.join(distPath, "../")

const main = async () => {
  renderTitle()
  let { appName, framework, packages, design, colorScheme } = argv

  if (!appName) {
    ;({ appName, framework, packages, design, colorScheme } = await runCli())
  }
  const projectDir = path.resolve(process.cwd(), appName)
  const frameworks = {
    next: "template/next",
    astro: "template/astro"
  }
  const srcDir = path.join(PKG_ROOT, frameworks[framework], "app")

  const spinner = ora2(`Scaffolding ${framework} app in: ${projectDir} \n`)
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
  if (framework === "astro") {
    const designsDir = path.join(PKG_ROOT, frameworks[framework], `designs/${design}`)
    const indexDir = path.join(projectDir, "src")
    await fs.copy(designsDir, indexDir)
    const pkgJson = await fs.readJSON(path.join(projectDir, "package.json"))
    pkgJson.name = appName
    await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
      spaces: 2
    })
    const insertIntoFiles = [
      "tests/playwright/homepage.spec.ts",
      "tests/cucumber/features/homepage.feature",
      "README.md",
      "src/layouts/index.astro",
      "src/components/sidebar.astro",
    ];
    rewriteAppName(projectDir, appName, insertIntoFiles);
    const repo = `\nrepo:\n\tgh repo create ${appName} --public --source=. --remote=upstream`
    fs.appendFile(path.join(projectDir, "Makefile"), repo)
    if (design === "readme") {
      const sourceColorPath = path.join(PKG_ROOT, `template/astro/designs/themes/${colorScheme}.scss`)
      const destColorPath = path.join(projectDir, "src/styles/themes.scss")
      await fs.copyFile(sourceColorPath, destColorPath)
    }
  }
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
    `✔ ${chalk.cyan.bold(appName)} ${chalk.green.bold(framework)} ${chalk.white("app created")} ${
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
