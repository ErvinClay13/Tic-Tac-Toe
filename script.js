const startBtn = document.getElementById("startBtn");
const player1Name = document.getElementById("player1Name"); //InputName
const player2Name = document.getElementById("player2Name"); //InputName
const displayName1 = document.getElementById("displayName1"); //P tags
const displayName2 = document.getElementById("displayName2"); //P tags
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const msgFooter = document.querySelector(".msgFooter");

function showName(val) {
  displayName1.innerHTML = val;
}

function showName2(val2) {
  displayName2.innerHTML = val2;
}

startBtn.addEventListener("click", () => {
  showName(player1Name.value);
  showName2(player2Name.value);
  section1.style.display = "none";
  section2.style.display = "block";
  msgFooter.style.display = "block";

  if (player1Name.value == "") {
    alert("Please enter a name for player 1");
    section1.style.display = "block";
    section2.style.display = "none";
    msgFooter.style.display = "none";
  } else if (player2Name.value == "") {
    alert("Please enter a name for player 2");
    section1.style.display = "block";
    section2.style.display = "none";
    msgFooter.style.display = "none";
  }
});

//Game Setup Variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

//Winning Combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//DOM Elements
const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");

//Event Listener for Cells
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

//Main Gameplay Logic
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  if (board[cellIndex] === "" && gameActive) {
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    //Checking for a Win or Draw:
    if (checkWin()) {
      messageElement.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every((cell) => cell !== "")) {
      messageElement.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageElement.textContent = `It's ${currentPlayer}'s turn`;
    }
  }
}

//Win Checking Logic
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

//Reset Function
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  messageElement.textContent = "It's X's turn";
  cells.forEach((cell) => (cell.textContent = ""));
}

function mainMenu() {
  document.getElementById("player1Name").value = "";
  document.getElementById("player2Name").value = "";
  section1.style.display = "block";
  section2.style.display = "none";
  msgFooter.style.display = "none";
}
