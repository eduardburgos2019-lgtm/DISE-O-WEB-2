// script.js - Demo Interactiva Box-Sizing

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const widthSlider = document.getElementById('widthSlider');
    const paddingSlider = document.getElementById('paddingSlider');
    const borderSlider = document.getElementById('borderSlider');
    
    const widthValue = document.getElementById('widthValue');
    const paddingValue = document.getElementById('paddingValue');
    const borderValue = document.getElementById('borderValue');
    
    const demoContentBox = document.getElementById('demoContentBox');
    const demoBorderBox = document.getElementById('demoBorderBox');
    
    const totalContentBox = document.getElementById('totalContentBox');
    const totalBorderBox = document.getElementById('totalBorderBox');

    // Colores CSS
    const contentBoxColor = '#ef4444'; // Rojo
    const borderBoxColor = '#10b981';  // Verde
    const trackColor = '#e2e8f0';      // Gris claro

    // Función para formatear el valor
    function formatValue(value, unit = 'px') {
        return `${value}${unit}`;
    }

    // Función para actualizar la demo
    function updateDemo() {
        const width = parseInt(widthSlider.value);
        const padding = parseInt(paddingSlider.value);
        const border = parseInt(borderSlider.value);
        
        // Actualizar valores mostrados
        widthValue.textContent = formatValue(width);
        paddingValue.textContent = formatValue(padding);
        borderValue.textContent = formatValue(border);
        
        // Calcular tamaños totales
        const contentBoxTotal = width + (padding * 2) + (border * 2);
        const borderBoxTotal = width;
        
        // Actualizar boxes visualmente
        demoContentBox.style.width = `${width}px`;
        demoContentBox.style.padding = `${padding}px`;
        demoContentBox.style.borderWidth = `${border}px`;
        
        demoBorderBox.style.width = `${width}px`;
        demoBorderBox.style.padding = `${padding}px`;
        demoBorderBox.style.borderWidth = `${border}px`;
        
        // Actualizar textos
        totalContentBox.textContent = `Total: ${formatValue(contentBoxTotal)}`;
        totalBorderBox.textContent = `Total: ${formatValue(borderBoxTotal)}`;
        
        // Agregar tooltips dinámicos
        demoContentBox.title = `Content-Box\nWidth: ${width}px\nPadding: ${padding}px\nBorder: ${border}px\nTotal: ${contentBoxTotal}px`;
        demoBorderBox.title = `Border-Box\nWidth: ${width}px\nPadding: ${padding}px (incluido)\nBorder: ${border}px (incluido)\nTotal: ${borderBoxTotal}px`;
        
        // Efecto visual de cambio
        demoContentBox.classList.add('updating');
        demoBorderBox.classList.add('updating');
        
        setTimeout(() => {
            demoContentBox.classList.remove('updating');
            demoBorderBox.classList.remove('updating');
        }, 300);
    }

    // Función para actualizar el estilo del slider
    function updateSliderStyle(slider) {
        const value = slider.value;
        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const percent = ((value - min) / (max - min)) * 100;
        
        // Actualizar el estilo del track del slider con colores fijos
        slider.style.background = `linear-gradient(to right, 
            ${contentBoxColor} 0%, 
            ${borderBoxColor} ${percent}%, 
            ${trackColor} ${percent}%, 
            ${trackColor} 100%
        )`;
    }

    // Event listeners
    widthSlider.addEventListener('input', function() {
        updateDemo();
        updateSliderStyle(this);
    });
    
    paddingSlider.addEventListener('input', function() {
        updateDemo();
        updateSliderStyle(this);
    });
    
    borderSlider.addEventListener('input', function() {
        updateDemo();
        updateSliderStyle(this);
    });

    // Inicializar demo
    updateDemo();
    
    // Inicializar estilos de sliders
    updateSliderStyle(widthSlider);
    updateSliderStyle(paddingSlider);
    updateSliderStyle(borderSlider);

    // Añadir CSS para la animación de actualización
    const style = document.createElement('style');
    style.textContent = `
        .updating {
            animation: pulseUpdate 0.3s ease-out;
        }
        
        @keyframes pulseUpdate {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .demo-box {
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .demo-box:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }
        
        .demo-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .demo-box:hover::before {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Añadir efectos de hover a las cajas de demostración
    demoContentBox.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(239, 68, 68, 0.2)';
    });
    
    demoContentBox.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    demoBorderBox.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(16, 185, 129, 0.2)';
    });
    
    demoBorderBox.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    // Añadir efectos de click
    demoContentBox.addEventListener('click', function() {
        this.style.animation = 'clickEffect 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        alert(`Content-Box Detalles:\nWidth: ${widthSlider.value}px\nPadding: ${paddingSlider.value}px\nBorder: ${borderSlider.value}px\nTotal: ${parseInt(widthSlider.value) + (parseInt(paddingSlider.value) * 2) + (parseInt(borderSlider.value) * 2)}px`);
    });
    
    demoBorderBox.addEventListener('click', function() {
        this.style.animation = 'clickEffect 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        alert(`Border-Box Detalles:\nWidth: ${widthSlider.value}px\nPadding: ${paddingSlider.value}px (incluido)\nBorder: ${borderSlider.value}px (incluido)\nTotal: ${widthSlider.value}px`);
    });
    
    // Añadir animación de click al CSS
    const clickStyle = document.createElement('style');
    clickStyle.textContent = `
        @keyframes clickEffect {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        
        /* Mejorar la apariencia de los tooltips */
        .demo-box:hover::after {
            content: attr(title);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            white-space: pre-line;
            z-index: 100;
            pointer-events: none;
            opacity: 0;
            animation: tooltipFadeIn 0.3s ease-out 0.3s forwards;
            max-width: 300px;
            text-align: center;
            line-height: 1.4;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes tooltipFadeIn {
            to {
                opacity: 1;
                bottom: calc(100% + 10px);
            }
        }
    `;
    document.head.appendChild(clickStyle);
});
