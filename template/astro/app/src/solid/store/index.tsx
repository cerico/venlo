import { createSignal } from "solid-js"
import type { Score } from "../types"

const defaultScore = { current: 0, top: 0 }

const [score, setScore] = createSignal<Score>(defaultScore)

export const store = {
  score,
  setScore
}
