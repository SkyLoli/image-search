const accesskey = "joOHbfKmhhssa64U7uMeBH77ydXBsKZGB1Nr8QfaHYc";

const formEI = document.querySelector("form");
const inputEI = document.getElementById("Search-input");
const searchResults = document.querySelector(".Search-results");
const showMore = document.getElementById("show-more-buttom");

let inputData = "";
let page = 1;

async function SearchImages(){
    inputData = inputEI.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("Search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1){
        showMore.style.display = "block";
    }
}

formEI.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    SearchImages();

});

showMore.addEventListener("click", () =>{
    SearchImages();
});