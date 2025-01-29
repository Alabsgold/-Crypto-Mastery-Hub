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
// Handle Newsletter Subscription
document.getElementById("newsletter-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    if (!email.includes("@")) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
    }

    try {
        // Simulate sending email to a database
        message.textContent = "Subscribing...";
        message.style.color = "blue";

        await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay

        message.textContent = "You're subscribed! Check your email for updates.";
        message.style.color = "green";

        document.getElementById("newsletter-form").reset();
    } catch (error) {
        message.textContent = "Subscription failed. Try again later.";
        message.style.color = "red";
    }
});
