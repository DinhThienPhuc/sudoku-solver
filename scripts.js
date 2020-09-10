const initData = {
  "1-1": 2,
  "1-2": 4,
  "1-3": 9,
  "1-5": 7,
  "1-6": 6,
  "2-1": 8,
  "2-2": 3,
  "2-8": 6,
  "2-9": 9,
  "3-6": 9,
  "3-7": 5,
  "3-8": 2,
  "4-1": 3,
  "4-2": 6,
  "4-4": 2,
  "4-5": 4,
  "4-8": 5,
  "5-2": 9,
  "5-5": 5,
  "5-7": 4,
  "5-8": 1,
  "6-2": 5,
  "6-3": 4,
  "6-4": 6,
  "6-8": 3,
  "7-2": 1,
  "7-3": 6,
  "7-4": 9,
  "7-7": 2,
  "7-9": 8,
  "8-3": 7,
  "8-4": 1,
  "8-5": 6,
  "8-6": 8,
  "8-9": 5,
  "9-1": 9,
  "9-6": 5,
  "9-9": 1,
};

const ORIGIN = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const pridictable = {};

const popValue = (arr = [], val) => arr.filter((el) => el !== val);

const initPossibilities = () => {
  const pridictable = {};
  ORIGIN.map((row) => {
    ORIGIN.map((col) => {
      const coordinate = `${row}-${col}`;
      if (!initData[coordinate]) {
        // Empty box.
        pridictable[coordinate] = [...ORIGIN];
      }
    });
  });
  return pridictable;
};

const init = () => {
  console.log("Init data");
  const coordinates = Object.keys(initData);
  coordinates.map((coordinate) => {
    const selector = `.dom-${coordinate}`;
    const domNote = document.querySelector(selector);
    domNote.innerText = initData[coordinate];
    domNote.classList.add("default");
  });
};

const solve = () => {
  console.log("Solving problem ...");
};

const main = () => {
  console.log("Main context");

  document.querySelector(".dom-btn-init").addEventListener("click", init);
  document.querySelector(".dom-btn-solve").addEventListener("click", solve);
};

document.addEventListener("DOMContentLoaded", main);
