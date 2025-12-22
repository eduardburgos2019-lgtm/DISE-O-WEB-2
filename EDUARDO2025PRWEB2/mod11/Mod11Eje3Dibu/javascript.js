/**
 * PAINT PRO ULTRA - LÓGICA DE MANIPULACIÓN DE PÍXELES
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true }); // Optimizamos para lecturas frecuentes de píxeles

let isDrawing = false;
let startX, startY;
let currentTool = 'brush';
let snapshot; // Estado previo al dibujo actual

/**
 * 1. CONFIGURACIÓN DEL LIENZO
 */
function init() {
    // Establecemos un tamaño de lienzo estándar HD
    canvas.width = 1000;
    canvas.height = 700;
    
    // Fondo inicial blanco
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * 2. CARGA DE IMÁGENES EXTERNAS (File API)
 */
document.getElementById('imageLoader').addEventListener('change', function(e) {
    const reader = new FileReader(); // Lector de archivos del sistema
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Dibujamos la imagen centrada y escalada para que quepa
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
        img.src = event.target.result; // El contenido de la imagen en base64
    }
    reader.readAsDataURL(e.target.files[0]); // Leemos el archivo seleccionado
});

/**
 * 3. SISTEMA DE FILTROS (Manipulación de Píxeles RGBA)
 * Un píxel en canvas se representa por 4 valores en un array: [R, G, B, A]
 */
function applyFilter(type) {
    // Obtenemos todos los píxeles del lienzo
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data; // Array unidimensional de píxeles

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];     // Rojo
        const g = data[i + 1]; // Verde
        const b = data[i + 2]; // Azul

        if (type === 'gray') {
            const avg = (r + g + b) / 3;
            data[i] = data[i+1] = data[i+2] = avg; // Gris: R=G=B
        } else if (type === 'invert') {
            data[i] = 255 - r;     // Invertir Rojo
            data[i+1] = 255 - g;   // Invertir Verde
            data[i+2] = 255 - b;   // Invertir Azul
        } else if (type === 'sepia') {
            data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
            data[i+1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
            data[i+2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
        }
    }
    // Volvemos a colocar los píxeles modificados en el lienzo
    ctx.putImageData(imageData, 0, 0);
}

/**
 * 4. LÓGICA DE DIBUJO CON SNAPSHOT
 */
const startDraw = (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    
    // Guardamos foto del lienzo antes de empezar la nueva figura
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.strokeStyle = document.getElementById('colorPicker').value;
    ctx.lineWidth = document.getElementById('lineWidth').value;
    ctx.lineCap = "round";
};

const drawing = (e) => {
    if (!isDrawing) return;
    
    // RESTAURACIÓN: Borra el "fantasma" del movimiento anterior
    ctx.putImageData(snapshot, 0, 0);

    if (currentTool === 'brush') {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        // Actualizamos el snapshot en el pincel para que el trazo sea continuo
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else if (currentTool === 'rectangle') {
        ctx.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
    } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(startX - e.offsetX, 2) + Math.pow(startY - e.offsetY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (currentTool === 'eraser') {
        ctx.strokeStyle = "white";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
};

/**
 * 5. EVENTOS
 */
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
window.addEventListener('mouseup', () => isDrawing = false);

// Herramientas
document.querySelectorAll('.tool').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tool.active').classList.remove('active');
        btn.classList.add('active');
        currentTool = btn.dataset.tool;
    });
});

// Filtros
document.getElementById('filterGray').addEventListener('click', () => applyFilter('gray'));
document.getElementById('filterInvert').addEventListener('click', () => applyFilter('invert'));
document.getElementById('filterSepia').addEventListener('click', () => applyFilter('sepia'));

// Feedback Grosor
document.getElementById('lineWidth').addEventListener('input', (e) => {
    document.getElementById('wLabel').innerText = e.target.value;
});

// Guardar
document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = "mi-diseno-pro.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

