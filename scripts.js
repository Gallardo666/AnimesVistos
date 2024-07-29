
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

function normalizeStateText(text) {
    // Normaliza el texto para comparación
    return text.trim().toLowerCase().replace('en proceso', 'en proceso');
}

//Guardar Estado Original de Lista animes
let originalAnimes = [];

function loadAnimes() {
    originalAnimes = [...animes]; // Copia de la lista original de animes
    updateAnimeList(originalAnimes);
}


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
        rating.classList.add('anime-rating'); // Añadido para coincidir con la clase usada en la ordenación por nota
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

function applyFilters() {
    const sortOption = document.getElementById('sort').value;
    const animeList = document.getElementById('anime-list');
    const animeCards = Array.from(animeList.getElementsByClassName('anime-card'));

    // Ordenación según el criterio seleccionado
    animeCards.sort((a, b) => {
        if (sortOption === 'alphabetical') {
            const titleA = a.querySelector('h2').textContent.trim();
            const titleB = b.querySelector('h2').textContent.trim();
            return titleA.localeCompare(titleB);
        } else if (sortOption === 'grade') {
            const gradeA = parseFloat(a.querySelector('.anime-rating').textContent.match(/(\d+[\.,]?\d*)/)[0].replace(',', '.'));
            const gradeB = parseFloat(b.querySelector('.anime-rating').textContent.match(/(\d+[\.,]?\d*)/)[0].replace(',', '.'));
            return gradeB - gradeA;
        }
        return 0; // Si no se selecciona un criterio válido, no se cambia el orden
    });

    // Aplicar la ordenación a la lista de animes
    animeList.innerHTML = ''; // Limpiar lista de anime
    animeCards.forEach(card => animeList.appendChild(card));
}

// Añadir un listener al dropdown para aplicar el filtro al cambiar el criterio de ordenación
document.getElementById('sort').addEventListener('change', applyFilters);



document.querySelector('.dropdown-button').addEventListener('click', function() {
    const dropdownContent = this.nextElementSibling;
    
    // Alternar la clase 'show' para activar/desactivar la visibilidad
    if (dropdownContent.classList.contains('show')) {
        // Si el menú está visible, ocultar
        dropdownContent.classList.remove('show');
        // Usar setTimeout para esperar que la transición esté completa antes de ajustar el display
        setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 700); // Este tiempo debe coincidir con la duración de la transición
    } else {
        // Si el menú está oculto, mostrar
        dropdownContent.style.display = 'block';
        // Usar requestAnimationFrame para asegurar que el estilo de display se aplica antes de iniciar la transición
        requestAnimationFrame(() => {
            dropdownContent.classList.add('show');
        });
    }
});
