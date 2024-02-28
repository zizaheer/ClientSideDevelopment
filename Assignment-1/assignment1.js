/**
 * Developer: Kazi Islam
 * Assignment 1
 */

const gridContainer = document.querySelector("#gridContainer");
const btnGridLength = document.getElementById("btnGridLength");
const inputRangeSlider = document.getElementById("inputRangeSlider");
const lblGridSize = document.getElementById("lblGridLength");
const lblGridSizeRepeat = document.getElementById("lblGridLengthRepeat");
const btnCreateGrid = document.getElementById("btnCreateGrid");
const btnClearGrid = document.getElementById("btnClearGrid");

let gridDivs = [];
let defaultGridSize = 10;

//#region Private functions
let enterLengthManually = () => {
  let gridLength = prompt("Please enter the grid length");
  if (isPositiveInteger(gridLength)) {
    if (isNumberWithinRange(parseInt(gridLength), 1, 10)) {
      //console.log(gridLength);
      lblGridSize.textContent = gridLength;
      lblGridSizeRepeat.textContent = gridLength;
      inputRangeSlider.value = gridLength;
    } else {
      alert("Please enter a number between 1 to 10");
    }
  } else {
    alert("Please enter a valid number between 1 to 10");
  }
};

let changeLabel = () => {
  lblGridSize.textContent = inputRangeSlider.value;
  lblGridSizeRepeat.textContent = inputRangeSlider.value;
};

function cleanGrid() {
  gridContainer.replaceChildren();
}

// this checks if the number falls between a min and max range
function isNumberWithinRange(number, min, max) {
  return number >= min && number <= max;
}

// finds any value is a positive ineteger or not
function isPositiveInteger(anyValue) {
  if (isNaN(anyValue)) return false;
  let number = Number(anyValue);
  if (!Number.isInteger(number)) return false; // checks for integer
  if (number < 0) return false;
  return true;
}

// this function captures the grid area and reset sizes of grid square
function setGridContainerArea() {
  gridContainer.style.height = `${gridContainer.clientWidth}px`;

  if (gridDivs.length > 0) {
    gridDivs.forEach((element) => {
      element.style.width =
        gridContainer.clientWidth / parseInt(lblGridSize.textContent) -
        1 +
        "px";
      element.style.height = element.style.width;
    });
  }
}

// this function validates the length of the grid and create the grid
function createGrid(gridLength) {
  // 1px deducted due to border occupancy
  let gridBoxWidth = gridContainer.clientWidth / gridLength - 1;
  const table = document.createElement("table");
  for (let i = 1; i <= gridLength; i++) {
    const tr = document.createElement("tr");
    for (let j = 1; j <= gridLength; j++) {
      const td = document.createElement("td");
      const text = document.createTextNode(`${i}x${j}`);
      td.appendChild(text);
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

//#endregion

//#region Event handling

// Event handler when user enters the grid length manually
btnGridLength.addEventListener("click", enterLengthManually);

// Event handler when user enters the grid length with input range slider
inputRangeSlider.addEventListener("input", changeLabel); // this may not work on IE
inputRangeSlider.addEventListener("change", changeLabel); // this should work on IE as well

btnCreateGrid.addEventListener("click", function () {
  let gridLength = parseInt(lblGridSize.textContent);
  if (gridLength === 0) {
    alert("Please enter a valid grid length between 1 to 10");
    return;
  }
  cleanGrid();
  createGrid(gridLength);
});
//btnCreateGrid.addEventListener("click", createDynamicTable);

btnClearGrid.addEventListener("click", cleanGrid);

window.addEventListener("resize", setGridContainerArea);
window.addEventListener("load", setGridContainerArea);

//#endregion
