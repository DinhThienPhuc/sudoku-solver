const INIT_DATA = {
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

const LENGTH = ORIGIN.length;

// ----------------------------------------------------------------------------
const popValue = (arr = [], val) => arr.filter((el) => el !== val);

const getSquareItIn = (coordinate) => {
  const squareKeys = Object.keys(SQUARES);
  const arr = squareKeys.filter((key) => SQUARES[key].includes(coordinate));
  return arr[0];
};

const isNumber = (val) => Number.isInteger(val);

const isArray = (val) => Array.isArray(val);

const getDifference = (array1, array2) =>
  array1.filter((x) => !array2.includes(x));

// ----------------------------------------------------------------------------

const getPossibilities = (currentData, cellRow, cellCol) => {
  const coordinate = `${cellRow}-${cellCol}`;
  let currentPossible = [...currentData[coordinate]];

  for (let axis = 1; axis <= LENGTH; axis++) {
    const itemCoordinateInRow = `${cellRow}-${axis}`;
    const itemCoordinateInColumn = `${axis}-${cellCol}`;

    if (
      itemCoordinateInRow !== coordinate &&
      isNumber(currentData[itemCoordinateInRow])
    ) {
      currentPossible = popValue(
        currentPossible,
        currentData[itemCoordinateInRow]
      );
    }

    if (
      itemCoordinateInColumn !== coordinate &&
      isNumber(currentData[itemCoordinateInColumn])
    ) {
      currentPossible = popValue(
        currentPossible,
        currentData[itemCoordinateInColumn]
      );
    }
  }

  const squareName = getSquareItIn(coordinate);
  const squareCoordinates = SQUARES[squareName];

  squareCoordinates.map((coor) => {
    if (isNumber(currentData[coor])) {
      currentPossible = popValue(currentPossible, currentData[coor]);
    }
  });

  return currentPossible.length === 1 ? currentPossible[0] : currentPossible;
};

const guess = (currentData) => {
  let tempData = { ...currentData };

  for (let row = 1; row <= LENGTH; row++) {
    for (let col = 1; col <= LENGTH; col++) {
      const trackCellCoordinate = `${row}-${col}`;
      const squareName = getSquareItIn(trackCellCoordinate);
      const squareCoordinates = SQUARES[squareName];

      if (trackCellCoordinate === "2-6") {
        // console.log("predict: ", newPossible);
        // console.log("current data: ", currentData["2-6"]);
      }

      if (isNumber(currentData[trackCellCoordinate])) {
        continue;
      }

      let newPossible = currentData[trackCellCoordinate];
      squareCoordinates.map((coor) => {
        if (coor !== trackCellCoordinate && isArray(currentData[coor])) {
          newPossible = getDifference(newPossible, currentData[coor]);
        }
      });

      // if (trackCellCoordinate === "1-6") {
      //   console.log(
      //     `Square ${squareName} - Possibilities of ${trackCellCoordinate} -- ${newPossible}`
      //   );
      // }

      // if (trackCellCoordinate === "2-6") {
      //   console.log(
      //     `Square ${squareName} - Possibilities of ${trackCellCoordinate} -- ${newPossible}`
      //   );
      // }

      tempData[trackCellCoordinate] =
        newPossible.length === 1
          ? newPossible[0]
          : currentData[trackCellCoordinate];
    }
  }

  return tempData;
};

const fillResult = (currentData) => {
  for (let row = 1; row <= LENGTH; row++) {
    for (let col = 1; col <= LENGTH; col++) {
      const coordinate = `${row}-${col}`;

      if (coordinate === "2-6") {
        // console.log("predict: ", newPossible);
        // console.log("filling: ", currentData[coordinate]);
      }

      if (!isNumber(currentData[coordinate])) {
        continue;
      }

      const selector = `.dom-${coordinate}`;

      if (!document.querySelector(selector).innerText) {
        document.querySelector(selector).innerText = currentData[coordinate];
      }
    }
  }
};

const track = (currentData) => {
  console.log("Tracking ...");
  let tempData = { ...currentData };

  for (let row = 1; row <= LENGTH; row++) {
    for (let col = 1; col <= LENGTH; col++) {
      const trackCellCoordinate = `${row}-${col}`;

      if (isNumber(tempData[trackCellCoordinate])) {
        continue;
      }

      tempData[trackCellCoordinate] = getPossibilities(currentData, row, col);
      if (trackCellCoordinate === "2-6") {
        // console.log("Co le nao ...: ", tempData[trackCellCoordinate]);
      }
    }
  }

  return tempData;
};

const init = (initData) => {
  const temp = { ...initData };
  for (let row = 1; row <= LENGTH; row++) {
    for (let col = 1; col <= LENGTH; col++) {
      const coordinate = `${row}-${col}`;
      temp[coordinate] = initData[coordinate] || [...ORIGIN];
    }
  }
  return temp;
};

let currentData = init(INIT_DATA);

const solveStep = () => {
  console.log("Before: ", currentData);
  let data = track(currentData);
  data = guess(data);
  console.log("After: ", data);
  fillResult(data);
  currentData = { ...data };
};

const main = () => {
  console.log("Main context");

  const coordinates = Object.keys(INIT_DATA);
  coordinates.map((coordinate) => {
    const selector = `.dom-${coordinate}`;
    const domNote = document.querySelector(selector);
    domNote.innerText = INIT_DATA[coordinate];
    domNote.classList.add("default");
  });

  document
    .querySelector(".dom-btn-solve-step")
    .addEventListener("click", solveStep);
};

document.addEventListener("DOMContentLoaded", main);