window.onload = init;
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del tema
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.icon');
    const themeText = themeToggle.querySelector('.text');
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('editor-theme') || 'dark';
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('editor-theme', newTheme);
        updateToggleButton(newTheme);
    });
    
    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Modo Claro';
            themeToggle.setAttribute('data-tooltip', 'Cambiar a modo claro');
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Modo Oscuro';
            themeToggle.setAttribute('data-tooltip', 'Cambiar a modo oscuro');
        }
    }
    
    // Configuración del canvas
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentTool = 'brush';
    let brushSize = 10;
    let brushColor = '#1a73e8';
    let opacity = 1;
    
    // Configurar eventos del canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Configurar herramientas
    const toolButtons = document.querySelectorAll('[data-tool]');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            toolButtons.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            currentTool = this.getAttribute('data-tool');
            updateToolStatus();
        });
    });
    
    // Configurar controles
    const brushSizeSlider = document.getElementById('brushSizeSlider');
    const brushSizeValue = document.getElementById('brushSize');
    const opacitySlider = document.getElementById('opacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    const colorPicker = document.getElementById('colorPicker');
    const zoomLevel = document.getElementById('zoomLevel');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    let currentZoom = 100;
    
    // Eventos de controles
    brushSizeSlider.addEventListener('input', function() {
        brushSize = this.value;
        brushSizeValue.textContent = `${brushSize}px`;
    });
    
    opacitySlider.addEventListener('input', function() {
        opacity = this.value / 100;
        opacityValue.textContent = `${this.value}%`;
    });
    
    colorPicker.addEventListener('input', function() {
        brushColor = this.value;
    });
    
    zoomInBtn.addEventListener('click', function() {
        if (currentZoom < 400) {
            currentZoom += 25;
            updateZoom();
        }
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (currentZoom > 25) {
            currentZoom -= 25;
            updateZoom();
        }
    });
    
    function updateZoom() {
        zoomLevel.textContent = `${currentZoom}%`;
        canvas.style.transform = `scale(${currentZoom / 100})`;
        canvas.style.transformOrigin = 'center center';
    }
    
    // Función para mostrar posición del cursor
    const cursorPos = document.getElementById('cursorPos');
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        cursorPos.textContent = `X: ${x}, Y: ${y}`;
    });
    
    // Funciones de dibujo
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalAlpha = opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        switch(currentTool) {
            case 'brush':
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = brushColor;
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
                break;
                
            case 'eraser':
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = '#ffffff';
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
                break;
                
            case 'fill':
                ctx.fillStyle = brushColor;
                ctx.globalAlpha = opacity;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                isDrawing = false;
                break;
        }
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    
    function updateToolStatus() {
        const toolStatus = document.getElementById('toolStatus');
        const toolNames = {
            'brush': 'Pincel',
            'eraser': 'Borrador',
            'fill': 'Relleno',
            'shape': 'Formas',
            'text': 'Texto',
            'select': 'Selección'
        };
        toolStatus.textContent = `${toolNames[currentTool]} activo`;
    }
    
    // Limpiar canvas
    document.getElementById('clearBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres limpiar el canvas?')) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });
    
    // Añadir capa
    document.getElementById('addLayerBtn').addEventListener('click', function() {
        const layersPanel = document.querySelector('.layers-panel');
        const layerCount = layersPanel.querySelectorAll('.layer-item').length;
        
        const newLayer = document.createElement('div');
        newLayer.className = 'layer-item';
        newLayer.innerHTML = `
            <div class="layer-preview" style="background: ${brushColor};"></div>
            <div class="layer-name">Capa ${layerCount + 1}</div>
            <div class="layer-actions">
                <button class="btn btn-icon btn-small" data-tooltip="Ocultar">👁️</button>
                <button class="btn btn-icon btn-small" data-tooltip="Eliminar">🗑️</button>
            </div>
        `;
        
        layersPanel.appendChild(newLayer);
    });
    
    // Inicializar canvas con fondo blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Actualizar estado inicial
    updateToolStatus();
    updateZoom();
});