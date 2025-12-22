// Elementos
const dropzones = document.querySelectorAll('.dropzone');
const items = document.querySelectorAll('.item');
const resetBtn = document.getElementById('resetBtn');
const addBtn = document.getElementById('addBtn');

let draggedItem = null;
let nextId = 6;

/**
 * Inicializar drag para todos los items
 */
function initDragEvents() {
    const allItems = document.querySelectorAll('.item');
    
    allItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
}

/**
 * Drag start
 */
function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

/**
 * Drag end
 */
function handleDragEnd(e) {
    this.classList.remove('dragging');
    dropzones.forEach(zone => zone.classList.remove('drag-over'));
    saveState();
}

// Eventos para dropzones
dropzones.forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('drop', handleDrop);
    zone.addEventListener('dragenter', handleDragEnter);
    zone.addEventListener('dragleave', handleDragLeave);
});

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (e.target.classList.contains('dropzone')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('dropzone')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const dropzone = e.target.closest('.dropzone');
    
    if (dropzone && draggedItem) {
        dropzone.appendChild(draggedItem);
        dropzone.classList.remove('drag-over');
    }
    
    return false;
}

/**
 * Guardar estado en localStorage
 */
function saveState() {
    const state = {};
    
    dropzones.forEach(zone => {
        const zoneId = zone.id;
        const itemsInZone = Array.from(zone.querySelectorAll('.item')).map(item => ({
            id: item.dataset.id,
            text: item.querySelector('span:last-child').textContent
        }));
        state[zoneId] = itemsInZone;
    });
    
    localStorage.setItem('dragDropState', JSON.stringify(state));
}

/**
 * Cargar estado
 */
function loadState() {
    const savedState = localStorage.getItem('dragDropState');
    
    if (savedState) {
        const state = JSON.parse(savedState);
        
        // Limpiar zonas
        dropzones.forEach(zone => zone.innerHTML = '');
        
        // Restaurar items
        Object.keys(state).forEach(zoneId => {
            const zone = document.getElementById(zoneId);
            state[zoneId].forEach(itemData => {
                const item = createItem(itemData.id, itemData.text);
                zone.appendChild(item);
            });
        });
        
        initDragEvents();
    }
}

/**
 * Crear nuevo item
 */
function createItem(id, text) {
    const item = document.createElement('div');
    item.className = 'item';
    item.draggable = true;
    item.dataset.id = id;
    item.innerHTML = `
        <span class="drag-handle">☰</span>
        <span>${text}</span>
    `;
    return item;
}

/**
 * Resetear orden inicial
 */
function resetOrder() {
    localStorage.removeItem('dragDropState');
    location.reload();
}

/**
 * Agregar nueva tarea
 */
function addTask() {
    const text = prompt('Escribe la nueva tarea:');
    if (text && text.trim()) {
        const todoZone = document.getElementById('todo');
        const newItem = createItem(nextId++, text.trim());
        todoZone.appendChild(newItem);
        initDragEvents();
        saveState();
    }
}

// Event listeners
resetBtn.addEventListener('click', resetOrder);
addBtn.addEventListener('click', addTask);

// Inicializar
initDragEvents();
loadState();

