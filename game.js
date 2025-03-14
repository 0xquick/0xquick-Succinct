// Set initial values on page load
import { generate_proof } from "./pkg/sp1_wasm.js";

const gameContainer = document.getElementById("gameContainer");
const board = document.getElementById("board");
const mineCountDisplay = document.getElementById("mineCount");
const timerDisplay = document.getElementById("timerID");

let size = 8;
let mineCount = 10;
let cells = [];
let mines = new Set();
let gameOver = false;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

// localStorage.setItem("stars", 0);
// localStorage.setItem("balance", 13.00);  // Set balance to 13.00 if not already set

// Initial values
let stars = parseFloat(localStorage.getItem("stars")) || 0; // Defaults to 0 if no value is found

let balance = parseFloat(localStorage.getItem("balance")) || 13.0; // Defaults to 0.0 if no value is found


// Function to update display
// function updateDisplay() {
//     console.log("starsText");
//     if (window.opener) {
//         console.log("starsText");
//         // Access the parent window (index.html)
//         var starsText = window.opener.document.getElementById('stars');
//         starsText.innerText = stars;
//         var balanceText = window.opener.document.getElementById('balance');
//         balanceText.innerText = balance.toFixed(2) + " Credits";
//       }
// }

// Function to "prove" something and update values
function proveSomething() {
    if (balance >= 0.1) { // Ensure enough balance
        let score = calculateScore();
        stars += (score*0.01);
        stars = Math.round(stars);
        console.log(stars)

        balance -= 0.1;
        balance = balance.toFixed(2);
        localStorage.setItem("stars", stars);
        localStorage.setItem("balance", balance);

        // updateDisplay();
    } else {
        alert("Not enough balance to prove!");
    }
}




function setDifficulty(level) {
    if (!gameOver) {
    localStorage.setItem('lastDifficulty', level);
    document.querySelectorAll('.difficulty').forEach(el => el.classList.remove('active'));
    const difficultyButton = document.getElementById(level);
    if (difficultyButton) {
        difficultyButton.classList.add('active');
    }

    if (level === "beginner") {
        size = 8;
        mineCount = 5;
    } else if (level === "intermediate") {
        size = 9;
        mineCount = 10;
    } else {
        size = 10;
        mineCount = 15;
    }
    resetGame();
    }
}

function resetGame() {
    gameOver = false;
    gameStarted = false;
    clearInterval(timerInterval);
    timer = 0;
    timerDisplay.textContent = "000";
    createBoard();
}

function restartGame() {
    // Remove game over popup if it exists
    const popup = document.getElementById("gameOverPopup");
    if (popup) popup.remove();
    gameOver = false;
    gameStarted = false;
    clearInterval(timerInterval);
    timer = 0;
    timerDisplay.textContent = "000";
    createBoard();
    gameOver = false;
    gameStarted = false;
    clearInterval(timerInterval);
    timer = 0;
    timerDisplay.textContent = "000";
    setDifficulty(difficulty);
    createBoard();
}

function calculateScore() {
    if (gameStarted === false) {
        showGameOverPopup(0);
        return 0;
    }
    let safeTilesRevealed = document.querySelectorAll(".cell.revealed").length;
    let difficultyBonus = size === 8 ? 50 : size === 12 ? 100 : 200;
    let score = (safeTilesRevealed * 10) - (timer * 2) + difficultyBonus;
    showGameOverPopup(score);
    return score;
}

// function showGameOverPopup(score) {
//     gameOver = true;
//     gameContainer.style.color = "#fae1eb" ;
//     const popup = document.createElement("div");
//     popup.id = "gameOverPopup";
//     popup.style.position = "absolute";
//     // popup.style.top = "50%";
//     popup.style.left = "50%";
//     popup.style.transform = "translate(-50%, -50%)";
//     popup.style.background = "#fff";
//     popup.style.color = "#e91e63";
//     popup.style.padding = "30px";
//     // popup.style.borderRadius = "15px";
//     // popup.style.boxShadow = "0px 4px 20px rgba(233, 30, 99, 0.3)";
//     popup.style.textAlign = "center";
//     // popup.style.width = "350px";
//     popup.style.maxWidth = "100%";
//     // popup.style.width = "max-content"
//     popup.style.fontFamily = "Arial, sans-serif";
//     popup.style.fontSize = "1.5em";
//     popup.innerHTML = `
//         <h3 style='color: #e91e63; font-size: 1.5em; font-weight: bold; margin-bottom: 10px;'>Game Over!</h3>
//         <p style='color: #333; font-size: 1em; font-weight: bold;'>Your Score: ${score}</p>
//         <button id='confirmScore' style="margin-top:15px;padding:12px 25px;background:#f06292;color:#fff;border:none;border-radius:20px;cursor:pointer;font-size:0.8em;font-weight:bold;">CONFIRM SCORE</button>
//         <br>
//         <button id='restartButton' style="margin-top:10px;padding:10px 20px;background:#d81b60;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:0.8em;font-weight:bold;">Try Again</button>
//         <br>
//         <button id='shareButton' style="margin-top:10px;padding:10px 20px;background:transparent;color:#e91e63;border:2px solid #e91e63;border-radius:10px;cursor:pointer;font-size:0.8em;font-weight:bold;">Share on X</button>
//     `;
//     board.appendChild(popup);
//     document.getElementById('confirmScore').addEventListener('click', () => showConfirmScorePopup(score));
//     document.getElementById('restartButton').addEventListener('click', restartGame);
//     document.getElementById('shareButton').addEventListener('click', () => alert('Shared on X!'));
// }
// function showGameOverPopup(score) {
//     gameOver = true;

