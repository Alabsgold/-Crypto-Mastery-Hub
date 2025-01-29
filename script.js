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
// Sample Blog Data
const blogPosts = [
    {
        title: "How to Buy Your First Cryptocurrency",
        content: "Learn the step-by-step process of buying your first Bitcoin or Ethereum.",
        link: "blog-post-1.html"
    },
    {
        title: "Understanding Crypto Wallets",
        content: "A detailed guide on hot and cold wallets, and how to keep your assets safe.",
        link: "blog-post-2.html"
    },
    {
        title: "Top 5 Mistakes Beginners Make in Crypto",
        content: "Avoid common mistakes and start your crypto journey the right way.",
        link: "blog-post-3.html"
    }
];

// Load Blog Posts Dynamically
const blogContainer = document.getElementById("blog-container");

if (blogContainer) {
    blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <a href="${post.link}">Read More</a>
        `;

        blogContainer.appendChild(postElement);
    });
}
// Search Function for Blog Posts
function searchBlog() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const blogContainer = document.getElementById("blog-container");
    const searchMessage = document.getElementById("search-message");

    if (!query) {
        searchMessage.textContent = "Please enter a search term.";
        return;
    }

    searchMessage.textContent = "";

    let found = false;
    blogContainer.innerHTML = ""; // Clear previous results

    blogPosts.forEach(post => {
        if (post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)) {
            const postElement = document.createElement("div");
            postElement.classList.add("blog-post");

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <a href="${post.link}">Read More</a>
            `;

            blogContainer.appendChild(postElement);
            found = true;
        }
    });

    if (!found) {
        searchMessage.textContent = "No matching results found.";
    }
}
// Fetch Trending Crypto News
async function fetchCryptoNews() {
    const newsContainer = document.getElementById("news-container");

    try {
        const response = await fetch("https://api.coingecko.com/api/v3/news");
        const data = await response.json();

        newsContainer.innerHTML = ""; // Clear previous content

        data.news.slice(0, 5).forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            newsItem.innerHTML = `
                <a href="${article.url}" target="_blank">${article.title}</a>
                <p>${article.description}</p>
            `;

            newsContainer.appendChild(newsItem);
        });

    } catch (error) {
        newsContainer.innerHTML = "<p>Failed to load news. Try again later.</p>";
    }
}

// Load news when the page loads
fetchCryptoNews();
// Fetch Live Crypto Prices
async function fetchCryptoPrices() {
    const priceContainer = document.getElementById("price-container");

    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin&vs_currencies=usd");
        const data = await response.json();

        priceContainer.innerHTML = ""; // Clear previous content

        const coins = [
            { name: "Bitcoin", symbol: "BTC", price: data.bitcoin.usd },
            { name: "Ethereum", symbol: "ETH", price: data.ethereum.usd },
            { name: "Ripple", symbol: "XRP", price: data.ripple.usd },
            { name: "Litecoin", symbol: "LTC", price: data.litecoin.usd }
        ];

        coins.forEach(coin => {
            const priceItem = document.createElement("div");
            priceItem.classList.add("price-item");

            priceItem.innerHTML = `
                <div class="coin-name">${coin.name} (${coin.symbol})</div>
                <div class="price">$${coin.price}</div>
            `;

            priceContainer.appendChild(priceItem);
        });

    } catch (error) {
        priceContainer.innerHTML = "<p>Failed to load prices. Try again later.</p>";
    }
}

// Load prices when the page loads
fetchCryptoPrices();
