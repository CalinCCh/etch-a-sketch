const squaresContainer = document.querySelector("#squares");


        


function makeRowsAndColumns(size) {
    for (let i = 0; i <size; i++) {
        let row = document.createElement("div");
        for (let j = 0; j<size; j++) { 
            let square = document.createElement("div");
            square.style.border="1px solid black";
            square.style.padding="20px";
            square.style.boxSizing = "border-box";
            row.appendChild(square);
        }
        squaresContainer.appendChild(row);
    }
}



makeRowsAndColumns(16);

