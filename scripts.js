let mainBox = document.getElementById('main-box');
let colorWell = document.getElementById('colorwell');
let curSize = document.getElementById('cur-size');

let drawing;

defaultSize = 16;
color = '#000000'

curSize.textContent = `${defaultSize}x${defaultSize}`;

colorWell.addEventListener('input', function () {
  color = colorWell.value;
})

drawGrid(defaultSize);

function drawGrid(size) {
  att = document.createAttribute("style")
  att.value = `grid-template-columns: repeat(${size}, auto)`
  mainBox.setAttributeNode(att);


  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      colorBox = document.createElement('div');
      colorBox.setAttribute('class','small-box');
      mainBox.appendChild(colorBox)
      }
    }

  let colorBoxes = document.getElementsByClassName('small-box');
  for (const box of colorBoxes){
    box.addEventListener('mousedown', function () {
      drawing = true;
    });
    box.addEventListener('mouseup', function () {
      if (drawing){
        drawing = false;
      }
    });
    box.addEventListener('mousemove', function () {
      if (drawing){
        box.style.backgroundColor=color;
      }
    });
  }
}

function changeSize() {
  newSize = parseInt(prompt('Pick a new size', '16'));
  if (newSize != null && !isNaN(newSize)){
    if (newSize > 100){
      alert('Maximum size is 100');
    }
    else{
      while (mainBox.hasChildNodes()) {
        mainBox.removeChild(mainBox.firstChild);
      }
      drawGrid(newSize)
      curSize.textContent = `${newSize}x${newSize}`;
    }
  }
  else {
    alert('A number is required');
  }
}
