document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const themeToggle = document.getElementById('themeToggle');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    const confirmButtons = document.querySelectorAll('.btn-confirm');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentCount = document.querySelector('.gallery-counter .current');
    const totalCount = document.querySelector('.gallery-counter .total');
    const submitButtons = document.querySelectorAll('.btn-submit, .btn-pay');
    const paymentSteps = document.querySelectorAll('.step');
    
    // Estado
    let currentGalleryIndex = 0;
    let isDarkMode = false;
    
    // Inicializar
    function init() {
        // Configurar contador de galería
        totalCount.textContent = galleryItems.length;
        
        // Configurar event listeners
        setupEventListeners();
        
        // Cargar tema guardado
        loadSavedTheme();
    }
    
    // Abrir modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Cerrar cualquier modal abierto
        closeAllModals();
        
        // Abrir modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        
        // Enfocar en el primer elemento interactivo
        const focusElement = modal.querySelector('input, button, textarea, select');
        if (focusElement) {
            setTimeout(() => focusElement.focus(), 100);
        }
        
        // Animación especial para galería
        if (modalId === 'modal4') {
            resetGallery();
        }
    }
    
    // Cerrar modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        
        // Remover animación activa
        modal.style.animation = 'none';
    }
    
    // Cerrar todos los modales
    function closeAllModals() {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                closeModal(modal);
            }
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
        localStorage.setItem('modal-theme', isDarkMode ? 'dark' : 'light');
    }
    
    // Cargar tema guardado
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('modal-theme');
        if (savedTheme === 'dark') {
            isDarkMode = true;
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Galería de imágenes
    function resetGallery() {
        currentGalleryIndex = 0;
        updateGallery();
    }
    
    function updateGallery() {
        // Actualizar contador
        currentCount.textContent = currentGalleryIndex + 1;
        
        // Remover clase activa de todas las imágenes
        galleryItems.forEach(item => {
            item.style.transform = 'scale(0.95)';
            item.style.opacity = '0.7';
        });
        
        // Activar imagen actual
        if (galleryItems[currentGalleryIndex]) {
            galleryItems[currentGalleryIndex].style.transform = 'scale(1)';
            galleryItems[currentGalleryIndex].style.opacity = '1';
        }
    }
    
    function nextImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        updateGallery();
        
        // Animación de transición
        const gallery = document.querySelector('.gallery-grid');
        gallery.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            gallery.style.transform = 'translateX(0)';
        }, 200);
    }
    
    function prevImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        updateGallery();
        
        // Animación de transición
        const gallery = document.querySelector('.gallery-grid');
        gallery.style.transform = 'translateX(10px)';
        setTimeout(() => {
            gallery.style.transform = 'translateX(0)';
        }, 200);
    }
    
    // Configurar pasos de pago
    function setupPaymentSteps() {
        paymentSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                // Remover activo de todos
                paymentSteps.forEach(s => s.classList.remove('active'));
                
                // Activar paso seleccionado
                step.classList.add('active');
                
                // Animación
                step.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    step.style.transform = '';
                }, 300);
            });
        });
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Abrir modales
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.dataset.modal;
                openModal(modalId);
                
                // Efecto de clic en botón
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
        
        // Cerrar modales
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                    
                    // Efecto de cierre
                    this.style.transform = 'rotate(180deg)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                }
            });
        });
        
        // Cerrar haciendo clic fuera del modal
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('modal-overlay')) {
                    closeModal(this);
                }
            });
        });
        
        // Botones de cancelar
        cancelButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                    
                    // Feedback de cancelación
                    showToast('Acción cancelada', 'info');
                }
            });
        });
        
        // Botones de confirmar
        confirmButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                    
                    // Feedback de confirmación
                    showToast('¡Acción confirmada!', 'success');
                }
            });
        });
        
        // Cambiar tema
        themeToggle.addEventListener('click', toggleTheme);
        
        // Navegación de galería
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevImage);
            nextBtn.addEventListener('click', nextImage);
        }
        
        // Clic en imágenes de galería
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentGalleryIndex = index;
                updateGallery();
                
                // Efecto de clic
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
        
        // Envío de formularios
        submitButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = this.closest('.modal');
                const form = this.closest('form');
                
                if (form && modal) {
                    // Validación simple
                    let isValid = true;
                    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
                    
                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            isValid = false;
                            input.style.borderColor = 'var(--danger-color)';
                        } else {
                            input.style.borderColor = '';
                        }
                    });
                    
                    if (isValid) {
                        // Simular envío
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                        this.disabled = true;
                        
                        setTimeout(() => {
                            closeModal(modal);
                            form.reset();
                            this.innerHTML = originalText;
                            this.disabled = false;
                            showToast('¡Operación completada con éxito!', 'success');
                        }, 1500);
                    } else {
                        showToast('Por favor, completa todos los campos', 'warning');
                    }
                }
            });
        });
        
        // Configurar pasos de pago
        setupPaymentSteps();
        
        // Navegación por teclado
        document.addEventListener('keydown', function(e) {
            // Cerrar modal con ESC
            if (e.key === 'Escape') {
                closeAllModals();
            }
            
            // Navegación de galería con flechas
            if (document.getElementById('modal4')?.classList.contains('active')) {
                if (e.key === 'ArrowRight') {
                    nextImage();
                    e.preventDefault();
                } else if (e.key === 'ArrowLeft') {
                    prevImage();
                    e.preventDefault();
                }
            }
            
            // Cerrar con Enter en botones de cancelar
            if (e.key === 'Enter' && e.target.classList.contains('btn-cancel')) {
                e.target.click();
            }
        });
        
        // Efectos hover en botones
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                if (!this.classList.contains('modal-open')) {
                    this.style.transform = '';
                }
            });
        });
        
        // Efecto en cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Scroll suave para modales
        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('wheel', function(e) {
                e.stopPropagation();
            });
        });
    }
    
    // Mostrar notificación toast
    function showToast(message, type = 'info') {
        // Crear toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        // Estilos
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getToastColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        
        // Estilos CSS para animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
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
        
        document.body.appendChild(toast);
        
        // Botón para cerrar toast
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
    
    // Helper functions para toast
    function getToastIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    function getToastColor(type) {
        const colors = {
            'success': 'linear-gradient(135deg, var(--success-color), #27ae60)',
            'error': 'linear-gradient(135deg, var(--danger-color), #c0392b)',
            'warning': 'linear-gradient(135deg, var(--warning-color), #e67e22)',
            'info': 'linear-gradient(135deg, var(--info-color), #2980b9)'
        };
        return colors[type] || 'linear-gradient(135deg, var(--info-color), #2980b9)';
    }
    
    // Inicializar aplicación
    init();
});