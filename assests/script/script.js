const API_KEY = "c7b41177934c4c4886027eefb35c7483";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Pakistan"));

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);

    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template");

    cardContainer.innerHTML = '';

    data.articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);

        const title = article.title;
        const publish = article.publishedAt;
        const image = article.urlToImage;
        const description = article.content;

        const newsImg = cardClone.querySelector('#news-image');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsSource = cardClone.querySelector('#news-source');
        const newsDesc = cardClone.querySelector('#news-desc');

        newsImg.src = image;
        newsTitle.innerHTML = title;
        newsDesc.innerHTML = description;

        cardClone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })

        cardContainer.appendChild(cardClone);
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    let query = searchText.Value;
    if (!query) return;
    fetchNews(query)
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})