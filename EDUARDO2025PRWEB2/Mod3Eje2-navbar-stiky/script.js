document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTOS DEL DOM =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const btnTop = document.getElementById('btnTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // ===== NAVBAR STICKY EFFECT =====
    let lastScrollTop = 0;
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Añadir clase scrolled cuando se hace scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar navbar al hacer scroll (opcional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - ocultar navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - mostrar navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Mostrar/ocultar botón "Volver arriba"
        if (scrollTop > 500) {
            btnTop.classList.add('show');
        } else {
            btnTop.classList.remove('show');
        }
        
        // Scroll spy - resaltar enlace activo
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                // Añadir efecto visual al enlace activo
                link.style.color = 'var(--primary-color)';
                link.style.fontWeight = '700';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        });
    };
    
    // ===== MENÚ HAMBURGUESA =====
    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Añadir sonido (opcional)
        playMenuSound();
    };
    
    // ===== SCROLL SUAVE =====
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
            
            // Scroll suave
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Efecto visual en el enlace clickeado
            e.currentTarget.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.currentTarget.style.transform = '';
            }, 200);
            
            // Sonido de clic
            playClickSound();
        }
    };
    
    // ===== VOLVER ARRIBA =====
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Efecto visual del botón
        btnTop.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btnTop.style.transform = '';
        }, 200);
        
        playClickSound();
    };
    
    // ===== ANIMACIÓN DE ELEMENTOS AL SCROLL =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial, .fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    };
    
    // ===== FUNCIONES DE SONIDO =====
    const playClickSound = () => {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Audio no disponible'));
        } catch (e) {
            console.log('Error con audio:', e);
        }
    };
    
    const playMenuSound = () => {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Audio no disponible'));
        } catch (e) {
            console.log('Error con audio:', e);
        }
    };
    
    // ===== EFECTO RIPPLE PARA BOTONES =====
    const createRippleEffect = (e) => {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    };
    
    // Aplicar efecto ripple a botones
    const buttons = document.querySelectorAll('button:not(.nav-toggle)');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular tiempo de envío
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente! (Esto es una simulación)');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                
                // Efecto visual de éxito
                submitBtn.style.background = 'linear-gradient(135deg, var(--success-color), #2ec4b6)';
                setTimeout(() => {
                    submitBtn.style.background = '';
                }, 2000);
                
                playClickSound();
            }, 1500);
        });
    };
    
    // ===== INICIALIZACIÓN DE EVENTOS =====
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Toggle menu
    navToggle.addEventListener('click', toggleMenu);
    
    // Smooth scroll para enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Botón volver arriba
    btnTop.addEventListener('click', scrollToTop);
    
    // Cerrar menú al hacer clic fuera (en móvil)
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Prevenir scroll con rueda cuando el menú está abierto
    navMenu.addEventListener('wheel', (e) => {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // ===== EFECTOS DE HOVER DINÁMICOS =====
    
    // Efecto hover en cards
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Efecto hover en botones de pricing
    const pricingButtons = document.querySelectorAll('.pricing-card button');
    pricingButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.parentElement.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            const card = button.parentElement;
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // ===== INICIALIZAR ANIMACIONES =====
    handleScroll(); // Para estado inicial
    animateOnScroll(); // Para elementos visibles al cargar
    
    // Agregar clase fade-in a elementos dinámicamente
    const fadeElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // ===== CONSOLA DE INICIALIZACIÓN =====
    console.log('🚀 Sticky Navbar System Initialized!');
    console.log('Features loaded:');
    console.log('- Sticky navigation with scroll effects');
    console.log('- Responsive hamburger menu');
    console.log('- Smooth scrolling');
    console.log('- Scroll spy for active links');
    console.log('- Back to top button');
    console.log('- Scroll animations');
    console.log('- Ripple effects on buttons');
    console.log('- Form simulation');
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });
    
    // Intersection Observer para animaciones
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===== ESTILOS DINÁMICOS PARA RIPPLE =====
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
});
