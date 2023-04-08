#! /usr/bin/env node
var TITLE_TEXT = "Venlo";
import chalk from "chalk";
import { execSync, exec } from 'child_process'
import { promisify } from "util";
import ora2 from "ora";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import figlet from "figlet";
import gradient from "gradient-string";
var execa = promisify(exec);
var __filename = fileURLToPath(import.meta.url);
var distPath = path.dirname(__filename);
var PKG_ROOT = path.join(distPath, "../");
var logger = {
  error(...args) {
    console.log(chalk.red(...args));
  },
  warn(...args) {
    console.log(chalk.yellow(...args));
  },
  info(...args) {
    console.log(chalk.cyan(...args));
  },
  success(...args) {
    console.log(chalk.green(...args));
  }
};

var poimandresTheme = {
  blue: "#FF757D",
  cyan: "#fff"
};

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
  const text = figlet.textSync(TITLE_TEXT, { font: "Small", color: "#FF757D" });
  const t3Gradient = gradient(Object.values(poimandresTheme));
  console.log(t3Gradient.multiline(text));
};

var runCli = async () => {
  const cliResults = {};
  const cliProvidedName = process.argv[2];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  } else {
    const { appName } = await inquirer.prompt({
      name: "appName",
      type: "input",
      message: "What will your project be called?",
      // validate: validateAppName,
      transformer: (input) => {
        return input.trim();
      }
    });
    cliResults.appName = appName;
  }
  const { language } = await inquirer.prompt({
    name: "language",
    type: "list",
    message: "Will you be using Astro or Next?",
    choices: [
      { name: "astro", value: "astro", short: "astro" },
      { name: "next", value: "next", short: "next" },
    ],
    default: "astro",
  });
  if (language === 'astro') {
    const { packages } = await inquirer.prompt({
      name: "packages",
      type: "list",
      message: "How will you be handling json?",
      choices: [
        { name: "node", value: "node", short: "node" },
        { name: "python", value: "python", short: "python" },
      ],
      default: "node",
    });
    cliResults.packages = packages;
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
        { name: "readme", value: "readme", short: "readme" },
      ],
      default: "default",
    });
    cliResults.design = design;
  }
  cliResults.language = language;
  return cliResults;
}

var main = async () => {
  renderTitle();
  let appName, language, packages, design
  const args = process.argv.slice(2, process.argv.length)
  if (args.filter((a) => a.startsWith("-")).length > 0) {
    appName = args.filter((a) => !a.startsWith("-"))[0] || "created-by-venlo"
    language = args
        .filter((a) => !a.startsWith("-"))
        .filter((a) => ["astro", "next"].includes(a))[0] || "astro"
    packages = args
        .filter((a) => !a.startsWith("-"))
        .filter((a) => ["node", "python"].includes(a))[0] || "node"
    design = args
        .filter((a) => !a.startsWith("-"))
        .filter((a) => ["blank", "default", "gists", "scroll", "booklet", "readme"].includes(a))[0] || "default"
  } else {
    ({ appName, language, packages, design } = await runCli())
  }
  const projectDir = path.resolve(process.cwd(), appName);
  const languages = {
    next: 'template/next',
    astro: 'template/astro'
  }
  const srcDir = path.join(PKG_ROOT, languages[language]);

  const spinner = ora2(`Scaffolding ${language} app in: ${projectDir} \n`);
  spinner.start();
  await fs.copy(srcDir, projectDir);
  await fs.rename(`${projectDir}/gitignore`, `${projectDir}/.gitignore`)
  await fs.rename(`${projectDir}/vscode`, `${projectDir}/.vscode`)
  if (packages === 'python' && checkPython()) {
    const pkgDir = path.join(PKG_ROOT, `template/python`);
    await fs.mkdirSync(`${projectDir}/src/python/`);
    const py = `${pkgDir}/init.py`
    const py2 = `${projectDir}/src/python/init.py`
    const js = `${pkgDir}/prepare.js`
    const js2 = `${projectDir}/src/files/prepare.js`
    await fs.copyFile(py,py2);
    await fs.copyFile(js,js2);
  }
  if (design !== 'readme') {
    await fs.rename(`${projectDir}/src/pages/${design}.astro`,`${projectDir}/src/pages/index.astro`);
  }
  const pkgJson = await fs.readJSON(path.join(projectDir, "package.json"));
  pkgJson.name = appName;
  await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2
  });
  fs.readFile(path.join(projectDir, `src/layouts/${design}.astro`), 'utf-8', function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1);
    const replaced = contents.replace(/Page Title/g, newTitle);

    fs.writeFile(path.join(projectDir, `src/layouts/${design}.astro`), replaced, 'utf-8', function (err) {
      console.log(err);
    });
  });
  fs.readFile(path.join(projectDir, "README.md"), 'utf-8', function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1);
    const replaced = contents.replace(/title/g, newTitle);

    fs.writeFile(path.join(projectDir, "README.md"), replaced, 'utf-8', function (err) {
      console.log(err);
    });
  });
  const gitUserCmd = "git config --get user.name"
  const gitUser = await execa(gitUserCmd);
  const repo = `\nrepo:\n\tgh repo create ${appName} --public\n\tgit remote add origin git@github.com:${gitUser.stdout.trim()}/${appName}.git`
  fs.appendFile(path.join(projectDir, "Makefile"), repo)
  spinner.succeed(`${chalk.cyan.bold(appName)} scaffolded successfully!`);
  const spinner3 = ora2('Installing packages');
  spinner3.start();
  const installCmd = "npm install"
  await execa(installCmd, { cwd: projectDir });
  spinner3.succeed(`${chalk.cyan.bold(appName)} packages installed!`);
  const spinner2 = ora2('Initializing git repo');
  spinner2.start();
  const gistCmd = "node gist.js"
  await execa(gistCmd, { cwd: projectDir });
  const initCmd = "git init; git add .; git commit -m 'feat: initialized repo'";
  await execa(initCmd, { cwd: projectDir });
  spinner2.succeed(`${chalk.cyan.bold(appName)} git repo created!`);
  logger.info("Next steps:");
  logger.info(`  cd ${appName}`);
  logger.info(`  make start`);
}

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error("An unknown error has occurred. Please open an issue on github with the below:");
    console.log(err);
  }
  process.exit(1);
});
