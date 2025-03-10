const squaresContainer = document.querySelector("#squares");
const squareWidth = squaresContainer.offsetWidth;

const changeSize = document.querySelector("#changeSize");

changeSize.addEventListener("click", function () {
  let newSize = prompt("Enter new grid size(1-100)");
  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
      makeRowsAndColumns(newSize);
    } else {
      alert("Please enter a number between 1-100");
    }
  }
});

function makeRowsAndColumns(size) {
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
        square.style.backgroundColor = "red";
      });

      row.appendChild(square);
    }
    squaresContainer.appendChild(row);
  }
}

makeRowsAndColumns(16);
