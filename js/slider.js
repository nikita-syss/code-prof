class GameSlider {
    constructor() {
        this.slides = [];
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isAnimating = false;
        
        
        this.init();
    }
    
    
    init() {
        
        this.slides = [
            {
                id: 1,
                title: "Counter-Strike 2",
                subtitle: "Бесплатно играть",
                description: "Более двух десятилетий Counter-Strike служит примером первоклассной соревновательной игры. Теперь пришло время нового этапа — Counter-Strike 2.",
                price: "Бесплатно",
                badge: "НОВИНКА",
                badgeColor: "var(--primary-color)",
                image: "img/cs.png",
                features: ["Обновленная графика", "Улучшенный геймплей", "Новые карты"]
            },
            {
                id: 2,
                title: "Super Bunny Man",
                subtitle: "Кооперативное веселье",
                description: "Кооперативный платформер с отличной физикой про парня в костюме кролика! Зовите друзей и проходите уровни вместе.",
                price: "689 руб.",
                badge: "ПОПУЛЯРНАЯ",
                badgeColor: "var(--secondary-color)",
                image: "img/bm.png",
                features: ["Кооперативная игра", "Смешная физика", "4 игрока одновременно"]
            },
            {
                id: 3,
                title: "Overwatch 2",
                subtitle: "Командный шутер",
                description: "В недалёком будущем между людьми и машинами произошел глобальный конфликт. Вступайте в Overwatch и спасайте мир!",
                price: "Бесплатно",
                badge: "БЕСПЛАТНО",
                badgeColor: "var(--success-color)",
                image: "img/over.png",
                features: ["Новые герои", "Обновленные карты", "Командные сражения"]
            },
            {
                id: 4,
                title: "Valheim",
                subtitle: "Викингское выживание",
                description: "Игра в жанре выживания в мире скандинавской мифологии. Исследуйте, стройте и выживайте вместе с друзьями.",
                price: "1099 руб.",
                badge: "ВЫБОР ИГРОКОВ",
                badgeColor: "var(--warning-color)",
                image: "img/val.png",
                features: ["Открытый мир", "Кооператив до 10 игроков", "Крафтинг и строительство"]
            }
        ];
        
        
        this.createSlider();
        this.renderSlides();
        this.renderIndicators();
        this.updateCounter();
        
        
        this.setupEvents();
        
        
        this.startAutoSlide();
    }
    
    
    createSlider() {
        const sliderWrapper = document.getElementById('sliderWrapper');
        
        
        sliderWrapper.innerHTML = '';
        
        
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides-container';
        sliderWrapper.appendChild(slidesContainer);
    }
    
    
    renderSlides() {
        const slidesContainer = document.querySelector('.slides-container');
        
        
        slidesContainer.innerHTML = '';
        
        
        this.slides.forEach((slide, index) => {
            
            const slideElement = document.createElement('div');
            slideElement.className = `slide ${index === this.currentSlide ? 'active' : ''}`;
            slideElement.dataset.slide = slide.id;
            slideElement.style.display = index === this.currentSlide ? 'block' : 'none';
            
            
            const featuresHTML = slide.features ? `
                <div class="game-features">
                    ${slide.features.map(feature => `
                        <span class="game-feature">
                            <i class="fas fa-check"></i> ${feature}
                        </span>
                    `).join('')}
                </div>
            ` : '';
            
            slideElement.innerHTML = `
                <div class="game-card">
                    <div class="game-image">
                        <img src="${slide.image}" alt="${slide.title}" loading="lazy">
                        <div class="game-badge" style="background-color: ${slide.badgeColor}">
                            ${slide.badge}
                        </div>
                        <div class="game-overlay"></div>
                    </div>
                    <div class="game-content">
                        <div class="game-header">
                            <h3 class="game-title">${slide.title}</h3>
                            ${slide.subtitle ? `<h4 class="game-subtitle">${slide.subtitle}</h4>` : ''}
                        </div>
                        <p class="game-description">${slide.description}</p>
                        ${featuresHTML}
                        <div class="game-footer">
                            <div class="game-price">${slide.price}</div>
                            <button class="game-buy-btn" data-game="${slide.title}">
                                <i class="fas fa-shopping-cart"></i> Купить сейчас
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            slidesContainer.appendChild(slideElement);
        });
    }
    
    
    renderIndicators() {
        const indicatorsContainer = document.getElementById('indicatorsContainer');
        
        
        indicatorsContainer.innerHTML = '';
        
        
        this.slides.forEach((slide, index) => {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === this.currentSlide ? 'active' : ''}`;
            indicator.dataset.slide = slide.id;
            indicator.dataset.index = index;
            indicator.setAttribute('aria-label', `Слайд ${index + 1}`);
            indicator.innerHTML = `<span class="indicator-progress"></span>`;
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    
    goToSlide(index) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        
        const newIndex = (index + this.slides.length) % this.slides.length;
        
        
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const currentSlide = slides[this.currentSlide];
        const nextSlide = slides[newIndex];
        
        
        if (currentSlide && nextSlide) {
            
            currentSlide.style.opacity = '0';
            currentSlide.style.transform = 'translateX(-20px)';
            
            nextSlide.style.display = 'block';
            nextSlide.style.opacity = '0';
            nextSlide.style.transform = 'translateX(20px)';
            
            
            setTimeout(() => {
                currentSlide.style.display = 'none';
                currentSlide.classList.remove('active');
                
                nextSlide.style.opacity = '1';
                nextSlide.style.transform = 'translateX(0)';
                nextSlide.classList.add('active');
                
                
                indicators.forEach(indicator => indicator.classList.remove('active'));
                if (indicators[newIndex]) {
                    indicators[newIndex].classList.add('active');
                }
                
                
                this.currentSlide = newIndex;
                
                
                this.updateCounter();
                
                this.isAnimating = false;
            }, 300);
        }
        
        
        this.resetAutoSlide();
    }
    
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    
    updateCounter() {
        const currentSlideElement = document.getElementById('currentSlide');
        const totalSlidesElement = document.getElementById('totalSlides');
        
        if (currentSlideElement) {
            currentSlideElement.textContent = this.currentSlide + 1;
        }
        
        if (totalSlidesElement) {
            totalSlidesElement.textContent = this.slides.length;
        }
    }
    
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    
    resetAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.startAutoSlide();
        }
    }
    
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    
    setupEvents() {
        
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            }
        });
        
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        
        const sliderWrapper = document.getElementById('sliderWrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });
            
            sliderWrapper.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }
        
        
        this.setupSwipeEvents();
    }
    
    
    setupSwipeEvents() {
        const sliderWrapper = document.getElementById('sliderWrapper');
        if (!sliderWrapper) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    
                    this.nextSlide();
                } else {
                    
                    this.prevSlide();
                }
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameSlider = new GameSlider();
});