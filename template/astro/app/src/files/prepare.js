import raw from '../data/data.json'

const prepareData = (e) => {
  return e.map(e => {
    return {
      city: e.city,
      change: (((e.y2022 - e.y2017) / e.y2017) * 100).toFixed(2)
    }
  })
}
const data = prepareData(raw)

export default data
