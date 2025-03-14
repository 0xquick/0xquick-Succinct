# **🚀 Minesweeper SP1 - Open Source Project**  

A modern **Minesweeper game** integrated with **SP1 Zero-Knowledge Proofs** for score verification, designed with a **MacOS-inspired UI**.  

![Minesweeper Preview](./assets/minesweeper-preview.png)  

---

## **📜 Table of Contents**
1. [Introduction](#-introduction)
2. [Features](#-features)
3. [Setup & Installation](#-setup--installation)
4. [Adding SP1 for Proof Generation](#-adding-sp1-for-proof-generation)
5. [Generating a Proof When Game Ends](#-generating-a-proof-when-game-ends)
6. [Displaying Notifications](#-displaying-notifications)
7. [MacOS Dock with Hover Effects](#-macos-dock-with-hover-effects)
8. [Styling & UI](#-styling--ui)
9. [Pushing to GitHub](#-pushing-to-github)
10. [Deploying to Vercel](#-deploying-to-vercel)

---

## **📌 Introduction**  
This project is a **Minesweeper game** where players can verify their score using **SP1 WASM-based Zero-Knowledge Proofs**. It also features **MacOS-style UI** with a dock, notifications, and animations.

---

## **🚀 Features**
✅ **Classic Minesweeper** with Beginner, Intermediate & Expert modes  
✅ **SP1 Integration** for Proof Generation & Verification  
✅ **MacOS-Style UI** with a Dock and Window Manager  
✅ **Animated Notifications** for Score Confirmation  
✅ **Dynamic Score Calculation** with Star & Balance System  

---

## **💻 Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR-USERNAME/minesweeper-sp1.git
cd minesweeper-sp1
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run Locally**
```sh
npm run dev
```
Now, open `http://localhost:3000` in your browser.

---

## **🔗 Adding SP1 for Proof Generation**
To integrate **SP1** into the game, follow these steps:

1. **Import SP1 in JavaScript**
   ```js
   import { generate_proof } from "./pkg/sp1_wasm.js";
   ```

2. **Initialize SP1 in `game.js`**
   ```js
   async function loadSP1() {
       await init();  // Ensures SP1 is loaded
   }
   loadSP1();
   ```

3. **Trigger Proof Generation When Game Ends**
   ```js
   async function proveScore() {
       try {
           let score = calculateScore();
           const proof = await generate_proof(score);
           console.log("Proof Generated:", proof);

           // Show notification
           showScoreConfirmedNotification(score);

           // Update score tracking
           proveSomething();
       } catch (error) {
           console.error("Error generating proof:", error);
           alert("Failed to generate proof. Please try again.");
       }
   }
   ```

---

## **✅ Generating a Proof When Game Ends**
When the game is over, the **SP1 proof is generated** for score verification.

1. **Calculate Score**
   ```js
   function calculateScore() {
       let safeTilesRevealed = document.querySelectorAll(".cell.revealed").length;
       let difficultyBonus = size === 8 ? 50 : size === 12 ? 100 : 200;
       return (safeTilesRevealed * 10) - (timer * 2) + difficultyBonus;
   }
   ```

2. **Show Proof Confirmation Popup**
   ```js
   function showConfirmScorePopup(score) {
       const popup = document.createElement("div");
       popup.id = "confirmScorePopup";
       popup.innerHTML = `
           <h2>Confirm Score</h2>
           <p>Are you sure you want to confirm your score of <strong>${score}</strong>?</p>
           <button id="confirmButton">Confirm</button>
       `;
       document.body.appendChild(popup);
       document.getElementById('confirmButton').addEventListener('click', () => proveScore());
   }
   ```

---

## **🔔 Displaying Notifications**
When the user confirms their score, a **notification banner** appears at the top-right.

```js
function showScoreConfirmedNotification(score) {
    const banner = document.getElementById("notificationBanner");
    const message = document.getElementById("notificationMessage");

    message.innerText = `Successfully confirmed a score of ${score}!`;
    banner.style.right = "20px"; // Slide in

    setTimeout(() => {
        closeNotification();
    }, 3000);
}
```

---

## **🎨 Styling & UI**
The **MacOS-inspired UI** includes:
- **Game Container with Soft Pink Theme**
- **Smooth Animations & Shadows**
- **Floating Dock with App Icons**

```css
#gameContainer {
    background: #fff;
    padding: 20px;
    border: 2px solid #fae1eb;
    border-radius: 15px;
    box-shadow: 0px 4px 20px rgba(233, 30, 99, 0.3);
}
```

---

## **🖥️ MacOS Dock with Hover Effects**
The **dock UI** allows users to **select and highlight active apps**.

```js
document.querySelectorAll(".dock-item").forEach(item => {
    item.addEventListener("click", function() {
        document.querySelectorAll(".dock-item").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});
```

Hover Effect:
```css
.dock img:hover {
    transform: scale(1.2);
}
```

---

## **📤 Pushing to GitHub**
1. **Initialize Git**
   ```sh
   git init
   git add .
   git commit -m "Initial Minesweeper SP1 commit"
   ```

2. **Push to GitHub**
   ```sh
   git remote add origin https://github.com/YOUR-USERNAME/minesweeper-sp1.git
   git push -u origin main
   ```

---

## **🚀 Deploying to Vercel**
### **1️⃣ Install Vercel**
```sh
npm install -g vercel
```

### **2️⃣ Deploy Project**
```sh
vercel --prod
```

**Change Project Name**  
To rename your Vercel app:
```sh
vercel project rename new-name
```

---

## **🎉 Congratulations!**
You have successfully built and deployed **Minesweeper SP1**!  
💖 **Enjoy the game and explore SP1 Zero-Knowledge Proofs!**
