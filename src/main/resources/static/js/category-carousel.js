// Category Carousel Navigation
class CategoryCarousel {
    constructor() {
        this.categoryGrid = document.getElementById('categoryGrid');
        this.navLeft = document.getElementById('navLeft');
        this.navRight = document.getElementById('navRight');
        this.scrollAmount = 220; // Width of one category card + gap

        this.init();
    }

    init() {
        if (!this.categoryGrid || !this.navLeft || !this.navRight) {
            return;
        }

        // Bind event listeners
        this.navLeft.addEventListener('click', () => this.scrollLeft());
        this.navRight.addEventListener('click', () => this.scrollRight());

        // Listen for scroll events to update button states
        this.categoryGrid.addEventListener('scroll', () => this.updateButtonStates());

        // Listen for resize events to recalculate scroll amount
        window.addEventListener('resize', () => this.handleResize());

        // Initial button state update
        setTimeout(() => this.updateButtonStates(), 100);
    }

    scrollLeft() {
        this.categoryGrid.scrollBy({
            left: -this.scrollAmount,
            behavior: 'smooth'
        });
    }

    scrollRight() {
        this.categoryGrid.scrollBy({
            left: this.scrollAmount,
            behavior: 'smooth'
        });
    }

    updateButtonStates() {
        const scrollLeft = this.categoryGrid.scrollLeft;
        const maxScroll = this.categoryGrid.scrollWidth - this.categoryGrid.clientWidth;

        // Update left button state
        this.navLeft.disabled = scrollLeft <= 0;

        // Update right button state
        this.navRight.disabled = scrollLeft >= maxScroll - 1; // -1 for floating point precision
    }

    handleResize() {
        // Recalculate scroll amount based on current card width
        const categoryCard = this.categoryGrid.querySelector('.category-card');
        if (categoryCard) {
            const cardStyle = getComputedStyle(categoryCard);
            const cardWidth = parseInt(cardStyle.width);
            const gap = parseInt(getComputedStyle(this.categoryGrid).gap);
            this.scrollAmount = cardWidth + gap;
        }

        // Update button states after resize
        this.updateButtonStates();
    }
}

// Brands Carousel Navigation
class BrandsCarousel {
    constructor() {
        this.brandsGrid = document.getElementById('brandsGrid');
        this.navLeft = document.getElementById('brandsNavLeft');
        this.navRight = document.getElementById('brandsNavRight');
        this.scrollAmount = 310; // Width of one brand card + gap

        this.init();
    }

    init() {
        if (!this.brandsGrid || !this.navLeft || !this.navRight) {
            return;
        }

        // Bind event listeners
        this.navLeft.addEventListener('click', () => this.scrollLeft());
        this.navRight.addEventListener('click', () => this.scrollRight());

        // Listen for scroll events to update button states
        this.brandsGrid.addEventListener('scroll', () => this.updateButtonStates());

        // Listen for resize events to recalculate scroll amount
        window.addEventListener('resize', () => this.handleResize());

        // Initial button state update
        setTimeout(() => this.updateButtonStates(), 100);
    }

    scrollLeft() {
        this.brandsGrid.scrollBy({
            left: -this.scrollAmount,
            behavior: 'smooth'
        });
    }

    scrollRight() {
        this.brandsGrid.scrollBy({
            left: this.scrollAmount,
            behavior: 'smooth'
        });
    }

    updateButtonStates() {
        const scrollLeft = this.brandsGrid.scrollLeft;
        const maxScroll = this.brandsGrid.scrollWidth - this.brandsGrid.clientWidth;

        // Update left button state
        this.navLeft.disabled = scrollLeft <= 0;

        // Update right button state
        this.navRight.disabled = scrollLeft >= maxScroll - 1; // -1 for floating point precision
    }

    handleResize() {
        // Recalculate scroll amount based on current card width
        const brandCard = this.brandsGrid.querySelector('.brand-card');
        if (brandCard) {
            const cardStyle = getComputedStyle(brandCard);
            const cardWidth = parseInt(cardStyle.width);
            const gap = parseInt(getComputedStyle(this.brandsGrid).gap);
            this.scrollAmount = cardWidth + gap;
        }

        // Update button states after resize
        this.updateButtonStates();
    }
}

// Trending Products Filter and Controls
class TrendingProducts {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.trendingCards = document.querySelectorAll('.trending-card');
        this.qtyBtns = document.querySelectorAll('.qty-btn');
        this.wishlistBtns = document.querySelectorAll('.wishlist-btn');

