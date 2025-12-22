document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.querySelector('.btn-generate');
    const form = document.getElementById('generatorForm');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const toggleVisibilityBtn = document.getElementById('toggleVisibilityBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const themeBtn = document.getElementById('themeBtn');
    const tipBtn = document.getElementById('tipBtn');
    const toast = document.getElementById('toast');

    // Caracteres disponibles
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Historial en localStorage
    let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];

    // Tema actual
    let darkTheme = localStorage.getItem('darkTheme') === 'true';

    // Inicializar tema
    updateTheme();

    // Actualizar valor del slider
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generar contraseña
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePassword();
    });

    // Copiar contraseña
    copyBtn.addEventListener('click', copyPassword);

    // Mostrar/ocultar contraseña
    toggleVisibilityBtn.addEventListener('click', togglePasswordVisibility);

    // Regenerar contraseña
    refreshBtn.addEventListener('click', generatePassword);

    // Cambiar tema
    themeBtn.addEventListener('click', toggleTheme);

    // Mostrar consejo
    tipBtn.addEventListener('click', showRandomTip);

    // Limpiar historial
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Cargar historial
    loadHistory();

    // Función para generar contraseña
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const useUppercase = document.getElementById('uppercase').checked;
        const useLowercase = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;

        // Validar que al menos una opción esté seleccionada
        if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
            showToast('Selecciona al menos una opción', 'error');
            return;
        }

        // Crear pool de caracteres
        let charPool = '';
        if (useUppercase) charPool += charSets.uppercase;
        if (useLowercase) charPool += charSets.lowercase;
        if (useNumbers) charPool += charSets.numbers;
        if (useSymbols) charPool += charSets.symbols;

        // Generar contraseña
        let password = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += charPool[array[i] % charPool.length];
        }

        // Mostrar contraseña
        passwordOutput.value = password;
        passwordOutput.type = 'password';

        // Actualizar fuerza
        updateStrength(password);

        // Agregar al historial
        addToHistory(password);
    }

    // Función para copiar contraseña
    function copyPassword() {
        if (passwordOutput.value === 'Genera una contraseña') {
            showToast('Primero genera una contraseña', 'error');
            return;
        }

        navigator.clipboard.writeText(passwordOutput.value)
            .then(() => {
                showToast('✓ Contraseña copiada al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
                showToast('Error al copiar', 'error');
            });
    }

    // Función para mostrar/ocultar contraseña
    function togglePasswordVisibility() {
        if (passwordOutput.value === 'Genera una contraseña') return;
        
        const type = passwordOutput.type;
        passwordOutput.type = type === 'password' ? 'text' : 'password';
        toggleVisibilityBtn.textContent = type === 'password' ? '🙈' : '👁️';
    }

    // Función para cambiar tema
    function toggleTheme() {
        darkTheme = !darkTheme;
        localStorage.setItem('darkTheme', darkTheme);
        updateTheme();
    }

    function updateTheme() {
        if (darkTheme) {
            document.body.classList.add('dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.title = 'Cambiar a tema claro';
        } else {
            document.body.classList.remove('dark-theme');
            themeBtn.textContent = '🌙';
            themeBtn.title = 'Cambiar a tema oscuro';
        }
    }

    // Función para mostrar consejos
    function showRandomTip() {
        const tips = [
            "¿Sabías que las contraseñas más seguras tienen al menos 12 caracteres?",
            "Usa frases en lugar de palabras simples. Ej: 'MiPerroTiene5Años!'",
            "Activa la autenticación de dos factores siempre que sea posible.",
            "No uses información personal como fechas de nacimiento en tus contraseñas.",
            "Los gestores de contraseñas como LastPass o Bitwarden te ayudan a gestionar todas tus contraseñas.",
            "Cambia tus contraseñas cada 3-6 meses para mayor seguridad.",
            "Nunca uses la misma contraseña en diferentes sitios web.",
            "Los símbolos hacen que tu contraseña sea 10 veces más segura."
        ];

        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        // Crear modal de consejo
        const tipModal = document.createElement('div');
        tipModal.className = 'tip-message';
        tipModal.innerHTML = `
            <h3>💡 Consejo de Seguridad</h3>
            <p>${randomTip}</p>
            <button id="closeTipBtn">Entendido</button>
        `;

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        document.body.appendChild(overlay);
        document.body.appendChild(tipModal);

        setTimeout(() => {
            overlay.classList.add('show');
            tipModal.classList.add('show');
        }, 10);

        // Cerrar modal
        document.getElementById('closeTipBtn').onclick = function() {
            overlay.classList.remove('show');
            tipModal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.removeChild(tipModal);
            }, 300);
        };

        overlay.onclick = function() {
            overlay.classList.remove('show');
            tipModal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.removeChild(tipModal);
            }, 300);
        };
    }

    // Función para actualizar indicador de fuerza
    function updateStrength(password) {
        let strength = 0;
        
        // Longitud
        if (password.length >= 12) strength += 30;
        else if (password.length >= 8) strength += 20;
        else if (password.length >= 6) strength += 10;
        
        // Tipos de caracteres
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        // Normalizar a 100%
        strength = Math.min(strength, 100);
        
        // Actualizar barra
        strengthBar.style.width = `${strength}%`;
        
        // Cambiar color según fuerza
        if (strength < 40) {
            strengthBar.style.background = '#ff6b6b';
            strengthText.textContent = 'Fuerza: Débil';
        } else if (strength < 70) {
            strengthBar.style.background = '#ffa726';
            strengthText.textContent = 'Fuerza: Media';
        } else {
            strengthBar.style.background = '#4caf50';
            strengthText.textContent = 'Fuerza: Fuerte';
        }
    }

    // Función para agregar al historial
    function addToHistory(password) {
        const timestamp = new Date().toLocaleTimeString();
        const item = {
            password: password,
            time: timestamp,
            strength: getStrengthText(password)
        };
        
        passwordHistory.unshift(item);
        if (passwordHistory.length > 10) {
            passwordHistory.pop();
        }
        
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
        loadHistory();
    }

    // Función para cargar historial
    function loadHistory() {
        if (passwordHistory.length === 0) {
            historyList.innerHTML = '<p class="empty">No hay contraseñas generadas aún</p>';
            clearHistoryBtn.style.display = 'none';
            return;
        }
        
        clearHistoryBtn.style.display = 'block';
        historyList.innerHTML = '';
        
        passwordHistory.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div>
                    <div class="history-password">${item.password}</div>
                    <small>${item.time} - ${item.strength}</small>
                </div>
                <button class="history-copy" data-index="${index}">Copiar</button>
            `;
            historyList.appendChild(div);
        });
        
        // Agregar eventos a botones de copiar
        document.querySelectorAll('.history-copy').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                navigator.clipboard.writeText(passwordHistory[index].password)
                    .then(() => showToast('Contraseña copiada del historial'))
                    .catch(err => console.error('Error al copiar:', err));
            });
        });
    }

    // Función para limpiar historial
    function clearHistory() {
        if (confirm('¿Estás seguro de que quieres limpiar el historial?')) {
            passwordHistory = [];
            localStorage.removeItem('passwordHistory');
            loadHistory();
            showToast('Historial limpiado');
        }
    }

    // Función para obtener texto de fuerza
    function getStrengthText(password) {
        let strength = 0;
        if (password.length >= 12) strength += 30;
        else if (password.length >= 8) strength += 20;
        else if (password.length >= 6) strength += 10;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        if (strength < 40) return 'Débil';
        if (strength < 70) return 'Media';
        return 'Fuerte';
    }

    // Función para mostrar notificaciones
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.style.background = type === 'error' ? '#ff6b6b' : '#4caf50';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Generar contraseña inicial
    generatePassword();
});