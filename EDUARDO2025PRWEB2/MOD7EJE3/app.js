// Datos de juegos para la galería
const gamesData = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        description: "Un RPG de acción en un mundo abierto ambientado en Night City.",
        genre: "scifi",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
        year: 2020,
        developer: "CD Projekt Red",
        rating: 4.2
    },
    {
        id: 2,
        title: "The Legend of Zelda",
        description: "Aventura épica en el reino de Hyrule.",
        genre: "fantasy",
        image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=800&fit=crop",
        year: 2017,
        developer: "Nintendo",
        rating: 4.9
    },
    {
        id: 3,
        title: "Call of Duty",
        description: "FPS multijugador con acción intensa.",
        genre: "action",
        image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w-800&h=500&fit=crop",
        year: 2022,
        developer: "Infinity Ward",
        rating: 4.3
    },
    {
        id: 4,
        title: "Final Fantasy XVI",
        description: "Nueva entrega de la legendaria saga de RPG.",
        genre: "rpg",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&h=900&fit=crop",
        year: 2023,
        developer: "Square Enix",
        rating: 4.7
    },
    {
        id: 5,
        title: "Resident Evil 4",
        description: "Remake del clásico juego de survival horror.",
        genre: "horror",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&h=600&fit=crop",
        year: 2023,
        developer: "Capcom",
        rating: 4.8
    },
    {
        id: 6,
        title: "FIFA 23",
        description: "El mejor simulador de fútbol del mundo.",
        genre: "sports",
        image: "https://images.unsplash.com/photo-1533237264987-ae43347ae3c3?w=800&h=500&fit=crop",
        year: 2022,
        developer: "EA Sports",
        rating: 4.1
    },
    {
        id: 7,
        title: "Elden Ring",
        description: "RPG de acción en un mundo de fantasía oscura.",
        genre: "fantasy",
        image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w-700&h=1000&fit=crop",
        year: 2022,
        developer: "FromSoftware",
        rating: 4.9
    },
    {
        id: 8,
        title: "Starfield",
        description: "Exploración espacial en un RPG de próxima generación.",
        genre: "scifi",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=900&h=700&fit=crop",
        year: 2023,
        developer: "Bethesda",
        rating: 4.6
    },
    {
        id: 9,
        title: "God of War Ragnarök",
        description: "Continuación de la épica aventura nórdica de Kratos.",
        genre: "action",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        year: 2022,
        developer: "Santa Monica Studio",
        rating: 4.8
    },
    {
        id: 10,
        title: "Hogwarts Legacy",
        description: "Aventura mágica en el mundo de Harry Potter.",
        genre: "fantasy",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&h=900&fit=crop",
        year: 2023,
        developer: "Avalanche Software",
        rating: 4.5
    },
    {
        id: 11,
        title: "Street Fighter 6",
        description: "Nuevo capítulo de la legendaria saga de lucha.",
        genre: "action",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=500&fit=crop",
        year: 2023,
        developer: "Capcom",
        rating: 4.4
    },
    {
        id: 12,
        title: "Diablo IV",
        description: "Regreso al oscuro mundo de Santuario.",
        genre: "rpg",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&h=600&fit=crop",
        year: 2023,
        developer: "Blizzard",
        rating: 4.7
    },
    {
        id: 13,
        title: "NBA 2K23",
        description: "Simulador de baloncesto con gráficos realistas.",
        genre: "sports",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w-800&h=500&fit=crop",
        year: 2022,
        developer: "Visual Concepts",
        rating: 4.0
    },
    {
        id: 14,
        title: "Dead Space",
        description: "Remake del clásico survival horror espacial.",
        genre: "horror",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=850&h=550&fit=crop",
        year: 2023,
        developer: "Motive Studio",
        rating: 4.6
    },
    {
        id: 15,
        title: "Baldur's Gate 3",
        description: "RPG basado en D&D con decisiones que importan.",
        genre: "rpg",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=750&h=950&fit=crop",
        year: 2023,
        developer: "Larian Studios",
        rating: 4.9
    },
    {
        id: 16,
        title: "Marvel's Spider-Man 2",
        description: "Aventura de Spider-Man con nuevos villanos.",
        genre: "action",
        image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w-800&h=600&fit=crop",
        year: 2023,
        developer: "Insomniac Games",
        rating: 4.8
    },
    {
        id: 17,
        title: "Star Wars Jedi: Survivor",
        description: "Aventura de acción en el universo Star Wars.",
        genre: "scifi",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=900&h=650&fit=crop",
        year: 2023,
        developer: "Respawn Entertainment",
        rating: 4.7
    },
    {
        id: 18,
        title: "Forza Motorsport",
        description: "Simulador de carreras con gráficos fotorealistas.",
        genre: "sports",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w-800&h=500&fit=crop",
        year: 2023,
        developer: "Turn 10 Studios",
        rating: 4.5
    },
    {
        id: 19,
        title: "Alan Wake 2",
        description: "Sequel del thriller psicológico de culto.",
        genre: "horror",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
        year: 2023,
        developer: "Remedy Entertainment",
        rating: 4.6
    },
    {
        id: 20,
        title: "Final Fantasy VII Rebirth",
        description: "Segunda parte del remake de FFVII.",
        genre: "rpg",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=1000&fit=crop",
        year: 2024,
        developer: "Square Enix",
        rating: 4.8
    },
    {
        id: 21,
        title: "Assassin's Creed Mirage",
        description: "Regreso a los orígenes de la saga.",
        genre: "action",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=850&h=550&fit=crop",
        year: 2023,
        developer: "Ubisoft",
        rating: 4.3
    },
    {
        id: 22,
        title: "Persona 5 Royal",
        description: "Mejorada versión del RPG japonés de culto.",
        genre: "rpg",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&h=900&fit=crop",
        year: 2022,
        developer: "Atlus",
        rating: 4.9
    },
    {
        id: 23,
        title: "The Last of Us Part I",
        description: "Remake del aclamado juego de supervivencia.",
        genre: "action",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=700&fit=crop",
        year: 2022,
        developer: "Naughty Dog",
        rating: 4.7
    },
    {
        id: 24,
        title: "Gran Turismo 7",
        description: "Simulador de conducción para puristas.",
        genre: "sports",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w-900&h=500&fit=crop",
        year: 2022,
        developer: "Polyphony Digital",
        rating: 4.4
    }
];

