class GameSlider {
    constructor() {
        this.slides = [];
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        this.slides = [
            {
                id: 1,
                title: "Counter-Strike 2",
                subtitle: "Бесплатно играть",
                description: "Более двух десятилетий Counter-Strike служит примером первоклассной соревновательной игры.",
                price: "Бесплатно",
                buttonText: "Играть",
                buttonIcon: "fa-gamepad",
                badge: "НОВИНКА",
                badgeColor: "var(--primary-color)",
                image: "img/cs.png"
            },
            {
                id: 2,
                title: "Super Bunny Man",
                subtitle: "Кооперативное веселье",
                description: "Кооперативный платформер с отличной физикой про парня в костюме кролика!",
                price: "689 руб.",
                buttonText: "Купить сейчас",
                buttonIcon: "fa-shopping-cart",
                badge: "ПОПУЛЯРНАЯ",
                badgeColor: "var(--secondary-color)",
                image: "img/bm.png"
            },
            {
                id: 3,
                title: "Overwatch 2",
                subtitle: "Командный шутер",
                description: "В недалёком будущем между людьми и машинами произошел глобальный конфликт.",
                price: "Бесплатно",
                buttonText: "Играть",
                buttonIcon: "fa-gamepad",
                badge: "БЕСПЛАТНО",
                badgeColor: "var(--success-color)",
                image: "img/overwatch.png"
            },
            {
                id: 4,
                title: "Valheim",
                subtitle: "Викингское выживание",
                description: "Игра в жанре выживания в мире скандинавской мифологии.",
                price: "1099 руб.",
                buttonText: "Купить сейчас",
                buttonIcon: "fa-shopping-cart",
                badge: "ВЫБОР",
                badgeColor: "var(--warning-color)",
                image: "img/valheim.png"
            }
        ];
        
        this.createSlider();
        this.renderSlides();
        this.renderIndicators();
        this.updateCounter();
        this.setupEvents();
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
            
            slideElement.innerHTML = `
                <div class="game-card">
                    <div class="game-image">
                        <img src="${slide.image}" alt="${slide.title}" loading="lazy">
                        <div class="game-badge" style="background-color: ${slide.badgeColor}">
                            ${slide.badge}
                        </div>
                    </div>
                    <div class="game-content">
                        <div class="game-header">
                            <h3 class="game-title">${slide.title}</h3>
                            ${slide.subtitle ? `<h4 class="game-subtitle">${slide.subtitle}</h4>` : ''}
                        </div>
                        <p class="game-description">${slide.description}</p>
                        <div class="game-footer">
                            <div class="game-price">${slide.price}</div>
                            <button class="game-buy-btn" data-game="${slide.title}">
                                <i class="fas ${slide.buttonIcon}"></i> ${slide.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            slidesContainer.appendChild(slideElement);
        });
        
        this.setupBuyButtons();
    }
    
    setupBuyButtons() {
        const buyButtons = document.querySelectorAll('.game-buy-btn');
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const gameName = button.dataset.game;
                const price = button.closest('.game-footer').querySelector('.game-price').textContent;
                
                if (button.textContent.includes('Купить')) {
                    alert(`Игра "${gameName}" добавлена в корзину за ${price}`);
                } else {
                    alert(`Запускаем "${gameName}"...`);
                }
            });
        });
    }
    
    renderIndicators() {
        const indicatorsContainer = document.getElementById('indicatorsContainer');
        indicatorsContainer.innerHTML = '';
        
        this.slides.forEach((slide, index) => {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === this.currentSlide ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.setAttribute('aria-label', `Слайд ${index + 1}`);
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    goToSlide(index) {
        const newIndex = (index + this.slides.length) % this.slides.length;
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        
        slides[this.currentSlide].style.display = 'none';
        slides[this.currentSlide].classList.remove('active');
        
        slides[newIndex].style.display = 'block';
        slides[newIndex].classList.add('active');
        
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[newIndex].classList.add('active');
        
        this.currentSlide = newIndex;
        this.updateCounter();
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
                const index = Array.from(e.target.parentNode.children).indexOf(e.target);
                this.goToSlide(index);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameSlider = new GameSlider();
});