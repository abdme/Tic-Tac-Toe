let board = [null, null, null, null, null, null, null, null, null];
let turn;
let index;
let movePlaced = false;
let lastIndex;
let outcome = false;
const status = document.querySelector(".status");
const results = document.querySelector(".js-results");

const startBtn = document.querySelector(".js-start");
startBtn.addEventListener("click", () => {
  if (startBtn.classList.contains("js-start")) {
    start();
  } else if (startBtn.classList.contains("js-stop")) {
    stop();
  }
});

function currentMove() {
  if (turn == undefined) {
    const pick = Math.random();
    if (pick < 1 / 2) {
      turn = "O";
      status.innerHTML = "Computer gets the first Pick";
    } else {
      turn = "X";
      status.innerHTML = "Users gets the first Pick";
    }
  }
  resultCheck();
  if (turn == "X" && outcome == false) {
    resultCheck();
    status.innerHTML = "Your Turn!";
  } else if (turn == "O" && outcome == false) {
    resultCheck();
    status.innerHTML = "Computers Turn";
    setTimeout(() => computerMove(), 2000);
  }
}
function userMove(index) {
  index = parseInt(index);
  if (board[index] != null && turn == "X") {
    status.innerHTML = "This box already taken, Try Again!";
  } else {
    board[index] = "X";
    const box = document.querySelector(`.cell[data-index="${index}"]`);
    box.innerHTML = "X";
    lastIndex = board[index];
    turn = "O";
    checkStatus();
  }
}

function computerMove() {
  movePlaced = false;
  while (!movePlaced) {
    index = Math.floor(Math.random() * 9);
    if (board[index] === null) {
      board[index] = "O";
      movePlaced = true;
      const box = document.querySelector(`.cell[data-index="${index}"]`);
      box.innerHTML = "O";
      turn = "X";
      lastIndex = board[index];
    }
  }
  checkStatus();
}

function start() {
  const cell = document.querySelectorAll(".cell");
  cell.forEach((cell) => {
    cell.addEventListener("click", () => userMove(cell.dataset.index));
  });
  currentMove();
  startBtn.innerHTML = "Stop";
  startBtn.classList.add("js-stop");
  startBtn.classList.remove("js-start");
  const boardUI = document.querySelector("#board");
  boardUI.classList.remove("pointer-events-none");
}

function stop() {
  status.innerHTML = "Game has been Stopped";
  setTimeout(() => {
    status.innerHTML = "";
  }, 1000);
  outcome = true;
  resultCheck();
  const boardUI = document.querySelector("#board");
  boardUI.classList.add("pointer-events-none");
  startBtn.innerHTML = "Start";
  startBtn.classList.remove("js-stop");
  startBtn.classList.add("js-start");
}

function checkStatus() {
  let foundEmpty;
  for (let i = 0; i < board.length; i++) {
    foundEmpty = false;
    if (board.includes(null) && outcome == false) {
      currentMove();
      foundEmpty = true;
      break;
    }
  }
  if (!foundEmpty && outcome == false) {
    results.innerHTML = "Its a Draw 😐";
    results.classList.add("text-blue-400");
  }
}

function resultCheck() {
  if (
    (board[0] !== null && board[0] === board[1] && board[1] === board[2]) || // Row 1
    (board[3] !== null && board[3] === board[4] && board[4] === board[5]) || // Row 2
    (board[6] !== null && board[6] === board[7] && board[7] === board[8]) || // Row 3
    (board[0] !== null && board[0] === board[3] && board[3] === board[6]) || // Col 1
    (board[1] !== null && board[1] === board[4] && board[4] === board[7]) || // Col 2
    (board[2] !== null && board[2] === board[5] && board[5] === board[8]) || // Col 3
    (board[0] !== null && board[0] === board[4] && board[4] === board[8]) || // Diagonal ↘
    (board[2] !== null && board[2] === board[4] && board[4] === board[6]) // Diagonal ↙
  ) {
    const result = document.querySelector(".result");
    outcome = true;
    const board = document.querySelector("#board");
    board.classList.add("pointer-events-none");
    const stopBtn = document.querySelector(".js-stop");
    stopBtn.innerHTML = "Start";
    stopBtn.classList.add("js-start");
    stopBtn.classList.remove("js-stop");

    if (lastIndex == "X") {
      status.innerHTML = "";
      results.innerHTML = "You Won the game!!! ✨";
      results.classList.add("text-yellow-400 animate-pulse drop-shadow-lg");
    } else if (lastIndex == "O") {
      status.innerHTML = "";
      results.innerHTML = "You Lost!! 😔";
      results.classList.add("text-gray-500 opacity-70");
    }
  }
}

function reset() {
  if (turn !== undefined) {
    board = [null, null, null, null, null, null, null, null, null];
    const result = document.querySelector(".result");
    result.innerHTML = "";
    status.innerHTML = "Game has been Rest";
    setTimeout(() => {
      status.innerHTML = "";
    }, 1500);
    const boardUI = document.querySelector("#board");
    boardUI.classList.remove("pointer-events-none");
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
    results.innerHTML = "";
    const startBtn = document.querySelector(".js-start");
    startBtn.innerHTML = "Start";
  }
}

const resetBtn = document.querySelector(".js-reset");
resetBtn.addEventListener("click", () => reset());
