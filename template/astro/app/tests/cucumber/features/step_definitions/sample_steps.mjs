import { Given, When, Then, Before, After } from "@cucumber/cucumber"
import express from "express"
import assert from "assert"
import puppeteer from "puppeteer"
const app = express()
app.use(express.static("dist"))
const port = 6888
const homepage = `http://localhost:${port}`

let server
let page

Before(async function () {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  this.browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/usr/local/bin/chromium'
  })
})

After(async function () {
  await this.browser.close()
  server.close()
})

const getPageByURL = async (targetURL, browser) => {
  const pages = await browser.pages()
  return pages.find((page) => page.url().includes(targetURL))
}

Given("I am on the homepage", async function () {
  page = await this.browser.newPage()
  await page.goto(homepage)
})

When("I click {string}", async function (id) {
  await page.click(id)
})

Then("{string} should have text {string}", async function (id, expectedMessage) {
  const result = await page.$(id)
  console.log(page.title())
  const actualMessage = await result.evaluate((element) => element.textContent)
  assert.strictEqual(actualMessage, expectedMessage)
})

Then("I should see a page title of {string}", async function (expectedTitle) {
  const actualTitle = await page.title()
  assert.strictEqual(actualTitle, expectedTitle)
})

When("I fill in the input field {string} with {string}", async function (id, email) {
  const emailInput = await page.$(id)
  await emailInput.type(email)
})

Then("the input field {string} should have {string}", async function (id, expectedEmail) {
  const emailInput = await page.$(id)
  const actualEmail = await emailInput.evaluate((input) => input.value)
  assert.strictEqual(actualEmail, expectedEmail)
})