// Aplicación principal
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentFilter = 'all';
    let currentEffect = 'zoom';
    let currentView = 'masonry';
    let selectedCards = new Set();
    let searchQuery = '';
    
    // Elementos del DOM
    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const effectBtns = document.querySelectorAll('.filter-btn[data-effect]');
    const viewBtns = document.querySelectorAll('.view-btn');
    const searchInput = document.getElementById('search-input');
    const imageCount = document.getElementById('image-count');
    const selectedCount = document.getElementById('selected-count');
    const filterToggle = document.getElementById('filter-toggle');
    const filtersContainer = document.getElementById('filters-container');
    const themeToggle = document.getElementById('theme-toggle');
    const imageModal = document.getElementById('image-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Inicializar la galería
    function init() {
        // Generar cards
        generateGalleryCards();
        
        // Actualizar contadores
        updateCounters();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Configurar tema
        setupTheme();
        
        // Configurar scroll
        setupScroll();
    }
    
    // Generar cards de la galería
    function generateGalleryCards() {
        galleryGrid.innerHTML = '';
        
        // Filtrar juegos
        const filteredGames = gamesData.filter(game => {
            const matchesFilter = currentFilter === 'all' || game.genre === currentFilter;
            const matchesSearch = searchQuery === '' || 
                game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
        
        // Crear cards
        filteredGames.forEach(game => {
            const card = createCard(game);
            galleryGrid.appendChild(card);
        });
        
        // Actualizar contador
        imageCount.textContent = filteredGames.length;
    }
    
    // Crear una card
    function createCard(game) {
        const card = document.createElement('article');
        const sizeClass = getRandomSizeClass();
        
        card.className = `card ${sizeClass} effect-${currentEffect}`;
        card.dataset.id = game.id;
        card.dataset.genre = game.genre;
        
        card.innerHTML = `
            <div class="card-loading">
                <div class="loader"></div>
            </div>
            <img src="${game.image}" alt="${game.title}" class="card-image" loading="lazy">
            <div class="card-content">
                <h3 class="card-title">${game.title}</h3>
                <p class="card-description">${game.description}</p>
                <div class="card-meta">
                    <span><i class="fas fa-calendar"></i> ${game.year}</span>
                    <span><i class="fas fa-star"></i> ${game.rating}/5</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-icon-card" data-action="favorite" title="Agregar a favoritos">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn-icon-card" data-action="select" title="Seleccionar">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-icon-card" data-action="expand" title="Ampliar">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;
        
        // Eliminar overlay de carga cuando la imagen se cargue
        const img = card.querySelector('.card-image');
        const loadingOverlay = card.querySelector('.card-loading');
        
        img.addEventListener('load', () => {
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        if (loadingOverlay.parentNode) {
                            loadingOverlay.remove();
                        }
                    }, 300);
                }
            }, 500); // Retraso para efecto visual
        });
        
        // Manejar clic en la card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-icon-card')) {
                openModal(game);
            }
        });
        
        // Manejar acciones de botones
        const actionBtns = card.querySelectorAll('.btn-icon-card');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                handleCardAction(action, card, game);
            });
        });
        
        return card;
    }
    
    // Obtener clase de tamaño aleatorio
    function getRandomSizeClass() {
        const sizes = ['card-small', 'card-medium', 'card-large', 'card-extra-large'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }
    
    // Manejar acciones de card
    function handleCardAction(action, card, game) {
        switch(action) {
            case 'favorite':
                toggleFavorite(card);
                break;
            case 'select':
                toggleSelect(card);
                break;
            case 'expand':
                openModal(game);
                break;
        }
    }
    
    // Alternar favorito
    function toggleFavorite(card) {
        const heartIcon = card.querySelector('.fa-heart');
        heartIcon.classList.toggle('fas');
        heartIcon.classList.toggle('far');
        
        if (heartIcon.classList.contains('fas')) {
            showNotification(`${card.querySelector('.card-title').textContent} agregado a favoritos`, 'success');
        }
    }
    
    // Alternar selección
    function toggleSelect(card) {
        const cardId = card.dataset.id;
        
        if (selectedCards.has(cardId)) {
            selectedCards.delete(cardId);
            card.classList.remove('selected');
        } else {
            selectedCards.add(cardId);
            card.classList.add('selected');
        }
        
        updateSelectedCount();
    }
    
    // Actualizar contador de seleccionadas
    function updateSelectedCount() {
        selectedCount.textContent = selectedCards.size;
    }
    
    // Actualizar todos los contadores
    function updateCounters() {
        updateSelectedCount();
    }
    
    // Abrir modal con imagen
    function openModal(game) {
        modalImage.src = game.image;
        modalTitle.textContent = game.title;
        
        // Actualizar información del juego en el modal
        const modalInfo = imageModal.querySelector('.game-info');
        modalInfo.innerHTML = `
            <h3>Información del Juego</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label"><i class="fas fa-calendar"></i> Lanzamiento:</span>
                    <span class="info-value">${game.year}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fas fa-gamepad"></i> Género:</span>
                    <span class="info-value">${getGenreName(game.genre)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fas fa-star"></i> Rating:</span>
                    <span class="info-value">${game.rating}/5</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fas fa-user"></i> Desarrollador:</span>
                    <span class="info-value">${game.developer}</span>
                </div>
            </div>
            <p class="game-description">${game.description}</p>
        `;
        
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Obtener nombre del género
    function getGenreName(genre) {
        const genres = {
            'rpg': 'RPG',
            'action': 'Acción',
            'fantasy': 'Fantasía',
            'scifi': 'Ciencia Ficción',
            'horror': 'Horror',
            'sports': 'Deportes'
        };
        return genres[genre] || genre;
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Filtros por género
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones de filtro
                filterBtns.forEach(b => b.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                // Actualizar filtro actual
                currentFilter = this.dataset.filter;
                // Regenerar galería
                generateGalleryCards();
            });
        });
        
        // Filtros por efecto
        effectBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones de efecto
                effectBtns.forEach(b => b.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                // Actualizar efecto actual
                currentEffect = this.dataset.effect;
                // Aplicar efecto a todas las cards
                document.querySelectorAll('.card').forEach(card => {
                    // Remover todas las clases de efecto
                    card.classList.remove('effect-zoom', 'effect-tilt', 'effect-glitch', 'effect-neon', 'effect-grayscale');
                    // Agregar nueva clase de efecto
                    card.classList.add(`effect-${currentEffect}`);
                });
            });
        });
        
        // Vista de galería
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones de vista
                viewBtns.forEach(b => b.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                // Actualizar vista actual
                currentView = this.dataset.view;
                // Aplicar clase de vista a la galería
                galleryGrid.className = `gallery-grid ${currentView}-view`;
            });
        });
        
        // Búsqueda
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            generateGalleryCards();
        });
        
        // Toggle de filtros
        filterToggle.addEventListener('click', function() {
            filtersContainer.classList.toggle('active');
        });
        
        // Cerrar modal
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                imageModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Cerrar modal al hacer clic fuera
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Efectos de imagen en el modal
        const effectBtnsModal = imageModal.querySelectorAll('.effect-btn');
        effectBtnsModal.forEach(btn => {
            btn.addEventListener('click', function() {
                const effect = this.dataset.effect;
                applyImageEffect(effect);
            });
        });
        
        // Botón de subir
        document.getElementById('upload-btn').addEventListener('click', function() {
            showNotification('Función de subir imagen deshabilitada en demo', 'info');
        });
    }
    
    // Aplicar efecto a imagen en modal
    function applyImageEffect(effect) {
        const img = modalImage;
        
        // Remover todas las clases de filtro
        img.classList.remove('effect-original', 'effect-vintage', 'effect-crisp', 'effect-warm');
        
        // Agregar nueva clase
        img.classList.add(`effect-${effect}`);
        
        // Aplicar filtro CSS
        let filter = '';
        switch(effect) {
            case 'vintage':
                filter = 'sepia(0.5) contrast(1.2) brightness(0.9)';
                break;
            case 'crisp':
                filter = 'contrast(1.3) saturate(1.2)';
                break;
            case 'warm':
                filter = 'brightness(1.1) saturate(1.3) hue-rotate(-10deg)';
                break;
            default:
                filter = 'none';
        }
        
        img.style.filter = filter;
    }
    
    // Configurar tema
    function setupTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        
        // Actualizar icono del botón de tema
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Toggle de tema
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Actualizar icono
            const icon = this.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            
            showNotification(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'info');
        });
    }
    
    // Configurar scroll
    function setupScroll() {
        // Botón scroll to top
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mostrar notificación
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        
        // Añadir animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Botón para cerrar
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 4000);
    }
    
    // Inicializar aplicación
    init();
});