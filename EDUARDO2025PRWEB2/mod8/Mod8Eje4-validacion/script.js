document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const form = document.getElementById('registrationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const age = document.getElementById('age');
    const phone = document.getElementById('phone');
    const terms = document.getElementById('terms');
    const newsletter = document.getElementById('newsletter');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const formSummary = document.getElementById('formSummary');
    const validationList = document.getElementById('validationList');

    // Estados de validación
    let validationState = {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        age: false,
        terms: false
    };

    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Validación en tiempo real
    username.addEventListener('input', validateUsername);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    age.addEventListener('input', validateAge);
    phone.addEventListener('input', validatePhone);
    terms.addEventListener('change', validateTerms);

    // Limpiar formulario
    clearBtn.addEventListener('click', clearForm);

    // Envío del formulario
    form.addEventListener('submit', handleSubmit);

    // Funciones de validación
    function validateUsername() {
        const value = username.value.trim();
        const container = username.closest('.input-container');
        const errorElement = document.getElementById('username-error');
        
        if (value.length < 3) {
            showError(container, errorElement, 'El nombre de usuario debe tener al menos 3 caracteres');
            validationState.username = false;
        } else if (value.length > 20) {
            showError(container, errorElement, 'El nombre de usuario no puede exceder los 20 caracteres');
            validationState.username = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            showError(container, errorElement, 'Solo se permiten letras, números y guiones bajos');
            validationState.username = false;
        } else {
            showSuccess(container, errorElement);
            validationState.username = true;
        }
        updateSubmitButton();
        updateSummary();
    }

    function validateEmail() {
        const value = email.value.trim();
        const container = email.closest('.input-container');
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError(container, errorElement, 'El correo electrónico es requerido');
            validationState.email = false;
        } else if (!emailRegex.test(value)) {
            showError(container, errorElement, 'Por favor, introduce un correo electrónico válido');
            validationState.email = false;
        } else {
            showSuccess(container, errorElement);
            validationState.email = true;
        }
        updateSubmitButton();
        updateSummary();
    }

    function validatePassword() {
        const value = password.value;
        const container = password.closest('.input-container');
        const errorElement = document.getElementById('password-error');
        
        // Verificar requisitos
        const hasLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
        
        // Actualizar iconos de requisitos
        updateRequirement('req-length', hasLength);
        updateRequirement('req-uppercase', hasUppercase);
        updateRequirement('req-number', hasNumber);
        updateRequirement('req-special', hasSpecial);
        
        if (!value) {
            showError(container, errorElement, 'La contraseña es requerida');
            validationState.password = false;
        } else if (!hasLength || !hasUppercase || !hasNumber || !hasSpecial) {
            showError(container, errorElement, 'La contraseña no cumple con todos los requisitos');
            validationState.password = false;
        } else {
            showSuccess(container, errorElement);
            validationState.password = true;
        }
        
        // Si confirmPassword ya tiene valor, validarlo de nuevo
        if (confirmPassword.value) {
            validateConfirmPassword();
        }
        
        updateSubmitButton();
        updateSummary();
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const container = confirmPassword.closest('.input-container');
        const errorElement = document.getElementById('confirmPassword-error');
        
        if (!value) {
            showError(container, errorElement, 'Por favor, confirma tu contraseña');
            validationState.confirmPassword = false;
        } else if (value !== password.value) {
            showError(container, errorElement, 'Las contraseñas no coinciden');
            validationState.confirmPassword = false;
        } else {
            showSuccess(container, errorElement);
            validationState.confirmPassword = true;
        }
        updateSubmitButton();
        updateSummary();
    }

    function validateAge() {
        const value = parseInt(age.value);
        const container = age.closest('.input-container');
        const errorElement = document.getElementById('age-error');
        
        if (!age.value) {
            showError(container, errorElement, 'La edad es requerida');
            validationState.age = false;
        } else if (isNaN(value) || value < 18) {
            showError(container, errorElement, 'Debes ser mayor de 18 años');
            validationState.age = false;
        } else if (value > 120) {
            showError(container, errorElement, 'Por favor, introduce una edad válida');
            validationState.age = false;
        } else {
            showSuccess(container, errorElement);
            validationState.age = true;
        }
        updateSubmitButton();
        updateSummary();
    }

    function validatePhone() {
        const value = phone.value.trim();
        const container = phone.closest('.input-container');
        const errorElement = document.getElementById('phone-error');
        
        // Si está vacío, está bien (es opcional)
        if (!value) {
            showSuccess(container, errorElement);
            return;
        }
        
        // Validar formato de teléfono (más flexible)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        
        if (!phoneRegex.test(value)) {
            showError(container, errorElement, 'Por favor, introduce un número de teléfono válido');
        } else {
            showSuccess(container, errorElement);
        }
    }

    function validateTerms() {
        const errorElement = document.getElementById('terms-error');
        
        if (!terms.checked) {
            showError(null, errorElement, 'Debes aceptar los términos y condiciones');
            validationState.terms = false;
        } else {
            showSuccess(null, errorElement);
            validationState.terms = true;
        }
        updateSubmitButton();
        updateSummary();
    }

    // Funciones auxiliares
    function showError(container, errorElement, message) {
        if (container) {
            container.classList.remove('valid');
            container.classList.add('invalid');
        }
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function showSuccess(container, errorElement) {
        if (container) {
            container.classList.remove('invalid');
            container.classList.add('valid');
        }
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    function updateRequirement(id, isValid) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('valid', isValid);
            element.classList.toggle('invalid', !isValid);
            
            const icon = element.querySelector('.req-icon i');
            if (icon) {
                icon.className = isValid ? 'fas fa-check-circle' : 'fas fa-times-circle';
            }
        }
    }

    function updateSubmitButton() {
        const allValid = Object.values(validationState).every(value => value === true);
        submitBtn.disabled = !allValid;
        
        // Actualizar texto del botón
        if (allValid) {
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> ¡Registrarse!';
        } else {
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Registrarse';
        }
    }

    function updateSummary() {
        validationList.innerHTML = '';
        
        const fields = [
            { id: 'username', name: 'Nombre de usuario', valid: validationState.username },
            { id: 'email', name: 'Correo electrónico', valid: validationState.email },
            { id: 'password', name: 'Contraseña segura', valid: validationState.password },
            { id: 'confirmPassword', name: 'Confirmación de contraseña', valid: validationState.confirmPassword },
            { id: 'age', name: 'Edad válida', valid: validationState.age },
            { id: 'terms', name: 'Términos aceptados', valid: validationState.terms }
        ];
        
        fields.forEach(field => {
            const li = document.createElement('li');
            li.className = field.valid ? 'valid' : 'invalid';
            
            const icon = document.createElement('i');
            icon.className = field.valid ? 'fas fa-check' : 'fas fa-times';
            
            li.appendChild(icon);
            li.appendChild(document.createTextNode(field.name));
            validationList.appendChild(li);
        });
    }

    function clearForm() {
        form.reset();
        
        // Resetear estados
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
        });
        
        // Resetear estilos
        document.querySelectorAll('.input-container').forEach(container => {
            container.classList.remove('valid', 'invalid');
        });
        
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        document.querySelectorAll('.requirement').forEach(req => {
            req.classList.remove('valid', 'invalid');
            const icon = req.querySelector('.req-icon i');
            if (icon) {
                icon.className = 'fas fa-circle';
            }
        });
        
        // Resetear botones de contraseña
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
        toggleConfirmPassword.innerHTML = '<i class="fas fa-eye"></i>';
        
        updateSubmitButton();
        updateSummary();
        
        // Mostrar mensaje
        formSummary.querySelector('.summary-content p').textContent = 'Formulario limpiado. Por favor, completa todos los campos requeridos.';
        
        // Enfocar el primer campo
        username.focus();
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (Object.values(validationState).every(value => value === true)) {
            // Mostrar animación de éxito
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
            submitBtn.disabled = true;
            
            // Simular envío al servidor
            setTimeout(() => {
                // Crear mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <i class="fas fa-check-circle" style="color: #155724;"></i>
                            ¡Registro exitoso!
                        </h4>
                        <p>Te has registrado correctamente. Revisa tu correo para confirmar tu cuenta.</p>
                    </div>
                `;
                
                // Insertar antes del formulario
                form.parentNode.insertBefore(successMessage, form);
                
                // Desplazar a la vista
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Resetear formulario después de 3 segundos
                setTimeout(() => {
                    clearForm();
                    successMessage.remove();
                    alert('¡Registro completado con éxito!\n\nNombre: ' + username.value + '\nEmail: ' + email.value);
                }, 3000);
            }, 2000);
        } else {
            // Mostrar error
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message show';
            errorMessage.style.cssText = 'background: #f8d7da; color: #721c24; padding: 15px; border-radius: 10px; margin-bottom: 20px;';
            errorMessage.textContent = 'Por favor, corrige los errores en el formulario antes de enviar.';
            
            // Insertar después del header
            document.querySelector('.header').after(errorMessage);
            
            // Desplazar a la vista
            errorMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Remover después de 5 segundos
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    }

    // Inicializar validación
    validateUsername();
    validateEmail();
    validatePassword();
    validateAge();
    validateTerms();
    updateSummary();
    
    // Añadir validación inicial de confirmPassword si tiene valor
    if (confirmPassword.value) {
        validateConfirmPassword();
    }
    
    // Validar teléfono si tiene valor inicial
    if (phone.value) {
        validatePhone();
    }
});