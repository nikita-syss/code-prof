document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initSiteSearch();
    initModals();
    initButtons();
    initGenreSearch();
});

// Инициализация смены темы
function initThemeToggle() {
    const savedTheme = localStorage.getItem('gamemai-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcon();
    }
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isLightTheme = document.body.classList.contains('light-theme');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isLightTheme ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const isLightTheme = body.classList.contains('light-theme');
    
    if (isLightTheme) {
        body.classList.remove('light-theme');
        localStorage.setItem('gamemai-theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('gamemai-theme', 'light');
    }
    
    updateThemeIcon();
}

// Инициализация поиска
function initSiteSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (!query) {
        return;
    }
    
    alert(`Поиск игр: "${query}"`);
    
    if (searchInput) searchInput.value = '';
}

// Инициализация модальных окон
function initModals() {
    // Модалка каталога
    const catalogBtn = document.getElementById('catalogBtn');
    const catalogModal = document.getElementById('catalogModal');
    const catalogModalClose = document.getElementById('catalogModalClose');
    
    // Открытие каталога
    if (catalogBtn && catalogModal) {
        catalogBtn.addEventListener('click', function() {
            catalogModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Закрытие каталога
    if (catalogModalClose && catalogModal) {
        catalogModalClose.addEventListener('click', function() {
            catalogModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие при клике вне окна
    if (catalogModal) {
        catalogModal.addEventListener('click', function(e) {
            if (e.target === catalogModal) {
                catalogModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Модалка авторизации
    const profileBtn = document.getElementById('profileBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const authModal = document.getElementById('authModal');
    const authModalClose = document.getElementById('authModalClose');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Открытие модалки авторизации
    function openAuthModal(tab = 'login') {
        showAuthTab(tab);
        if (authModal) {
            authModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('login');
        });
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('login');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('register');
        });
    }
    
    // Закрытие модалки авторизации
    if (authModalClose && authModal) {
        authModalClose.addEventListener('click', function() {
            authModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                authModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Переключение вкладок авторизации
    if (authTabs) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                showAuthTab(tabName);
            });
        });
    }
    
    // Форма входа
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            
            if (!email || !password) {
                alert('Заполните все поля');
                return;
            }
            
            alert(`Вход выполнен для ${email}`);
            closeModal('authModal');
            this.reset();
        });
    }
    
    // Форма регистрации
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Заполните все поля');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }
            
            if (password.length < 6) {
                alert('Пароль должен содержать минимум 6 символов');
                return;
            }
            
            alert(`Регистрация успешна для ${name}`);
            closeModal('authModal');
            this.reset();
        });
    }
    
    // Обработка Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal('catalogModal');
            closeModal('authModal');
        }
    });
}

function showAuthTab(tabName) {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    const activeTab = document.querySelector(`.auth-tab[data-tab="${tabName}"]`);
    const activeForm = document.getElementById(`${tabName}Form`);
    const authModalTitle = document.getElementById('authModalTitle');
    
    if (activeTab) activeTab.classList.add('active');
    if (activeForm) activeForm.classList.add('active');
    if (authModalTitle) {
        authModalTitle.textContent = tabName === 'login' ? 'Вход в Gamemai' : 'Регистрация в Gamemai';
        authModalTitle.innerHTML = `<i class="fas fa-user"></i> ${authModalTitle.textContent}`;
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Инициализация кнопок
function initButtons() {
    // Кнопки покупки в карточках
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-game-btn') || e.target.closest('.buy-game-btn')) {
            e.preventDefault();
            const gameCard = e.target.closest('.popular-game-card');
            if (gameCard) {
                const gameName = gameCard.querySelector('.game-name').textContent;
                const gamePrice = gameCard.querySelector('.game-price').textContent;
                
                alert(`Игра "${gameName}" добавлена в корзину за ${gamePrice}`);
            }
        }
    });
    
    // Кнопки покупки в слайдере
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('game-buy-btn') || e.target.closest('.game-buy-btn')) {
            e.preventDefault();
            const gameCard = e.target.closest('.game-card');
            if (gameCard) {
                const gameName = gameCard.querySelector('.game-title').textContent;
                const gamePrice = gameCard.querySelector('.game-price').textContent;
                const button = e.target.classList.contains('game-buy-btn') ? e.target : e.target.closest('.game-buy-btn');
                
                if (button.textContent.includes('Купить')) {
                    alert(`Игра "${gameName}" добавлена в корзину за ${gamePrice}`);
                } else {
                    alert(`Запускаем "${gameName}"...`);
                }
            }
        }
    });
}

// Инициализация поиска по жанрам
function initGenreSearch() {
    const genreSearchBtn = document.getElementById('genreSearchBtn');
    const genreSearchInput = document.getElementById('genreSearchInput');
    const genreTags = document.querySelectorAll('.genre-tag');
    
    // Поиск по кнопке
    if (genreSearchBtn) {
        genreSearchBtn.addEventListener('click', function() {
            performGenreSearch();
        });
    }
    
    // Поиск по Enter
    if (genreSearchInput) {
        genreSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performGenreSearch();
            }
        });
    }
    
    // Поиск по тегам жанров
    if (genreTags) {
        genreTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const genre = this.dataset.genre;
                if (genreSearchInput) {
                    const genreText = this.textContent.trim();
                    genreSearchInput.value = genreText;
                    performGenreSearch();
                }
            });
        });
    }
}

function performGenreSearch() {
    const genreSearchInput = document.getElementById('genreSearchInput');
    const query = genreSearchInput ? genreSearchInput.value.trim() : '';
    
    if (!query) {
        alert('Введите жанр для поиска');
        return;
    }
    
    alert(`Поиск игр по жанру: "${query}"`);
    
    if (genreSearchInput) genreSearchInput.value = '';
}