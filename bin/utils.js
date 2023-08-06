import fs from "fs-extra"
import path from "path"
import { execSync } from "child_process"
import { logger } from "./logger.js"
import figlet from "figlet"
import gradient from "gradient-string"
const TITLE_TEXT = "Venlo"
const poimandresTheme = {
  blue: "#FF757D",
  cyan: "#fff"
}
export const renderTitle = () => {
  const text = figlet.textSync(TITLE_TEXT, { font: "Small", color: "#FF757D" })
  const t3Gradient = gradient(Object.values(poimandresTheme))
  console.log(t3Gradient.multiline(text))
}
export const checkPython = () => {
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
export const replaceAndWrite = async (projectDir, appName, filePath) => {
  try {
    let contents = await fs.readFile(path.join(projectDir, filePath), "utf-8")
    const newTitle = appName.charAt(0).toUpperCase() + appName.slice(1)
    const replaced = contents.replace(/Page Title/g, newTitle)
    await fs.writeFile(path.join(projectDir, filePath), replaced, "utf-8")
  } catch (err) {
    console.log(err)
  }
}
//# sourceMappingURL=utils.js.map
