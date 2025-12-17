// Variables globales
let currentColor = '#667eea';
let history = JSON.parse(localStorage.getItem('colorHistory')) || ['#667eea', '#764ba2', '#36d1dc', '#ff6b6b', '#4caf50'];
let favorites = JSON.parse(localStorage.getItem('colorFavorites')) || [];
let currentZoom = 1;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateUI();
    createParticles();
    
    // Event Listeners
    document.getElementById('generateBtn').addEventListener('click', generateColor);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('favoriteBtn').addEventListener('click', toggleFavorite);
    document.getElementById('zoomBtn').addEventListener('click', toggleZoom);
    document.getElementById('shareBtn').addEventListener('click', shareColor);
    document.getElementById('paletteBtn').addEventListener('click', generatePalette);
    document.getElementById('clearHistory').addEventListener('click', clearHistory);
    document.getElementById('viewFavorites').addEventListener('click', showFavorites);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Controles de zoom
    document.getElementById('zoomIn').addEventListener('click', () => adjustZoom(0.1));
    document.getElementById('zoomOut').addEventListener('click', () => adjustZoom(-0.1));
    document.getElementById('resetZoom').addEventListener('click', resetZoom);
    
    // Eventos de teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Clic en código de color
    document.getElementById('colorCode').addEventListener('click', copyToClipboard);
    
    // Clic en valores RGB/HSL
    document.getElementById('rgbValue').addEventListener('click', () => copySpecific('rgb'));
    document.getElementById('hslValue').addEventListener('click', () => copySpecific('hsl'));
    document.getElementById('hexValue').addEventListener('click', () => copySpecific('hex'));
});

// Generar color aleatorio
function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    currentColor = color;
    
    // Animación de zoom en el código
    const colorCode = document.getElementById('colorCode');
    colorCode.classList.add('zooming');
    setTimeout(() => colorCode.classList.remove('zooming'), 500);
    
    // Agregar al historial
    if (!history.includes(color)) {
        history.unshift(color);
        if (history.length > 15) history.pop();
        localStorage.setItem('colorHistory', JSON.stringify(history));
    }
    
    updateUI();
    
    // Animación del contenedor
    document.getElementById('mainContainer').classList.add('zoomed');
    setTimeout(() => {
        document.getElementById('mainContainer').classList.remove('zoomed');
    }, 600);
}

// Actualizar interfaz
function updateUI() {
    // Actualizar color de fondo
    document.body.style.background = `linear-gradient(135deg, ${currentColor} 0%, ${darkenColor(currentColor, 20)} 100%)`;
    
    // Actualizar código de color
    document.getElementById('colorCode').textContent = currentColor;
    document.getElementById('colorCode').style.color = getContrastColor(currentColor);
    
    // Actualizar valores
    const rgb = hexToRgb(currentColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    document.getElementById('hexValue').textContent = currentColor;
    document.getElementById('rgbValue').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('hslValue').textContent = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
    
    // Actualizar botón de favoritos
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favorites.includes(currentColor)) {
        favoriteBtn.classList.add('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorito';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Favorito';
    }
    
    // Actualizar historial
    updateHistory();
}

// Actualizar historial
function updateHistory() {
    const historyGrid = document.getElementById('historyGrid');
    historyGrid.innerHTML = '';
    
    history.forEach(color => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.style.backgroundColor = color;
        item.textContent = color;
        item.setAttribute('data-color', color);
        
        if (color === currentColor) {
            item.classList.add('selected');
        }
        
        item.addEventListener('click', () => {
            currentColor = color;
            updateUI();
            
            // Animación de selección
            document.querySelectorAll('.history-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            
            // Animación del historial
            document.getElementById('historySection').classList.add('zoomed');
            setTimeout(() => {
                document.getElementById('historySection').classList.remove('zoomed');
            }, 600);
        });
        
        historyGrid.appendChild(item);
    });
}

// Copiar al portapapeles
function copyToClipboard() {
    navigator.clipboard.writeText(currentColor).then(() => {
        showToast('✓ Código HEX copiado');
    });
}

function copySpecific(type) {
    let text = '';
    switch(type) {
        case 'rgb':
            text = document.getElementById('rgbValue').textContent;
            break;
        case 'hsl':
            text = document.getElementById('hslValue').textContent;
            break;
        case 'hex':
            text = currentColor;
            break;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showToast(`✓ ${type.toUpperCase()} copiado`);
    });
}

