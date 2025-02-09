document.addEventListener("DOMContentLoaded", function() {
    // Handle Page Transitions
    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(sectionId).classList.add("active");
    }

    // Navigation Click Events
    document.querySelectorAll(".nav-button").forEach(button => {
        button.addEventListener("click", function() {
            let sectionId = this.getAttribute("data-section");
            showSection(sectionId);
        });
    });

    // Wallet Conversion (100 Coins -> 1 Token)
    document.getElementById("convert").addEventListener("click", function() {
        let coins = parseInt(document.getElementById("coins").textContent);
        let tokens = parseInt(document.getElementById("tokens").textContent);
        if (coins >= 100) {
            document.getElementById("coins").textContent = coins - 100;
            document.getElementById("tokens").textContent = tokens + 1;
        }
    });

    // Spin Wheel Logic
    document.getElementById("spin").addEventListener("click", function() {
        let rewards = [150, 200, 300, 500, 1000, 1500, 10, 15];
        let reward = rewards[Math.floor(Math.random() * rewards.length)];
        document.getElementById("spin-result").textContent = "You won: " + reward + (reward >= 100 ? " Coins" : " Tokens");
    });

    // Daily Bonus Logic
    let lastClaimDate = localStorage.getItem("lastClaimDate");
    let currentBonus = parseInt(localStorage.getItem("currentBonus")) || 200;
    let today = new Date().toDateString();
    let bonusDisplay = document.getElementById("bonus-amount");
    let claimButton = document.getElementById("claim-bonus");
    let bonusStatus = document.getElementById("bonus-status");

    if (lastClaimDate === today) {
        claimButton.disabled = true;
        bonusStatus.textContent = "Bonus already claimed today!";
    } else {
        claimButton.disabled = false;
    }

    bonusDisplay.textContent = currentBonus;

    claimButton.addEventListener("click", function() {
        let coins = parseInt(document.getElementById("coins").textContent);
        coins += currentBonus;
        document.getElementById("coins").textContent = coins;

        localStorage.setItem("lastClaimDate", today);
        localStorage.setItem("currentBonus", currentBonus * 2 > 3200 ? 200 : currentBonus * 2);
        claimButton.disabled = true;
        bonusStatus.textContent = "Bonus Claimed!";
    });
});
