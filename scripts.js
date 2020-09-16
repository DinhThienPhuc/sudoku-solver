const initData = {
  "1-4": 7,
  "2-1": 1,
  "3-4": 4,
  "3-5": 3,
  "3-7": 2,
  "4-9": 6,
  "5-4": 5,
  "5-6": 9,
  "6-7": 4,
  "6-8": 1,
  "6-9": 8,
  "7-5": 8,
  "7-6": 1,
  "8-3": 2,
  "8-8": 5,
  "9-2": 4,
  "9-7": 3,
};

const SQUARES = {
  FIRST: ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3"],
  SECOND: ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"],
  THIRD: ["1-7", "1-8", "1-9", "2-7", "2-8", "2-9", "3-7", "3-8", "3-9"],
  FOURTH: ["4-1", "4-2", "4-3", "5-1", "5-2", "5-3", "6-1", "6-2", "6-3"],
  FIFTH: ["4-4", "4-5", "4-6", "5-4", "5-5", "5-6", "6-4", "6-5", "6-6"],
  SIXTH: ["4-7", "4-8", "4-9", "5-7", "5-8", "5-9", "6-7", "6-8", "6-9"],
  SEVENTH: ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3"],
  EIGHTH: ["7-4", "7-5", "7-6", "8-4", "8-5", "8-6", "9-4", "9-5", "9-6"],
  NINTH: ["7-7", "7-8", "7-9", "8-7", "8-8", "8-9", "9-7", "9-8", "9-9"],
};

const SQUARE_KEYS = Object.keys(SQUARES);

const ORIGIN = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const popValue = (arr = [], val) => arr.filter((el) => el !== val);

const getSquareItIn = (coordinate) => {
  const squareKeys = Object.keys(SQUARES);
  const arr = squareKeys.filter((key) => SQUARES[key].includes(coordinate));
  return arr[0];
};

const getPossibilities = (currentData, cellRow, cellCol) => {
  let currentPossible = [...ORIGIN];
  const coordinate = `${cellRow}-${cellCol}`;

  ORIGIN.map((num) => {
    const itemCoordinateInRow = `${cellRow}-${num}`;
    const itemCoordinateInColumn = `${num}-${cellCol}`;
    if (Number.isInteger(currentData[itemCoordinateInRow])) {
      currentPossible = popValue(
        currentPossible,
        currentData[itemCoordinateInRow]
      );
    }
    if (Number.isInteger(currentData[itemCoordinateInColumn])) {
      currentPossible = popValue(
        currentPossible,
        currentData[itemCoordinateInColumn]
      );
    }
  });

  const squareName = getSquareItIn(coordinate);
  SQUARES[squareName].map((coor) => {
    if (Number.isInteger(currentData[coor])) {
      currentPossible = popValue(currentPossible, currentData[coor]);
    }
  });

  let newPosible = [];
  currentPossible.map((possibleValue) => {
    let flag = true;
    SQUARES[squareName].map((coor) => {
      if (
        Array.isArray(currentData[coor]) &&
        currentData[coor].includes(possibleValue)
      ) {
        flag = false;
      }
    });

    if (flag === true) {
      newPosible.push(possibleValue);
    }
  });
  console.log("new possible: ", coordinate, " -- ", newPosible);
  // currentPossible = newPosible.length ? newPosible : currentPossible;

  return currentPossible;
};

const fillDomNode = (currentData) => {
  const keys = Object.keys(currentData);
  keys.map((coordinate) => {
    if (Number.isInteger(currentData[coordinate])) {
      const selector = `.dom-${coordinate}`;
      document.querySelector(selector).innerText = currentData[coordinate];
    }
  });
};

const track = (currentData) => {
  console.log("Tracking ...");
  let tempData = { ...currentData };

  ORIGIN.map((row) => {
    ORIGIN.map((col) => {
      const coordinate = `${row}-${col}`;
      if (!Number.isInteger(tempData[coordinate])) {
        tempData[coordinate] = getPossibilities(tempData, row, col);
      }
    });
  });

  return tempData;
};

let currentData = { ...initData };
const solveStep = () => {
  const data = track(currentData);
  console.log("Data after tracking: ", data);
  fillDomNode(data);
  currentData = data;
};

const main = () => {
  console.log("Main context");

  const coordinates = Object.keys(initData);
  coordinates.map((coordinate) => {
    const selector = `.dom-${coordinate}`;
    const domNote = document.querySelector(selector);
    domNote.innerText = initData[coordinate];
    domNote.classList.add("default");
  });

  document
    .querySelector(".dom-btn-solve-step")
    .addEventListener("click", solveStep);
};

document.addEventListener("DOMContentLoaded", main);
