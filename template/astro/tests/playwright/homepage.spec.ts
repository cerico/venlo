import { test, expect } from "@playwright/test"

const homepage = "http://localhost:2960/"

async function clickOnElement(page, selector) {
  await page.click(selector)
}

async function checkElementText(page, selector, expectedText) {
  const element = await page.$(selector)
  const actualText = await element.textContent()
  expect(actualText).toBe(expectedText)
}

test("title is correct", async ({ page }) => {
  await page.goto(homepage)
  await expect(page).toHaveTitle("Page Title")
})
