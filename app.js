const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = "black";
playerDisplay.textContent = "black";

const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];
console.log(startPieces);
function createBoard() {
  startPieces.forEach((startPiece, index) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    square.firstChild?.setAttribute("draggable", true);
    square.setAttribute("square-id", index);
    // square.classList.add("beige");
    const row = Math.floor((63 - index) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(index % 2 === 0 ? "beige" : "brown");
    } else {
      square.classList.add(index % 2 == !0 ? "beige" : "brown");
    }
    if (index <= 15) {
      square.firstChild.firstChild.classList.add("black");
    }
    if (index >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }
    gameBoard.append(square);
  });
}
createBoard();

const allSquares = document.querySelectorAll(".square");

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();
  const correctGo = draggedElement.firstChild.classList.contains(playerGo);
  const occupied = e.target.classList.contains("piece");
  const opponent = playerGo === "white" ? "black" : "white";
  const occupByOpponent = e.target.firstChild?.classList.contains(opponent);
  //   console.log(occupByOpponent);
  const valid = checkIfValid(e.target, occupByOpponent);
  if (correctGo) {
    // must check this first
    if (occupByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer;
      return;
    }
    // then check this
    if (occupied && !occupByOpponent) {
      infoDisplay.textContent = "Hola, you cant take you own piece";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      changePlayer();
      return;
    }
  }
  //   e.target.parentNode.append(draggedElement);
  //   e.target.remove();
  //   e.target.append(draggedElement);
  changePlayer();
}

function changePlayer() {
  if (playerGo === "black") {
    reverseIds();
    playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    playerGo = "black";
    playerDisplay.textContent = "black";
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) =>
    square.setAttribute("square-id", width * width - 1 - i)
  );
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}

function checkIfValid(target, occup) {
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPositionId);
  const piece = draggedElement.id;
  //   console.log(targetId);
  //   console.log(startId);
  const ocup = occup;
  //   console.log(occup);

  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId
        // ||
        // (startId + width + 1 === targetId && occup) ||
        // startId + width - 1 === targetId
      ) {
        console.log(ocup);
        return true;
      }
  }
}
