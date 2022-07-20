const init = (data) => {
  console.log(data[0].change * new Date().getHours())
  document.getElementById('date').innerHTML = (data[0].change * new Date().getHours()).toFixed(2)
}

export default init
