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
