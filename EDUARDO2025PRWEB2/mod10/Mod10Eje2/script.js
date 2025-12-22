document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('imcForm');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const edadInput = document.getElementById('edad');
    const themeBtn = document.getElementById('themeBtn');
    const tipBtn = document.getElementById('tipBtn');
    const resultSection = document.getElementById('resultSection');
    const imcValue = document.getElementById('imcValue');
    const imcCategory = document.getElementById('imcCategory');
    const imcIndicator = document.getElementById('imcIndicator');
    const recommendationText = document.getElementById('recommendationText');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const toast = document.getElementById('toast');
    
    // Botones de funcionalidad rápida
    const quickWeightButtons = {
        'quickWeight50': document.getElementById('quickWeight50'),
        'quickWeight70': document.getElementById('quickWeight70'),
        'quickWeight90': document.getElementById('quickWeight90')
    };
    
    const quickHeightButtons = {
        'quickHeight160': document.getElementById('quickHeight160'),
        'quickHeight175': document.getElementById('quickHeight175'),
        'quickHeight190': document.getElementById('quickHeight190')
    };
    
    // Botones de acciones
    const clearFormBtn = document.getElementById('clearFormBtn');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const loadPresetBtn = document.getElementById('loadPresetBtn');
    const shareResultBtn = document.getElementById('shareResultBtn');
    const showDetailsBtn = document.getElementById('showDetailsBtn');
    const saveRecommendationsBtn = document.getElementById('saveRecommendationsBtn');
    const exportHistoryBtn = document.getElementById('exportHistoryBtn');
    
    // Elementos de info
    const idealRange = document.getElementById('idealRange');
    const currentStatus = document.getElementById('currentStatus');
    const idealWeight = document.getElementById('idealWeight');
    const trend = document.getElementById('trend');
    const statsSummary = document.getElementById('statsSummary');
    const avgImc = document.getElementById('avgImc');
    const bestImc = document.getElementById('bestImc');
    const totalCalculations = document.getElementById('totalCalculations');
    
    // Modales
    const detailsModal = document.getElementById('detailsModal');
    const presetsModal = document.getElementById('presetsModal');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    const closeDetailsBtn2 = document.getElementById('closeDetailsBtn2');
    const closePresetsBtn = document.getElementById('closePresetsBtn');
    const printDetailsBtn = document.getElementById('printDetailsBtn');
    const saveNewPresetBtn = document.getElementById('saveNewPresetBtn');
    const presetNameInput = document.getElementById('presetName');
    const presetsList = document.getElementById('presetsList');
    
    // Variables de estado
    let darkTheme = localStorage.getItem('darkTheme') === 'true';
    let history = JSON.parse(localStorage.getItem('imcHistory')) || [];
    let presets = JSON.parse(localStorage.getItem('imcPresets')) || [];
    let lastCalculations = [];
    
    // Inicializar
    updateTheme();
    loadHistory();
    updateStats();
    
    // Event Listeners para botones rápidos
    Object.values(quickWeightButtons).forEach(btn => {
        btn.addEventListener('click', () => {
            pesoInput.value = btn.textContent;
            validateInput(pesoInput);
        });
    });
    
    Object.values(quickHeightButtons).forEach(btn => {
        btn.addEventListener('click', () => {
            alturaInput.value = btn.textContent;
            validateInput(alturaInput);
        });
    });
    
    // Event Listeners para botones de acción
    clearFormBtn.addEventListener('click', clearForm);
    savePresetBtn.addEventListener('click', () => openModal(presetsModal));
    loadPresetBtn.addEventListener('click', loadPreset);
    shareResultBtn.addEventListener('click', shareResult);
    showDetailsBtn.addEventListener('click', () => openModal(detailsModal));
    saveRecommendationsBtn.addEventListener('click', saveRecommendations);
    exportHistoryBtn.addEventListener('click', exportHistory);
    clearHistoryBtn.addEventListener('click', clearHistory);
    themeBtn.addEventListener('click', toggleTheme);
    tipBtn.addEventListener('click', showHealthTip);
    
    // Event Listeners para modales
    closeDetailsBtn.addEventListener('click', () => closeModal(detailsModal));
    closeDetailsBtn2.addEventListener('click', () => closeModal(detailsModal));
    closePresetsBtn.addEventListener('click', () => closeModal(presetsModal));
    printDetailsBtn.addEventListener('click', printDetails);
    saveNewPresetBtn.addEventListener('click', saveNewPreset);
    
    // Cerrar modales al hacer clic fuera
    [detailsModal, presetsModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Validación en tiempo real
    pesoInput.addEventListener('input', () => validateInput(pesoInput));
    alturaInput.addEventListener('input', () => validateInput(alturaInput));
    edadInput.addEventListener('input', () => validateInput(edadInput));
    
    // Envío del formulario
    form.addEventListener('submit', handleSubmit);
    
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
    
    // Función para validar entrada
    function validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || Infinity;
        
        if (input.value === '') {
            input.classList.remove('valid', 'invalid');
            return false;
        }
        
        if (isNaN(value) || value < min || value > max) {
            input.classList.remove('valid');
            input.classList.add('invalid');
            return false;
        }
        
        input.classList.remove('invalid');
        input.classList.add('valid');
        return true;
    }
    
    // Función para limpiar formulario
    function clearForm() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
            form.reset();
            resultSection.style.display = 'none';
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            showToast('Formulario limpiado', 'info');
        }
    }
    
    // Función para manejar envío del formulario
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateInput(pesoInput) || !validateInput(alturaInput) || !validateInput(edadInput)) {
            showToast('Por favor, ingresa valores válidos', 'error');
            return;
        }
        
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value) / 100; // Convertir a metros
        const edad = parseInt(edadInput.value);
        const sexo = document.querySelector('input[name="sexo"]:checked').value;
        
        // Calcular IMC
        const imc = peso / (altura * altura);
        const categoria = getIMCCategory(imc);
        const recomendaciones = getRecommendations(imc, edad, sexo);
        
        // Mostrar resultado
        resultSection.style.display = 'block';
        imcValue.textContent = imc.toFixed(1);
        imcCategory.textContent = categoria.text;
        imcCategory.style.background = categoria.color;
        imcCategory.style.color = 'white';
        
        // Actualizar indicador en la barra
        updateIMCIndicator(imc);
        
        // Mostrar recomendaciones
        recommendationText.textContent = recomendaciones;
        
        // Actualizar información adicional
        updateAdditionalInfo(peso, altura, imc, categoria);
        
        // Guardar en historial
        addToHistory(pesoInput.value, alturaInput.value, imc, categoria);
        
        // Actualizar estadísticas
        updateStats();
        
        // Mostrar notificación
        showToast(`IMC calculado: ${imc.toFixed(1)} (${categoria.text})`, 'success');
    }
    
    // Función para obtener categoría del IMC
    function getIMCCategory(imc) {
        if (imc < 18.5) {
            return {
                text: 'Bajo peso',
                color: '#3498db',
                level: 0
            };
        } else if (imc < 25) {
            return {
                text: 'Peso normal',
                color: '#2ecc71',
                level: 1
            };
        } else if (imc < 30) {
            return {
                text: 'Sobrepeso',
                color: '#f39c12',
                level: 2
            };
        } else {
            return {
                text: 'Obesidad',
                color: '#e74c3c',
                level: 3
            };
        }
    }
    
    // Función para actualizar indicador en barra
    function updateIMCIndicator(imc) {
        // Calcular posición (IMC de 15 a 40)
        const minIMC = 15;
        const maxIMC = 40;
        const clampedIMC = Math.max(minIMC, Math.min(maxIMC, imc));
        const percentage = ((clampedIMC - minIMC) / (maxIMC - minIMC)) * 100;
        
        // Posicionar indicador
        imcIndicator.style.left = `${percentage}%`;
        
        // Cambiar color según categoría
        const category = getIMCCategory(imc);
        imcIndicator.style.borderTopColor = category.color;
    }
    
    // Función para obtener recomendaciones
    function getRecommendations(imc, edad, sexo) {
        if (imc < 18.5) {
            return 'Considera aumentar tu ingesta calórica con alimentos nutritivos y realizar ejercicios de fuerza para ganar masa muscular.';
        } else if (imc < 25) {
            return '¡Excelente! Mantén un estilo de vida saludable con ejercicio regular y una dieta balanceada.';
        } else if (imc < 30) {
            return 'Te recomendamos aumentar la actividad física y moderar el consumo de calorías para alcanzar un peso saludable.';
        } else {
            return 'Es importante consultar con un profesional de la salud para crear un plan personalizado de pérdida de peso.';
        }
    }
    
    // Función para actualizar información adicional
    function updateAdditionalInfo(peso, altura, imc, categoria) {
        // Rango ideal
        idealRange.textContent = '18.5 - 24.9';
        
        // Estado actual
        currentStatus.textContent = categoria.text;
        currentStatus.style.color = categoria.color;
        
        // Peso ideal
        const alturaM = altura;
        const pesoIdealMin = 18.5 * (alturaM * alturaM);
        const pesoIdealMax = 24.9 * (alturaM * alturaM);
        idealWeight.textContent = `${pesoIdealMin.toFixed(1)} - ${pesoIdealMax.toFixed(1)} kg`;
        
        // Tendencia
        const diff = imc - 21.7; // Punto medio del rango normal
        if (Math.abs(diff) < 0.5) {
            trend.textContent = 'En rango óptimo';
            trend.style.color = '#2ecc71';
        } else if (imc < 18.5) {
            trend.textContent = 'Debes subir de peso';
            trend.style.color = '#3498db';
        } else if (imc < 30) {
            trend.textContent = 'Ligero ajuste necesario';
            trend.style.color = '#f39c12';
        } else {
            trend.textContent = 'Cambios significativos necesarios';
            trend.style.color = '#e74c3c';
        }
    }
    
    // Función para agregar al historial
    function addToHistory(peso, altura, imc, categoria) {
        const fecha = new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const item = {
            id: Date.now(),
            fecha,
            peso: parseFloat(peso),
            altura: parseFloat(altura),
            imc: parseFloat(imc.toFixed(1)),
            categoria: categoria.text,
            color: categoria.color
        };
        
        history.unshift(item);
        if (history.length > 20) {
            history.pop();
        }
        
        localStorage.setItem('imcHistory', JSON.stringify(history));
        loadHistory();
    }
    
    // Función para cargar historial
    function loadHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-history">No hay cálculos previos</p>';
            clearHistoryBtn.style.display = 'none';
            return;
        }
        
        clearHistoryBtn.style.display = 'flex';
        historyList.innerHTML = '';
        
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-info">
                    <div>
                        <span class="history-imc">${item.imc}</span>
                        <span class="history-category" style="background: ${item.color}">${item.categoria}</span>
                    </div>
                    <div class="history-date">${item.fecha}</div>
                    <div class="history-details">${item.peso} kg, ${item.altura} cm</div>
                </div>
                <div class="history-actions">
                    <button class="history-action-btn" onclick="loadHistoryItem(${item.id})" title="Cargar">
                        📋
                    </button>
                    <button class="history-action-btn" onclick="deleteHistoryItem(${item.id})" title="Eliminar">
                        🗑️
                    </button>
                </div>
            `;
            historyList.appendChild(div);
        });
    }
    
    // Funciones para manejar historial (se exponen globalmente)
    window.loadHistoryItem = function(id) {
        const item = history.find(h => h.id === id);
        if (item) {
            pesoInput.value = item.peso;
            alturaInput.value = item.altura;
            validateInput(pesoInput);
            validateInput(alturaInput);
            showToast('Datos cargados del historial', 'success');
            
            // Disparar evento de submit
            setTimeout(() => {
                form.dispatchEvent(new Event('submit'));
            }, 100);
        }
    };
    
    window.deleteHistoryItem = function(id) {
        if (confirm('¿Eliminar este registro del historial?')) {
            history = history.filter(h => h.id !== id);
            localStorage.setItem('imcHistory', JSON.stringify(history));
            loadHistory();
            updateStats();
            showToast('Registro eliminado', 'info');
        }
    };
    
    // Función para limpiar historial
    function clearHistory() {
        if (confirm('¿Estás seguro de que quieres limpiar todo el historial?')) {
            history = [];
            localStorage.removeItem('imcHistory');
            loadHistory();
            updateStats();
            showToast('Historial limpiado', 'info');
        }
    }
    
    // Función para exportar historial
    function exportHistory() {
        if (history.length === 0) {
            showToast('No hay datos para exportar', 'warning');
            return;
        }
        
        const csvContent = [
            ['Fecha', 'Peso (kg)', 'Altura (cm)', 'IMC', 'Categoría'],
            ...history.map(item => [
                item.fecha,
                item.peso,
                item.altura,
                item.imc,
                item.categoria
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `historial-imc-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast('Historial exportado como CSV', 'success');
    }
    
    // Función para actualizar estadísticas
    function updateStats() {
        if (history.length === 0) {
            statsSummary.style.display = 'none';
            return;
        }
        
        statsSummary.style.display = 'block';
        const imcs = history.map(h => h.imc);
        const avg = imcs.reduce((a, b) => a + b, 0) / imcs.length;
        
        // Encontrar el IMC más cercano a 22 (punto medio del rango normal)
        const best = imcs.reduce((prev, curr) => {
            return Math.abs(curr - 22) < Math.abs(prev - 22) ? curr : prev;
        });
        
        avgImc.textContent = avg.toFixed(1);
        bestImc.textContent = best.toFixed(1);
        totalCalculations.textContent = history.length;
    }
    
    // Función para mostrar consejos de salud
    function showHealthTip() {
        const tips = [
            "🎯 El IMC es una herramienta de screening, no un diagnóstico. Consulta siempre con un profesional de la salud.",
            "💪 Además del peso, considera tu composición corporal. El músculo pesa más que la grasa.",
            "🏃‍♂️ La actividad física regular es clave para mantener un peso saludable.",
            "🥗 Una dieta balanceada con frutas, verduras y proteínas magras te ayudará a mantener tu IMC ideal.",
            "💧 Beber suficiente agua ayuda a mantener un metabolismo saludable.",
            "😴 Dormir 7-8 horas por noche ayuda a regular las hormonas del apetito.",
            "📊 Lleva un registro regular de tu peso para detectar tendencias temprano.",
            "🧠 La salud mental es tan importante como la física. Practica el autocuidado."
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        showToast(randomTip, 'info');
    }
    
    // Función para compartir resultado
    function shareResult() {
        if (!navigator.share) {
            // Fallback: copiar al portapapeles
            const text = `Mi IMC es ${imcValue.textContent} (${imcCategory.text}). Calculado con la Calculadora de IMC.`;
            navigator.clipboard.writeText(text)
                .then(() => showToast('Resultado copiado al portapapeles', 'success'))
                .catch(() => showToast('Error al copiar', 'error'));
            return;
        }
        
        navigator.share({
            title: 'Mi Resultado de IMC',
            text: `Mi IMC es ${imcValue.textContent} (${imcCategory.text})`,
            url: window.location.href
        }).catch(() => {
            showToast('Compartido exitosamente', 'success');
        });
    }
    
    // Función para guardar recomendaciones
    function saveRecommendations() {
        const text = `Recomendaciones para IMC ${imcValue.textContent}:\n${recommendationText.textContent}`;
        navigator.clipboard.writeText(text)
            .then(() => showToast('Recomendaciones copiadas al portapapeles', 'success'))
            .catch(() => showToast('Error al copiar', 'error'));
    }
    
    // Función para abrir modal
    function openModal(modal) {
        if (modal === detailsModal) {
            updateDetailsModal();
        } else if (modal === presetsModal) {
            updatePresetsModal();
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Función para actualizar modal de detalles
    function updateDetailsModal() {
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);
        const imc = parseFloat(imcValue.textContent);
        const categoria = imcCategory.textContent;
        
        document.getElementById('detailImcValue').textContent = `${imc.toFixed(1)} (${categoria})`;
        document.getElementById('detailHeight').textContent = altura;
        
        // Calcular rango saludable
        const alturaM = altura / 100;
        const pesoMin = (18.5 * (alturaM * alturaM)).toFixed(1);
        const pesoMax = (24.9 * (alturaM * alturaM)).toFixed(1);
        document.getElementById('detailHealthyRange').textContent = `${pesoMin} kg - ${pesoMax} kg`;
        
        // Progreso recomendado
        let progressText = '';
        if (imc < 18.5) {
            const pesoRecomendado = (21 * (alturaM * alturaM)).toFixed(1);
            const diferencia = (pesoRecomendado - peso).toFixed(1);
            progressText = `Para alcanzar un IMC de 21, necesitas aumentar ${diferencia} kg.`;
        } else if (imc > 25) {
            const pesoRecomendado = (23 * (alturaM * alturaM)).toFixed(1);
            const diferencia = (peso - pesoRecomendado).toFixed(1);
            progressText = `Para alcanzar un IMC de 23, necesitas perder ${diferencia} kg.`;
        } else {
            progressText = '¡Estás en el rango saludable! Mantén tus hábitos actuales.';
        }
        document.getElementById('detailProgress').textContent = progressText;
        
        // Tiempo estimado
        if (imc < 18.5 || imc > 25) {
            const cambioNecesario = Math.abs((imc > 25 ? 23 : 21) - imc);
            const semanas = Math.ceil(cambioNecesario * 4);
            document.getElementById('detailTime').textContent = `Con cambios consistentes, podrías ver resultados en ${semanas} semanas.`;
        } else {
            document.getElementById('detailTime').textContent = 'Continúa con tu rutina actual.';
        }
        
        // Acciones sugeridas
        const actionsList = document.getElementById('detailActions');
        actionsList.innerHTML = '';
        
        const actions = [
            'Consulta con un nutricionista para un plan personalizado',
            'Incorpora 30 minutos de ejercicio moderado 5 días a la semana',
            'Mantén un diario de alimentación por 2 semanas',
            'Bebe al menos 2 litros de agua al día',
            'Duerme 7-8 horas cada noche',
            'Reduce el consumo de alimentos procesados'
        ];
        
        actions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            actionsList.appendChild(li);
        });
    }
    
    // Función para imprimir detalles
    function printDetails() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Reporte de IMC</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #333; }
                        .section { margin-bottom: 20px; }
                        .value { font-weight: bold; color: #667eea; }
                        .recommendations { background: #f0f8ff; padding: 15px; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <h1>📊 Reporte de IMC</h1>
                    <div class="section">
                        <h2>Datos Personales</h2>
                        <p>Peso: <span class="value">${pesoInput.value} kg</span></p>
                        <p>Altura: <span class="value">${alturaInput.value} cm</span></p>
                        <p>Edad: <span class="value">${edadInput.value} años</span></p>
                    </div>
                    <div class="section">
                        <h2>Resultado</h2>
                        <p>IMC: <span class="value">${imcValue.textContent}</span></p>
                        <p>Categoría: <span class="value">${imcCategory.textContent}</span></p>
                    </div>
                    <div class="section recommendations">
                        <h2>Recomendaciones</h2>
                        <p>${recommendationText.textContent}</p>
                    </div>
                    <p><small>Generado el ${new Date().toLocaleDateString('es-ES')}</small></p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
    
    // Función para actualizar modal de presets
    function updatePresetsModal() {
        if (presets.length === 0) {
            presetsList.innerHTML = '<p class="empty-presets">No hay presets guardados</p>';
            return;
        }
        
        presetsList.innerHTML = '';
        presets.forEach((preset, index) => {
            const div = document.createElement('div');
            div.className = 'preset-item';
            div.innerHTML = `
                <div class="preset-info">
                    <div class="preset-name">${preset.nombre || `Preset ${index + 1}`}</div>
                    <div class="preset-data">${preset.peso} kg, ${preset.altura} cm</div>
                </div>
                <div class="preset-actions">
                    <button class="btn-input" onclick="loadPresetFromList(${index})">Cargar</button>
                    <button class="btn-input" onclick="deletePreset(${index})">Eliminar</button>
                </div>
            `;
            presetsList.appendChild(div);
        });
    }
    
    // Función para guardar nuevo preset
    function saveNewPreset() {
        const nombre = presetNameInput.value.trim() || `Preset ${presets.length + 1}`;
        const peso = pesoInput.value;
        const altura = alturaInput.value;
        
        if (!peso || !altura) {
            showToast('Primero ingresa peso y altura', 'error');
            return;
        }
        
        presets.unshift({
            nombre,
            peso: parseFloat(peso),
            altura: parseFloat(altura),
            fecha: new Date().toISOString()
        });
        
        if (presets.length > 10) {
            presets.pop();
        }
        
        localStorage.setItem('imcPresets', JSON.stringify(presets));
        presetNameInput.value = '';
        updatePresetsModal();
        showToast('Preset guardado', 'success');
    }
    
    // Función para cargar preset
    function loadPreset() {
        if (presets.length === 0) {
            showToast('No hay presets guardados', 'warning');
            return;
        }
        
        openModal(presetsModal);
    }
    
    // Funciones para manejar presets (se exponen globalmente)
    window.loadPresetFromList = function(index) {
        const preset = presets[index];
        if (preset) {
            pesoInput.value = preset.peso;
            alturaInput.value = preset.altura;
            validateInput(pesoInput);
            validateInput(alturaInput);
            closeModal(presetsModal);
            showToast(`Preset "${preset.nombre}" cargado`, 'success');
            
            // Disparar evento de submit
            setTimeout(() => {
                form.dispatchEvent(new Event('submit'));
            }, 100);
        }
    };
    
    window.deletePreset = function(index) {
        if (confirm('¿Eliminar este preset?')) {
            presets.splice(index, 1);
            localStorage.setItem('imcPresets', JSON.stringify(presets));
            updatePresetsModal();
            showToast('Preset eliminado', 'info');
        }
    };
    
    // Función para mostrar notificaciones
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = 'toast';
        toast.classList.add(type);
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
});