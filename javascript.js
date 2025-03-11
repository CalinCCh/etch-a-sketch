const squaresContainer = document.querySelector("#squares");
const squareWidth = squaresContainer.offsetWidth;
const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const changeSize = document.querySelector("#changeSize");

changeSize.addEventListener("click", function () {
  let newSize = prompt("Enter new grid size(1-100)");
  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
      makeGrid(newSize);
    } else {
      alert("Please enter a number between 1-100");
    }
  }
});

function makeGrid(size) {
  squaresContainer.innerHTML = "";
  const squareSize = squareWidth / size;
  for (let i = 0; i < size; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < size; j++) {
      let square = document.createElement("div");

      square.classList.add("square");
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;

      square.addEventListener("mouseover", (event) => {
        let rgb = randomRGB();
        square.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      });

      row.appendChild(square);
    }
    squaresContainer.appendChild(row);
  }
}

function randomRGB() {
  let rgb =[]; 

  for (let i = 0; i < 3; i++) {
    rgb[i]=Math.floor(Math.random() * 256).toString();
    
  }
  return rgb;
}

makeGrid(16);
