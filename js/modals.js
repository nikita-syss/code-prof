document.addEventListener('DOMContentLoaded', function() {
    // Инициализация социальных кнопок входа
    initSocialAuth();
    
    // Инициализация проверки паролей
    initPasswordValidation();
});

function initSocialAuth() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('vk-btn') ? 'ВКонтакте' : 'Google';
            
            showNotification(`Авторизация через ${provider} временно недоступна. Используйте стандартную регистрацию.`, 'warning');
        });
    });
}

function initPasswordValidation() {
    const passwordInput = document.getElementById('registerPassword');
    const confirmInput = document.getElementById('registerConfirmPassword');
    
    if (passwordInput && confirmInput) {
        
        passwordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
        });
        
        confirmInput.addEventListener('input', function() {
            validatePasswordMatch(passwordInput.value, this.value);
        });
    }
}

function validatePasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength') || createPasswordStrengthIndicator();
    
    let strength = 0;
    let message = '';
    let color = '#ff6b6b'; 
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    switch(strength) {
        case 0:
        case 1:
            message = 'Слабый пароль';
            color = '#ff6b6b';
            break;
        case 2:
            message = 'Средний пароль';
            color = '#ffd43b';
            break;
        case 3:
            message = 'Хороший пароль';
            color = '#51cf66';
            break;
        case 4:
            message = 'Отличный пароль!';
            color = '#2b8a3e';
            break;
    }
    
    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" style="width: ${strength * 25}%; background-color: ${color};"></div>
        </div>
        <span class="strength-text" style="color: ${color};">${message}</span>
    `;
}

function createPasswordStrengthIndicator() {
    const passwordGroup = document.getElementById('registerPassword')?.closest('.form-group');
    if (!passwordGroup) return null;
    
    const indicator = document.createElement('div');
    indicator.id = 'passwordStrength';
    indicator.className = 'password-strength';
    indicator.style.cssText = `
        margin-top: 5px;
        font-size: 12px;
    `;
    
    passwordGroup.appendChild(indicator);
    return indicator;
}

function validatePasswordMatch(password, confirmPassword) {
    const matchIndicator = document.getElementById('passwordMatch') || createPasswordMatchIndicator();
    
    if (!password && !confirmPassword) {
        matchIndicator.innerHTML = '';
        return;
    }
    
    if (password === confirmPassword) {
        matchIndicator.innerHTML = `
            <span style="color: #51cf66;">
                <i class="fas fa-check-circle"></i> Пароли совпадают
            </span>
        `;
    } else {
        matchIndicator.innerHTML = `
            <span style="color: #ff6b6b;">
                <i class="fas fa-exclamation-circle"></i> Пароли не совпадают
            </span>
        `;
    }
}

function createPasswordMatchIndicator() {
    const confirmGroup = document.getElementById('registerConfirmPassword')?.closest('.form-group');
    if (!confirmGroup) return null;
    
    const indicator = document.createElement('div');
    indicator.id = 'passwordMatch';
    indicator.className = 'password-match';
    indicator.style.cssText = `
        margin-top: 5px;
        font-size: 12px;
    `;
    
    confirmGroup.appendChild(indicator);
    return indicator;
}

function initForgotPassword() {
    const forgotLink = document.querySelector('.forgot-password');
    if (!forgotLink) return;
    
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        showPasswordRecoveryModal();
    });
}

function showPasswordRecoveryModal() {
    
    const modalHTML = `
        <div class="auth-modal show" id="recoveryModal">
            <div class="auth-modal-content">
                <div class="auth-modal-header">
                    <h3><i class="fas fa-key"></i> Восстановление пароля</h3>
                    <button class="auth-modal-close" id="recoveryModalClose">&times;</button>
                </div>
                <form id="recoveryForm">
                    <div class="form-group">
                        <label for="recoveryEmail"><i class="fas fa-envelope"></i> Email</label>
                        <input type="email" id="recoveryEmail" placeholder="Введите ваш email" required>
                    </div>
                    <button type="submit" class="auth-submit-btn">
                        <i class="fas fa-paper-plane"></i> Отправить инструкции
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const recoveryModal = document.getElementById('recoveryModal');
    const recoveryModalClose = document.getElementById('recoveryModalClose');
    const recoveryForm = document.getElementById('recoveryForm');
    
    recoveryModalClose.addEventListener('click', () => {
        recoveryModal.remove();
        document.body.style.overflow = 'auto';
    });
    
    recoveryModal.addEventListener('click', (e) => {
        if (e.target === recoveryModal) {
            recoveryModal.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    recoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('recoveryEmail').value.trim();
        
        if (!email) {
            showNotification('Пожалуйста, введите email', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        showNotification(`Инструкции по восстановлению отправлены на ${email}`, 'success');
        
        recoveryModal.remove();
        document.body.style.overflow = 'auto';
    });
    
    document.body.style.overflow = 'hidden';
}

if (document.querySelector('.forgot-password')) {
    initForgotPassword();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSocialAuth,
        initPasswordValidation,
        validatePasswordStrength,
        validatePasswordMatch,
        showPasswordRecoveryModal
    };
}