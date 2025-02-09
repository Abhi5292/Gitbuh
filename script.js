document.addEventListener("DOMContentLoaded", () => {
    
    // Spin Wheel Functionality
    const spinBtn = document.getElementById("spin-btn");
    spinBtn.addEventListener("click", () => {
        spinBtn.innerText = "Spinning...";
        setTimeout(() => {
            let rewards = ["150 Coins", "200 Coins", "1 MetaVerse Token", "5 MetaVerse Tokens"];
            let reward = rewards[Math.floor(Math.random() * rewards.length)];
            alert("You won: " + reward);
            spinBtn.innerText = "SPIN";
        }, 3000);
    });

    // Wallet Conversion Functionality
    const convertBtn = document.getElementById("convert-btn");
    convertBtn.addEventListener("click", () => {
        alert("Conversion Successful: 100 MetaRush Coins = 1 MetaVerse Token");
    });

});
document.addEventListener("DOMContentLoaded", () => {

    let walletBalance = 1000; // Starting coins
    let metaverseTokens = 0;
    let dailyBonusClaimed = false;

    // Update wallet UI
    function updateWallet() {
        document.getElementById("wallet-coins").innerText = walletBalance;
        document.getElementById("wallet-tokens").innerText = metaverseTokens;
    }

    updateWallet();

    // Daily Bonus Functionality
    document.getElementById("claim-bonus").addEventListener("click", () => {
        if (!dailyBonusClaimed) {
            walletBalance += 200;
            dailyBonusClaimed = true;
            updateWallet();
            alert("Daily Bonus Claimed: +200 Coins");
        } else {
            alert("Bonus already claimed today.");
        }
    });

    // Wallet Conversion Functionality
    document.getElementById("convert-btn").addEventListener("click", () => {
        if (walletBalance >= 100) {
            walletBalance -= 100;
            metaverseTokens += 1;
            updateWallet();
            alert("Converted 100 MetaRush Coins → 1 MetaVerse Token");
        } else {
            alert("Not enough coins to convert.");
        }
    });

    // Spin Wheel Functionality
    const spinWheel = document.getElementById("wheel");
    const spinBtn = document.getElementById("spin-btn");
    let spinning = false;

    spinBtn.addEventListener("click", () => {
        if (spinning) return;

        spinning = true;
        spinWheel.style.transition = "transform 3s ease-out";
        let degree = Math.floor(3600 + Math.random() * 360);
        spinWheel.style.transform = `rotate(${degree}deg)`;

        setTimeout(() => {
            let rewards = [150, 200, 1, 5]; // Possible rewards
            let reward = rewards[Math.floor(Math.random() * rewards.length)];

            if (reward < 10) {
                metaverseTokens += reward;
                alert(`You won ${reward} MetaVerse Tokens!`);
            } else {
                walletBalance += reward;
                alert(`You won ${reward} Coins!`);
            }

            updateWallet();
            spinning = false;
        }, 3500);
    });

    // Dynamic Leaderboard Update
    let leaderboard = [
        { name: "Player1", score: 5000 },
        { name: "Player2", score: 4500 },
        { name: "Player3", score: 4000 }
    ];

    function updateLeaderboard() {
        let leaderboardHTML = "";
        leaderboard.forEach((player, index) => {
            leaderboardHTML += `<li>${index + 1}. ${player.name} - ${player.score} Points</li>`;
        });
        document.getElementById("leaderboard-list").innerHTML = leaderboardHTML;
    }

    updateLeaderboard();
});
