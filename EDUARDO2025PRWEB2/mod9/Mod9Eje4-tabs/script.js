document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabSlider = document.getElementById('tabSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentTabSpan = document.getElementById('currentTab');
    const totalTabsSpan = document.getElementById('totalTabs');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const ctaBtns = document.querySelectorAll('.cta-btn');
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Estado
    let currentTabIndex = 0;
    let isDarkMode = false;
    
    // Inicializar
    function init() {
        // Configurar número total de tabs
        totalTabsSpan.textContent = tabContents.length;
        
        // Animar barras de progreso
        animateProgressBars();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Configurar navegación por teclado
        setupKeyboardNavigation();
    }
    
    // Cambiar tab
    function changeTab(tabIndex) {
        // Validar índice
        if (tabIndex < 0) tabIndex = tabContents.length - 1;
        if (tabIndex >= tabContents.length) tabIndex = 0;
        
        // Actualizar estado
        currentTabIndex = tabIndex;
        
        // Actualizar botones de tab
        tabBtns.forEach((btn, index) => {
            const isActive = index === tabIndex;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
        
        // Actualizar contenido
        tabContents.forEach((content, index) => {
            content.classList.toggle('active', index === tabIndex);
        });
        
        // Actualizar slider
        updateTabSlider();
        
        // Actualizar indicador
        currentTabSpan.textContent = tabIndex + 1;
    }
    
    // Actualizar slider de tabs
    function updateTabSlider() {
        const activeBtn = tabBtns[currentTabIndex];
        const btnRect = activeBtn.getBoundingClientRect();
        const containerRect = activeBtn.parentElement.getBoundingClientRect();
        
        tabSlider.style.width = `${btnRect.width}px`;
        tabSlider.style.left = `${btnRect.left - containerRect.left}px`;
    }
    
    // Animar barras de progreso
    function animateProgressBars() {
        progressFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.setProperty('--target-width', width);
            fill.style.width = '0';
            
            // Animar después de un pequeño delay
            setTimeout(() => {
                fill.style.width = width;
            }, 300);
        });
    }
    
    // Cambiar tema claro/oscuro
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', 'Cambiar a tema claro');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('title', 'Cambiar a tema oscuro');
        }
        
        // Animación del botón
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
        
        // Guardar preferencia
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // Configurar navegación por teclado
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Flechas izquierda/derecha para cambiar tabs
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                changeTab(currentTabIndex - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                changeTab(currentTabIndex + 1);
            }
            
            // Números 1-4 para saltar a tabs específicos
            if (e.key >= '1' && e.key <= '4') {
                const tabIndex = parseInt(e.key) - 1;
                if (tabIndex < tabContents.length) {
                    changeTab(tabIndex);
                }
            }
            
            // Escape para cerrar modal
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        });
    }
    
    // Mostrar modal de éxito
    function showSuccessModal() {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar modal de éxito
    function closeSuccessModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Botones de tab
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => changeTab(index));
        });
        
        // Navegación anterior/siguiente
        prevBtn.addEventListener('click', () => changeTab(currentTabIndex - 1));
        nextBtn.addEventListener('click', () => changeTab(currentTabIndex + 1));
        
        // Cambiar tema
        themeToggle.addEventListener('click', toggleTheme);
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            isDarkMode = true;
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Formulario de contacto
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            // Simular envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Éxito
                showSuccessModal();
                
                // Resetear formulario
                contactForm.reset();
                
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Botones CTA (excepto el de enviar mensaje)
        ctaBtns.forEach(btn => {
            if (!btn.closest('.contact-form')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Animación de clic
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    // Cambiar a tab de contacto
                    changeTab(3);
                });
            }
        });
        
        // Cerrar modal
        closeModalBtn.addEventListener('click', closeSuccessModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal || e.target.classList.contains('modal-overlay')) {
                closeSuccessModal();
            }
        });
        
        // Actualizar slider al redimensionar ventana
        window.addEventListener('resize', updateTabSlider);
        
        // Efecto hover en cards
        document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('feature-card:hover')) {
                    this.style.transform = '';
                }
            });
        });
    }
    
    // Inicializar aplicación
    init();
});