
// Función para cargar los animes en la página
function loadAnimes() {
    const animeList = document.getElementById("anime-list");

    animes.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("anime-card");

        const image = document.createElement("img");
        image.src = anime.image;
        image.alt = anime.title;
        card.appendChild(image);

        const title = document.createElement("h2");
        title.textContent = anime.title;
        card.appendChild(title);

        const rating = document.createElement("p");
        rating.textContent = `Rating: ${anime.rating}/10`;
        card.appendChild(rating);

        const description = document.createElement("p");
        description.textContent = anime.description;
        card.appendChild(description);

        animeList.appendChild(card);
    });
}

// Cargar los animes cuando la página haya cargado completamente
document.addEventListener("DOMContentLoaded", loadAnimes);
