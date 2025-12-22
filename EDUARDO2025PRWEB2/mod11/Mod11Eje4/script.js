document.addEventListener('DOMContentLoaded', function() {
    // Configuración del tema
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.icon');
    const themeText = themeToggle.querySelector('.text');
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('gallery-theme') || 'light';
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('gallery-theme', newTheme);
        updateToggleButton(newTheme);
    });
    
    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Modo Claro';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Modo Oscuro';
        }
    }
    
    // Variables de estado
    let images = JSON.parse(localStorage.getItem('gallery-images')) || [];
    let currentFilter = 'all';
    
    // Elementos del DOM
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const galleryContainer = document.getElementById('galleryContainer');
    const emptyState = document.getElementById('emptyState');
    const totalImages = document.getElementById('totalImages');
    const totalSize = document.getElementById('totalSize');
    const lastUpload = document.getElementById('lastUpload');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const sortBtn = document.getElementById('sortBtn');
    const searchInput = document.getElementById('searchInput');
    const imageModal = document.getElementById('imageModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalSize = document.getElementById('modalSize');
    const modalDimensions = document.getElementById('modalDimensions');
    const modalDate = document.getElementById('modalDate');
    const uploadNotification = document.getElementById('uploadNotification');
    const notificationText = document.getElementById('notificationText');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Inicializar galería
    updateGallery();
    updateStats();
    
    // Eventos de subida
    uploadBtn.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });
    
    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            updateGallery();
        });
    });
    
    // Búsqueda
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (!searchTerm) {
            updateGallery();
            return;
        }
        
        // Mostrar resultados filtrados temporalmente
        const tempImages = [...images];
        const filtered = images.filter(img => 
            img.name.toLowerCase().includes(searchTerm)
        );
        
        displayFilteredResults(filtered);
    });
    
    // Limpiar todo
    clearAllBtn.addEventListener('click', () => {
        if (images.length === 0) return;
        
        if (confirm('¿Estás seguro de que quieres eliminar todas las imágenes?')) {
            images = [];
            saveImages();
            updateGallery();
            updateStats();
            showNotification('Todas las imágenes han sido eliminadas', 'info');
        }
    });
    
    // Descargar todo
    downloadAllBtn.addEventListener('click', () => {
        if (images.length === 0) {
            showNotification('No hay imágenes para descargar', 'error');
            return;
        }
        
        showNotification(`Preparando descarga de ${images.length} imágenes...`, 'info');
        
        // Simular descarga
        setTimeout(() => {
            showNotification('Descarga completada (simulación)', 'success');
        }, 2000);
    });
    
    // Ordenar
    sortBtn.addEventListener('click', showSortMenu);
    
    // Cerrar modal
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Funciones
    function handleFiles(files) {
        if (!files.length) return;
        
        const validFiles = Array.from(files).filter(file => {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 10 * 1024 * 1024;
            
            if (!validTypes.includes(file.type)) {
                showNotification(`"${file.name}" no es un tipo de imagen válido`, 'error');
                return false;
            }
            
            if (file.size > maxSize) {
                showNotification(`"${file.name}" es demasiado grande (máximo 10MB)`, 'error');
                return false;
            }
            
            return true;
        });
        
        if (validFiles.length === 0) return;
        
        const newImages = validFiles.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: formatFileSize(file.size),
            date: new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            url: URL.createObjectURL(file),
            rawSize: file.size,
            timestamp: Date.now()
        }));
        
        images.push(...newImages);
        saveImages();
        updateGallery();
        updateStats();
        
        if (validFiles.length === 1) {
            showNotification(`"${validFiles[0].name}" subido exitosamente`, 'success');
        } else {
            showNotification(`${validFiles.length} imágenes subidas exitosamente`, 'success');
        }
    }
    
    function updateGallery() {
        galleryContainer.innerHTML = '';
        
        let filteredImages = images;
        
        switch(currentFilter) {
            case 'recent':
                filteredImages = [...images].sort((a, b) => b.timestamp - a.timestamp);
                filteredImages = filteredImages.slice(0, Math.min(10, filteredImages.length));
                break;
            case 'large':
                filteredImages = images.filter(img => img.rawSize > 5 * 1024 * 1024);
                break;
            case 'small':
                filteredImages = images.filter(img => img.rawSize < 1 * 1024 * 1024);
                break;
        }
        
        if (filteredImages.length === 0) {
            galleryContainer.appendChild(emptyState);
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        filteredImages.forEach(image => {
            const galleryItem = createGalleryItem(image);
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    function displayFilteredResults(filtered) {
        galleryContainer.innerHTML = '';
        
        if (filtered.length === 0) {
            galleryContainer.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <h3>No se encontraron resultados</h3>
                    <p>No hay imágenes que coincidan con "${searchInput.value}"</p>
                </div>
            `;
            return;
        }
        
        filtered.forEach(image => {
            const galleryItem = createGalleryItem(image);
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    function createGalleryItem(image) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.name}" class="gallery-image" loading="lazy">
            <div class="gallery-info">
                <div class="image-name">${image.name}</div>
                <div class="image-size">${image.size}</div>
            </div>
            <button class="btn-remove" data-id="${image.id}" title="Eliminar imagen">×</button>
        `;
        
        // Evento para abrir imagen en modal
        const imgElement = galleryItem.querySelector('.gallery-image');
        imgElement.addEventListener('click', () => openModal(image));
        
        // Evento para eliminar imagen
        const removeBtn = galleryItem.querySelector('.btn-remove');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage(image.id);
        });
        
        return galleryItem;
    }
    
    function openModal(image) {
        modalImage.src = image.url;
        modalName.textContent = image.name;
        modalSize.textContent = image.size;
        modalDate.textContent = image.date;
        
        const img = new Image();
        img.onload = function() {
            modalDimensions.textContent = `${this.width} × ${this.height} px`;
        };
        img.src = image.url;
        
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modalImage.src = '';
    }
    
    function removeImage(id) {
        const imageIndex = images.findIndex(img => img.id === id);
        if (imageIndex === -1) return;
        
        const imageName = images[imageIndex].name;
        
        URL.revokeObjectURL(images[imageIndex].url);
        images.splice(imageIndex, 1);
        
        saveImages();
        updateGallery();
        updateStats();
        showNotification(`"${imageName}" eliminada`, 'info');
    }
    
    function updateStats() {
        totalImages.textContent = images.length;
        
        const totalBytes = images.reduce((sum, img) => sum + img.rawSize, 0);
        totalSize.textContent = formatFileSize(totalBytes);
        
        if (images.length > 0) {
            const latest = images.reduce((latest, img) => 
                img.timestamp > latest.timestamp ? img : latest
            );
            lastUpload.textContent = latest.date;
        } else {
            lastUpload.textContent = '-';
        }
        
        // Actualizar contador en filtro "recientes"
        const recentFilter = document.querySelector('[data-filter="recent"]');
        if (recentFilter) {
            const recentCount = Math.min(10, images.length);
            recentFilter.textContent = `Recientes (${recentCount})`;
        }
    }
    
    function saveImages() {
        const imagesToSave = images.map(img => ({
            ...img,
            url: null
        }));
        localStorage.setItem('gallery-images', JSON.stringify(imagesToSave));
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function showNotification(message, type = 'success') {
        notificationText.textContent = message;
        
        uploadNotification.style.background = type === 'error' 
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : type === 'info'
            ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
            : 'linear-gradient(135deg, #10b981, #059669)';
        
        uploadNotification.classList.add('show');
        
        setTimeout(() => {
            uploadNotification.classList.remove('show');
        }, 3000);
    }
    
    function showSortMenu() {
        const sortOptions = [
            { name: 'Nombre (A-Z)', key: 'name' },
            { name: 'Nombre (Z-A)', key: 'name', reverse: true },
            { name: 'Fecha (nuevo a viejo)', key: 'timestamp', reverse: true },
            { name: 'Fecha (viejo a nuevo)', key: 'timestamp' },
            { name: 'Tamaño (grande a pequeño)', key: 'rawSize', reverse: true },
            { name: 'Tamaño (pequeño a grande)', key: 'rawSize' }
        ];
        
        const sortMenu = document.createElement('div');
        sortMenu.className = 'sort-menu';
        sortMenu.style.top = `${sortBtn.getBoundingClientRect().bottom + 5}px`;
        sortMenu.style.left = `${sortBtn.getBoundingClientRect().left}px`;
        
        sortOptions.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary btn-small';
            btn.style.cssText = 'width: 100%; margin-bottom: 5px; text-align: left;';
            btn.textContent = option.name;
            btn.addEventListener('click', () => {
                sortImages(option.key, option.reverse);
                sortMenu.remove();
            });
            sortMenu.appendChild(btn);
        });
        
        document.body.appendChild(sortMenu);
        
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!sortMenu.contains(e.target) && e.target !== sortBtn) {
                    sortMenu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        });
    }
    
    function sortImages(key, reverse = false) {
        images.sort((a, b) => {
            let comparison = 0;
            
            if (key === 'name') {
                comparison = a[key].localeCompare(b[key]);
            } else {
                comparison = a[key] - b[key];
            }
            
            return reverse ? -comparison : comparison;
        });
        
        saveImages();
        updateGallery();
        showNotification('Imágenes ordenadas', 'info');
    }
    
    // Cargar imágenes de ejemplo si no hay ninguna
    if (images.length === 0) {
        const exampleImages = [
            {
                id: 'example1',
                name: 'Paisaje de montaña.jpg',
                size: '2.3 MB',
                date: new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                rawSize: 2400000,
                timestamp: Date.now() - 86400000
            },
            {
                id: 'example2',
                name: 'Ciudad nocturna.png',
                size: '1.8 MB',
                date: new Date(Date.now() - 86400000).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop',
                rawSize: 1800000,
                timestamp: Date.now() - 172800000
            },
            {
                id: 'example3',
                name: 'Playa tropical.jpg',
                size: '4.2 MB',
                date: new Date(Date.now() - 172800000).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
                rawSize: 4200000,
                timestamp: Date.now() - 259200000
            }
        ];
        
        images = exampleImages;
        saveImages();
        updateGallery();
        updateStats();
    }
    
    // Teclado shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Prevenir la recarga accidental
    window.addEventListener('beforeunload', (e) => {
        if (images.length > 0) {
            e.preventDefault();
            e.returnValue = 'Tienes imágenes sin guardar. ¿Seguro que quieres salir?';
        }
    });
});