        this.init();
    }

    init() {
        // Filter functionality
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Quantity controls
        this.qtyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuantity(e));
        });

        // Wishlist functionality
        this.wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleWishlist(e));
        });
    }

    handleFilter(e) {
        const filterValue = e.target.dataset.filter;

        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter cards
        this.trendingCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
                // Add animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    }

    handleQuantity(e) {
        const btn = e.target;
        const qtyElement = btn.parentElement.querySelector('.qty-number');
        let currentQty = parseInt(qtyElement.textContent);

        if (btn.classList.contains('plus')) {
            currentQty++;
        } else if (btn.classList.contains('minus') && currentQty > 1) {
            currentQty--;
        }

        qtyElement.textContent = currentQty;

        // Add animation
        qtyElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            qtyElement.style.transform = 'scale(1)';
        }, 150);
    }

    handleWishlist(e) {
        e.preventDefault();
        const btn = e.currentTarget;

        btn.classList.toggle('active');

        if (btn.classList.contains('active')) {
            btn.style.background = '#ff6b6b';
            btn.style.color = 'white';
            btn.style.transform = 'scale(1.2)';

            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        } else {
            btn.style.background = 'rgba(255, 255, 255, 0.9)';
            btn.style.color = '#666';
        }
    }
}

// Newsletter Form Handler
class NewsletterForm {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.emailInput = this.form?.querySelector('input[type="email"]');
        this.submitButton = this.form?.querySelector('.btn-subscribe');

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.emailInput.addEventListener('input', this.handleInput.bind(this));

