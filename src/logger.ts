import chalk from "chalk"

export const logger = {
  error(...args) {
    console.log(chalk.red(...args))
  },
  warn(...args) {
    console.log(chalk.yellow(...args))
  },
  info(...args) {
    console.log(chalk.cyan(...args))
  },
  success(...args) {
    console.log(chalk.green(...args))
  },
  steps(...args) {
    console.log(chalk.white.bold(...args))
  }
}
