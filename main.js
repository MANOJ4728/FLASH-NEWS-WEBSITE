// Variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
let newsDataArr = [];

// APIs
const API_KEY = "0ff925fdfc334d58b5ea1b415b963a5e"; // Replace with your News API key
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";


// Event listeners for buttons
generalBtn.addEventListener("click", () => fetchNews("general"));
businessBtn.addEventListener("click", () => fetchNews("business"));
sportsBtn.addEventListener("click", () => fetchNews("sports"));
entertainmentBtn.addEventListener("click", () => fetchNews("entertainment"));
technologyBtn.addEventListener("click", () => fetchNews("technology"));
searchBtn.addEventListener("click", () => fetchNews("search"));

// Fetch news data
const fetchNews = async (category) => {
    const endpoint = category === "search"
        ? `${BASE_URL}${API_KEY}&q=${encodeURIComponent(newsQuery.value)}`
        : `${BASE_URL}${API_KEY}&category=${category}`;

    try {
        const response = await fetch(endpoint);

        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            newsDataArr = data.articles;
            displayNews(category);
        } else {
            throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        newsdetails.innerHTML = `<h5>Error fetching news: ${error.message}</h5>`;
    }
};

// Display news data
const displayNews = (category) => {
    newsType.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>`;
    newsdetails.innerHTML = "";

    if (newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    newsDataArr.forEach((news) => {
        const { title, publishedAt, urlToImage, description, url } = news;
        const date = publishedAt.split("T")[0];

        const col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement("div");
        card.className = "p-2";

        const image = document.createElement("img");
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = urlToImage;

        const cardBody = document.createElement("div");

        const newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = title;

        const dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;

        const descriptionElement = document.createElement("p");
        descriptionElement.className = "text-muted";
        descriptionElement.innerHTML = description;

        const link = document.createElement("a");
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(descriptionElement);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
};
