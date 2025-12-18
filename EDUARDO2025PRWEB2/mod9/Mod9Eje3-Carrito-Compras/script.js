document.addEventListener('DOMContentLoaded', function() {
    // Productos de ejemplo
    const products = [
        {
            id: 1,
            name: "iPhone 14 Pro",
            category: "tecnologia",
            price: 24999,
            oldPrice: 26999,
            description: "El último smartphone de Apple con pantalla Dynamic Island",
            stock: 15,
            imageIcon: "📱",
            popular: true
        },
        {
            id: 2,
            name: "Samsung QLED 4K",
            category: "tecnologia",
            price: 18999,
            oldPrice: 21999,
            description: "TV 55\" con tecnología QLED y resolución 4K",
            stock: 8,
            imageIcon: "📺",
            popular: true
        },
        {
            id: 3,
            name: "Sofá Modular Moderno",
            category: "hogar",
            price: 12499,
            description: "Sofá de 3 piezas con tapiz de tela premium",
            stock: 5,
            imageIcon: "🛋️",
            popular: false
        },
        {
            id: 4,
            name: "Nike Air Max 270",
            category: "ropa",
            price: 2499,
            description: "Zapatillas deportivas con máxima amortiguación",
            stock: 25,
            imageIcon: "👟",
            popular: true
        },
        {
            id: 5,
            name: "Bicicleta Montañera",
            category: "deportes",
            price: 8499,
            oldPrice: 8999,
            description: "Bicicleta de montaña 21 velocidades",
            stock: 3,
            imageIcon: "🚴",
            popular: false
        },
        {
            id: 6,
            name: "MacBook Air M2",
            category: "tecnologia",
            price: 28999,
            description: "Laptop ultradelgada con chip Apple M2",
            stock: 12,
            imageIcon: "💻",
            popular: true
        },
        {
            id: 7,
            name: "Aspiradora Robot",
            category: "hogar",
            price: 4999,
            description: "Aspiradora inteligente con navegación láser",
            stock: 18,
            imageIcon: "🤖",
            popular: true
        },
        {
            id: 8,
            name: "Chaqueta North Face",
            category: "ropa",
            price: 3299,
            oldPrice: 3599,
            description: "Chaqueta impermeable para clima extremo",
            stock: 7,
            imageIcon: "🧥",
            popular: false
        },
        {
            id: 9,
            name: "Mesa de Ping Pong",
            category: "deportes",
            price: 6999,
            description: "Mesa profesional de ping pong plegable",
            stock: 4,
            imageIcon: "🏓",
            popular: false
        },
        {
            id: 10,
            name: "Audífonos Sony WH-1000XM5",
            category: "tecnologia",
            price: 7599,
            description: "Audífonos con cancelación de ruido líder",
            stock: 20,
            imageIcon: "🎧",
            popular: true
        }
    ];

    // Estado del carrito
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentFilter = 'all';
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Elementos del DOM
    const productsGrid = document.getElementById('productsGrid');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const cartCount = document.getElementById('cartCount');
    const productsCount = document.getElementById('productsCount');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('themeToggle');
    const cartIcon = document.getElementById('cartIcon');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const confirmModal = document.getElementById('confirmModal');
    const orderTotal = document.getElementById('orderTotal');
    const orderNumber = document.getElementById('orderNumber');
    const floatingCartIndicator = document.getElementById('floatingCartIndicator');
    const floatingCount = floatingCartIndicator.querySelector('.floating-count');

    // Inicializar
    function init() {
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        renderProducts();
        renderCart();
        updateCartCount();
        updateProductsCount();
        setupEventListeners();
    }

    // Renderizar productos
    function renderProducts() {
        productsGrid.innerHTML = '';
        
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => {
            const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                 product.description.toLowerCase().includes(searchTerm);
            return matchesFilter && matchesSearch;
        });
        
        filteredProducts.forEach((product, index) => {
            const isInCart = cart.some(item => item.id === product.id);
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.style.animationDelay = `${index * 0.1}s`;
            
            const stockClass = product.stock === 0 ? 'out-of-stock' : 
                              product.stock <= 5 ? 'low-stock' : 'in-stock';
            const stockText = product.stock === 0 ? 'Agotado' : 
                             product.stock <= 5 ? `Últimas ${product.stock} unidades` : 
                             `${product.stock} disponibles`;
            
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.imageIcon}
                </div>
                <div class="product-info">
                    <span class="product-category">${getCategoryName(product.category)}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price-section">
                        <div>
                            <span class="product-price">$${product.price.toLocaleString()}</span>
                            ${product.oldPrice ? `<span class="product-old-price">$${product.oldPrice.toLocaleString()}</span>` : ''}
                        </div>
                        <span class="product-stock ${stockClass}">${stockText}</span>
                    </div>
                    <button class="btn-add-cart ${isInCart ? 'added' : ''}" 
                            data-id="${product.id}"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${isInCart ? '<i class="fas fa-check"></i> Agregado' : '<i class="fas fa-cart-plus"></i> Agregar al Carrito'}
                    </button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        updateProductsCount(filteredProducts.length);
    }

    // Renderizar carrito
    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartSummary.style.display = 'none';
            cartItems.innerHTML = `
                <div class="empty-cart-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <small>Agrega productos para continuar</small>
                </div>
            `;
            return;
        }
        
        cartSummary.style.display = 'block';
        
        cart.forEach((item, index) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.style.animationDelay = `${index * 0.05}s`;
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    ${product.imageIcon}
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${product.name}</h4>
                    <div class="cart-item-category">${getCategoryName(product.category)}</div>
                    <div class="cart-item-price">$${product.price.toLocaleString()} c/u</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn minus" data-id="${product.id}">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${product.id}">+</button>
                        <span class="item-total">$${(product.price * item.quantity).toLocaleString()}</span>
                        <button class="btn-remove" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        updateCartSummary();
    }

    // Actualizar resumen del carrito
    function updateCartSummary() {
        const subtotal = cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.id);
            return total + (product.price * item.quantity);
        }, 0);
        
        const tax = subtotal * 0.16;
        const shipping = subtotal > 500 ? 0 : 50;
        const discount = cart.length >= 3 ? subtotal * 0.1 : 0;
        const total = subtotal + tax + shipping - discount;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
        document.getElementById('tax').textContent = `$${tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
        document.getElementById('shipping').textContent = shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
        document.getElementById('discount').textContent = discount > 0 ? `-$${discount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : '$0.00';
        document.getElementById('total').textContent = `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
    }

    // Actualizar contador del carrito
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        floatingCount.textContent = totalItems;
        
        // Animar el contador
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            floatingCartIndicator.style.display = 'flex';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
        } else {
            floatingCartIndicator.style.display = 'none';
        }
    }

    // Actualizar contador de productos
    function updateProductsCount(count) {
        const filteredCount = count || products.length;
        productsCount.textContent = filteredCount;
    }

    // Agregar producto al carrito
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product || product.stock === 0) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert(`Solo tenemos ${product.stock} unidades disponibles de ${product.name}`);
                return;
            }
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        
        saveCart();
        renderCart();
        updateCartCount();
        
        // Animación en el botón
        const addBtn = document.querySelector(`.btn-add-cart[data-id="${productId}"]`);
        if (addBtn) {
            addBtn.classList.add('added');
            addBtn.innerHTML = '<i class="fas fa-check"></i> Agregado';
            setTimeout(() => {
                addBtn.classList.remove('added');
            }, 1000);
        }
    }

    // Actualizar cantidad en carrito
    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;
        
        const product = products.find(p => p.id === productId);
        
        if (change > 0 && item.quantity >= product.stock) {
            alert(`Solo tenemos ${product.stock} unidades disponibles de ${product.name}`);
            return;
        }
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        saveCart();
        renderCart();
        updateCartCount();
    }

    // Eliminar producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
        updateCartCount();
    }

    // Vaciar carrito
    function clearCart() {
        if (cart.length === 0) return;
        
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            cart = [];
            saveCart();
            renderCart();
            updateCartCount();
        }
    }

    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Generar nombre de categoría
    function getCategoryName(category) {
        const categories = {
            'tecnologia': 'Tecnología',
            'hogar': 'Hogar',
            'ropa': 'Ropa',
            'deportes': 'Deportes'
        };
        return categories[category] || category;
    }

    // Cambiar tema
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Proceder al pago
    function checkout() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        const total = document.getElementById('total').textContent;
        orderTotal.textContent = total;
        orderNumber.textContent = `ORD-${Date.now().toString().slice(-6)}`;
        
        confirmModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    function closeModal() {
        confirmModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Continuar comprando
    function continueShopping() {
        closeModal();
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
        renderProducts();
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Botones de filtro
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderProducts();
            });
        });

        // Búsqueda
        searchInput.addEventListener('input', () => {
            renderProducts();
        });

        // Cambiar tema
        themeToggle.addEventListener('click', toggleTheme);

        // Agregar al carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-cart')) {
                const productId = parseInt(e.target.closest('.btn-add-cart').dataset.id);
                addToCart(productId);
            }
        });

        // Controles del carrito
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.qty-btn') || e.target.closest('.btn-remove');
            if (!target) return;
            
            const productId = parseInt(target.dataset.id);
            
            if (target.classList.contains('plus')) {
                updateQuantity(productId, 1);
            } else if (target.classList.contains('minus')) {
                updateQuantity(productId, -1);
            } else if (target.classList.contains('btn-remove')) {
                removeFromCart(productId);
            }
        });

        // Vaciar carrito
        clearCartBtn.addEventListener('click', clearCart);

        // Proceder al pago
        checkoutBtn.addEventListener('click', checkout);

        // Icono del carrito (scroll al carrito)
        cartIcon.addEventListener('click', () => {
            document.querySelector('.cart-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        // Botón flotante del carrito
        floatingCartIndicator.addEventListener('click', () => {
            document.querySelector('.cart-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        // Cerrar modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && confirmModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Click fuera del modal para cerrar
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });

        // Scroll para mostrar/ocultar botón flotante
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                floatingCartIndicator.style.opacity = '0.7';
                floatingCartIndicator.style.transform = 'translateY(20px)';
            } else {
                floatingCartIndicator.style.opacity = '1';
                floatingCartIndicator.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Iniciar aplicación
    init();
});

// Funciones globales para los botones del modal
function closeModal() {
    document.getElementById('confirmModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function continueShopping() {
    closeModal();
    window.location.reload();
}