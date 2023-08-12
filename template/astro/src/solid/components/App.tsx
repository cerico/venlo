import { store } from "../store"

function Header() {
  function increment() {
    store.setScore({ ...store.score(), current: 31 })
  }
  function reset() {
    store.setScore({ ...store.score(), current: 0 })
  }
  return (
    <>
    <div onClick={increment}>Current: {store.score().current}</div>
    <button onClick={reset}>Reset</button>
    </>
  )
}

export default Header