//     // Remove existing popup if it exists
//     const existingPopup = document.getElementById("gameOverPopup");
//     if (existingPopup) existingPopup.remove();

//     // Create Game Over Popup
//     const popup = document.createElement("div");
//     popup.id = "gameOverPopup";

//     // Set inner HTML structure
//     popup.innerHTML = `
//         <h3>Game Over!</h3>
//         <p>Your Score: <strong>${score}</strong></p>
//         <button id="confirmScore">CONFIRM SCORE</button>
//         <button id="restartButton">Try Again</button>
//         <button id="shareButton">Share on X</button>
//     `;

//     board.appendChild(popup);

//     // Add event listeners
//     document.getElementById("confirmScore").addEventListener("click", () => showConfirmScorePopup(score));
//     document.getElementById("restartButton").addEventListener("click", restartGame);
//     document.getElementById("shareButton").addEventListener("click", () => alert(`Shared score: ${score} on X!`));
// }
function showGameOverPopup(score) {
    gameOver = true;

    // Remove existing popup if it exists
    const existingPopup = document.getElementById("gameOverPopup");
    if (existingPopup) existingPopup.remove();

    // Get the board element to center popup within it
    const board = document.getElementById("board");
    const popup = document.createElement("div");
    popup.id = "gameOverPopup";

    // Set inner HTML structure
    popup.innerHTML = `
        <h3>Game Over!</h3>
        <p>Your Score: <strong>${score}</strong></p>
        <button id="confirmScore">CONFIRM SCORE</button>
        <button id="restartButton">Try Again</button>
        <button id="shareButton">Share on X</button>
    `;

    // Append popup inside the board
    board.appendChild(popup);

    // Add event listeners
    document.getElementById("confirmScore").addEventListener("click", () => showConfirmScorePopup(score));
    document.getElementById("restartButton").addEventListener("click", restartGame);
    // document.getElementById("shareButton").addEventListener("click", () => alert(`Shared score: ${score} on X!`));
}


function showScoreConfirmedNotification(score) {
    const banner = document.getElementById("notificationBanner");
    const message = document.getElementById("notificationMessage");

    message.innerText = `Successfully confirmed a score of ${score}!`;
    banner.style.right = "20px"; // Slide in

    // Auto-hide after 3 seconds
    setTimeout(() => {
        closeNotification();
    }, 3000);
}

// Global function to close notification
function closeNotification() {
    const banner = document.getElementById("notificationBanner");
    banner.style.right = "-400px"; // Slide out
};


async function proveScore() {
    try {
        let score = calculateScore();
        const proof = await generate_proof(score);
        console.log("Proof Generated:", proof);

        // Show browser notification
        showScoreConfirmedNotification(score);

        // Update stars and balance
        proveSomething();
        
    } catch (error) {
        console.error("Error generating proof:", error);
        alert("Failed to generate proof. Please try again.");
    }
}


