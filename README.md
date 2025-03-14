# 🎮 Minesweeper SP1 - Open-Source Project with SP1 Integration

This project is an **open-source** implementation of **Minesweeper**, integrating **SP1 (Succinct Prover 1)** for cryptographic proof generation. It provides a **detailed guide** explaining how it was built and how SP1 is used to help **future builders**.

---

## **🔧 Project Overview**
- **Game**: Minesweeper (Classic grid-based puzzle game)
- **Technology Stack**:
  - **Frontend**: HTML, CSS, JavaScript (ES6)
  - **SP1 Integration**: WASM module (`sp1_wasm.js`)
  - **Hosting**: Vercel (with deployment guide)
  - **Cryptographic Proofs**: Generate **zero-knowledge proofs** using SP1
  - **Open-Source**: Fully documented and available for community use

---

## **📖 How This Project Was Built**
### **1️⃣ Setting Up the Frontend**
The Minesweeper game UI is created using:
- **HTML**: Structure for the game board, timer, and score.
- **CSS**: Styled to match a **MacOS-like UI**, with a smooth dock and animations.
- **JavaScript**: Implements game logic, difficulty settings, and interactions.

#### **Game Board Structure**
```html
<div id="gameContainer">
    <div class="header">
        <div class="mine-count" id="mineCount">010</div>
        <button class="emoji-button" id="resetButton">
            <img src="src/succinct-icon-arcade.svg" alt="Reset" id="resetImage">
        </button>
        <div class="timer" id="timerID">000</div>
    </div>
    <div class="board" id="board"></div>
</div>
