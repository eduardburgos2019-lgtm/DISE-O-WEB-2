document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('wizardForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.getElementById('progressFill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const skipBtn = document.getElementById('skipBtn');
    const themeBtn = document.getElementById('themeBtn');
    const helpBtn = document.getElementById('helpBtn');
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const toast = document.getElementById('toast');
    
    // Botones de acciones específicas
    const validateEmailBtn = document.getElementById('validateEmailBtn');
    const formatPhoneBtn = document.getElementById('formatPhoneBtn');
    const detectCountryBtn = document.getElementById('detectCountryBtn');
    const viewTermsBtn = document.getElementById('viewTermsBtn');
    
    // Modales
    const termsModal = document.getElementById('termsModal');
    const helpModal = document.getElementById('helpModal');
    const draftModal = document.getElementById('draftModal');
    const closeTermsBtn = document.getElementById('closeTermsBtn');
    const closeTermsBtn2 = document.getElementById('closeTermsBtn2');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const closeHelpBtn2 = document.getElementById('closeHelpBtn2');
    const closeDraftBtn = document.getElementById('closeDraftBtn');
    const acceptTermsBtn = document.getElementById('acceptTermsBtn');
    const loadDraftBtn = document.getElementById('loadDraftBtn');
    const newFormBtn = document.getElementById('newFormBtn');
    
    // Variables de estado
    let currentStep = 1;
    let darkTheme = localStorage.getItem('darkTheme') === 'true';
    let formData = {
        step1: {},
        step2: {},
        step3: {}
    };
    
    // Inicializar
    updateTheme();
    updateProgressBar();
    updateNavigationButtons();
    setupEventListeners();
    setupInputValidations();
    loadDraft();
    
    // Configurar listeners de eventos
    function setupEventListeners() {
        // Navegación
        prevBtn.addEventListener('click', prevStep);
        nextBtn.addEventListener('click', nextStep);
        skipBtn.addEventListener('click', skipStep);
        
        // Acciones de botones
        themeBtn.addEventListener('click', toggleTheme);
        helpBtn.addEventListener('click', () => openModal(helpModal));
        saveDraftBtn.addEventListener('click', saveDraft);
        validateEmailBtn.addEventListener('click', validateEmail);
        formatPhoneBtn.addEventListener('click', formatPhoneNumber);
        detectCountryBtn.addEventListener('click', detectCountry);
        viewTermsBtn.addEventListener('click', () => openModal(termsModal));
        
        // Modales
        closeTermsBtn.addEventListener('click', () => closeModal(termsModal));
        closeTermsBtn2.addEventListener('click', () => closeModal(termsModal));
        closeHelpBtn.addEventListener('click', () => closeModal(helpModal));
        closeHelpBtn2.addEventListener('click', () => closeModal(helpModal));
        closeDraftBtn.addEventListener('click', () => closeModal(draftModal));
        acceptTermsBtn.addEventListener('click', acceptTerms);
        loadDraftBtn.addEventListener('click', loadSavedDraft);
        newFormBtn.addEventListener('click', () => {
            closeModal(draftModal);
            localStorage.removeItem('wizardDraft');
            showToast('Nuevo formulario iniciado', 'info');
        });
        
        // Cerrar modales al hacer clic fuera
        [termsModal, helpModal, draftModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        });
        
        // Envío del formulario
        form.addEventListener('submit', handleSubmit);
        
        // Actualizar resumen en tiempo real
        document.getElementById('comments').addEventListener('input', updateCharCount);
        
        // Tooltips de ayuda
        setupHelpTooltips();
        
        // Fecha máxima para fecha de nacimiento
        const birthDateInput = document.getElementById('birthDate');
        const today = new Date().toISOString().split('T')[0];
        birthDateInput.max = today;
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
    
    // Función para configurar validaciones
    function setupInputValidations() {
        const requiredInputs = document.querySelectorAll('input[required], select[required]');
        
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    validateField(input);
                }
            });
        });
        
        // Validar checkboxes de intereses
        const interestCheckboxes = document.querySelectorAll('input[name="interests"]');
        interestCheckboxes.forEach(cb => {
            cb.addEventListener('change', validateInterests);
        });
    }
    
    // Función para configurar tooltips de ayuda
    function setupHelpTooltips() {
        const helpButtons = document.querySelectorAll('.input-help');
        
        helpButtons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const helpText = btn.getAttribute('data-help');
                showTooltip(e.target, helpText);
            });
            
            btn.addEventListener('mouseleave', () => {
                hideTooltip();
            });
        });
    }
    
    // Función para mostrar tooltip
    function showTooltip(element, text) {
        let tooltip = document.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
        }
        
        const rect = element.getBoundingClientRect();
        tooltip.textContent = text;
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        tooltip.style.display = 'block';
    }
    
    // Función para ocultar tooltip
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
    
    // Función para actualizar barra de progreso
    function updateProgressBar() {
        const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Actualizar estados de los pasos
        progressSteps.forEach((step, index) => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber < currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
            }
        });
    }
    
    // Función para actualizar botones de navegación
    function updateNavigationButtons() {
        prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
        nextBtn.style.display = currentStep === steps.length ? 'none' : 'flex';
        submitBtn.style.display = currentStep === steps.length ? 'flex' : 'none';
        
        // Mostrar botón de saltar en pasos opcionales
        skipBtn.style.display = (currentStep === 2 || currentStep === 3) ? 'flex' : 'none';
        
        // Actualizar texto del botón siguiente
        if (currentStep === steps.length - 1) {
            nextBtn.innerHTML = 'Revisar →';
        } else {
            nextBtn.innerHTML = 'Siguiente →';
        }
    }
    
    // Función para mostrar paso
    function showStep(stepNumber) {
        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active');
            if (stepNum === stepNumber) {
                step.classList.add('active');
                currentStep = stepNumber;
            }
        });
        
        updateProgressBar();
        updateNavigationButtons();
        
        // Si es el paso de confirmación, actualizar resumen
        if (stepNumber === 4) {
            updateSummary();
        }
        
        // Guardar datos actuales antes de cambiar de paso
        saveCurrentStepData();
    }
    
    // Función para ir al siguiente paso
    function nextStep() {
        if (!validateCurrentStep()) {
            return;
        }
        
        if (currentStep < steps.length) {
            showStep(currentStep + 1);
        }
    }
    
    // Función para ir al paso anterior
    function prevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }
    
    // Función para saltar paso
    function skipStep() {
        if (currentStep < steps.length) {
            showStep(currentStep + 1);
        }
    }
    
    // Función para validar paso actual
    function validateCurrentStep() {
        let isValid = true;
        
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validación especial para intereses
        if (currentStep === 3) {
            if (!validateInterests()) {
                isValid = false;
            }
        }
        
        if (!isValid) {
            showToast('Por favor, completa todos los campos requeridos correctamente', 'error');
            return false;
        }
        
        return true;
    }
    
    // Función para validar campo individual
    function validateField(field) {
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        
        // Limpiar estado anterior
        field.classList.remove('valid', 'invalid');
        formGroup.classList.remove('error');
        
        // Validaciones específicas por tipo
        let isValid = true;
        let errorMessage = '';
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email no válido';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Teléfono debe tener 10 dígitos';
            }
        } else if (field.id === 'zipCode' && value) {
            const zipRegex = /^[0-9]{5}$/;
            if (!zipRegex.test(value)) {
                isValid = false;
                errorMessage = 'Código postal debe tener 5 dígitos';
            }
        } else if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }
        
        // Aplicar resultados
        if (isValid && value) {
            field.classList.add('valid');
        } else if (!isValid) {
            field.classList.add('invalid');
            formGroup.classList.add('error');
            const errorSpan = formGroup.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = errorMessage;
            }
        }
        
        return isValid;
    }
    
    // Función para validar intereses
    function validateInterests() {
        const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
        const formGroup = document.querySelector('.form-group:has(input[name="interests"])');
        const errorSpan = formGroup.querySelector('.error-message');
        
        if (interestCheckboxes.length === 0) {
            formGroup.classList.add('error');
            errorSpan.textContent = 'Selecciona al menos un interés';
            return false;
        } else {
            formGroup.classList.remove('error');
            errorSpan.textContent = '';
            return true;
        }
    }
    
    // Función para validar email manualmente
    function validateEmail() {
        const emailField = document.getElementById('email');
        const isValid = validateField(emailField);
        
        if (isValid) {
            showToast('✅ Email válido', 'success');
        }
    }
    
    // Función para formatear número de teléfono
    function formatPhoneNumber() {
        const phoneField = document.getElementById('phone');
        let phone = phoneField.value.replace(/\D/g, '');
        
        if (phone.length === 10) {
            phoneField.value = `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6)}`;
            validateField(phoneField);
            showToast('Número formateado correctamente', 'success');
        } else {
            showToast('El número debe tener 10 dígitos', 'error');
        }
    }
    
    // Función para detectar país
    function detectCountry() {
        // En una aplicación real, aquí usarías una API de geolocalización
        // Por ahora, simularemos la detección
        const countries = ['mx', 'es', 'ar', 'co', 'pe', 'cl'];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        
        const countrySelect = document.getElementById('country');
        countrySelect.value = randomCountry;
        validateField(countrySelect);
        
        showToast('País detectado (simulado)', 'info');
    }
    
    // Función para actualizar contador de caracteres
    function updateCharCount() {
        const textarea = document.getElementById('comments');
        const charCount = document.getElementById('charCount');
        const count = textarea.value.length;
        
        charCount.textContent = count;
        
        if (count > 500) {
            textarea.value = textarea.value.substring(0, 500);
            charCount.textContent = 500;
            showToast('Límite de caracteres alcanzado', 'warning');
        }
    }
    
    // Función para guardar datos del paso actual
    function saveCurrentStepData() {
        const stepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const inputs = stepElement.querySelectorAll('input, select, textarea');
        
        formData[`step${currentStep}`] = {};
        
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                formData[`step${currentStep}`][input.name] = input.checked;
            } else {
                formData[`step${currentStep}`][input.name] = input.value;
            }
        });
    }
    
    // Función para actualizar resumen
    function updateSummary() {
        // Datos personales
        const personalSummary = document.getElementById('summaryPersonal');
        personalSummary.innerHTML = `
            <p><strong>Nombre:</strong> ${formData.step1.firstName || ''} ${formData.step1.lastName || ''}</p>
            <p><strong>Email:</strong> ${formData.step1.email || ''}</p>
            <p><strong>Teléfono:</strong> ${formData.step1.phone || ''}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${formData.step1.birthDate || 'No especificada'}</p>
        `;
        
        // Dirección
        const addressSummary = document.getElementById('summaryAddress');
        addressSummary.innerHTML = `
            <p><strong>Calle:</strong> ${formData.step2.street || ''}</p>
            <p><strong>Ciudad:</strong> ${formData.step2.city || ''}</p>
            <p><strong>Código Postal:</strong> ${formData.step2.zipCode || ''}</p>
            <p><strong>País:</strong> ${getCountryName(formData.step2.country)}</p>
            ${formData.step2.state ? `<p><strong>Estado:</strong> ${formData.step2.state}</p>` : ''}
        `;
        
        // Preferencias
        const preferencesSummary = document.getElementById('summaryPreferences');
        const interests = document.querySelectorAll('input[name="interests"]:checked');
        const interestNames = Array.from(interests).map(cb => {
            const label = cb.closest('.interest-card').querySelector('span').textContent;
            return label;
        });
        
        preferencesSummary.innerHTML = `
            <p><strong>Intereses:</strong> ${interestNames.join(', ') || 'Ninguno seleccionado'}</p>
            <p><strong>Newsletter:</strong> ${formData.step3.newsletter ? 'Sí' : 'No'}</p>
            <p><strong>Notificaciones:</strong> ${formData.step3.notifications ? 'Activadas' : 'Desactivadas'}</p>
            ${formData.step3.comments ? `<p><strong>Comentarios:</strong> ${formData.step3.comments}</p>` : ''}
        `;
    }
    
    // Función para obtener nombre del país
    function getCountryName(code) {
        const countries = {
            'mx': 'México',
            'es': 'España',
            'ar': 'Argentina',
            'co': 'Colombia',
            'pe': 'Perú',
            'cl': 'Chile'
        };
        return countries[code] || 'No especificado';
    }
    
    // Función para guardar borrador
    function saveDraft() {
        saveCurrentStepData();
        
        const draft = {
            currentStep: currentStep,
            formData: formData,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('wizardDraft', JSON.stringify(draft));
        showToast('💾 Borrador guardado', 'success');
    }
    
    // Función para cargar borrador
    function loadDraft() {
        const saved = localStorage.getItem('wizardDraft');
        if (saved) {
            openModal(draftModal);
        }
    }
    
    // Función para cargar borrador guardado
    function loadSavedDraft() {
        const saved = localStorage.getItem('wizardDraft');
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                formData = draft.formData;
                currentStep = draft.currentStep;
                
                // Llenar formulario con datos guardados
                for (const step in formData) {
                    const stepData = formData[step];
                    for (const field in stepData) {
                        const input = document.querySelector(`[name="${field}"]`);
                        if (input) {
                            if (input.type === 'checkbox' || input.type === 'radio') {
                                input.checked = stepData[field];
                            } else {
                                input.value = stepData[field];
                                validateField(input);
                            }
                        }
                    }
                }
                
                showStep(currentStep);
                closeModal(draftModal);
                showToast('Borrador cargado exitosamente', 'success');
            } catch (error) {
                console.error('Error al cargar borrador:', error);
                showToast('Error al cargar borrador', 'error');
            }
        }
    }
    
    // Función para aceptar términos
    function acceptTerms() {
        document.getElementById('terms').checked = true;
        closeModal(termsModal);
        showToast('Términos aceptados', 'success');
    }
    
    // Función para abrir modal
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Función para manejar envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) {
            showToast('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        // Validar términos
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            showToast('Debes aceptar los términos y condiciones', 'error');
            termsCheckbox.focus();
            return;
        }
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<span class="btn-spinner"></span> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío a servidor
        setTimeout(() => {
            submitBtn.innerHTML = '✨ Enviar Registro';
            submitBtn.disabled = false;
            
            // Limpiar borrador
            localStorage.removeItem('wizardDraft');
            
            // Mostrar mensaje de éxito
            showToast('🎉 ¡Registro completado exitosamente!', 'success');
            
            // Simular redirección o acción posterior
            setTimeout(() => {
                location.reload();
            }, 2000);
        }, 2000);
    }
    
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
    
    // Inicializar el primer paso
    showStep(1);
});