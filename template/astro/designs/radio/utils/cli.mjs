import inquirer from "inquirer"
import { series } from '../text/index.mjs'
import { capitalizeTitle } from './capitalize.mjs'
const newCategory = "Add new category"
const choices = [newCategory, ...series.map((category) => category.title)]

export const runCli = async () => {
    const cliResults = {}
    const askStory = {
        name: "story",
        type: "input",
        validate: (input) => {
            if (input.trim() === '') {
                return 'Story name cannot be blank.'
            }
            return true
        },
        message: "What will your story be called?"
    }
    const { story } = await inquirer.prompt(askStory)
    cliResults.story = capitalizeTitle(story).trim()
    const askCategory = {
        name: "category",
        type: "list",
        message: "Which category will your story be in?",
        choices,
        default: newCategory
    }
    const { category } = await inquirer.prompt(askCategory)
    if (category === "Add new category") {
        const askNewCategory = {
            name: "newCategory",
            type: "input",
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Category name cannot be blank.'
                }
                return true
            },
            message: "What will your new category be called?",
        }
        cliResults.category = capitalizeTitle((await inquirer.prompt(askNewCategory)).newCategory.trim())
    } else {
        cliResults.category = category
    }
    return cliResults
}
