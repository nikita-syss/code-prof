document.addEventListener('DOMContentLoaded', function() {
    console.log('Gamemai - Игровой магазин загружен');
    
    const catalogBtn = document.getElementById('catalogBtn');
    const profileBtn = document.getElementById('profileBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    const catalogModal = document.getElementById('catalogModal');
    const catalogModalClose = document.getElementById('catalogModalClose');
    const authModal = document.getElementById('authModal');
    const authModalClose = document.getElementById('authModalClose');
    const authModalTitle = document.getElementById('authModalTitle');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    const genreSearchInput = document.getElementById('genreSearchInput');
    const genreSearchBtn = document.getElementById('genreSearchBtn');
    const genreTags = document.querySelectorAll('.genre-tag');
    
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-game-btn') || e.target.classList.contains('game-buy-btn')) {
            e.preventDefault();
            const gameCard = e.target.closest('.popular-game-card, .game-card');
            if (gameCard) {
                const gameTitle = gameCard.querySelector('.game-name, .game-title')?.textContent || 'Игра';
                const gamePrice = gameCard.querySelector('.game-price')?.textContent || 'Цена не указана';
                
                
                showNotification(`Игра "${gameTitle}" добавлена в корзину за ${gamePrice}`, 'success');
                
                
                const button = e.target;
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
                button.style.backgroundColor = '#51cf66';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            }
        }
    });
    
    
    catalogBtn.addEventListener('click', openCatalogModal);
    
    
    catalogModalClose.addEventListener('click', closeCatalogModal);
    
    
    catalogModal.addEventListener('click', function(e) {
        if (e.target === catalogModal) {
            closeCatalogModal();
        }
    });
    
    
    profileBtn.addEventListener('click', function() {
        openAuthModal('login');
    });
    
    
    loginBtn.addEventListener('click', function() {
        openAuthModal('login');
    });
    
    
    registerBtn.addEventListener('click', function() {
        openAuthModal('register');
    });
    
    
    authModalClose.addEventListener('click', closeAuthModal);
    
    
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
    
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            showAuthTab(tabName);
        });
    });
    
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        if (!email || !password) {
            showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        
        showNotification(`Вход выполнен для ${email}`, 'success');
        closeAuthModal();
        
        
        this.reset();
    });
    
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (!name || !email || !password || !confirmPassword) {
            showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Пароли не совпадают', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Пароль должен содержать минимум 6 символов', 'error');
            return;
        }
        
        
        showNotification(`Регистрация успешна для ${name}`, 'success');
        closeAuthModal();
        
        
        this.reset();
    });
    
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Пожалуйста, введите email', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            
            showNotification('Спасибо за подписку! Проверьте ваш email для подтверждения.', 'success');
            emailInput.value = '';
        });
    }
    
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            showNotification('Загружаем все игры...', 'info');
            
            setTimeout(() => {
                showNotification('Все игры загружены!', 'success');
            }, 1500);
        });
    }
    
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchBtn.addEventListener('click', performSearch);
    
    
    genreSearchBtn.addEventListener('click', performGenreSearch);
    
    genreSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performGenreSearch();
        }
    });
    
    
    genreTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const genre = this.dataset.genre;
            genreSearchInput.value = this.textContent.replace('#', '').trim();
            performGenreSearch();
        });
    });
    
    
    const headerElements = document.querySelectorAll('.catalog-btn, .profile-btn, .auth-btn, .search-btn');
    
    headerElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('vk-btn') ? 'ВКонтакте' : 'Google';
            showNotification(`Вход через ${provider} временно недоступен`, 'info');
        });
    });
    
    
    loadPopularGames();
    
    
    initStatsCounter();
});

function openCatalogModal() {
    const catalogModal = document.getElementById('catalogModal');
    catalogModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKey);
}

function closeCatalogModal() {
    const catalogModal = document.getElementById('catalogModal');
    catalogModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleEscapeKey);
}

function openAuthModal(tab = 'login') {
    const authModal = document.getElementById('authModal');
    const authModalTitle = document.getElementById('authModalTitle');
    
    authModalTitle.textContent = tab === 'login' ? 'Вход в Gamemai' : 'Регистрация в Gamemai';
    showAuthTab(tab);
    
    authModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKey);
}

function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    authModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleEscapeKey);
}

function showAuthTab(tabName) {
    
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    
    document.querySelector(`.auth-tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Form`).classList.add('active');
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeCatalogModal();
        closeAuthModal();
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (!query) {
        showNotification('Введите поисковый запрос', 'warning');
        return;
    }
    
    showNotification(`Выполняется поиск: "${query}"`, 'info');
    
    
    searchInput.value = '';
}

function performGenreSearch() {
    const genreSearchInput = document.getElementById('genreSearchInput');
    const query = genreSearchInput.value.trim();
    
    if (!query) {
        showNotification('Введите жанр для поиска', 'warning');
        return;
    }
    
    showNotification(`Поиск игр по жанру: "${query}"`, 'info');
    
    
    genreSearchInput.value = '';
}

