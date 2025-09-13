// Product Detail Page functionality

document.addEventListener('DOMContentLoaded', function () {
    // Image gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.getElementById('mainProductImage');

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');

            // Update main image
            const thumbnailImg = this.querySelector('.thumbnail-img');
            if (thumbnailImg && mainImage) {
                mainImage.src = thumbnailImg.src;
                mainImage.alt = thumbnailImg.alt;
            }
        });
    });

    // Quantity controls
    const qtyInput = document.querySelector('.qty-input');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');

    if (minusBtn && qtyInput) {
        minusBtn.addEventListener('click', function () {
            let currentValue = parseInt(qtyInput.value) || 1;
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
    }

    if (plusBtn && qtyInput) {
        plusBtn.addEventListener('click', function () {
            let currentValue = parseInt(qtyInput.value) || 1;
            if (currentValue < 99) {
                qtyInput.value = currentValue + 1;
            }
        });
    }

    // Validate quantity input
    if (qtyInput) {
        qtyInput.addEventListener('change', function () {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 99) {
                this.value = 99;
            }
        });
    }

    // Add to cart functionality
    const addToCartBtn = document.querySelector('.btn-add-to-cart');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<div class="spinner"></div> Đang thêm...';
            this.disabled = true;

            // Simulate API call
            setTimeout(() => {
                this.innerHTML = '✓ Đã thêm vào giỏ';
                this.style.background = '#2ecc71';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '#27ae60';
                    this.disabled = false;
                }, 2000);
            }, 1000);

            // Here you can add actual add to cart functionality
            console.log(`Added ${quantity} item(s) to cart`);
        });
    }

    // Buy now functionality
    const buyNowBtn = document.querySelector('.btn-buy-now');

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function () {
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Đang xử lý...';
            this.disabled = true;

            // Simulate redirect to checkout
            setTimeout(() => {
                // Here you can add actual buy now functionality
                console.log(`Buy now ${quantity} item(s)`);
                // window.location.href = '/checkout';

                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    }

    // Wishlist functionality
    const wishlistBtn = document.querySelector('.wishlist-btn');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function () {
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Đã yêu thích
                `;
                this.style.borderColor = '#e74c3c';
                this.style.color = '#e74c3c';
            } else {
                this.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Yêu thích
                `;
                this.style.borderColor = '#e9ecef';
                this.style.color = '#6c757d';
            }
        });
    }

    // Share functionality
    const shareBtn = document.querySelector('.share-btn');

    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                // Fallback - copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Đã sao chép link sản phẩm!');
                });
            }
        });
    }

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Related products add to cart
    const relatedAddToCartBtns = document.querySelectorAll('.related-products-grid .add-to-cart-btn');

    relatedAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const originalText = this.textContent;
            this.textContent = 'Đã thêm!';
            this.style.background = '#2ecc71';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '#27ae60';
                this.disabled = false;
            }, 1500);
        });
    });

    // Image zoom functionality (optional)
    if (mainImage) {
        mainImage.addEventListener('click', function () {
            // Create modal for image zoom
            const modal = document.createElement('div');
            modal.className = 'image-zoom-modal';
            modal.innerHTML = `
                <div class="zoom-overlay">
                    <div class="zoom-container">
                        <button class="zoom-close">&times;</button>
                        <img src="${this.src}" alt="${this.alt}" class="zoom-image">
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Close modal functionality
            const closeBtn = modal.querySelector('.zoom-close');
            const overlay = modal.querySelector('.zoom-overlay');

            const closeModal = () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    closeModal();
                }
            });

            // Close on escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        });
    }
});

// Add zoom modal styles
const zoomStyles = document.createElement('style');
zoomStyles.textContent = `
    .image-zoom-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
    }
    
    .zoom-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .zoom-container {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
    }
    
    .zoom-close {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 40px;
        height: 40px;
        background: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .zoom-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
    }
    
    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff40;
        border-top: 2px solid #ffffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .action-btn.active {
        border-color: #e74c3c !important;
        color: #e74c3c !important;
    }
`;
document.head.appendChild(zoomStyles);
