const init = (data) => {
  if (document.getElementById('date')) {
    document.getElementById('date').innerHTML = (data[0].change * new Date().getHours()).toFixed(2)
  }
}

document.getElementById('draw-is-closed').onclick = function(){
  document.body.classList.add("openmenu");
}

document.getElementById('draw-is-open').onclick = function(){
 document.body.classList.remove("openmenu");
}

export default init
