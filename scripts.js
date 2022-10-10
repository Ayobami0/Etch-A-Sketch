let mainBox = document.getElementById('main-box');
let colorWell = document.getElementById('colorwell');
let curSize = document.getElementById('gridsize');

let drawing;

let normalMode = true;
let rainbowMode = false;

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
        if (rainbowMode){
          box.style.backgroundColor = rainbow();
        }
        else if (normalMode){
          box.style.backgroundColor=color;
        }
      }
    });
  }
}

function changeSize() {
  let newSize = parseInt(prompt('Pick a new size', '16'));
  if (newSize != null && !isNaN(newSize)){
    if (newSize > 64){
      alert('Maximum grid size is 64 by 64');
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
function toggleRainbowMode() {
  if (normalMode){
    normalMode = false;
  }
  rainbowMode = true;
}

function toggleNormalMode() {
  if (rainbowMode){
    rainbowMode = false;
  }
  normalMode = true;
}

function rainbow() {
  const colors = [
    //ROYGBIV
    'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
  ]
  return colors[Math.floor(Math.random()*colors.length)]
}

function reset() {
  for (const item of document.getElementsByClassName('small-box')){
    item.style.backgroundColor = '#fff'
  };
}
