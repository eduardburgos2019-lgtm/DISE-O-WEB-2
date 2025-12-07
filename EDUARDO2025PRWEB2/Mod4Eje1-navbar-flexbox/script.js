document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTOS DEL DOM =====
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // ===== NAVBAR SCROLL EFFECT =====
    let lastScrollTop = 0;
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Añadir clase scrolled al hacer scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Efecto de esconder/mostrar navbar al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
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
            }
        });
    };
    
    // ===== TOGGLE MENÚ MÓVIL =====
    const toggleMenu = () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
        
        // Crear efecto ripple en el botón
        createRippleEffect(navbarToggle);
        
        // Sonido de clic (opcional)
        playSound('click');
    };
    
    // ===== SCROLL SUAVE =====
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Cerrar menú móvil si está abierto
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
            
            // Scroll suave
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Efecto visual en el enlace
            e.currentTarget.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.currentTarget.style.transform = '';
            }, 200);
            
            // Sonido de clic
            playSound('click');
        }
    };
    
    // ===== FUNCIONES AUXILIARES =====
    const createRippleEffect = (element) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            border-radius: 50%;
            background: rgba(108, 99, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    };
    
    const playSound = (type) => {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Audio no disponible'));
        } catch (e) {
            console.log('Error con audio:', e);
        }
    };
    
    // ===== FUNCIONALIDADES DE BOTONES =====
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(e.target);
            playSound('click');
            
            // Acciones específicas por tipo de botón
            if (button.classList.contains('btn-cta')) {
                handleCtaClick();
            } else if (button.classList.contains('btn-login')) {
                handleLoginClick();
            } else if (button.classList.contains('btn-signup')) {
                handleSignupClick();
            }
        });
        
        // Efecto hover
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    const handleCtaClick = () => {
        const originalText = document.querySelector('.btn-cta').textContent;
        const btnCta = document.querySelector('.btn-cta');
        
        btnCta.textContent = '¡Genial! Te contactaremos pronto';
        btnCta.style.background = 'var(--success-color)';
        btnCta.disabled = true;
        
        setTimeout(() => {
            btnCta.textContent = originalText;
            btnCta.style.background = '';
            btnCta.disabled = false;
        }, 2000);
    };
    
    const handleLoginClick = () => {
        alert('🔐 Función de inicio de sesión - (Esta es una demo)');
    };
    
    const handleSignupClick = () => {
        alert('🎉 Función de registro - (Esta es una demo)');
    };
    
    // ===== ANIMACIÓN DE ENTRADA =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar animaciones
    const initAnimations = () => {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .contact-item');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };
    
    // ===== EVENT LISTENERS =====
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', animateOnScroll);
    navbarToggle.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target) && 
            !navbarToggle.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Prevenir scroll con rueda cuando el menú está abierto
    navbarMenu.addEventListener('wheel', (e) => {
        if (navbarMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // ===== INICIALIZACIÓN =====
    handleScroll(); // Estado inicial
    initAnimations(); // Configurar animaciones
    animateOnScroll(); // Elementos visibles al cargar
    
    // Log de inicialización
    console.log('🚀 Navbar Flexbox Responsive cargado exitosamente');
    console.log('Features disponibles:');
    console.log('- Navbar sticky con efectos de scroll');
    console.log('- Menú responsive con hamburguesa');
    console.log('- Scroll suave entre secciones');
    console.log('- Animaciones al hacer scroll');
    console.log('- Efectos hover y ripple');
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });
    
    // Intersection Observer para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observar elementos para animaciones
    const elementsToObserve = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .contact-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // ===== EFECTOS ESPECIALES =====
    // Efecto de brillo en el logo
    const logo = document.querySelector('.navbar-logo a');
    let glowInterval;
    
    logo.addEventListener('mouseenter', () => {
        glowInterval = setInterval(() => {
            logo.style.filter = `drop-shadow(0 0 ${Math.random() * 15 + 5}px rgba(108, 99, 255, 0.5))`;
        }, 100);
    });
    
    logo.addEventListener('mouseleave', () => {
        clearInterval(glowInterval);
        logo.style.filter = '';
    });
    
    // Efecto parallax en hero
    const heroSection = document.querySelector('.section-hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
    
    // ===== LOADING EFFECT =====
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Efecto de carga completada
        setTimeout(() => {
            console.log('✅ Página completamente cargada');
        }, 1000);
    });
});
