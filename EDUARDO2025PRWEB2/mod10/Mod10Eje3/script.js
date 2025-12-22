// Datos de ejemplo de productos
const productsData = [
    {
        id: 1,
        name: "Laptop Gaming Pro",
        category: "electronics",
        price: 1299.99,
        originalPrice: 1499.99,
        rating: 4.5,
        ratingCount: 128,
        description: "Laptop gaming con procesador i7, 16GB RAM, SSD 512GB, RTX 3060",
        shipping: "free",
        condition: "new",
        discount: 15,
        tags: ["gaming", "portátil", "alta gama"]
    },
    {
        id: 2,
        name: "Camisa Casual de Algodón",
        category: "clothing",
        price: 34.99,
        originalPrice: 49.99,
        rating: 4.2,
        ratingCount: 89,
        description: "Camisa 100% algodón, disponible en varios colores",
        shipping: "fast",
        condition: "new",
        discount: 30,
        tags: ["ropa", "casual", "algodón"]
    },
    {
        id: 3,
        name: "Sofá Moderno 3 Plazas",
        category: "home",
        price: 699.99,
        originalPrice: 899.99,
        rating: 4.7,
        ratingCount: 42,
        description: "Sofá moderno con tapizado en tela resistente",
        shipping: "pickup",
        condition: "new",
        discount: 22,
        tags: ["hogar", "muebles", "living"]
    },
    {
        id: 4,
        name: "Smartphone 5G 128GB",
        category: "electronics",
        price: 799.99,
        rating: 4.4,
        ratingCount: 215,
        description: "Teléfono inteligente con cámara triple, batería de larga duración",
        shipping: "free",
        condition: "refurbished",
        tags: ["tecnología", "móvil", "5G"]
    },
    {
        id: 5,
        name: "Zapatillas Deportivas Running",
        category: "clothing",
        price: 89.99,
        rating: 4.6,
        ratingCount: 156,
        description: "Zapatillas ideales para running, con amortiguación superior",
        shipping: "fast",
        condition: "new",
        tags: ["deportes", "calzado", "running"]
    },
    {
        id: 6,
        name: "Set de Ollas Antiadherentes",
        category: "home",
        price: 129.99,
        originalPrice: 169.99,
        rating: 4.3,
        ratingCount: 67,
        description: "Set de 5 piezas con revestimiento antiadherente premium",
        shipping: "free",
        condition: "new",
        discount: 24,
        tags: ["cocina", "utensilios", "antiadherente"]
    },
    {
        id: 7,
        name: "Auriculares Bluetooth Noise Cancelling",
        category: "electronics",
        price: 249.99,
        rating: 4.8,
        ratingCount: 189,
        description: "Auriculares con cancelación activa de ruido y 30h de batería",
        shipping: "fast",
        condition: "new",
        tags: ["audio", "inalámbrico", "calidad"]
    },
    {
        id: 8,
        name: "Chaqueta Impermeable Ligera",
        category: "clothing",
        price: 74.99,
        originalPrice: 99.99,
        rating: 4.1,
        ratingCount: 53,
        description: "Chaqueta impermeable y transpirable, ideal para outdoor",
        shipping: "free",
        condition: "new",
        discount: 25,
        tags: ["outdoor", "impermeable", "chaqueta"]
    },
    {
        id: 9,
        name: "Lámpara de Mesa LED",
        category: "home",
        price: 39.99,
        rating: 4.5,
        ratingCount: 124,
        description: "Lámpara LED regulable con múltiples temperaturas de color",
        shipping: "free",
        condition: "new",
        tags: ["iluminación", "LED", "decoración"]
    },
    {
        id: 10,
        name: "Tablet 10.1\" 64GB",
        category: "electronics",
        price: 329.99,
        originalPrice: 399.99,
        rating: 4.0,
        ratingCount: 78,
        description: "Tablet con pantalla Full HD, ideal para multimedia",
        shipping: "free",
        condition: "refurbished",
        discount: 18,
        tags: ["tablet", "multimedia", "portátil"]
    },
    {
        id: 11,
        name: "Reloj Inteligente Deportivo",
        category: "electronics",
        price: 199.99,
        rating: 4.7,
        ratingCount: 231,
        description: "Reloj con monitor de frecuencia cardíaca y GPS integrado",
        shipping: "fast",
        condition: "new",
        tags: ["wearable", "deportes", "smartwatch"]
    },
    {
        id: 12,
        name: "Mesa de Centro Moderna",
        category: "home",
        price: 189.99,
        rating: 4.4,
        ratingCount: 45,
        description: "Mesa de centro con diseño minimalista y almacenamiento",
        shipping: "pickup",
        condition: "new",
        tags: ["muebles", "sala", "almacenamiento"]
    },
    {
        id: 13,
        name: "Monitor Gaming 27\" 144Hz",
        category: "electronics",
        price: 399.99,
        originalPrice: 499.99,
        rating: 4.8,
        ratingCount: 187,
        description: "Monitor gaming con alta tasa de refresco y resolución QHD",
        shipping: "fast",
        condition: "new",
        discount: 20,
        tags: ["gaming", "monitor", "alta tasa de refresco"]
    },
    {
        id: 14,
        name: "Jeans Slim Fit",
        category: "clothing",
        price: 59.99,
        rating: 4.3,
        ratingCount: 92,
        description: "Jeans de corte slim fit, material elástico para mayor comodidad",
        shipping: "free",
        condition: "new",
        tags: ["ropa", "jeans", "slim fit"]
    },
    {
        id: 15,
        name: "Robot Aspirador Inteligente",
        category: "home",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.6,
        ratingCount: 156,
        description: "Aspirador robot con mapeo láser y control por app",
        shipping: "free",
        condition: "new",
        discount: 25,
        tags: ["hogar", "robot", "limpieza"]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Variables de estado
    let currentPage = 1;
    let itemsPerPage = 12;
    let totalPages = 1;
    let currentProducts = [...productsData];
    let activeFilters = {
        minPrice: 0,
        maxPrice: 1000,
        minRating: 0
    };
    let darkTheme = localStorage.getItem('darkTheme') === 'true';
    let currentView = 'grid'; // 'grid' o 'list'
    
    // Elementos del DOM
    const filterForm = document.getElementById('filterForm');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsTime = document.getElementById('resultsTime');
    const pageInfo = document.getElementById('pageInfo');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const firstPageBtn = document.getElementById('firstPageBtn');
    const lastPageBtn = document.getElementById('lastPageBtn');
    const themeBtn = document.getElementById('themeBtn');
    const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const saveFiltersBtn = document.getElementById('saveFiltersBtn');
    const exportResultsBtn = document.getElementById('exportResultsBtn');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const activeFiltersCount = document.getElementById('activeFiltersCount');
    const clearActiveBtn = document.getElementById('clearActiveBtn');
    const toast = document.getElementById('toast');
    const savedFiltersModal = document.getElementById('savedFiltersModal');
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');
    const savedFiltersList = document.getElementById('savedFiltersList');
    const filterNameInput = document.getElementById('filterName');
    const saveCurrentBtn = document.getElementById('saveCurrentBtn');
    
    // Elementos de filtros
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceRangeMin = document.getElementById('priceRangeMin');
    const priceRangeMax = document.getElementById('priceRangeMax');
    const priceDisplay = document.getElementById('priceDisplay');
    const rangeFill = document.getElementById('rangeFill');
    const perPageSelect = document.getElementById('perPage');
    const sortSelect = document.getElementById('sort');
    const toggleSortBtn = document.getElementById('toggleSortBtn');
    const shippingSelect = document.getElementById('shipping');
    const toggleShippingBtn = document.getElementById('toggleShippingBtn');
    const randomCategoryBtn = document.getElementById('randomCategoryBtn');
    
    // Botones de vista
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    
    // Botones de filtros rápidos
    const quickFilterButtons = document.querySelectorAll('.btn-quick-filter');
    const ratingButtons = document.querySelectorAll('.btn-rating');
    
    // Inicializar
    initializeApp();
    
    function initializeApp() {
        updateTheme();
        setupEventListeners();
        updatePriceRange();
        applyFilters();
        updateActiveFiltersCount();
    }
    
    function setupEventListeners() {
        // Navegación y paginación
        prevBtn.addEventListener('click', () => changePage(currentPage - 1));
        nextBtn.addEventListener('click', () => changePage(currentPage + 1));
        firstPageBtn.addEventListener('click', () => changePage(1));
        lastPageBtn.addEventListener('click', () => changePage(totalPages));
        perPageSelect.addEventListener('change', updateItemsPerPage);
        scrollTopBtn.addEventListener('click', scrollToTop);
        
        // Tema y vista
        themeBtn.addEventListener('click', toggleTheme);
        gridViewBtn.addEventListener('click', () => switchView('grid'));
        listViewBtn.addEventListener('click', () => switchView('list'));
        
        // Filtros
        filterForm.addEventListener('submit', handleFilterSubmit);
        searchInput.addEventListener('input', debounce(applyFilters, 300));
        categorySelect.addEventListener('change', applyFilters);
        sortSelect.addEventListener('change', applyFilters);
        shippingSelect.addEventListener('change', applyFilters);
        
        // Precios
        minPriceInput.addEventListener('input', updatePriceFromInputs);
        maxPriceInput.addEventListener('input', updatePriceFromInputs);
        priceRangeMin.addEventListener('input', updatePriceFromSliders);
        priceRangeMax.addEventListener('input', updatePriceFromSliders);
        
        // Botones de acción
        clearSearchBtn.addEventListener('click', clearSearch);
        clearAllBtn.addEventListener('click', clearAllFilters);
        saveFiltersBtn.addEventListener('click', () => openModal(savedFiltersModal));
        exportResultsBtn.addEventListener('click', exportResults);
        toggleFiltersBtn.addEventListener('click', toggleFiltersPanel);
        clearActiveBtn.addEventListener('click', clearActiveFilters);
        toggleSortBtn.addEventListener('click', toggleSortOrder);
        toggleShippingBtn.addEventListener('click', toggleShipping);
        randomCategoryBtn.addEventListener('click', selectRandomCategory);
        
        // Filtros rápidos
        quickFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => applyQuickFilter(btn.dataset.filter));
        });
        
        ratingButtons.forEach(btn => {
            btn.addEventListener('click', () => selectRating(btn.dataset.rating));
        });
        
        // Checkboxes
        document.querySelectorAll('input[name="new"], input[name="used"], input[name="refurbished"]')
            .forEach(cb => {
                cb.addEventListener('change', applyFilters);
            });
        
        // Modal de filtros guardados
        closeFiltersBtn.addEventListener('click', () => closeModal(savedFiltersModal));
        saveCurrentBtn.addEventListener('click', saveCurrentFilters);
        
        // Cerrar modal al hacer clic fuera
        savedFiltersModal.addEventListener('click', (e) => {
            if (e.target === savedFiltersModal) {
                closeModal(savedFiltersModal);
            }
        });
        
        // Cargar filtros guardados
        loadSavedFilters();
        
        // Tooltips de ayuda
        setupHelpTooltips();
    }
    
    function toggleTheme() {
        darkTheme = !darkTheme;
        localStorage.setItem('darkTheme', darkTheme);
        updateTheme();
    }
    
    function updateTheme() {
        if (darkTheme) {
            document.body.classList.add('dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.title = 'Cambiar a tema claro';
        } else {
            document.body.classList.remove('dark-theme');
            themeBtn.textContent = '🌙';
            themeBtn.title = 'Cambiar a tema oscuro';
        }
    }
    
    function toggleFiltersPanel() {
        const filtersPanel = document.querySelector('.filters-panel');
        filtersPanel.classList.toggle('active');
        
        const icon = toggleFiltersBtn.textContent;
        toggleFiltersBtn.textContent = icon === '🔍' ? '✕' : '🔍';
        toggleFiltersBtn.title = icon === '🔍' ? 'Cerrar filtros' : 'Mostrar filtros';
    }
    
    function switchView(view) {
        currentView = view;
        resultsContainer.className = `results-grid ${view}-view`;
        
        gridViewBtn.classList.toggle('active', view === 'grid');
        listViewBtn.classList.toggle('active', view === 'list');
        
        renderProducts();
    }
    
    function updatePriceFromSliders() {
        const min = parseInt(priceRangeMin.value);
        const max = parseInt(priceRangeMax.value);
        
        // Asegurar que min <= max
        if (min > max) {
            priceRangeMin.value = max;
            minPriceInput.value = max;
        } else {
            minPriceInput.value = min;
        }
        
        if (max < min) {
            priceRangeMax.value = min;
            maxPriceInput.value = min;
        } else {
            maxPriceInput.value = max;
        }
        
        updatePriceRange();
        applyFilters();
    }
    
    function updatePriceFromInputs() {
        let min = parseInt(minPriceInput.value) || 0;
        let max = parseInt(maxPriceInput.value) || 1000;
        
        // Validar límites
        min = Math.max(0, Math.min(1000, min));
        max = Math.max(0, Math.min(1000, max));
        
        // Asegurar que min <= max
        if (min > max) {
            min = max;
            minPriceInput.value = min;
        }
        
        if (max < min) {
            max = min;
            maxPriceInput.value = max;
        }
        
        priceRangeMin.value = min;
        priceRangeMax.value = max;
        
        updatePriceRange();
        applyFilters();
    }
    
    function updatePriceRange() {
        const min = parseInt(priceRangeMin.value);
        const max = parseInt(priceRangeMax.value);
        
        priceDisplay.textContent = `$${min} - $${max}`;
        
        // Actualizar fill del rango
        const minPercent = (min / 1000) * 100;
        const maxPercent = (max / 1000) * 100;
        rangeFill.style.left = `${minPercent}%`;
        rangeFill.style.width = `${maxPercent - minPercent}%`;
        
        // Actualizar filtros activos
        activeFilters.minPrice = min;
        activeFilters.maxPrice = max;
    }
    
    function selectRating(rating) {
        ratingButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.rating === rating);
        });
        
        activeFilters.minRating = parseInt(rating);
        applyFilters();
    }
    
    function applyQuickFilter(filterType) {
        switch(filterType) {
            case 'discount':
                activeFilters.discount = true;
                searchInput.value = '';
                categorySelect.value = '';
                break;
            case 'popular':
                sortSelect.value = 'rating';
                activeFilters.popular = true;
                break;
            case 'new':
                document.getElementById('newCheckbox').checked = true;
                sortSelect.value = 'newest';
                break;
        }
        
        applyFilters();
        showToast(`Filtro "${filterType}" aplicado`, 'info');
    }
    
    function clearSearch() {
        searchInput.value = '';
        applyFilters();
        showToast('Búsqueda limpiada', 'info');
    }
    
    function clearAllFilters() {
        // Restablecer todos los controles
        searchInput.value = '';
        categorySelect.value = '';
        minPriceInput.value = 0;
        maxPriceInput.value = 1000;
        priceRangeMin.value = 0;
        priceRangeMax.value = 1000;
        sortSelect.value = 'relevance';
        shippingSelect.value = '';
        
        // Restablecer botones de rating
        ratingButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.rating === '0');
        });
        
        // Restablecer checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Restablecer filtros activos
        activeFilters = {
            minPrice: 0,
            maxPrice: 1000,
            minRating: 0
        };
        
        updatePriceRange();
        applyFilters();
        showToast('Todos los filtros limpiados', 'info');
    }
    
    function clearActiveFilters() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selects = document.querySelectorAll('select:not([id="perPage"])');
        
        checkboxes.forEach(cb => cb.checked = false);
        selects.forEach(select => select.value = '');
        
        activeFilters = {
            minPrice: 0,
            maxPrice: 1000,
            minRating: 0
        };
        
        applyFilters();
    }
    
    function toggleSortOrder() {
        const currentSort = sortSelect.value;
        const sortOptions = ['relevance', 'price_asc', 'price_desc', 'rating', 'newest'];
        const currentIndex = sortOptions.indexOf(currentSort);
        const nextIndex = (currentIndex + 1) % sortOptions.length;
        
        sortSelect.value = sortOptions[nextIndex];
        applyFilters();
    }
    
    function toggleShipping() {
        const currentValue = shippingSelect.value;
        const options = ['', 'free', 'fast', 'pickup'];
        const currentIndex = options.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % options.length;
        
        shippingSelect.value = options[nextIndex];
        applyFilters();
    }
    
    function selectRandomCategory() {
        const categories = categorySelect.options;
        const randomIndex = Math.floor(Math.random() * categories.length);
        categorySelect.value = categories[randomIndex].value;
        applyFilters();
        
        showToast(`Categoría seleccionada: ${categories[randomIndex].text}`, 'info');
    }
    
    function handleFilterSubmit(e) {
        e.preventDefault();
        applyFilters();
    }
    
    function applyFilters() {
        const startTime = performance.now();
        
        // Obtener valores actuales
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || 1000;
        const rating = activeFilters.minRating || 0;
        const sortBy = sortSelect.value;
        const shipping = shippingSelect.value;
        const conditionNew = document.getElementById('newCheckbox').checked;
        const conditionUsed = document.getElementById('usedCheckbox').checked;
        const conditionRefurbished = document.getElementById('refurbishedCheckbox').checked;
        
        // Filtrar productos
        let filtered = productsData.filter(product => {
            // Filtro por búsqueda
            if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
                !product.description.toLowerCase().includes(searchTerm) &&
                !product.tags.some(tag => tag.includes(searchTerm))) {
                return false;
            }
            
            // Filtro por categoría
            if (category && product.category !== category) {
                return false;
            }
            
            // Filtro por precio
            if (product.price < minPrice || product.price > maxPrice) {
                return false;
            }
            
            // Filtro por rating
            if (rating > 0 && product.rating < rating) {
                return false;
            }
            
            // Filtro por envío
            if (shipping && product.shipping !== shipping) {
                return false;
            }
            
            // Filtro por condición
            const conditionFilters = {
                new: conditionNew,
                used: conditionUsed,
                refurbished: conditionRefurbished
            };
            
            const hasConditionFilter = conditionNew || conditionUsed || conditionRefurbished;
            if (hasConditionFilter && !conditionFilters[product.condition]) {
                return false;
            }
            
            // Filtro por descuento (si está activo)
            if (activeFilters.discount && !product.discount) {
                return false;
            }
            
            return true;
        });
        
        // Ordenar resultados
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id; // Asumiendo que ID más alto = más nuevo
                default:
                    return 0; // relevancia (mantener orden original)
            }
        });
        
        // Actualizar productos actuales y paginación
        currentProducts = filtered;
        totalPages = Math.ceil(filtered.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages || 1);
        
        // Renderizar resultados
        renderProducts();
        updatePagination();
        updateResultsInfo(filtered.length, performance.now() - startTime);
        updateActiveFiltersCount();
    }
    
    function renderProducts() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageProducts = currentProducts.slice(startIndex, endIndex);
        
        if (pageProducts.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">😕</div>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta ajustar los filtros de búsqueda</p>
                    <button class="btn-primary" id="resetFiltersBtn">Restablecer filtros</button>
                </div>
            `;
            
            document.getElementById('resetFiltersBtn')?.addEventListener('click', clearAllFilters);
            return;
        }
        
        resultsContainer.innerHTML = pageProducts.map(product => `
            <div class="product-card ${currentView}-view">
                ${product.discount ? `<span class="product-badge">-${product.discount}%</span>` : ''}
                <button class="product-favorite" data-id="${product.id}">🤍</button>
                
                <div class="product-image">
                    ${getProductIcon(product.category)}
                </div>
                
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-category">${getCategoryName(product.category)}</span>
                    
                    ${currentView === 'list' ? `
                        <p class="product-description">${product.description}</p>
                    ` : ''}
                    
                    <div class="product-price">
                        <span class="price-current">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `
                            <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
                        ` : ''}
                    </div>
                    
                    <div class="product-rating">
                        <div class="stars">${getStarRating(product.rating)}</div>
                        <span class="rating-count">(${product.ratingCount})</span>
                    </div>
                    
                    <div class="product-shipping">
                        ${getShippingIcon(product.shipping)}
                        <span>${getShippingText(product.shipping)}</span>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn-cart" data-id="${product.id}">🛒 Añadir</button>
                        <button class="btn-details" data-id="${product.id}">📖 Detalles</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Agregar event listeners a los botones de los productos
        document.querySelectorAll('.product-favorite').forEach(btn => {
            btn.addEventListener('click', toggleFavorite);
        });
        
        document.querySelectorAll('.btn-cart').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
        
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', showDetails);
        });
        
        // Actualizar estado de favoritos
        updateFavorites();
    }
    
    function getProductIcon(category) {
        const icons = {
            electronics: '💻',
            clothing: '👕',
            home: '🏠',
            books: '📚',
            sports: '⚽',
            beauty: '💄'
        };
        return icons[category] || '📦';
    }
    
    function getCategoryName(category) {
        const categories = {
            electronics: 'Electrónica',
            clothing: 'Ropa y Accesorios',
            home: 'Hogar y Jardín',
            books: 'Libros',
            sports: 'Deportes',
            beauty: 'Belleza'
        };
        return categories[category] || 'General';
    }
    
    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }
    
    function getShippingIcon(shipping) {
        const icons = {
            free: '🎁',
            fast: '⚡',
            pickup: '🏪'
        };
        return icons[shipping] || '🚚';
    }
    
    function getShippingText(shipping) {
        const texts = {
            free: 'Envío Gratis',
            fast: 'Envío Rápido',
            pickup: 'Recoger en Tienda'
        };
        return texts[shipping] || 'Envío Disponible';
    }
    
    function updateResultsInfo(count, time) {
        resultsCount.textContent = `${count} productos encontrados`;
        resultsTime.textContent = `(${time.toFixed(0)}ms)`;
        
        // Actualizar título según búsqueda
        const searchTerm = searchInput.value;
        if (searchTerm) {
            resultsTitle.textContent = `🔍 Resultados para "${searchTerm}"`;
        } else {
            resultsTitle.textContent = '🔍 Todos los Productos';
        }
    }
    
    function updatePagination() {
        // Actualizar información de página
        pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
        
        // Actualizar estado de botones
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages;
        firstPageBtn.disabled = currentPage <= 1;
        lastPageBtn.disabled = currentPage >= totalPages;
        
        // Generar números de página
        pageNumbers.innerHTML = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            const firstBtn = document.createElement('button');
            firstBtn.className = 'page-number';
            firstBtn.textContent = '1';
            firstBtn.addEventListener('click', () => changePage(1));
            pageNumbers.appendChild(firstBtn);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => changePage(i));
            pageNumbers.appendChild(pageBtn);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
            
            const lastBtn = document.createElement('button');
            lastBtn.className = 'page-number';
            lastBtn.textContent = totalPages;
            lastBtn.addEventListener('click', () => changePage(totalPages));
            pageNumbers.appendChild(lastBtn);
        }
    }
    
    function changePage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        
        currentPage = page;
        renderProducts();
        updatePagination();
        scrollToTop();
        
        showToast(`Página ${page} de ${totalPages}`, 'info');
    }
    
    function updateItemsPerPage() {
        itemsPerPage = parseInt(perPageSelect.value);
        currentPage = 1;
        totalPages = Math.ceil(currentProducts.length / itemsPerPage);
        renderProducts();
        updatePagination();
        
        showToast(`Mostrando ${itemsPerPage} productos por página`, 'info');
    }
    
    function toggleFavorite(e) {
        const button = e.target.closest('.product-favorite');
        const productId = parseInt(button.dataset.id);
        
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const index = favorites.indexOf(productId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            button.textContent = '🤍';
            showToast('Producto eliminado de favoritos', 'info');
        } else {
            favorites.push(productId);
            button.textContent = '❤️';
            showToast('Producto agregado a favoritos', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    function updateFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        document.querySelectorAll('.product-favorite').forEach(button => {
            const productId = parseInt(button.dataset.id);
            if (favorites.includes(productId)) {
                button.textContent = '❤️';
                button.classList.add('active');
            } else {
                button.textContent = '🤍';
                button.classList.remove('active');
            }
        });
    }
    
    function addToCart(e) {
        const productId = parseInt(e.target.dataset.id);
        const product = productsData.find(p => p.id === productId);
        
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        showToast(`"${product.name}" agregado al carrito`, 'success');
        
        // Animación del botón
        const button = e.target;
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Añadido';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    function showDetails(e) {
        const productId = parseInt(e.target.dataset.id);
        const product = productsData.find(p => p.id === productId);
        
        // Crear modal temporal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📋 Detalles del Producto</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <div class="product-details-grid">
                            <div class="detail-item">
                                <strong>Categoría:</strong> ${getCategoryName(product.category)}
                            </div>
                            <div class="detail-item">
                                <strong>Precio:</strong> $${product.price.toFixed(2)}
                                ${product.originalPrice ? 
                                    `<span class="discount-text"> (Descuento: ${product.discount}%)</span>` : ''}
                            </div>
                            <div class="detail-item">
                                <strong>Calificación:</strong> ${product.rating} ⭐ (${product.ratingCount} reseñas)
                            </div>
                            <div class="detail-item">
                                <strong>Descripción:</strong> ${product.description}
                            </div>
                            <div class="detail-item">
                                <strong>Envío:</strong> ${getShippingText(product.shipping)}
                            </div>
                            <div class="detail-item">
                                <strong>Condición:</strong> 
                                ${product.condition === 'new' ? '🆕 Nuevo' : 
                                  product.condition === 'used' ? '🔄 Usado' : '🔧 Reacondicionado'}
                            </div>
                            <div class="detail-item">
                                <strong>Etiquetas:</strong> ${product.tags.map(tag => `#${tag}`).join(' ')}
                            </div>
                        </div>
                        <div class="detail-actions">
                            <button class="btn-primary add-to-cart-details" data-id="${productId}">🛒 Añadir al Carrito</button>
                            <button class="btn-secondary close-details-btn">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.close-details-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.add-to-cart-details').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            showToast(`"${product.name}" agregado al carrito`, 'success');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    function updateActiveFiltersCount() {
        let count = 0;
        
        // Contar filtros activos
        if (searchInput.value) count++;
        if (categorySelect.value) count++;
        if (parseInt(minPriceInput.value) > 0) count++;
        if (parseInt(maxPriceInput.value) < 1000) count++;
        if (activeFilters.minRating > 0) count++;
        if (shippingSelect.value) count++;
        if (document.getElementById('newCheckbox').checked) count++;
        if (document.getElementById('usedCheckbox').checked) count++;
        if (document.getElementById('refurbishedCheckbox').checked) count++;
        if (sortSelect.value !== 'relevance') count++;
        
        activeFiltersCount.textContent = count;
    }
    
    function saveCurrentFilters() {
        const filterName = filterNameInput.value.trim();
        if (!filterName) {
            showToast('Ingresa un nombre para los filtros', 'warning');
            filterNameInput.focus();
            return;
        }
        
        const filters = {
            name: filterName,
            search: searchInput.value,
            category: categorySelect.value,
            minPrice: minPriceInput.value,
            maxPrice: maxPriceInput.value,
            minRating: activeFilters.minRating,
            shipping: shippingSelect.value,
            sort: sortSelect.value,
            new: document.getElementById('newCheckbox').checked,
            used: document.getElementById('usedCheckbox').checked,
            refurbished: document.getElementById('refurbishedCheckbox').checked,
            timestamp: new Date().toISOString()
        };
        
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
        savedFilters.unshift(filters);
        
        if (savedFilters.length > 10) {
            savedFilters.pop();
        }
        
        localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
        filterNameInput.value = '';
        
        loadSavedFilters();
        showToast(`Filtros "${filterName}" guardados`, 'success');
    }
    
    function loadSavedFilters() {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
        
        if (savedFilters.length === 0) {
            savedFiltersList.innerHTML = '<p class="empty-filters">No hay filtros guardados</p>';
            return;
        }
        
        savedFiltersList.innerHTML = savedFilters.map((filter, index) => `
            <div class="saved-filter-item" data-index="${index}">
                <div class="saved-filter-info">
                    <div class="saved-filter-name">${filter.name}</div>
                    <div class="saved-filter-details">
                        ${filter.category ? getCategoryName(filter.category) : 'Todas categorías'} | 
                        $${filter.minPrice}-$${filter.maxPrice} | 
                        ${new Date(filter.timestamp).toLocaleDateString()}
                    </div>
                </div>
                <div class="saved-filter-actions">
                    <button class="btn-input-action load-filter-btn" data-index="${index}">📂</button>
                    <button class="btn-input-action delete-filter-btn" data-index="${index}">🗑️</button>
                </div>
            </div>
        `).join('');
        
        // Event listeners para los botones
        savedFiltersList.querySelectorAll('.load-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                loadFilter(index);
            });
        });
        
        savedFiltersList.querySelectorAll('.delete-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                deleteFilter(index);
            });
        });
        
        savedFiltersList.querySelectorAll('.saved-filter-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.saved-filter-actions')) {
                    const index = parseInt(item.dataset.index);
                    loadFilter(index);
                }
            });
        });
    }
    
    function loadFilter(index) {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
        const filter = savedFilters[index];
        
        if (!filter) return;
        
        // Aplicar filtros guardados
        searchInput.value = filter.search || '';
        categorySelect.value = filter.category || '';
        minPriceInput.value = filter.minPrice || 0;
        maxPriceInput.value = filter.maxPrice || 1000;
        shippingSelect.value = filter.shipping || '';
        sortSelect.value = filter.sort || 'relevance';
        document.getElementById('newCheckbox').checked = filter.new || false;
        document.getElementById('usedCheckbox').checked = filter.used || false;
        document.getElementById('refurbishedCheckbox').checked = filter.refurbished || false;
        
        // Actualizar rating
        ratingButtons.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.rating) === (filter.minRating || 0));
        });
        
        activeFilters.minRating = filter.minRating || 0;
        
        // Actualizar controles de precio
        priceRangeMin.value = filter.minPrice || 0;
        priceRangeMax.value = filter.maxPrice || 1000;
        updatePriceRange();
        
        // Aplicar filtros
        applyFilters();
        closeModal(savedFiltersModal);
        
        showToast(`Filtros "${filter.name}" cargados`, 'success');
    }
    
    function deleteFilter(index) {
        if (!confirm('¿Eliminar estos filtros guardados?')) return;
        
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
        savedFilters.splice(index, 1);
        localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
        
        loadSavedFilters();
        showToast('Filtros eliminados', 'info');
    }
    
    function exportResults() {
        if (currentProducts.length === 0) {
            showToast('No hay resultados para exportar', 'warning');
            return;
        }
        
        const csvContent = [
            ['Nombre', 'Categoría', 'Precio', 'Rating', 'Reseñas', 'Descripción', 'Envío', 'Condición'],
            ...currentProducts.map(product => [
                `"${product.name}"`,
                getCategoryName(product.category),
                product.price,
                product.rating,
                product.ratingCount,
                `"${product.description}"`,
                getShippingText(product.shipping),
                product.condition === 'new' ? 'Nuevo' : product.condition === 'used' ? 'Usado' : 'Reacondicionado'
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resultados-busqueda-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast(`Exportados ${currentProducts.length} productos a CSV`, 'success');
    }
    
    function setupHelpTooltips() {
        const helpButtons = document.querySelectorAll('.input-help');
        
        helpButtons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const helpText = btn.getAttribute('data-help');
                showTooltip(e.target, helpText);
            });
            
            btn.addEventListener('mouseleave', () => {
                hideTooltip();
            });
        });
    }
    
    function showTooltip(element, text) {
        let tooltip = document.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
        }
        
        const rect = element.getBoundingClientRect();
        tooltip.textContent = text;
        tooltip.style.position = 'fixed';
        tooltip.style.background = '#333';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.85rem';
        tooltip.style.zIndex = '9999';
        tooltip.style.maxWidth = '200px';
        tooltip.style.textAlign = 'center';
        tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Posicionar tooltip arriba del elemento
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        tooltip.style.display = 'block';
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = 'toast';
        toast.classList.add(type);
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Función debounce para optimizar búsqueda
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Inyectar estilos CSS adicionales
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .product-details {
            padding: 20px;
        }
        
        .product-details h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.5rem;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
        }
        
        body.dark-theme .product-details h3 {
            color: #e0e0e0;
            border-bottom-color: #404040;
        }
        
        .product-details-grid {
            display: grid;
            gap: 12px;
            margin-bottom: 25px;
        }
        
        .detail-item {
            color: #666;
            line-height: 1.5;
        }
        
        body.dark-theme .detail-item {
            color: #a0a0a0;
        }
        
        .detail-item strong {
            color: #333;
            font-weight: 600;
            margin-right: 5px;
        }
        
        body.dark-theme .detail-item strong {
            color: #e0e0e0;
        }
        
        .discount-text {
            color: #34a853;
            font-weight: bold;
        }
        
        .detail-actions {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }
        
        .detail-actions button {
            flex: 1;
        }
        
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        
        body.dark-theme .no-results {
            background: #2d2d2d;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .no-results-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .no-results h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.4rem;
        }
        
        body.dark-theme .no-results h3 {
            color: #e0e0e0;
        }
        
        .no-results p {
            color: #666;
            margin-bottom: 20px;
            font-size: 1rem;
        }
        
        body.dark-theme .no-results p {
            color: #a0a0a0;
        }
        
        .page-ellipsis {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            color: #666;
            font-weight: bold;
        }
        
        body.dark-theme .page-ellipsis {
            color: #a0a0a0;
        }
        
        .saved-filter-info {
            flex: 1;
        }
        
        .saved-filter-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }
        
        body.dark-theme .saved-filter-name {
            color: #e0e0e0;
        }
        
        .saved-filter-details {
            font-size: 0.85rem;
            color: #666;
        }
        
        body.dark-theme .saved-filter-details {
            color: #a0a0a0;
        }
        
        .product-favorite.active {
            color: #ea4335;
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Inicializar el carrito si no existe
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Inicializar favoritos si no existen
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
    
    // Inicializar filtros guardados si no existen
    if (!localStorage.getItem('savedFilters')) {
        localStorage.setItem('savedFilters', JSON.stringify([]));
    }
});