function createBoard() {
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${size}, 30px)`;
    board.style.gridTemplateRows = `repeat(${size}, 30px)`;
    cells = [];
    mines.clear();
    gameOver = false;
    gameStarted = false;
    clearInterval(timerInterval);
    timerDisplay.textContent = "000";
    timer = 0;
    mineCountDisplay.textContent = mineCount.toString().padStart(3, '0');
    generateMines();
    
    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => revealCell(cell));
        board.appendChild(cell);
        cells.push(cell);
    }
    // createHowToPlay()
}

function showConfirmScorePopup(score) {
    // Remove existing popup if it exists
    const existingPopup = document.getElementById("confirmScorePopup");
    if (existingPopup) existingPopup.remove();

    // Create the popup container
    const popup = document.createElement("div");
    popup.id = "confirmScorePopup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#fff";
    popup.style.padding = "25px";
    popup.style.borderRadius = "15px";
    popup.style.boxShadow = "0px 4px 20px rgba(233, 30, 99, 0.3)";
    popup.style.textAlign = "center";
    popup.style.width = "350px";
    popup.style.maxWidth = "90%";
    popup.style.fontFamily = "Arial, sans-serif";
    popup.style.border = "2px solid #e91e63";

    // Popup content
    popup.innerHTML = `
        <h2 style='color: #e91e63; font-size: 1.8em; font-weight: bold; margin-bottom: 10px;'>Confirm Score</h2>
        <p style='color: #333; font-size: 1.2em;'>Are you sure you want to confirm your score of <strong>${score}</strong>?</p>
        <div style="margin-top: 15px; display: flex; justify-content: center; gap: 10px;">
            <button id='cancelConfirm' style="padding: 10px 20px; background: transparent; color: #e91e63; border: 2px solid #e91e63; border-radius: 10px; cursor: pointer; font-size: 1.1em;">Cancel</button>
            <button id='confirmButton' style="padding: 10px 20px; background: #e91e63; color: #fff; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1em;">Confirm</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Button event listeners
    document.getElementById('cancelConfirm').addEventListener('click', () => popup.remove());
    document.getElementById('confirmButton').addEventListener('click', () => {
        popup.remove();
        proveScore(); // Calls the function to generate proof
    });
}


function createHowToPlay() {
    let existing = document.getElementById("howToPlay");
    if (existing) return; // Prevent duplicate section

    const howToPlay = document.createElement("div");
    howToPlay.id = "howToPlay";
    howToPlay.style.width = "250px";
    howToPlay.style.position = "absolute";
    howToPlay.style.right = "10px";
    howToPlay.style.top = "20px";
    howToPlay.style.background = "#fff";
    howToPlay.style.color = "#d6a5c0";
    howToPlay.style.padding = "15px";
    howToPlay.style.borderRadius = "10px";
    howToPlay.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    howToPlay.style.textAlign = "left";
    howToPlay.style.fontSize = "1em";
    howToPlay.innerHTML = `<strong>How to Play:</strong><br>
        - Click on a cell to reveal it.<br>
        - Avoid the mines! If you click on a mine, the game is over.<br>
        - Use strategy to avoid mines and clear the board.`;
        document.body.appendChild(howToPlay);
}

window.toggleHowToPlay = function () {
    const content = document.getElementById("howToPlayContent");
    const icon = document.getElementById("toggleIcon");

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        content.style.maxHeight = "300px"; // Adjust as needed
        content.style.opacity = "1";
        icon.innerHTML = "▲"; // Up Arrow
    } else {
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        setTimeout(() => (content.style.display = "none"), 300); // Hide after animation
        icon.innerHTML = "▼"; // Down Arrow
    }
};

document.querySelectorAll(".dock-item").forEach(item => {
    item.addEventListener("click", function() {
        // Remove active class from all items
        document.querySelectorAll(".dock-item").forEach(btn => btn.classList.remove("active"));
        
        // Add active class to the clicked item
        this.classList.add("active");
    });
});



function generateMines() {
    while (mines.size < mineCount) {
        mines.add(Math.floor(Math.random() * size * size));
    }
}

function revealCell(cell) {
    const imageSrc = "/succinct.jpg"; // Image for non-mine cells

    if (gameOver) return;
    if (!gameStarted) startTimer();

    const index = parseInt(cell.dataset.index);

    if (mines.has(index)) {
        cell.innerHTML = "💣"; // Display bomb emoji for mines
        cell.classList.add("mine");
        gameOver = true;
        clearInterval(timerInterval);
        calculateScore();
        return;
    }

    if (!cell.classList.contains("revealed")) {
        cell.classList.add("revealed");

        // Check if an image already exists before adding a new one
        if (!cell.querySelector("img")) {
            let img = document.createElement("img");
            img.src = imageSrc;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            cell.appendChild(img);
        }
    }
}


function startTimer() {
    gameStarted = true;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer.toString().padStart(3, '0');
    }, 1000);
}

let savedDifficulty = localStorage.getItem('lastDifficulty') || 'beginner';
setDifficulty(savedDifficulty);
createBoard();




window.setDifficulty = setDifficulty;
window.proveScore = proveScore;
window.restartGame = restartGame;
