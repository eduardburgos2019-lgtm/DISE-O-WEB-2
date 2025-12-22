document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');
    const termsCheckbox = document.getElementById('terms');
    const themeBtn = document.getElementById('themeBtn');
    const toast = document.getElementById('toast');
    
    // Botones de funcionalidad
    const generateUsernameBtn = document.getElementById('generateUsername');
    const validateEmailBtn = document.getElementById('validateEmail');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const generatePasswordBtn = document.getElementById('generatePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const formatPhoneBtn = document.getElementById('formatPhone');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const showTipsBtn = document.getElementById('showTipsBtn');
    const showTermsBtn = document.getElementById('showTermsBtn');
    const demoBtn = document.getElementById('demoBtn');
    const loginLink = document.getElementById('loginLink');
    
    // Modales
    const termsModal = document.getElementById('termsModal');
    const tipsModal = document.getElementById('tipsModal');
    const closeTermsBtn = document.getElementById('closeTermsBtn');
    const closeTipsBtn = document.getElementById('closeTipsBtn');
    const closeTipsBtn2 = document.getElementById('closeTipsBtn2');
    const acceptTermsBtn = document.getElementById('acceptTermsBtn');
    
    // Variables de estado
    let darkTheme = localStorage.getItem('darkTheme') === 'true';
    
    // Inicializar tema
    updateTheme();
    
    // Event Listeners para botones de funcionalidad
    generateUsernameBtn.addEventListener('click', generateRandomUsername);
    validateEmailBtn.addEventListener('click', validateEmail);
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    generatePasswordBtn.addEventListener('click', generateSecurePassword);
    toggleConfirmPasswordBtn.addEventListener('click', toggleConfirmPasswordVisibility);
    formatPhoneBtn.addEventListener('click', formatPhoneNumber);
    clearFormBtn.addEventListener('click', clearForm);
    showTipsBtn.addEventListener('click', showTips);
    showTermsBtn.addEventListener('click', showTerms);
    demoBtn.addEventListener('click', showDemo);
    loginLink.addEventListener('click', simulateLogin);
    themeBtn.addEventListener('click', toggleTheme);
    
    // Event Listeners para modales
    closeTermsBtn.addEventListener('click', () => closeModal(termsModal));
    closeTipsBtn.addEventListener('click', () => closeModal(tipsModal));
    closeTipsBtn2.addEventListener('click', () => closeModal(tipsModal));
    acceptTermsBtn.addEventListener('click', acceptTerms);
    
    // Cerrar modal al hacer clic fuera
    [termsModal, tipsModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Validación en tiempo real
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmailField);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    phoneInput.addEventListener('input', validatePhone);
    termsCheckbox.addEventListener('change', validateTerms);
    
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
    
    // Función para generar nombre de usuario aleatorio
    function generateRandomUsername() {
        const adjectives = ['Rápido', 'Inteligente', 'Valiente', 'Creativo', 'Feliz', 'Audaz', 'Brillante', 'Noble'];
        const nouns = ['Tigre', 'Águila', 'León', 'Lobo', 'Fénix', 'Dragón', 'Unicornio', 'Halcón'];
        const numbers = Math.floor(Math.random() * 1000);
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        usernameInput.value = `${adjective}${noun}${numbers}`;
        validateUsername();
        showToast('¡Nombre de usuario generado!', 'success');
    }
    
    // Función para validar email manualmente
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showToast('Por favor, ingresa un email', 'error');
            return;
        }
        
        if (emailRegex.test(email)) {
            showToast('✅ Email válido', 'success');
            markFieldValid(emailInput);
        } else {
            showToast('❌ Email no válido', 'error');
            markFieldInvalid(emailInput, 'Email no válido');
        }
    }
    
    // Función para mostrar/ocultar contraseña
    function togglePasswordVisibility() {
        const type = passwordInput.type;
        passwordInput.type = type === 'password' ? 'text' : 'password';
        togglePasswordBtn.textContent = type === 'password' ? '🙈' : '👁️';
    }
    
    // Función para generar contraseña segura
    function generateSecurePassword() {
        const length = 12;
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }
        
        passwordInput.value = password;
        confirmPasswordInput.value = password;
        
        validatePassword();
        validateConfirmPassword();
        
        // Mostrar contraseña brevemente
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🙈';
        
        setTimeout(() => {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = '👁️';
        }, 2000);
        
        showToast('¡Contraseña segura generada!', 'success');
    }
    
    // Función para mostrar/ocultar confirmación de contraseña
    function toggleConfirmPasswordVisibility() {
        const type = confirmPasswordInput.type;
        confirmPasswordInput.type = type === 'password' ? 'text' : 'password';
        toggleConfirmPasswordBtn.textContent = type === 'password' ? '🙈' : '👁️';
    }
    
    // Función para formatear número de teléfono
    function formatPhoneNumber() {
        let phone = phoneInput.value.replace(/\D/g, '');
        
        if (phone.length === 10) {
            phoneInput.value = `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6)}`;
            markFieldValid(phoneInput);
            showToast('Número formateado correctamente', 'success');
        } else {
            showToast('El número debe tener 10 dígitos', 'error');
        }
    }
    
    // Función para limpiar formulario
    function clearForm() {
        if (confirm('¿Estás seguro de que quieres limpiar todo el formulario?')) {
            form.reset();
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('valid', 'error');
            });
            showToast('Formulario limpiado', 'info');
        }
    }
    
    // Función para mostrar consejos
    function showTips() {
        openModal(tipsModal);
    }
    
    // Función para mostrar términos
    function showTerms() {
        openModal(termsModal);
    }
    
    // Función para aceptar términos
    function acceptTerms() {
        termsCheckbox.checked = true;
        validateTerms();
        closeModal(termsModal);
        showToast('Términos aceptados', 'success');
    }
    
    // Función para mostrar demo
    function showDemo() {
        // Llenar formulario con datos de ejemplo
        usernameInput.value = 'UsuarioEjemplo123';
        emailInput.value = 'ejemplo@correo.com';
        passwordInput.value = 'ContraseñaSegura123!';
        confirmPasswordInput.value = 'ContraseñaSegura123!';
        phoneInput.value = '(123) 456-7890';
        termsCheckbox.checked = true;
        
        // Validar todos los campos
        validateAllFields();
        
        showToast('¡Demo cargado! Revisa los datos de ejemplo.', 'info');
    }
    
    // Función para simular inicio de sesión
    function simulateLogin(e) {
        e.preventDefault();
        showToast('Redirigiendo a inicio de sesión...', 'info');
        // En una aplicación real, aquí redirigirías a la página de login
    }
    
    // Funciones de validación
    function validateUsername() {
        const username = usernameInput.value.trim();
        const minLength = 3;
        
        if (!username) {
            markFieldInvalid(usernameInput, 'El nombre de usuario es requerido');
            return false;
        }
        
        if (username.length < minLength) {
            markFieldInvalid(usernameInput, `Mínimo ${minLength} caracteres`);
            return false;
        }
        
        markFieldValid(usernameInput);
        return true;
    }
    
    function validateEmailField() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            markFieldInvalid(emailInput, 'El email es requerido');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            markFieldInvalid(emailInput, 'Email no válido');
            return false;
        }
        
        markFieldValid(emailInput);
        return true;
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const minLength = 8;
        
        if (!password) {
            markFieldInvalid(passwordInput, 'La contraseña es requerida');
            updatePasswordStrength(0);
            return false;
        }
        
        if (password.length < minLength) {
            markFieldInvalid(passwordInput, `Mínimo ${minLength} caracteres`);
            updatePasswordStrength(20);
            return false;
        }
        
        // Calcular fuerza
        let strength = 0;
        if (password.length >= 12) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        strength = Math.min(strength, 100);
        updatePasswordStrength(strength);
        
        markFieldValid(passwordInput);
        return true;
    }
    
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (!confirmPassword) {
            markFieldInvalid(confirmPasswordInput, 'Confirma tu contraseña');
            return false;
        }
        
        if (password !== confirmPassword) {
            markFieldInvalid(confirmPasswordInput, 'Las contraseñas no coinciden');
            return false;
        }
        
        markFieldValid(confirmPasswordInput);
        return true;
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        
        if (!phone) {
            markFieldValid(phoneInput); // Opcional, siempre válido si está vacío
            return true;
        }
        
        const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!phoneRegex.test(phone)) {
            markFieldInvalid(phoneInput, 'Formato de teléfono no válido');
            return false;
        }
        
        markFieldValid(phoneInput);
        return true;
    }
    
    function validateTerms() {
        const termsGroup = termsCheckbox.closest('.form-group');
        
        if (!termsCheckbox.checked) {
            termsGroup.classList.add('error');
            return false;
        }
        
        termsGroup.classList.remove('error');
        return true;
    }
    
    function validateAllFields() {
        const validations = [
            validateUsername(),
            validateEmailField(),
            validatePassword(),
            validateConfirmPassword(),
            validatePhone(),
            validateTerms()
        ];
        
        return validations.every(v => v === true);
    }
    
    // Funciones auxiliares
    function markFieldValid(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.classList.add('valid');
    }
    
    function markFieldInvalid(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('valid');
        formGroup.classList.add('error');
        
        const errorSpan = formGroup.querySelector('.error-message');
        errorSpan.textContent = message;
    }
    
    function updatePasswordStrength(strength) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        strengthBar.className = 'strength-bar';
        
        if (strength < 40) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Débil';
        } else if (strength < 70) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Media';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Fuerte';
        }
    }
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = 'toast';
        toast.classList.add(type);
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Manejo del envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateAllFields()) {
            showToast('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        // Mostrar estado de carga
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        submitBtn.disabled = true;
        
        // Simular envío a servidor
        setTimeout(() => {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            showToast('🎉 ¡Registro exitoso! Tu cuenta ha sido creada', 'success');
            
            // Simular redirección
            setTimeout(() => {
                showToast('Redirigiendo a tu panel de control...', 'info');
            }, 1500);
        }, 2000);
    }
    
    // Inicializar validaciones al cargar
    validateAllFields();
});