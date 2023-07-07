import { store } from "../store"

function Header() {
  function increment() {
    store.setScore({ ...store.score(), current: 31 })
  }
  return (
    <span onClick={increment}>{store.score().current}</span>
  )
}

export default Header
