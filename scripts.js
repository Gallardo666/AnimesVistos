// Guardar Estado Original de Lista de animes
let originalAnimes = [];

// Función para cargar los animes en la página
function loadAnimes() {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = ''; // Limpiar lista de anime

    animes.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("anime-card");
        card.setAttribute('data-language', anime.language);
        card.setAttribute('data-platform', anime.platform);

        const image = document.createElement("img");
        image.src = anime.image;
        image.alt = anime.title;
        card.appendChild(image);

        const title = document.createElement("h2");
        title.textContent = anime.title;
        card.appendChild(title);

        const rating = document.createElement("p");
        rating.classList.add('anime-rating'); // Añadido para coincidir con la clase usada en la ordenación por nota
        rating.textContent = `Calificación: ${anime.rating}/10`;
        card.appendChild(rating);

        const description = document.createElement("p");
        description.textContent = anime.description;
        card.appendChild(description);

        animeList.appendChild(card);
    });
}

// Función para inicializar la lista de animes
function initializeAnimes() {
    originalAnimes = [...animes]; // Copia de la lista original de animes
    loadAnimes(); // Cargar la lista inicial de animes
}

// Función para aplicar los filtros y ordenamientos
function applyFilters() {
    const sortOption = document.getElementById('sort').value;
    const languageFilter = document.getElementById('language').value;
    const platformFilter = document.getElementById('platform').value;

    const animeList = document.getElementById('anime-list');
    const animeCards = Array.from(animeList.getElementsByClassName('anime-card'));

    // Filtrar tarjetas de anime
    animeCards.forEach(card => {
        const cardLanguage = card.getAttribute('data-language');
        const cardPlatform = card.getAttribute('data-platform');
        
        const languageMatch = (languageFilter === 'all' || cardLanguage.includes(languageFilter));
        const platformMatch = (platformFilter === 'all' || cardPlatform.includes(platformFilter));

        if (languageMatch && platformMatch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // Ordenar tarjetas de anime
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

// Añadir listeners a los dropdowns para aplicar el filtro y ordenamiento
document.getElementById('sort').addEventListener('change', applyFilters);
document.getElementById('language').addEventListener('change', applyFilters);
document.getElementById('platform').addEventListener('change', applyFilters);

// Toggle dropdown menu
document.querySelector('.dropdown-button').addEventListener('click', function() {
    const dropdownContent = this.nextElementSibling;
    
    // Alternar la clase 'show' para activar/desactivar la visibilidad
    if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 700); // Este tiempo debe coincidir con la duración de la transición
    } else {
        dropdownContent.style.display = 'block';
        requestAnimationFrame(() => {
            dropdownContent.classList.add('show');
        });
    }
});

// Cargar animes cuando la página haya cargado completamente
document.addEventListener("DOMContentLoaded", initializeAnimes);