        // Add animation on load
        this.animateFormElements();
    }

    handleSubmit(e) {
        e.preventDefault();

        const email = this.emailInput.value.trim();

        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Simulate API call
        setTimeout(() => {
            this.setLoadingState(false);
            this.showSuccess();
            this.emailInput.value = '';
        }, 2000);
    }

    handleInput() {
        // Clear any error states when user starts typing
        this.clearErrorState();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Subscribing...
            `;
            this.submitButton.disabled = true;
        } else {
            this.submitButton.innerHTML = `
                Subscribe
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            this.submitButton.disabled = false;
        }
    }

    showSuccess() {
        // Temporarily change button to success state
        this.submitButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Subscribed!
        `;
        this.submitButton.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

        // Add success animation to form
        this.form.style.transform = 'scale(1.02)';
        this.form.style.transition = 'transform 0.3s ease';

        setTimeout(() => {
            this.form.style.transform = 'scale(1)';
            this.setLoadingState(false);
        }, 2000);

        // Show success message (you could create a toast notification here)
        this.showToast('Successfully subscribed to newsletter!', 'success');
    }

    showError(message) {
        this.emailInput.style.borderColor = '#ef4444';
        this.emailInput.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';

        // Show error message (you could create a toast notification here)
        this.showToast(message, 'error');
    }

    clearErrorState() {
        this.emailInput.style.borderColor = '#e5e7eb';
        this.emailInput.style.boxShadow = 'none';
    }

    showToast(message, type) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `newsletter-toast newsletter-toast-${type}`;
        toast.textContent = message;

        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        });

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 4000);
    }

    animateFormElements() {
        const elements = [
            this.form.querySelector('.newsletter-icon'),
            this.form.querySelector('.newsletter-title'),
            this.form.querySelector('.newsletter-description'),
            this.form.querySelector('.form-group')
        ];

        elements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }
}

// Blog Section Interactions
class BlogSection {
    constructor() {
        this.blogCards = document.querySelectorAll('.blog-card');

        this.init();
    }

    init() {
        // Add hover effects and click handlers
        this.blogCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
        });
    }

    handleCardClick(e) {
        // Prevent default if it's a link
        // e.preventDefault();

        const card = e.currentTarget;
        const title = card.querySelector('.blog-title').textContent;

        // Add animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Here you can add navigation to blog detail page
        console.log('Blog clicked:', title);
    }
}

// Featured Products Carousel
class FeaturedProducts {
    constructor() {
        this.productsGrid = document.getElementById('featuredProductsGrid');
        this.prevBtn = document.getElementById('featuredPrev');
        this.nextBtn = document.getElementById('featuredNext');
        this.scrollAmount = 305; // Width of one product card + gap
        this.currentIndex = 0;

        this.init();
    }

    init() {
        if (!this.productsGrid || !this.prevBtn || !this.nextBtn) {
            return;
        }

        // Bind event listeners
        this.prevBtn.addEventListener('click', () => this.scrollLeft());
        this.nextBtn.addEventListener('click', () => this.scrollRight());

        // Listen for scroll events to update button states
        this.productsGrid.addEventListener('scroll', () => this.updateButtonStates());

        // Listen for resize events
        window.addEventListener('resize', () => this.handleResize());

        // Initialize product interactions
        this.initProductInteractions();

        // Initial button state update
        setTimeout(() => this.updateButtonStates(), 100);
    }

    scrollLeft() {
        this.productsGrid.scrollBy({
            left: -this.scrollAmount,
            behavior: 'smooth'
        });
    }

    scrollRight() {
        this.productsGrid.scrollBy({
            left: this.scrollAmount,
            behavior: 'smooth'
        });
    }

    updateButtonStates() {
        const scrollLeft = this.productsGrid.scrollLeft;
        const maxScroll = this.productsGrid.scrollWidth - this.productsGrid.clientWidth;

        // Update button states
        this.prevBtn.disabled = scrollLeft <= 0;
        this.nextBtn.disabled = scrollLeft >= maxScroll - 1;
    }

    handleResize() {
        // Recalculate scroll amount based on screen size
        const cardWidth = window.innerWidth <= 768 ? 270 : 305;
        this.scrollAmount = cardWidth;
        this.updateButtonStates();
    }

    initProductInteractions() {
        // Wishlist functionality
        const wishlistBtns = this.productsGrid.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.classList.toggle('active');

                // Show toast
                this.showToast(btn.classList.contains('active') ?
                    'Added to wishlist!' : 'Removed from wishlist!');
            });
        });

        // Quantity controls
        const qtyBtns = this.productsGrid.querySelectorAll('.qty-btn');
        qtyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const qtyDisplay = btn.parentElement.querySelector('.qty-display');
                let qty = parseInt(qtyDisplay.textContent);

                if (btn.classList.contains('plus')) {
                    qty = Math.min(qty + 1, 99);
                } else if (btn.classList.contains('minus')) {
                    qty = Math.max(qty - 1, 1);
                }

                qtyDisplay.textContent = qty;
            });
        });

        // Add to cart functionality
        const addToCartBtns = this.productsGrid.querySelectorAll('.add-to-cart-btn');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.featured-product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                const quantity = productCard.querySelector('.qty-display').textContent;

                // Add animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);

                this.showToast(`Added ${quantity}x ${productName} to cart!`);
            });
        });
    }

    showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
}

// People Looking Section
class PeopleLooking {
    constructor() {
        this.tagCloud = document.querySelector('.tag-cloud');
        this.init();
    }

    init() {
        if (!this.tagCloud) {
            return;
        }

        // Add click events to tag items
        this.addTagClickEvents();
    }

    addTagClickEvents() {
        const tagItems = document.querySelectorAll('.tag-item');

        tagItems.forEach(tag => {
            tag.addEventListener('click', () => {
                const tagText = tag.querySelector('.tag-text').textContent;
                this.handleTagClick(tagText, tag);
            });
        });
    }

    handleTagClick(tagText, tagElement) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(76, 175, 80, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;

        tagElement.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Simulate search action
        console.log(`Searching for: ${tagText}`);

        // You can add actual search functionality here
        // For now, we'll just show an alert
        setTimeout(() => {
            alert(`Searching for "${tagText}" products...`);
        }, 200);
    }
}

// Add CSS for ripple effect
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// Footer Newsletter Form
class FooterNewsletter {
    constructor() {
        this.form = document.querySelector('.footer-newsletter');
        this.init();
    }

    init() {
        if (!this.form) {
            return;
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const input = this.form.querySelector('.newsletter-input');
        const btn = this.form.querySelector('.newsletter-btn');
        const email = input.value.trim();

        if (!email) {
            this.showMessage('Please enter your email address', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        btn.textContent = 'Subscribing...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.disabled = false;
            input.value = '';
            this.showMessage('Thank you for subscribing!', 'success');
        }, 2000);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `newsletter-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            margin-top: 10px;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.85rem;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Insert message
        this.form.appendChild(messageEl);

        // Show message
        setTimeout(() => {
            messageEl.style.opacity = '1';
        }, 100);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize carousels and trending products when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CategoryCarousel();
    new BrandsCarousel();
    new TrendingProducts();
    new BlogSection();
    new NewsletterForm();
    new FeaturedProducts();
    new PeopleLooking();
    new FooterNewsletter();
});

// Also initialize if script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CategoryCarousel();
        new BrandsCarousel();
        new TrendingProducts();
        new BlogSection();
        new NewsletterForm();
        new FeaturedProducts();
        new PeopleLooking();
        new FooterNewsletter();
    });
} else {
    new CategoryCarousel();
    new BrandsCarousel();
    new TrendingProducts();
    new BlogSection();
    new NewsletterForm();
    new FeaturedProducts();
    new PeopleLooking();
    new FooterNewsletter();
}