console.log('🎯 Drag and Drop inicializado');
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.icon');
    const themeText = themeToggle.querySelector('.text');
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('kanban-theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('kanban-theme', newTheme);
        updateToggleButton(newTheme);
        
        // Añadir efecto de transición
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
    
    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Modo Claro';
            themeToggle.title = 'Cambiar a modo claro';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Modo Oscuro';
            themeToggle.title = 'Cambiar a modo oscuro';
        }
    }
    
    // Actualizar botones existentes para usar las nuevas clases
    const existingButtons = document.querySelectorAll('.controls .btn');
    existingButtons.forEach(btn => {
        if (!btn.classList.contains('btn-primary') && 
            !btn.classList.contains('btn-secondary')) {
            btn.classList.add('btn-primary');
        }
    });
    
    // Mejorar las columnas con iconos
    const columns = document.querySelectorAll('.column');
    const columnIcons = ['📋', '⏳', '⚙️', '✅'];
    
    columns.forEach((column, index) => {
        const header = column.querySelector('h2');
        if (header) {
            // Añadir icono a la columna
            const iconSpan = document.createElement('span');
            iconSpan.className = 'column-icon';
            iconSpan.textContent = columnIcons[index] || '📝';
            
            // Contador de items
            const countSpan = document.createElement('span');
            countSpan.className = 'column-count';
            const itemCount = column.querySelectorAll('.item').length;
            countSpan.textContent = `${itemCount} tareas`;
            
            // Crear wrapper para el header
            const headerWrapper = document.createElement('div');
            headerWrapper.className = 'column-header';
            
            // Guardar el texto original
            const originalText = header.textContent;
            header.textContent = '';
            
            // Añadir elementos al header
            headerWrapper.appendChild(iconSpan);
            const titleSpan = document.createElement('span');
            titleSpan.textContent = originalText;
            headerWrapper.appendChild(titleSpan);
            
            header.appendChild(headerWrapper);
            header.appendChild(countSpan);
        }
    });
    
    // Añadir funcionalidad para añadir tareas
    const addTaskBtn = document.querySelector('.btn-success');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            showAddTaskModal();
        });
    }
    
    function showAddTaskModal() {
        // Crear modal dinámico
        const modalHTML = `
            <div class="modal-overlay" id="taskModal">
                <div class="modal-content">
                    <h3>Nueva Tarea</h3>
                    <div class="form-group">
                        <label for="taskTitle">Título</label>
                        <input type="text" id="taskTitle" placeholder="Título de la tarea">
                    </div>
                    <div class="form-group">
                        <label for="taskDescription">Descripción</label>
                        <textarea id="taskDescription" rows="3" placeholder="Descripción de la tarea"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="taskColumn">Columna</label>
                        <select id="taskColumn">
                            ${Array.from(columns).map(col => 
                                `<option value="${col.querySelector('h2').textContent}">
                                    ${col.querySelector('h2').textContent}
                                </option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-secondary" id="cancelTask">Cancelar</button>
                        <button class="btn btn-primary" id="saveTask">Guardar Tarea</button>
                    </div>
                </div>
            </div>
        `;
        
        // Insertar modal
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById('taskModal');
        modal.classList.add('active');
        
        // Event listeners del modal
        document.getElementById('cancelTask').addEventListener('click', function() {
            modal.remove();
        });
        
        document.getElementById('saveTask').addEventListener('click', function() {
            const title = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;
            const column = document.getElementById('taskColumn').value;
            
            if (title.trim()) {
                addNewTask(title, description, column);
                modal.remove();
            }
        });
        
        // Cerrar modal al hacer click fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function addNewTask(title, description, columnName) {
        // Encontrar la columna
        const column = Array.from(columns).find(col => 
            col.querySelector('h2').textContent.includes(columnName));
        
        if (column) {
            const dropzone = column.querySelector('.dropzone');
            const taskId = `task-${Date.now()}`;
            
            const taskHTML = `
                <div class="item" id="${taskId}" draggable="true">
                    <div class="drag-handle">⋮⋮</div>
                    <div class="item-content">
                        <div class="item-title">${title}</div>
                        <div class="item-description">${description || 'Sin descripción'}</div>
                        <div class="item-meta">
                            <span class="item-tag">Nueva</span>
                            <span>${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="edit-task" title="Editar">✏️</button>
                        <button class="delete-task" title="Eliminar">🗑️</button>
                    </div>
                </div>
            `;
            
            dropzone.insertAdjacentHTML('beforeend', taskHTML);
            updateColumnCounts();
            
            // Añadir funcionalidad drag and drop
            const newTask = document.getElementById(taskId);
            setupDragAndDrop(newTask);
        }
    }
    
    function updateColumnCounts() {
        columns.forEach(column => {
            const countSpan = column.querySelector('.column-count');
            const itemCount = column.querySelectorAll('.item').length;
            countSpan.textContent = `${itemCount} tareas`;
        });
    }
    
    // Configurar drag and drop para nuevas tareas
    function setupDragAndDrop(element) {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
        
        const dropzones = document.querySelectorAll('.dropzone');
        dropzones.forEach(zone => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('dragleave', handleDragLeave);
            zone.addEventListener('drop', handleDrop);
        });
    }
    
    // Funciones de drag and drop (debes tenerlas implementadas)
    function handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.id);
    }
    
    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.target.closest('.dropzone').classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        e.target.closest('.dropzone').classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        const dropzone = e.target.closest('.dropzone');
        dropzone.classList.remove('drag-over');
        
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(taskId);
        
        if (task && dropzone) {
            dropzone.appendChild(task);
            updateColumnCounts();
        }
    }
});