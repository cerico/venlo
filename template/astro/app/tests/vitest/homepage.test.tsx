import { render, screen, fireEvent } from "@solidjs/testing-library"
import App from "../../src/solid/components/App"

const PageTitle = "AppName"

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2)
  expect(Math.sqrt(144)).toBe(12)
  expect(Math.sqrt(2)).toBe(Math.SQRT2)
})

test("JSON", () => {
  const input = {
    foo: "hello",
    bar: "world"
  }

  const output = JSON.stringify(input)

  expect(output).eq('{"foo":"hello","bar":"world"}')
  assert.deepEqual(JSON.parse(output), input, "matches original")
})

describe("App", () => {
  it("should mount and click", async () => {
    render(() => <App />)
    const button = (screen.getByText(0)) as HTMLButtonElement
    expect(button).toBeVisible()
    fireEvent.click(button)
    const countText = await screen.findByText(31)
    expect(countText).toBeVisible()
    const increment = (screen.getByText('Reset')) as HTMLButtonElement
    expect(increment).toBeVisible()
    fireEvent.click(increment)
    const zeroText = await screen.findByText(0)
    expect(zeroText).toBeVisible()
  })
})
