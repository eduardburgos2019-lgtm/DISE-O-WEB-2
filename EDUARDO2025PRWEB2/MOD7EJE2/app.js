// Theme Switcher Application
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const html = document.documentElement;
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentColor = localStorage.getItem('color-theme') || 'purple';
    let animationsEnabled = localStorage.getItem('animations') !== 'false';
    let autoDetectTheme = localStorage.getItem('auto-detect') === 'true';
    let savePreferences = localStorage.getItem('save-preferences') !== 'false';
    
    // Elementos del DOM
    const themeCheckbox = document.getElementById('theme-checkbox');
    const currentThemeSpan = document.getElementById('current-theme');
    const themeStatus = document.getElementById('theme-status');
    const colorOptions = document.querySelectorAll('.color-option');
    const applyBtn = document.getElementById('apply-btn');
    const resetBtn = document.getElementById('reset-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, #close-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const animationsToggle = document.getElementById('animations-toggle');
    const autoDetectToggle = document.getElementById('auto-detect-toggle');
    const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
    const savePreferencesToggle = document.getElementById('save-preferences-toggle');
    const scheduleToggle = document.getElementById('schedule-toggle');
    const darkIntensity = document.getElementById('dark-intensity');
    
    // Elementos de estadísticas
    const themeUsage = document.getElementById('theme-usage');
    const preferredColor = document.getElementById('preferred-color');
    const timeSaved = document.getElementById('time-saved');
    
    // Inicializar la aplicación
    function init() {
        // Aplicar tema guardado
        applyTheme(currentTheme);
        applyColorTheme(currentColor);
        
        // Configurar checkboxes según preferencias guardadas
        themeCheckbox.checked = currentTheme === 'dark';
        animationsToggle.checked = animationsEnabled;
        autoDetectToggle.checked = autoDetectTheme;
        reduceMotionToggle.checked = localStorage.getItem('reduce-motion') === 'true';
        savePreferencesToggle.checked = savePreferences;
        scheduleToggle.checked = localStorage.getItem('schedule-theme') === 'true';
        darkIntensity.value = localStorage.getItem('dark-intensity') || '5';
        
        // Actualizar UI
        updateUI();
        
        // Configurar detección automática de tema del sistema
        if (autoDetectTheme) {
            setupSystemThemeDetection();
        }
        
        // Configurar listeners de eventos
        setupEventListeners();
        
        // Actualizar estadísticas
        updateStatistics();
        
        // Inicializar tooltips
        initTooltips();
    }
    
    // Aplicar tema (claro/oscuro)
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        currentTheme = theme;
        
        if (savePreferences) {
            localStorage.setItem('theme', theme);
        }
        
        // Actualizar UI
        updateThemeUI();
    }
    
    // Aplicar tema de color
    function applyColorTheme(color) {
        // Remover clase de color anterior
        html.classList.remove(`color-${currentColor}`);
        
        // Aplicar nuevo color
        html.classList.add(`color-${color}`);
        currentColor = color;
        
        if (savePreferences) {
            localStorage.setItem('color-theme', color);
        }
        
        // Actualizar color activo en la UI
        updateColorOptionsUI();
    }
    
    // Actualizar UI del tema
    function updateThemeUI() {
        const isDark = currentTheme === 'dark';
        themeCheckbox.checked = isDark;
        currentThemeSpan.textContent = isDark ? 'Oscuro' : 'Claro';
        themeStatus.textContent = isDark ? 'Activado' : 'Desactivado';
        themeStatus.style.backgroundColor = isDark ? '#10b981' : '#64748b';
    }
    
    // Actualizar UI de opciones de color
    function updateColorOptionsUI() {
        colorOptions.forEach(option => {
            const color = option.dataset.color;
            option.classList.toggle('active', color === currentColor);
        });
    }
    
    // Actualizar toda la UI
    function updateUI() {
        updateThemeUI();
        updateColorOptionsUI();
        updateStatistics();
    }
    
    // Configurar detección de tema del sistema
    function setupSystemThemeDetection() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Aplicar tema del sistema al cargar
        if (prefersDarkScheme.matches) {
            applyTheme('dark');
        }
        
        // Escuchar cambios en la preferencia del sistema
        prefersDarkScheme.addEventListener('change', (e) => {
            if (autoDetectTheme) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Configurar listeners de eventos
    function setupEventListeners() {
        // Toggle del tema principal
        themeCheckbox.addEventListener('change', function() {
            applyTheme(this.checked ? 'dark' : 'light');
            showNotification('Tema cambiado', 'success');
        });
        
        // Selección de color
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                const color = this.dataset.color;
                applyColorTheme(color);
                showNotification(`Color ${color} aplicado`, 'info');
            });
        });
        
        // Botón aplicar cambios
        applyBtn.addEventListener('click', function() {
            showNotification('Cambios aplicados exitosamente', 'success');
            // Animación de confirmación
            this.innerHTML = '<i class="fas fa-check"></i> ¡Aplicado!';
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check-circle"></i> Aplicar Cambios';
                this.classList.remove('btn-success');
            }, 2000);
        });
        
        // Botón reset
        resetBtn.addEventListener('click', function() {
            if (confirm('¿Restablecer todas las configuraciones a los valores predeterminados?')) {
                resetToDefaults();
                showNotification('Configuraciones restablecidas', 'info');
            }
        });
        
        // Botón de configuración
        settingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Cerrar modal
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                settingsModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Guardar configuración
        saveSettingsBtn.addEventListener('click', function() {
            // Guardar preferencias
            animationsEnabled = animationsToggle.checked;
            autoDetectTheme = autoDetectToggle.checked;
            const reduceMotion = reduceMotionToggle.checked;
            savePreferences = savePreferencesToggle.checked;
            const scheduleTheme = scheduleToggle.checked;
            const intensity = darkIntensity.value;
            
            localStorage.setItem('animations', animationsEnabled);
            localStorage.setItem('auto-detect', autoDetectTheme);
            localStorage.setItem('reduce-motion', reduceMotion);
            localStorage.setItem('save-preferences', savePreferences);
            localStorage.setItem('schedule-theme', scheduleTheme);
            localStorage.setItem('dark-intensity', intensity);
            
            // Aplicar reducción de movimiento
            if (reduceMotion) {
                document.documentElement.style.setProperty('--transition-fast', '0ms');
                document.documentElement.style.setProperty('--transition-base', '0ms');
                document.documentElement.style.setProperty('--transition-slow', '0ms');
            } else {
                document.documentElement.style.setProperty('--transition-fast', '150ms ease');
                document.documentElement.style.setProperty('--transition-base', '300ms ease');
                document.documentElement.style.setProperty('--transition-slow', '500ms ease');
            }
            
            // Configurar detección automática si está activada
            if (autoDetectTheme) {
                setupSystemThemeDetection();
            }
            
            // Programar tema si está activado
            if (scheduleTheme) {
                scheduleThemeChange();
            }
            
            showNotification('Configuraciones guardadas', 'success');
            settingsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Cerrar modal al hacer clic fuera
        settingsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Efecto visual en slider de intensidad
        darkIntensity.addEventListener('input', function() {
            const value = this.value;
            const percent = (value / 10) * 100;
            this.style.background = `linear-gradient(to right, var(--border-color) 0%, var(--primary-color) ${percent}%, var(--border-color) ${percent}%)`;
        });
        
        // Inicializar slider de intensidad
        darkIntensity.dispatchEvent(new Event('input'));
    }
    
    // Restablecer a valores predeterminados
    function resetToDefaults() {
        applyTheme('light');
        applyColorTheme('purple');
        
        // Restablecer toggles
        animationsToggle.checked = true;
        autoDetectToggle.checked = false;
        reduceMotionToggle.checked = false;
        savePreferencesToggle.checked = true;
        scheduleToggle.checked = false;
        darkIntensity.value = '5';
        
        // Restablecer transiciones
        document.documentElement.style.setProperty('--transition-fast', '150ms ease');
        document.documentElement.style.setProperty('--transition-base', '300ms ease');
        document.documentElement.style.setProperty('--transition-slow', '500ms ease');
        
        // Actualizar UI
        updateUI();
    }
    
    // Programar cambio de tema según hora del día
    function scheduleThemeChange() {
        const now = new Date();
        const hour = now.getHours();
        
        // Cambiar a oscuro después de las 6 PM, a claro después de las 6 AM
        if (hour >= 18 || hour < 6) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }
    
    // Actualizar estadísticas (datos de ejemplo)
    function updateStatistics() {
        const usagePercentage = currentTheme === 'dark' ? '75%' : '25%';
        themeUsage.textContent = usagePercentage;
        
        // Capitalizar primera letra del color
        const colorName = currentColor.charAt(0).toUpperCase() + currentColor.slice(1);
        preferredColor.textContent = colorName;
        
        // Tiempo "ahorrado" basado en preferencia de tema
        const savedHours = currentTheme === 'dark' ? '3.2h' : '1.5h';
        timeSaved.textContent = savedHours;
    }
    
    // Mostrar notificación
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        
        // Estilos para el contenido
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        `;
        
        // Estilos para el botón cerrar
        notification.querySelector('.notification-close').style.cssText = `
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Botón para cerrar
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 4000);
    }
    
    // Inicializar tooltips
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[title]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.title;
                
                // Posicionar tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.cssText = `
                    position: fixed;
                    background: var(--text-color);
                    color: var(--background-color);
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    z-index: 10001;
                    top: ${rect.top - 40}px;
                    left: ${rect.left + rect.width / 2}px;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    pointer-events: none;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                `;
                
                document.body.appendChild(tooltip);
                
                // Arrow
                const arrow = document.createElement('div');
                arrow.style.cssText = `
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid var(--text-color);
                `;
                tooltip.appendChild(arrow);
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    // Inicializar aplicación
    init();
    
    // Añadir clase de color para CSS
    const style = document.createElement('style');
    style.textContent = `
        .color-blue { --primary-color: #3b82f6; }
        .color-purple { --primary-color: #8b5cf6; }
        .color-green { --primary-color: #10b981; }
        .color-orange { --primary-color: #f59e0b; }
        .color-pink { --primary-color: #ec4899; }
        .color-red { --primary-color: #ef4444; }
        
        .btn-success {
            background-color: #10b981 !important;
        }
        
        @keyframes slideOut {
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
});