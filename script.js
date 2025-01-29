// Dark Mode Toggle
const toggleButton = document.getElementById("dark-mode-toggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});
// Dynamic Welcome Message
const welcomeMessage = document.getElementById("welcome-message");

const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning! Start Your Crypto Journey!";
    if (hour < 18) return "Good Afternoon! Learn & Master Crypto!";
    return "Good Evening! Grow Your Crypto Skills!";
};

welcomeMessage.textContent = getTimeBasedGreeting();
// Fetch Live Crypto Prices
const fetchCryptoPrices = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
        const data = await response.json();

        document.getElementById("btc-price").textContent = `$${data.bitcoin.usd.toLocaleString()}`;
        document.getElementById("eth-price").textContent = `$${data.ethereum.usd.toLocaleString()}`;
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
    }
};

// Fetch prices every 30 seconds
fetchCryptoPrices();
setInterval(fetchCryptoPrices, 30000);