// Funciones de favoritos
function toggleFavorite() {
    const index = favorites.indexOf(currentColor);
    
    if (index === -1) {
        favorites.push(currentColor);
        showToast('❤️ Añadido a favoritos');
    } else {
        favorites.splice(index, 1);
        showToast('💔 Eliminado de favoritos');
    }
    
    localStorage.setItem('colorFavorites', JSON.stringify(favorites));
    updateUI();
}

function showFavorites() {
    const modal = document.getElementById('favoritesModal');
    const grid = document.getElementById('favoritesGrid');
    
    grid.innerHTML = '';
    
    if (favorites.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; color: #666;">No hay favoritos aún</p>';
    } else {
        favorites.forEach(color => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.style.backgroundColor = color;
            item.textContent = color;
            
            item.addEventListener('click', () => {
                currentColor = color;
                updateUI();
                closeModal();
                showToast('🎨 Color favorito seleccionado');
            });
            
            grid.appendChild(item);
        });
    }
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('favoritesModal').classList.remove('show');
}

// Funciones de zoom
function toggleZoom() {
    currentZoom = currentZoom === 1 ? 1.1 : 1;
    document.getElementById('mainContainer').style.transform = `scale(${currentZoom})`;
    showToast(currentZoom > 1 ? '🔍 Zoom activado' : '🔍 Zoom desactivado');
}

function adjustZoom(delta) {
    currentZoom = Math.max(0.8, Math.min(1.5, currentZoom + delta));
    document.getElementById('mainContainer').style.transform = `scale(${currentZoom})`;
    
    const zoomBtn = document.getElementById('zoomBtn');
    if (currentZoom !== 1) {
        zoomBtn.innerHTML = `<i class="fas fa-search-minus"></i> Zoom (${Math.round(currentZoom * 100)}%)`;
    } else {
        zoomBtn.innerHTML = `<i class="fas fa-search-plus"></i> Zoom`;
    }
}

function resetZoom() {
    currentZoom = 1;
    document.getElementById('mainContainer').style.transform = 'scale(1)';
    document.getElementById('zoomBtn').innerHTML = '<i class="fas fa-search-plus"></i> Zoom';
    showToast('🔄 Zoom reiniciado');
}

// Compartir color
function shareColor() {
    if (navigator.share) {
        navigator.share({
            title: 'Mira este color',
            text: `Encontré este color: ${currentColor}`,
            url: window.location.href
        });
    } else {
        copyToClipboard();
        showToast('📋 Enlace copiado (comparte manualmente)');
    }
}

// Generar paleta
function generatePalette() {
    const baseColor = currentColor;
    const palette = [
        baseColor,
        lightenColor(baseColor, 20),
        lightenColor(baseColor, 40),
        darkenColor(baseColor, 20),
        darkenColor(baseColor, 40)
    ];
    
    // Mostrar paleta en el historial temporalmente
    const originalHistory = [...history];
    history = palette;
    updateHistory();
    
    showToast('🎨 Paleta generada');
    
    // Restaurar historial después de 5 segundos
    setTimeout(() => {
        history = originalHistory;
        updateHistory();
    }, 5000);
}

// Limpiar historial
function clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial?')) {
        history = [currentColor];
        localStorage.setItem('colorHistory', JSON.stringify(history));
        updateHistory();
        showToast('🗑️ Historial limpiado');
    }
}

// Mostrar notificación
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Manejar teclas
function handleKeyPress(e) {
    switch(e.key.toLowerCase()) {
        case ' ':
            e.preventDefault();
            generateColor();
            break;
        case 'c':
            if (e.ctrlKey || e.metaKey) {
                copyToClipboard();
            }
            break;
        case 'f':
            toggleFavorite();
            break;
        case '+':
        case '=':
            if (e.ctrlKey || e.metaKey) {
                adjustZoom(0.1);
            }
            break;
        case '-':
            if (e.ctrlKey || e.metaKey) {
                adjustZoom(-0.1);
            }
            break;
        case '0':
            if (e.ctrlKey || e.metaKey) {
                resetZoom();
            }
            break;
    }
}

// Utilidades de color
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: h * 360,
        s: s * 100,
        l: l * 100
    };
}

function getContrastColor(hex) {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function darkenColor(color, percent) {
    return lightenColor(color, -percent);
}

// Efectos de partículas
function createParticles() {
    const colors = ['#667eea', '#764ba2', '#36d1dc', '#ff6b6b', '#4caf50', '#ff9a00'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        document.body.appendChild(particle);
    }
}