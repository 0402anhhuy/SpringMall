// Cart functionality

document.addEventListener('DOMContentLoaded', function () {
    // Quantity controls
    const quantityControls = document.querySelectorAll('.cart-item .quantity-controls');

    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const qtyNumber = control.querySelector('.qty-number');

        minusBtn.addEventListener('click', function () {
            const itemId = this.dataset.id;
            let currentQty = parseInt(qtyNumber.textContent);
            if (currentQty > 1) {
                qtyNumber.textContent = currentQty - 1;
                updateCartItem(itemId, currentQty - 1);
            }
        });

        plusBtn.addEventListener('click', function () {
            const itemId = this.dataset.id;
            let currentQty = parseInt(qtyNumber.textContent);
            qtyNumber.textContent = currentQty + 1;
            updateCartItem(itemId, currentQty + 1);
        });
    });

    // Remove item functionality
    const removeBtns = document.querySelectorAll('.remove-btn');

    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const itemId = this.dataset.id;
            const cartItem = this.closest('.cart-item');

            // Add confirmation
            if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                // Add animation
                cartItem.style.transform = 'translateX(-100%)';
                cartItem.style.opacity = '0';

                setTimeout(() => {
                    removeCartItem(itemId);
                    cartItem.remove();
                    updateCartSummary();
                }, 300);
            }
        });
    });

    // Save for later functionality
    const saveLaterBtns = document.querySelectorAll('.save-later-btn');

    saveLaterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const itemId = this.dataset.id;
            const cartItem = this.closest('.cart-item');

            // Add animation
            cartItem.style.transform = 'translateY(-20px)';
            cartItem.style.opacity = '0.5';

            setTimeout(() => {
                saveForLater(itemId);
                cartItem.remove();
                updateCartSummary();

                // Show a success message
                showNotification('Đã lưu sản phẩm để mua sau');
            }, 300);
        });
    });

    // Promo code functionality
    const promoBtn = document.querySelector('.promo-btn');
    const promoInput = document.querySelector('.promo-input');

    if (promoBtn && promoInput) {
        promoBtn.addEventListener('click', function () {
            const promoCode = promoInput.value.trim();
            if (promoCode) {
                applyPromoCode(promoCode);
            }
        });

        promoInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                promoBtn.click();
            }
        });
    }

    // Add to the cart from recommended products
    const addToCartBtns = document.querySelectorAll('.related-products-section .add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Add animation
            this.textContent = 'Đã thêm!';
            this.style.background = '#2ecc71';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = 'Thêm vào giỏ';
                this.style.background = '#27ae60';
                this.disabled = false;
            }, 2000);

            // Here you can add actual add to cart functionality
            showNotification('Đã thêm sản phẩm vào giỏ hàng');
        });
    });

    // Auto-save cart changes
    let saveTimeout;
    function autoSaveCart() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveCartToStorage();
        }, 1000);
    }

    // Initialize cart total calculation
    calculateCartTotal();
});

// Helper functions
function updateCartItem(itemId, quantity) {
    // Here you can add AJAX call to update cart item on server
    console.log(`Updating item ${itemId} to quantity ${quantity}`);

    // Update total for this item
    updateItemTotal(itemId, quantity);
    updateCartSummary();
    autoSaveCart();
}

function removeCartItem(itemId) {
    // Here you can add AJAX call to remove cart item from the server
    console.log(`Removing item ${itemId} from cart`);
    autoSaveCart();
}

function saveForLater(itemId) {
    // Here you can add AJAX call to save an item for later
    console.log(`Saving item ${itemId} for later`);
    autoSaveCart();
}

function applyPromoCode(code) {
    // Here you can add AJAX call to apply promo code
    console.log(`Applying promo code: ${code}`);

    // Simulate promo code validation
    const validCodes = ['SAVE10', 'WELCOME15', 'FRESH20'];

    if (validCodes.includes(code.toUpperCase())) {
        showNotification('Mã giảm giá đã được áp dụng thành công!', 'success');
        updateCartSummary();
    } else {
        showNotification('Mã giảm giá không hợp lệ', 'error');
    }
}

function updateItemTotal(itemId, quantity) {
    const cartItem = document.querySelector(`[data-id="${itemId}"]`).closest('.cart-item');
    const priceElement = cartItem.querySelector('.current-price');
    const totalElement = cartItem.querySelector('.total-price');

    if (priceElement && totalElement) {
        const price = parseInt(priceElement.textContent.replace(/[₫,]/g, ''));
        const total = price * quantity;
        totalElement.textContent = '₫' + total.toLocaleString();
    }
}

function updateCartSummary() {
    // Recalculate cart totals
    calculateCartTotal();

    // Update cart count in header if exists
    updateCartCount();
}

function calculateCartTotal() {
    const totalElements = document.querySelectorAll('.total-price');
    let subtotal = 0;

    totalElements.forEach(element => {
        const amount = parseInt(element.textContent.replace(/[₫,]/g, ''));
        subtotal += amount;
    });

    // Update subtotal
    const subtotalElement = document.querySelector('.summary-row .summary-value');
    if (subtotalElement) {
        subtotalElement.textContent = '₫' + subtotal.toLocaleString();
    }

    // Calculate final total (subtract discount, add shipping)
    const discount = 30000; // Example discount
    const shipping = subtotal >= 200000 ? 0 : 25000; // Free shipping over 200k
    const total = subtotal - discount + shipping;

    // Update total
    const totalElement = document.querySelector('.summary-row.total .summary-value');
    if (totalElement) {
        totalElement.textContent = '₫' + total.toLocaleString();
    }
}

function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartCountElement = document.querySelector('.cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = `(${cartItems.length} sản phẩm)`;
    }
}

function saveCartToStorage() {
    // Save cart data to localStorage for persistence
    const cartData = {
        timestamp: Date.now(),
        items: []
    };

    // Collect cart item data
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        // Extract item data and add to cartData.items
    });

    localStorage.setItem('cart', JSON.stringify(cartData));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animation for cart items on a load
function animateCartItems() {
    const cartItems = document.querySelectorAll('.cart-item');

    cartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations when the page loads
window.addEventListener('load', () => {
    animateCartItems();
});
