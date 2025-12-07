document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('.btn-close');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalActionBtn = document.querySelector('.btn-modal-action');
    const modal = document.querySelector('.modal');
    
    // Estado del modal
    let isModalOpen = false;
    
    // Sonido opcional para interacciones
    const clickSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');

    // ===== FUNCIONES PRINCIPALES =====
    
    // Abrir modal
    const openModal = () => {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Forzar reflow para activar la animación
        void modalOverlay.offsetWidth;
        
        // Activar animación
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 10);
        
        isModalOpen = true;
        
        // Agregar clase al body para estilos específicos
        document.body.classList.add('modal-open');
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('modalOpen'));
        
        // Efecto de sonido (si se desea)
        playClickSound();
    };
    
    // Cerrar modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        
        // Esperar a que termine la animación
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-open');
            isModalOpen = false;
            
            // Disparar evento personalizado
            document.dispatchEvent(new CustomEvent('modalClose'));
            
            // Efecto de sonido
            playClickSound();
        }, 300);
    };
    
    // ===== EVENT LISTENERS =====
    
    // Abrir modal
    openBtn.addEventListener('click', openModal);
    
    // Cerrar modal con botón X
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar modal con botón de acción
    modalActionBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            // Agregar efecto visual de cierre al hacer clic fuera
            modal.style.animation = 'none';
            setTimeout(() => {
                modal.style.animation = '';
            }, 10);
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
        
        // Bonus: Abrir modal con Enter cuando el botón tiene foco
        if (e.key === 'Enter' && document.activeElement === openBtn && !isModalOpen) {
            openModal();
        }
    });
    
    // ===== EFECTOS ESPECIALES =====
    
    // Efectos hover para botones del modal
    const modalButtons = document.querySelectorAll('.modal button');
    modalButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto de presión
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
    
    // Efecto ripple para botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Agregar animación ripple al CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== FUNCIONES AUXILIARES =====
    
    // Función para efecto de sonido
    function playClickSound() {
        try {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log('Sonido no disponible:', e));
        } catch (e) {
            console.log('Error con sonido:', e);
        }
    }
    
    // Efecto de vibración para el botón principal
    openBtn.addEventListener('click', () => {
        openBtn.style.animation = 'none';
        setTimeout(() => {
            openBtn.style.animation = 'pulse 0.5s';
        }, 10);
    });
    
    // Agregar animación de pulso al CSS
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);
    
    // ===== FEATURES AVANZADAS =====
    
    // Guardar en localStorage si el modal fue visto
    const markAsSeen = () => {
        localStorage.setItem('modalSeen', 'true');
        localStorage.setItem('modalLastSeen', new Date().toISOString());
    };
    
    const checkIfSeen = () => {
        return localStorage.getItem('modalSeen') === 'true';
    };
    
    // Mostrar mensaje especial si es la primera vez
    modalActionBtn.addEventListener('click', () => {
        if (!checkIfSeen()) {
            markAsSeen();
            // Podrías mostrar un mensaje de agradecimiento aquí
            console.log('¡Gracias por tu primera visita al modal!');
        }
    });
    
    // ===== INICIALIZACIÓN =====
    
    // Log de inicialización
    console.log('Modal system initialized successfully!');
    console.log('Features available:');
    console.log('- Open/Close modal');
    console.log('- Click outside to close');
    console.log('- ESC key support');
    console.log('- Ripple effects');
    console.log('- Hover animations');
    console.log('- Responsive design');
    
    // Inicializar tooltips (si se agregaran después)
    const initTooltips = () => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.title = btn.textContent.trim();
        });
    };
    
    initTooltips();
});