function showNotification(message, type = 'info') {
    
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getIconByType(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${getBgColorByType(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getIconByType(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getBgColorByType(type) {
    switch(type) {
        case 'success': return '#51cf66';
        case 'error': return '#ff6b6b';
        case 'warning': return '#ffd43b';
        default: return '#4dabf7';
    }
}

function loadPopularGames() {
    const popularGames = [
        {
            id: 1,
            name: "Cyberpunk 2077: Phantom Liberty",
            description: "Дополнение к культовой игре с новым районом, сюжетом и улучшенной графикой.",
            price: "1999 руб.",
            oldPrice: "2999 руб.",
            discount: "33%",
            rating: 4.5,
            genre: "РПГ",
            image: "img/i.webp"
        },
        {
            id: 2,
            name: "Elden Ring: Shadow of the Erdtree",
            description: "Новое дополнение к награжденной игра года с огромным новым миром.",
            price: "2499 руб.",
            oldPrice: "3499 руб.",
            discount: "29%",
            rating: 4.8,
            genre: "РПГ",
            image: "img/i (1).webp"
        },
        {
            id: 3,
            name: "FC 24",
            description: "Новая футбольная игра с улучшенной физикой и реалистичной графикой.",
            price: "3499 руб.",
            oldPrice: "4499 руб.",
            discount: "22%",
            rating: 4.3,
            genre: "Спорт",
            image: "img/i (2).webp"
        },
        {
            id: 4,
            name: "Call of Duty: Modern Warfare III",
            description: "Новая часть культового шутера с захватывающим сюжетом.",
            price: "3999 руб.",
            oldPrice: "4999 руб.",
            discount: "20%",
            rating: 4.6,
            genre: "Шутер",
            image: "img/Call_Of_Duty_MW3_2023.jpg"
        },
        {
            id: 5,
            name: "The Witcher 3: Complete Edition",
            description: "Полное издание культовой RPG с обоими дополнениями.",
            price: "899 руб.",
            oldPrice: "1999 руб.",
            discount: "55%",
            rating: 4.9,
            genre: "РПГ",
            image: "img/i (3).webp"
        },
        {
            id: 6,
            name: "Red Dead Redemption 2",
            description: "Эпическое приключение на Диком Западе от создателей GTA.",
            price: "1599 руб.",
            oldPrice: "3499 руб.",
            discount: "54%",
            rating: 4.8,
            genre: "Приключения",
            image: "img/i (4).webp"
        },
        {
            id: 7,
            name: "God of War: Ragnarok",
            description: "Продолжение истории Кратоса и Атрея в мире скандинавской мифологии.",
            price: "4299 руб.",
            oldPrice: "",
            discount: "",
            rating: 4.9,
            genre: "Экшен",
            image: "img/i (5).webp"
        },
        {
            id: 8,
            name: "Minecraft Legends",
            description: "Новая стратегия во вселенной Minecraft с уникальным геймплеем.",
            price: "1299 руб.",
            oldPrice: "1999 руб.",
            discount: "35%",
            rating: 4.2,
            genre: "Стратегия",
            image: "img/i (6).webp"
        }
    ];

    const popularGamesGrid = document.getElementById('popularGamesGrid');
    
    popularGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'popular-game-card';
        gameCard.dataset.gameId = game.id;
        
        gameCard.innerHTML = `
            <div class="game-image-container">
                <img src="${game.image}" alt="${game.name}" loading="lazy">
                <div class="game-rating">
                    <i class="fas fa-star"></i>
                    <span>${game.rating}</span>
                </div>
                <div class="game-genre-badge">${game.genre}</div>
            </div>
            <div class="game-info">
                <h3 class="game-name">${game.name}</h3>
                <p class="game-description-short">${game.description}</p>
                <div class="game-price-section">
                    <div>
                        ${game.oldPrice ? `<span class="game-old-price">${game.oldPrice}</span>` : ''}
                        <span class="game-price">${game.price}</span>
                    </div>
                    ${game.discount ? `<span class="game-discount">-${game.discount}</span>` : ''}
                </div>
                <button class="buy-game-btn">
                    <i class="fas fa-shopping-cart"></i> Купить сейчас
                </button>
            </div>
        `;
        
        popularGamesGrid.appendChild(gameCard);
    });
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initStatsCounter() {
    const statsElements = document.querySelectorAll('.footer-stats span');
    
    statsElements.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/\d+/g);
        if (match) {
            const numbers = match.map(Number);
            const baseText = text.replace(/\d+/g, '{}');
            
            
            numbers.forEach((number, index) => {
                let current = 0;
                const increment = Math.ceil(number / 100);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    
                    const newText = baseText.replace(/\{\}/g, (match, offset) => {
                        return numbers.map((n, i) => i === index ? current : n)[offset];
                    });
                    stat.textContent = newText;
                }, 20);
            });
        }
    });
}

window.addEventListener('load', function() {
    
    const parallaxElements = document.querySelectorAll('.popular-game-card, .partner-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.1;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
});