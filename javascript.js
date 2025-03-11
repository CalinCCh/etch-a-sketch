const squaresContainer = document.querySelector("#squares");

var slider = document.getElementById("myRange");
var output = document.getElementById("sliderValue");
var penColor = document.getElementById("colorPicker");
var rainbowCheckbox = document.getElementById("rainbowCheckbox");
var clearButton = document.getElementById("clear");

let drawingMode = false;

output.innerHTML = slider.value;


function debounce(func, wait) {
  let timeout;
  return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}



squaresContainer.addEventListener('mousedown', (e) => {
  e.preventDefault(); 
  drawingMode = true;
});

squaresContainer.addEventListener('mouseup', () => drawingMode = false);
squaresContainer.addEventListener('mouseleave', () => drawingMode = false);

function makeGrid(size) {
  squaresContainer.innerHTML = "";
  const squareWidth = getSquareWidth();
  const fragment = document.createDocumentFragment();

  squaresContainer.style.display = 'grid';
  squaresContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    let opacityValue = 0.1;
    let lastPaintTime = 0;
    const OPACITY_DELAY = 50; // Delay in milliseconds

    square.classList.add('square');
    
    const paint = () => {
      if (drawingMode) {
        const currentTime = Date.now();
        
        // Check if enough time has passed since last opacity increase
        if (currentTime - lastPaintTime >= OPACITY_DELAY) {
          if (rainbowCheckbox.checked) {
            let rgb = randomRGB();
            square.style.backgroundColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacityValue})`;
          } else {
            let colorToRgb = hexToRgb(penColor.value);
            square.style.backgroundColor = `rgba(${colorToRgb.r}, ${colorToRgb.g}, ${colorToRgb.b}, ${opacityValue})`;
          }
          opacityValue = Math.min(opacityValue + 0.1, 1);
          lastPaintTime = currentTime;
        }
      }
    };

    square.addEventListener('mousemove', paint);
    square.addEventListener('mousedown', paint); 

    fragment.appendChild(square);
  }

  squaresContainer.appendChild(fragment);
}


slider.addEventListener('input', (e) => {
  output.textContent = e.target.value;
});

slider.addEventListener('change', (e) => {
  makeGrid(parseInt(e.target.value));
});


clearButton.addEventListener("click", () => {
  makeGrid(parseInt(slider.value));
});

function randomRGB() {
  let rgb = [];

  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(Math.random() * 256).toString();
  }
  return rgb;
}

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16).toString();
  const g = parseInt(hex.slice(3, 5), 16).toString();
  const b = parseInt(hex.slice(5, 7), 16).toString();
  
  return { r, g, b };
}

function getSquareWidth() {
  return squaresContainer.clientWidth;
}



makeGrid(16);