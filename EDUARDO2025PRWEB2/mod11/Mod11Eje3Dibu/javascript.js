document.addEventListener('DOMContentLoaded', function() {
    // Configuración del tema
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('editor-theme') || 'dark';
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('editor-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Añadir efecto de transición
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Cambiar a modo claro';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Cambiar a modo oscuro';
        }
    }
    
    // Configuración del canvas
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = '#1a73e8';
    let backgroundColor = '#ffffff';
    let brushSize = 10;
    let opacity = 1;
    let hardness = 1;
    let flow = 1;
    let lastX = 0;
    let lastY = 0;
    let zoom = 100;
    let isPanning = false;
    let panStart = { x: 0, y: 0 };
    
    // Estado del editor
    const editorState = {
        history: [],
        currentHistoryIndex: -1,
        layers: [],
        activeLayer: null,
        guides: [],
        showGrid: false,
        showRulers: false,
        showGuides: true
    };
    
    // Inicializar canvas
    function initCanvas() {
        // Limpiar canvas con fondo blanco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Crear capa inicial
        createLayer('Fondo', '#ffffff');
        
        // Actualizar información
        updateDocumentInfo();
        
        // Guardar estado inicial en historial
        saveToHistory('Canvas inicializado');
    }
    
    // Sistema de capas
    function createLayer(name, color) {
        const layer = {
            id: Date.now(),
            name: name,
            visible: true,
            locked: false,
            opacity: 1,
            blendMode: 'normal',
            data: null,
            color: color
        };
        
        editorState.layers.push(layer);
        editorState.activeLayer = layer;
        updateLayersUI();
        return layer;
    }
    
    function updateLayersUI() {
        const container = document.getElementById('layersContainer');
        container.innerHTML = '';
        
        editorState.layers.forEach(layer => {
            const isActive = editorState.activeLayer && editorState.activeLayer.id === layer.id;
            const layerElement = document.createElement('div');
            layerElement.className = `layer-item ${isActive ? 'active' : ''}`;
            layerElement.innerHTML = `
                <div class="layer-visibility">
                    <i class="fas fa-${layer.visible ? 'eye' : 'eye-slash'}"></i>
                </div>
                <div class="layer-thumbnail" style="background: ${layer.color};"></div>
                <div class="layer-info">
                    <div class="layer-name">${layer.name}</div>
                    <div class="layer-type">${layer.color === '#ffffff' ? 'Color plano' : 'Pincel'}</div>
                </div>
                <div class="layer-actions">
                    <button class="btn btn-icon btn-small layer-action" title="${layer.locked ? 'Desbloquear capa' : 'Bloquear capa'}">
                        <i class="fas fa-${layer.locked ? 'lock' : 'lock-open'}"></i>
                    </button>
                </div>
            `;
            
            layerElement.addEventListener('click', () => {
                editorState.activeLayer = layer;
                updateLayersUI();
            });
            
            container.appendChild(layerElement);
        });
    }
    
    // Sistema de historial
    function saveToHistory(action) {
        // Limitar historial a 50 acciones
        if (editorState.history.length >= 50) {
            editorState.history.shift();
        }
        
        // Guardar snapshot del canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        editorState.history.push({
            action: action,
            timestamp: Date.now(),
            data: imageData
        });
        
        editorState.currentHistoryIndex = editorState.history.length - 1;
        updateHistoryUI();
    }
    
    function updateHistoryUI() {
        const container = document.getElementById('historyContainer');
        container.innerHTML = '';
        
        // Mostrar solo las últimas 10 acciones
        const recentHistory = editorState.history.slice(-10);
        
        recentHistory.forEach((item, index) => {
            const isCurrent = editorState.currentHistoryIndex === 
                editorState.history.length - 10 + index;
            
            const historyElement = document.createElement('div');
            historyElement.className = `history-item ${isCurrent ? 'active' : ''}`;
            historyElement.innerHTML = `
                <div class="history-icon">
                    <i class="fas fa-${getHistoryIcon(item.action)}"></i>
                </div>
                <div class="history-info">
                    <div class="history-action">${item.action}</div>
                    <div class="history-time">${formatTimeAgo(item.timestamp)}</div>
                </div>
            `;
            
            container.appendChild(historyElement);
        });
        
        // Scroll al final
        container.scrollTop = container.scrollHeight;
    }
    
    function getHistoryIcon(action) {
        if (action.includes('Pincel')) return 'paint-brush';
        if (action.includes('Capa')) return 'layer-group';
        if (action.includes('Color')) return 'fill-drip';
        if (action.includes('Forma')) return 'shapes';
        if (action.includes('Texto')) return 'font';
        return 'history';
    }
    
    function formatTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return `Hace ${seconds} segundos`;
        if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} minutos`;
        if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} horas`;
        return `Hace ${Math.floor(seconds / 86400)} días`;
    }
    
    // Configurar controles
    const brushSizeSlider = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const opacitySlider = document.getElementById('opacity');
    const opacityValue = document.getElementById('opacityValue');
    const hardnessSlider = document.getElementById('hardness');
    const hardnessValue = document.getElementById('hardnessValue');
    const flowSlider = document.getElementById('flow');
    const flowValue = document.getElementById('flowValue');
    const foregroundColor = document.getElementById('foregroundColor');
    const foregroundPicker = document.getElementById('foregroundPicker');
    const backgroundColor = document.getElementById('backgroundColor');
    const backgroundPicker = document.getElementById('backgroundPicker');
    const zoomLevel = document.getElementById('zoomLevel');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const fitToScreenBtn = document.getElementById('fitToScreen');
    const cursorPosition = document.getElementById('cursorPosition');
    const canvasSizeDisplay = document.getElementById('canvasSizeDisplay');
    const toolStatus = document.getElementById('toolStatus');
    const gridToggle = document.getElementById('gridToggle');
    const rulersToggle = document.getElementById('rulersToggle');
    const guidesToggle = document.getElementById('guidesToggle');
    const canvasGrid = document.getElementById('canvasGrid');
    
    // Eventos de controles
    brushSizeSlider.addEventListener('input', function() {
        brushSize = parseInt(this.value);
        brushSizeValue.textContent = `${brushSize}px`;
        updateBrushPreview();
    });
    
    opacitySlider.addEventListener('input', function() {
        opacity = parseInt(this.value) / 100;
        opacityValue.textContent = `${this.value}%`;
    });
    
    hardnessSlider.addEventListener('input', function() {
        hardness = parseInt(this.value) / 100;
        hardnessValue.textContent = `${this.value}%`;
        updateBrushPreview();
    });
    
    flowSlider.addEventListener('input', function() {
        flow = parseInt(this.value) / 100;
        flowValue.textContent = `${this.value}%`;
    });
    
    foregroundPicker.addEventListener('input', function() {
        currentColor = this.value;
        foregroundColor.style.background = currentColor;
    });
    
    backgroundPicker.addEventListener('input', function() {
        backgroundColor.style.background = this.value;
    });
    
    document.getElementById('swapColors').addEventListener('click', function() {
        const temp = currentColor;
        currentColor = backgroundPicker.value;
        backgroundPicker.value = temp;
        foregroundColor.style.background = currentColor;
        backgroundColor.style.background = temp;
    });
    
    document.getElementById('resetColors').addEventListener('click', function() {
        currentColor = '#1a73e8';
        backgroundPicker.value = '#ffffff';
        foregroundPicker.value = currentColor;
        foregroundColor.style.background = currentColor;
        backgroundColor.style.background = '#ffffff';
    });
    
    // Zoom
    zoomInBtn.addEventListener('click', function() {
        if (zoom < 400) {
            zoom += 25;
            updateZoom();
        }
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (zoom > 25) {
            zoom -= 25;
            updateZoom();
        }
    });
    
    fitToScreenBtn.addEventListener('click', function() {
        const container = document.getElementById('canvasContainer');
        const containerRect = container.getBoundingClientRect();
        const scaleX = containerRect.width / canvas.width;
        const scaleY = containerRect.height / canvas.height;
        const scale = Math.min(scaleX, scaleY) * 0.9;
        
        zoom = Math.floor(scale * 100);
        updateZoom();
    });
    
    function updateZoom() {
        zoomLevel.textContent = `${zoom}%`;
        canvas.style.transform = `scale(${zoom / 100})`;
        canvas.style.transformOrigin = 'center center';
        canvas.style.transition = 'transform 0.3s ease';
    }
    
    // Herramientas
    const toolButtons = document.querySelectorAll('[data-tool]');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toolButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTool = this.getAttribute('data-tool');
            updateToolStatus();
            updateCursor();
        });
    });
    
    function updateToolStatus() {
        const toolNames = {
            'brush': 'Pincel',
            'eraser': 'Borrador',
            'fill': 'Relleno',
            'shape': 'Formas',
            'text': 'Texto',
            'select': 'Selección',
            'crop': 'Recortar',
            'gradient': 'Degradado',
            'pen': 'Pluma',
            'eyedropper': 'Cuentagotas',
            'hand': 'Mano',
            'zoom': 'Zoom'
        };
        
        const iconClass = {
            'brush': 'fas fa-paint-brush',
            'eraser': 'fas fa-eraser',
            'fill': 'fas fa-fill-drip',
            'shape': 'fas fa-shapes',
            'text': 'fas fa-font',
            'select': 'fas fa-vector-square',
            'crop': 'fas fa-crop',
            'gradient': 'fas fa-sliders-h',
            'pen': 'fas fa-pen',
            'eyedropper': 'fas fa-eye-dropper',
            'hand': 'fas fa-hand-paper',
            'zoom': 'fas fa-search'
        };
        
        toolStatus.innerHTML = `
            <i class="${iconClass[currentTool]}"></i>
            <span>${toolNames[currentTool]} activo</span>
        `;
    }
    
    function updateCursor() {
        const cursorStyles = {
            'brush': 'crosshair',
            'eraser': 'crosshair',
            'fill': 'cell',
            'shape': 'crosshair',
            'text': 'text',
            'select': 'crosshair',
            'crop': 'crosshair',
            'gradient': 'crosshair',
            'pen': 'crosshair',
            'eyedropper': 'crosshair',
            'hand': 'grab',
            'zoom': 'crosshair'
        };
        
        canvas.style.cursor = cursorStyles[currentTool];
    }
    
    // Eventos del canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
    });
    
    // Seguimiento del cursor
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const scale = zoom / 100;
        const x = Math.round((e.clientX - rect.left) / scale);
        const y = Math.round((e.clientY - rect.top) / scale);
        
        cursorPosition.innerHTML = `
            <i class="fas fa-crosshairs"></i>
            <span>X: ${x}, Y: ${y}</span>
        `;
    });
    
    // Toggle de visibilidad
    gridToggle.addEventListener('click', function() {
        editorState.showGrid = !editorState.showGrid;
        canvasGrid.classList.toggle('visible', editorState.showGrid);
        this.classList.toggle('active', editorState.showGrid);
    });
    
    rulersToggle.addEventListener('click', function() {
        editorState.showRulers = !editorState.showRulers;
        // Implementar lógica de reglas
        this.classList.toggle('active', editorState.showRulers);
    });
    
    guidesToggle.addEventListener('click', function() {
        editorState.showGuides = !editorState.showGuides;
        // Implementar lógica de guías
        this.classList.toggle('active', editorState.showGuides);
    });
    
    // Funciones de dibujo
    function startDrawing(e) {
        if (currentTool === 'hand') {
            isPanning = true;
            panStart = { x: e.clientX, y: e.clientY };
            canvas.style.cursor = 'grabbing';
            return;
        }
        
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scale = zoom / 100;
        lastX = (e.clientX - rect.left) / scale;
        lastY = (e.clientY - rect.top) / scale;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
    }
    
    function draw(e) {
        if (currentTool === 'hand' && isPanning) {
            const dx = e.clientX - panStart.x;
            const dy = e.clientY - panStart.y;
            
            // Implementar panning del canvas
            canvas.style.transform = `translate(${dx}px, ${dy}px) scale(${zoom / 100})`;
            return;
        }
        
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const scale = zoom / 100;
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;
        
        ctx.globalAlpha = opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        switch(currentTool) {
            case 'brush':
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = currentColor;
                ctx.globalCompositeOperation = 'source-over';
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
                break;
                
            case 'eraser':
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = '#ffffff';
                ctx.globalCompositeOperation = 'destination-out';
                    // ==================== ATAJOS DE TECLADO ====================
    function handleKeyboardShortcuts(e) {
        // Prevenir comportamiento por defecto
        if (e.ctrlKey || e.altKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        document.getElementById('redoBtn').click();
                    } else {
                        document.getElementById('undoBtn').click();
                    }
                    break;
                    
                case 's':
                    e.preventDefault();
                    document.getElementById('saveBtn').click();
                    break;
                    
                case 'e':
                    e.preventDefault();
                    document.getElementById('exportBtn').click();
                    break;
                    
                case 'd':
                    e.preventDefault();
                    document.getElementById('swapColors').click();
                    break;
            }
        }
        
        // Atajos de herramientas (sin Ctrl)
        if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
            const toolShortcuts = {
                'b': 'brush',
                'e': 'eraser',
                'g': 'fill',
                'u': 'shape',
                't': 'text',
                'm': 'select',
                'c': 'crop',
                'l': 'gradient',
                'p': 'pen',
                'i': 'eyedropper',
                'h': 'hand',
                'z': 'zoom',
                'v': 'select'
            };
            
            if (toolShortcuts[e.key.toLowerCase()]) {
                e.preventDefault();
                const tool = toolShortcuts[e.key.toLowerCase()];
                const toolButton = document.querySelector(`[data-tool="${tool}"]`);
                if (toolButton) {
                    toolButton.click();
                    // Efecto visual del atajo
                    showShortcutFeedback(e.key.toUpperCase());
                }
            }
            
            // Atajos de formas
            const shapeShortcuts = {
                '1': 'rectangle',
                '2': 'circle',
                '3': 'triangle',
                '4': 'line',
                '5': 'star',
                '6': 'polygon'
            };
            
            if (shapeShortcuts[e.key]) {
                e.preventDefault();
                const shape = shapeShortcuts[e.key];
                const shapeButton = document.querySelector(`[data-shape="${shape}"]`);
                if (shapeButton) {
                    shapeButton.click();
                    // Cambiar a herramienta de formas si no está activa
                    if (currentTool !== 'shape') {
                        document.querySelector('[data-tool="shape"]').click();
                    }
                    showShortcutFeedback(`Forma: ${shape}`);
                }
            }
        }
        
        // Números para tamaño de pincel
        if (e.key >= '0' && e.key <= '9' && !e.ctrlKey) {
            e.preventDefault();
            const sizes = [1, 2, 5, 10, 15, 20, 30, 40, 50, 100];
            const size = sizes[parseInt(e.key)] || 10;
            
            brushSize = size;
            document.getElementById('brushSize').value = size;
            document.getElementById('brushSizeValue').textContent = `${size}px`;
            updateBrushPreview();
            updateCursor();
            
            showShortcutFeedback(`Pincel: ${size}px`);
        }
        
        // Espacio para herramienta mano
        if (e.key === ' ' && currentTool !== 'hand') {
            e.preventDefault();
            document.querySelector('[data-tool="hand"]').click();
            canvas.style.cursor = 'grab';
        }
        
        // Escape para cancelar
        if (e.key === 'Escape') {
            // Cerrar menú contextual si está abierto
            const contextMenu = document.getElementById('contextMenu');
            if (contextMenu.classList.contains('active')) {
                contextMenu.classList.remove('active');
            }
            
            // Cerrar modal si está abierto
            const modal = document.getElementById('newProjectModal');
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
            
            // Cancelar dibujo actual
            if (isDrawing) {
                stopDrawing();
                showNotification('Dibujo cancelado', 'info');
            }
        }
        
        // Teclas +/- para zoom
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            document.getElementById('zoomIn').click();
        }
        
        if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            document.getElementById('zoomOut').click();
        }
        
        // Tecla 0 para zoom 100%
        if (e.key === '0') {
            e.preventDefault();
            zoom = 100;
            updateZoom();
            showNotification('Zoom 100%', 'info');
        }
    }

    function showShortcutFeedback(shortcut) {
        // Mostrar feedback visual del atajo
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.textContent = shortcut;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-tool-active);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.2rem;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            animation: fadeInOut 1s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }

    // ==================== ANIMACIONES ====================
    function startAnimations() {
        // Animación de entrada para elementos
        anime({
            targets: '.sidebar-section',
            translateX: [-50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo'
        });
        
        // Animación para botones de herramientas
        anime({
            targets: '.btn-tool',
            scale: [0.8, 1],
            rotate: [-180, 0],
            delay: anime.stagger(50, {start: 500}),
            duration: 600,
            easing: 'spring(1, 80, 10, 0)'
        });
        
        // Animación pulsante para botón de tema
        setInterval(() => {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                anime({
                    targets: '#themeIcon',
                    scale: [1, 1.1, 1],
                    duration: 2000,
                    easing: 'easeInOutSine'
                });
            }
        }, 4000);
        
        // Contador de FPS
        let frameCount = 0;
        let lastTime = performance.now();
        const fpsCounter = document.getElementById('fpsCounter');
        
        function updateFPS() {
            frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - lastTime;
            
            if (elapsed >= 1000) {
                const fps = Math.round((frameCount * 1000) / elapsed);
                fpsCounter.innerHTML = `
                    <i class="fas fa-tachometer-alt"></i>
                    <span>${fps} FPS</span>
                `;
                
                // Cambiar color según FPS
                if (fps < 30) {
                    fpsCounter.style.color = 'var(--accent-danger)';
                } else if (fps < 50) {
                    fpsCounter.style.color = 'var(--accent-warning)';
                } else {
                    fpsCounter.style.color = 'var(--accent-success)';
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        }
        
        updateFPS();
    }

    function animateButton(button) {
        // Animación de pulsación
        anime({
            targets: button,
            scale: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
        
        // Efecto de ondas
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event ? event.clientX - rect.left : rect.width / 2;
        const y = event ? event.clientY - rect.top : rect.height / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x - size / 2}px`;
        ripple.style.top = `${y - size / 2}px`;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Añadir estilos CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            40% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        
        .shortcut-feedback {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-tool-active);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.2rem;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            animation: fadeInOut 1s ease;
        }
        
        .btn-loading {
            position: relative;
            overflow: hidden;
        }
        
        .btn-loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            100% {
                left: 100%;
            }
        }
        
        .layer-item.dragging {
            opacity: 0.5;
            transform: rotate(5deg) scale(1.05);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(26, 115, 232, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(26, 115, 232, 0);
            }
        }
        
        .bounce {
            animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
        
        .rotate {
            animation: rotate 1s linear infinite;
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== EVENTOS GLOBALES ====================
    // Prevenir arrastrar imágenes dentro del editor
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Prevenir clic derecho en canvas (excepto para menú contextual)
    canvas.addEventListener('contextmenu', function(e) {
        if (!document.getElementById('contextMenu').classList.contains('active')) {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY);
        }
    });

    // Guardar estado antes de cerrar
    window.addEventListener('beforeunload', function(e) {
        if (editorState.history.length > 1) {
            const message = '¿Seguro que quieres salir? Tienes cambios sin guardar.';
            e.returnValue = message;
            return message;
        }
    });

    // Ajustar canvas al redimensionar ventana
    window.addEventListener('resize', function() {
        // Recalcular zoom para ajustar a pantalla si es necesario
        if (zoom === 100) {
            const container = document.getElementById('canvasContainer');
            const containerRect = container.getBoundingClientRect();
            const scaleX = containerRect.width / canvas.width;
            const scaleY = containerRect.height / canvas.height;
            const scale = Math.min(scaleX, scaleY) * 0.9;
            
            if (scale < 1) {
                zoom = Math.floor(scale * 100);
                updateZoom();
            }
        }
    });

    // ==================== FUNCIONES DE DEMO ====================
    // Función para demostrar efectos (puedes eliminar esto en producción)
    function startDemoMode() {
        // Solo activar si no hay interacción en 30 segundos
        let timeout = setTimeout(() => {
            if (!isDrawing && !document.querySelector('.modal.active')) {
                showDemoEffects();
            }
        }, 30000);
        
        // Resetear timeout con cualquier interacción
        document.addEventListener('mousedown', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!isDrawing && !document.querySelector('.modal.active')) {
                    showDemoEffects();
                }
            }, 30000);
        });
    }

    function showDemoEffects() {
        const effects = ['blur', 'brightness', 'contrast', 'saturation'];
        let index = 0;
        
        const demoInterval = setInterval(() => {
            if (index >= effects.length || isDrawing || document.querySelector('.modal.active')) {
                clearInterval(demoInterval);
                return;
            }
            
            applyEffect(effects[index]);
            index++;
            
            // Mostrar que es un demo
            if (index === 1) {
                showNotification('Modo demo activado: mostrando efectos', 'info');
            }
            
        }, 2000);
        
        // Parar demo después de 10 segundos
        setTimeout(() => {
            clearInterval(demoInterval);
            showNotification('Modo demo finalizado', 'info');
        }, 10000);
    }

    // ==================== INICIALIZAR TODO ====================
    // Inicializar cuando el DOM esté listo
    setTimeout(() => {
        init();
        startDemoMode(); // Opcional: eliminar en producción
    }, 100);

    // Hacer funciones disponibles globalmente (para eventos inline en HTML)
    window.applyEffect = applyEffect;
    window.showNotification = showNotification;
    window.animateButton = animateButton;

    // Debug helpers (eliminar en producción)
    console.log('🎨 Editor Photoshop Pro cargado');
    console.log('📝 Atajos disponibles:');
    console.log('   B - Pincel, E - Borrador, T - Texto, U - Formas');
    console.log('   G - Relleno, M - Selección, C - Recortar, P - Pluma');
    console.log('   I - Cuentagotas, H - Mano, Z - Zoom, V - Selección');
    console.log('   Ctrl+Z - Deshacer, Ctrl+Shift+Z - Rehacer');
    console.log('   Ctrl+S - Guardar, Espacio - Mano, Escape - Cancelar');
});

// Función auxiliar para Anime.js si no está cargada
if (typeof anime === 'undefined') {
    console.warn('Anime.js no está cargada. Las animaciones no funcionarán.');
    // Polyfill básico para anime
    window.anime = {
        targets: () => ({ then: () => {} }),
        stagger: () => 0
    };
}
                ctx.lineTo(x, y);
                ctx.st
