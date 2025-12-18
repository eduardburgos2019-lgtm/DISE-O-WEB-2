document.addEventListener('DOMContentLoaded', function() {
    // Datos de juegos con imágenes reales
    const games = [
        {
            id: 1,
            title: "The Legend of Zelda",
            category: "aventura",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
            description: "Aventura épica en el reino de Hyrule",
            rating: 4.9,
            year: 2023,
            tags: ["Nintendo", "Open World", "Fantasy"],
            popular: true
        },
        {
            id: 2,
            title: "Cyberpunk 2077",
            category: "accion",
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
            description: "RPG de acción en un futuro distópico",
            rating: 4.3,
            year: 2020,
            tags: ["RPG", "Futurista", "Ciberpunk"],
            popular: true
        },
        {
            id: 3,
            title: "Elden Ring",
            category: "rpg",
            image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800&q=80",
            description: "RPG de acción de mundo abierto",
            rating: 4.8,
            year: 2022,
            tags: ["Dark Souls", "Open World", "Difícil"],
            popular: true
        },
        {
            id: 4,
            title: "Civilization VI",
            category: "estrategia",
            image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=800&q=80",
            description: "Construye un imperio que perdure en el tiempo",
            rating: 4.5,
            year: 2016,
            tags: ["Estrategia", "Turnos", "Historia"],
            popular: false
        },
        {
            id: 5,
            title: "FIFA 23",
            category: "deportes",
            image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80",
            description: "La mejor experiencia de fútbol",
            rating: 4.2,
            year: 2022,
            tags: ["Deportes", "Fútbol", "EA Sports"],
            popular: true
        },
        {
            id: 6,
            title: "Red Dead Redemption 2",
            category: "aventura",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
            description: "Aventura en el salvaje oeste",
            rating: 4.9,
            year: 2018,
            tags: ["Open World", "Western", "Rockstar"],
            popular: true
        },
        {
            id: 7,
            title: "Call of Duty: Warzone",
            category: "accion",
            image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80",
            description: "Battle Royale gratuito de acción intensa",
            rating: 4.0,
            year: 2020,
            tags: ["FPS", "Battle Royale", "Multiplayer"],
            popular: true
        },
        {
            id: 8,
            title: "The Witcher 3",
            category: "rpg",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80",
            description: "RPG de fantasía oscura",
            rating: 4.7,
            year: 2015,
            tags: ["Fantasy", "Open World", "CD Projekt"],
            popular: true
        },
        {
            id: 9,
            title: "Age of Empires IV",
            category: "estrategia",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
            description: "Juego de estrategia en tiempo real",
            rating: 4.4,
            year: 2021,
            tags: ["Estrategia", "Historia", "PC"],
            popular: false
        },
        {
            id: 10,
            title: "NBA 2K23",
            category: "deportes",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
            description: "Simulación de baloncesto realista",
            rating: 4.1,
            year: 2022,
            tags: ["Deportes", "Baloncesto", "2K Sports"],
            popular: false
        },
        {
            id: 11,
            title: "God of War Ragnarok",
            category: "aventura",
            image: "https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?auto=format&fit=crop&w=800&q=80",
            description: "Aventura épica nórdica",
            rating: 4.8,
            year: 2022,
            tags: ["PlayStation", "Mythology", "Action"],
            popular: true
        },
        {
            id: 12,
            title: "Overwatch 2",
            category: "accion",
            image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=800&q=80",
            description: "Hero shooter competitivo",
            rating: 3.9,
            year: 2022,
            tags: ["FPS", "Heroes", "Blizzard"],
            popular: false
        }
    ];

    // Estado de la aplicación
    let currentFilter = 'all';
    let currentView = 'grid';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let animationsEnabled = true;
    let currentCarouselIndex = 0;

    // Elementos del DOM
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const imageCountEl = document.getElementById('imageCount');
    const favCountEl = document.getElementById('favCount');
    const popularCountEl = document.getElementById('popularCount');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxRating = document.getElementById('lightboxRating');
    const lightboxYear = document.getElementById('lightboxYear');
    const lightboxTags = document.getElementById('lightboxTags');
    const lightboxFavBtn = document.getElementById('lightboxFavBtn');
    const floatingFavBtn = document.getElementById('floatingFavBtn');
    const favBadge = document.getElementById('favBadge');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const randomBtn = document.getElementById('randomBtn');
    const toggleAnimationsBtn = document.getElementById('toggleAnimations');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');

    // Inicializar
    function init() {
        renderGallery();
        updateStats();
        updateFavorites();
        setupEventListeners();
        setupCarousel();
    }

    // Renderizar galería
    function renderGallery() {
        gallery.innerHTML = '';
        carouselTrack.innerHTML = '';
        carouselIndicators.innerHTML = '';
        
        const filteredGames = filterGames();
        
        filteredGames.forEach((game, index) => {
            // Crear elemento para galería normal
            const galleryItem = createGalleryItem(game, index);
            gallery.appendChild(galleryItem);
            
            // Crear elemento para carrusel
            const carouselItem = createCarouselItem(game, index);
            carouselTrack.appendChild(carouselItem);
            
            // Crear indicador para carrusel
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                currentCarouselIndex = index;
                updateCarousel();
            });
            carouselIndicators.appendChild(indicator);
        });
        
        updateView();
        updateImageCount(filteredGames.length);
    }

    // Crear elemento de galería
    function createGalleryItem(game, index) {
        const isFavorite = favorites.includes(game.id);
        const item = document.createElement('div');
        item.className = `gallery-item ${currentView === 'list' ? 'list-item' : ''}`;
        item.dataset.id = game.id;
        item.dataset.category = game.category;
        item.style.setProperty('--item-index', index);
        
        item.innerHTML = `
            <button class="fav-btn ${isFavorite ? 'active' : ''}" data-id="${game.id}">
                <i class="far fa-heart"></i>
                <i class="fas fa-heart"></i>
            </button>
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="gallery-info">
                <h3><i class="fas fa-gamepad"></i> ${game.title}</h3>
                <span class="gallery-category">${getCategoryName(game.category)}</span>
                <div class="gallery-rating">
                    ${generateStars(game.rating)}
                    <span>${game.rating}/5</span>
                </div>
                <p class="gallery-description">${game.description}</p>
                <div class="game-meta">
                    <span class="game-year">${game.year}</span>
                    <span class="game-popular ${game.popular ? 'popular' : ''}">
                        ${game.popular ? '<i class="fas fa-fire"></i> Popular' : ''}
                    </span>
                </div>
            </div>
        `;
        
        // Event listeners para el elemento
        const img = item.querySelector('img');
        const favBtn = item.querySelector('.fav-btn');
        
        img.addEventListener('click', () => openLightbox(game));
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(game.id);
        });
        
        item.addEventListener('mouseenter', () => {
            if (animationsEnabled) {
                item.style.transform = 'translateY(-15px) scale(1.03)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (animationsEnabled) {
                item.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        return item;
    }

    // Crear elemento de carrusel
    function createCarouselItem(game, index) {
        const isFavorite = favorites.includes(game.id);
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.id = game.id;
        item.dataset.index = index;
        item.style.setProperty('--item-index', index);
        
        item.innerHTML = `
            <button class="fav-btn ${isFavorite ? 'active' : ''}" data-id="${game.id}">
                <i class="far fa-heart"></i>
                <i class="fas fa-heart"></i>
            </button>
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="carousel-info">
                <h4>${game.title}</h4>
                <span class="carousel-category">${getCategoryName(game.category)}</span>
            </div>
        `;
        
        const favBtn = item.querySelector('.fav-btn');
        const img = item.querySelector('img');
        
        img.addEventListener('click', () => openLightbox(game));
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(game.id);
        });
        
        return item;
    }

    // Filtrar juegos
    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        
        return games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm) || 
                                 game.description.toLowerCase().includes(searchTerm) ||
                                 game.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            if (currentFilter === 'all') return matchesSearch;
            if (currentFilter === 'favoritos') return matchesSearch && favorites.includes(game.id);
            return matchesSearch && game.category === currentFilter;
        });
    }

    // Actualizar vista
    function updateView() {
        gallery.className = `gallery ${currentView}-view`;
        
        if (currentView === 'carousel') {
            carouselContainer.classList.add('active');
            gallery.style.display = 'none';
            updateCarousel();
        } else {
            carouselContainer.classList.remove('active');
            gallery.style.display = 'grid';
        }
        
        // Actualizar botones de vista activos
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === currentView);
        });
    }

    // Actualizar carrusel
    function updateCarousel() {
        const trackWidth = carouselTrack.scrollWidth;
        const itemWidth = carouselTrack.children[0].offsetWidth + 32; // 32px es el gap
        const offset = currentCarouselIndex * itemWidth;
        
        carouselTrack.style.transform = `translateX(-${offset}px)`;
        
        // Actualizar indicadores
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentCarouselIndex);
        });
    }

    // Alternar favorito
    function toggleFavorite(gameId) {
        const index = favorites.indexOf(gameId);
        if (index === -1) {
            favorites.push(gameId);
            // Animación de corazón
            const heart = event.target.closest('.fav-btn').querySelector('.fas');
            heart.style.transform = 'scale(1.5)';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 300);
        } else {
            favorites.splice(index, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavorites();
        renderGallery();
        
        // Actualizar botón en lightbox si está abierto
        if (lightbox.classList.contains('active')) {
            const currentGameId = parseInt(lightboxImg.dataset.id);
            if (currentGameId === gameId) {
                lightboxFavBtn.classList.toggle('active', favorites.includes(gameId));
            }
        }
    }

    // Actualizar estadísticas
    function updateStats() {
        const filteredGames = filterGames();
        const popularGames = filteredGames.filter(game => game.popular).length;
        
        imageCountEl.textContent = filteredGames.length;
        popularCountEl.textContent = popularGames;
    }

    // Actualizar favoritos
    function updateFavorites() {
        favCountEl.textContent = favorites.length;
        favBadge.textContent = favorites.length;
    }

    // Abrir lightbox
    function openLightbox(game) {
        const isFavorite = favorites.includes(game.id);
        
        lightboxImg.src = game.image;
        lightboxImg.alt = game.title;
        lightboxImg.dataset.id = game.id;
        lightboxTitle.textContent = game.title;
        lightboxCategory.textContent = getCategoryName(game.category);
        lightboxDescription.textContent = game.description;
        lightboxRating.textContent = game.rating;
        lightboxYear.textContent = `Año: ${game.year}`;
        
        // Tags
        lightboxTags.innerHTML = game.tags.map(tag => 
            `<span>${tag}</span>`
        ).join('');
        
        // Botón de favorito
        lightboxFavBtn.className = `fav-btn ${isFavorite ? 'active' : ''}`;
        lightboxFavBtn.innerHTML = isFavorite ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Generar estrellas para rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Obtener nombre de categoría
    function getCategoryName(category) {
        const names = {
            'aventura': 'Aventura',
            'accion': 'Acción',
            'rpg': 'RPG',
            'estrategia': 'Estrategia',
            'deportes': 'Deportes'
        };
        return names[category] || category;
    }

    // Actualizar contador de imágenes
    function updateImageCount(count) {
        imageCountEl.textContent = count;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Filtros
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentFilter = btn.dataset.filter;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderGallery();
                updateStats();
            });
        });

        // Vistas
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentView = btn.dataset.view;
                updateView();
            });
        });

        // Búsqueda
        searchInput.addEventListener('input', () => {
            renderGallery();
            updateStats();
        });

        // Lightbox
        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        document.querySelector('.lightbox-prev').addEventListener('click', () => {
            const filteredGames = filterGames();
            const currentId = parseInt(lightboxImg.dataset.id);
            const currentIndex = filteredGames.findIndex(game => game.id === currentId);
            const prevIndex = (currentIndex - 1 + filteredGames.length) % filteredGames.length;
            openLightbox(filteredGames[prevIndex]);
        });
        document.querySelector('.lightbox-next').addEventListener('click', () => {
            const filteredGames = filterGames();
            const currentId = parseInt(lightboxImg.dataset.id);
            const currentIndex = filteredGames.findIndex(game => game.id === currentId);
            const nextIndex = (currentIndex + 1) % filteredGames.length;
            openLightbox(filteredGames[nextIndex]);
        });

        // Favorito en lightbox
        lightboxFavBtn.addEventListener('click', () => {
            const gameId = parseInt(lightboxImg.dataset.id);
            toggleFavorite(gameId);
        });

        // Botón flotante de favoritos
        floatingFavBtn.addEventListener('click', () => {
            currentFilter = 'favoritos';
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-filter="favoritos"]').classList.add('active');
            renderGallery();
            updateStats();
            
            // Scroll a la galería
            gallery.scrollIntoView({ behavior: 'smooth' });
        });

        // Botón de scroll top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mostrar/ocultar botón de scroll top
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Botón random
        randomBtn.addEventListener('click', () => {
            const filteredGames = filterGames();
            if (filteredGames.length > 0) {
                const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
                openLightbox(randomGame);
            }
        });

        // Toggle animaciones
        toggleAnimationsBtn.addEventListener('click', () => {
            animationsEnabled = !animationsEnabled;
            toggleAnimationsBtn.innerHTML = animationsEnabled ? 
                '<i class="fas fa-pause"></i> Pausar Animaciones' : 
                '<i class="fas fa-play"></i> Activar Animaciones';
        });

        // Mezclar juegos
        shuffleBtn.addEventListener('click', () => {
            games.sort(() => Math.random() - 0.5);
            renderGallery();
            
            // Animación de shuffle
            gallery.style.transform = 'scale(0.95)';
            setTimeout(() => {
                gallery.style.transform = 'scale(1)';
            }, 300);
        });

        // Cerrar lightbox con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Click fuera del lightbox para cerrar
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Configurar carrusel
    function setupCarousel() {
        carouselPrev.addEventListener('click', () => {
            const totalItems = carouselTrack.children.length;
            currentCarouselIndex = (currentCarouselIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        carouselNext.addEventListener('click', () => {
            const totalItems = carouselTrack.children.length;
            currentCarouselIndex = (currentCarouselIndex + 1) % totalItems;
            updateCarousel();
        });

        // Auto slide para carrusel
        setInterval(() => {
            if (currentView === 'carousel' && carouselTrack.children.length > 1) {
                const totalItems = carouselTrack.children.length;
                currentCarouselIndex = (currentCarouselIndex + 1) % totalItems;
                updateCarousel();
            }
        }, 5000);
    }

    // Iniciar la aplicación
    init();
});