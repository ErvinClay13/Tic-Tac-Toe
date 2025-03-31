// Get DOM elements for player inputs and display areas
const startBtn = document.getElementById("startBtn");
const player1Name = document.getElementById("player1Name"); // Input field for Player 1 name
const player2Name = document.getElementById("player2Name"); // Input field for Player 2 name
const displayName1 = document.getElementById("displayName1"); // Display Player 1 name in game UI
const displayName2 = document.getElementById("displayName2"); // Display Player 2 name in game UI
const section1 = document.querySelector(".section1"); // Section for name inputs
const section2 = document.querySelector(".section2"); // Game board section
const msgFooter = document.querySelector(".msgFooter"); // Footer message area

// Update the displayed name for Player 1
function showName(val) {
  displayName1.innerHTML = val;
}

// Update the displayed name for Player 2
function showName2(val2) {
  displayName2.innerHTML = val2;
}

// Start game when "Start" button is clicked
startBtn.addEventListener("click", () => {
  showName(player1Name.value);
  showName2(player2Name.value);
  section1.style.display = "none";
  section2.style.display = "block";
  msgFooter.style.display = "block";

  // Validation: Check if player names are provided
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

// Game setup variables
let board = ["", "", "", "", "", "", "", "", ""]; // Tic Tac Toe board
let currentPlayer = "X"; // Start with Player X
let gameActive = true; // Flag to control game state

// All possible winning combinations (rows, columns, diagonals)
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Get all the individual cells on the game board
const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");

// Add event listener to each cell
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// Handle a cell click during the game
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  // Only allow click if the cell is empty and the game is active
  if (board[cellIndex] === "" && gameActive) {
    board[cellIndex] = currentPlayer; // Update board array
    event.target.textContent = currentPlayer; // Show symbol on UI

    // Check if current move wins the game
    if (checkWin()) {
      messageElement.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } 
    // Check if it's a draw (no empty cells left)
    else if (board.every((cell) => cell !== "")) {
      messageElement.textContent = "It's a draw!";
      gameActive = false;
    } 
    // Switch to next player
    else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageElement.textContent = `It's ${currentPlayer}'s turn`;
    }
  }
}

// Check if the current player has a winning combination
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Reset the game state and board UI
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""]; // Reset board array
  currentPlayer = "X"; // Set player X to start
  gameActive = true; // Enable game again
  messageElement.textContent = "It's X's turn"; // Update UI message
  cells.forEach((cell) => (cell.textContent = "")); // Clear all cells
}

// Return to the main menu and clear input fields
function mainMenu() {
  document.getElementById("player1Name").value = "";
  document.getElementById("player2Name").value = "";
  section1.style.display = "block";   // Show input section
  section2.style.display = "none";    // Hide game board
  msgFooter.style.display = "none";   // Hide footer
}
