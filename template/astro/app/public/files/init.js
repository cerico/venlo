const init = (data) => {
  if (document.getElementById('date')) {
    document.getElementById('date').innerHTML = (data[0].change * new Date().getHours()).toFixed(2)
  }
}

export default init
