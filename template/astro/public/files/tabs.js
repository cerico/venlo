document.getElementById('tab-one').onclick = function(){
  document.getElementById('tab-two').classList.remove('up')
  document.getElementById('tab-three').classList.remove('up')
  document.getElementById('tab-one').classList.add('active')
  document.getElementById('tab-two').classList.remove('active')
  document.getElementById('tab-three').classList.remove('active')
}

document.getElementById('tab-two').onclick = function(){
  document.getElementById('tab-two').classList.add('up')
  document.getElementById('tab-three').classList.remove('up')
  document.getElementById('tab-one').classList.remove('active')
  document.getElementById('tab-two').classList.add('active')
  document.getElementById('tab-three').classList.remove('active')
}

document.getElementById('tab-three').onclick = function(){
  document.getElementById('tab-two').classList.add('up')
  document.getElementById('tab-three').classList.add('up')
  document.getElementById('tab-one').classList.remove('active')
  document.getElementById('tab-two').classList.remove('active')
  document.getElementById('tab-three').classList.add('active')
}