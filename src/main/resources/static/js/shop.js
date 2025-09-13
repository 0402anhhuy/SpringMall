// Shop functionality

document.addEventListener('DOMContentLoaded', function () {
    // Quantity controls
    const forms = document.querySelectorAll(".product-actions");

    forms.forEach(form => {
        const minusBtn = form.querySelector(".minus");
        const plusBtn = form.querySelector(".plus");
        const qtyNumber = form.querySelector(".qty-number");
        const qtyInput = form.querySelector(".quantity-input");

        // Tăng giảm số lượng
        minusBtn.addEventListener("click", function () {
            let qty = parseInt(qtyNumber.textContent);
            if (qty > 1) {
                qty--;
                qtyNumber.textContent = qty;
                qtyInput.value = qty;
            }
        });

        plusBtn.addEventListener("click", function () {
            let qty = parseInt(qtyNumber.textContent);
            qty++;
            qtyNumber.textContent = qty;
            qtyInput.value = qty;
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Không reload

            const productId = form.querySelector('input[name="productId"]').value;
            const quantity = form.querySelector('input[name="quantity"]').value;

            fetch("/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `productId=${productId}&quantity=${quantity}`
            })
                .then(res => res.json())
                .then(data => {
                    alert("🛒 Sản phẩm đã được thêm vào giỏ hàng!");
                    // Cập nhật số lượng trong biểu tượng giỏ nếu cần
                    document.getElementById("cart-count").innerText = data.totalItems;
                })
                .catch(err => {
                    console.error("❌ Lỗi khi thêm vào giỏ:", err);
                });
        });
    });

        // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            // Here you can add actual wishlist functionality
        });
    });

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Add animation or feedback
            this.textContent = 'Đã thêm!';
            this.style.background = '#2ecc71';

            setTimeout(() => {
                this.textContent = 'Thêm vào giỏ';
                this.style.background = '#27ae60';
            }, 1500);

            // Here you can add actual add to cart functionality
        });
    });

    // Price range slider
    const priceSlider = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    if (priceSlider) {
        priceSlider.addEventListener('input', function () {
            const value = this.value;
            const max = this.max;
            const percentage = (value / max) * 100;

            // Update the slider appearance
            this.style.background = `linear-gradient(to right, #27ae60 0%, #27ae60 ${percentage}%, #e9ecef ${percentage}%, #e9ecef 100%)`;

            // Update max price input
            maxPriceInput.value = value;
        });
    }

    // Filter price button
    const filterPriceBtn = document.querySelector('.filter-price-btn');

    if (filterPriceBtn) {
        filterPriceBtn.addEventListener('click', function () {
            const minPrice = minPriceInput.value;
            const maxPrice = maxPriceInput.value;

            // Here you can add actual price filtering functionality
            console.log(`Filtering products from ${minPrice} to ${maxPrice}`);
        });
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function () {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Here you can add actual search functionality
                console.log(`Searching for: ${searchTerm}`);
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            // Here you can add actual sorting functionality
            console.log(`Sorting by: ${sortValue}`);
        });
    }

    // Category filter
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all categories
            categoryLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
        });
    });

    // Brand filter checkboxes
    const brandCheckboxes = document.querySelectorAll('input[name="brands"]');

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const selectedBrands = Array.from(brandCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            // Here you can add actual brand filtering functionality
            console.log('Selected brands:', selectedBrands);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;

            if (email) {
                // Here you can add actual newsletter subscription functionality
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                this.querySelector('.newsletter-input').value = '';
            }
        });
    }

    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn:not(.prev-btn):not(.next-btn)');

    pageButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            pageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Here you can add actual pagination functionality
            const pageNumber = this.textContent;
            console.log(`Going to page: ${pageNumber}`);
        });
    });

    // Previous/Next pagination
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            const currentActive = document.querySelector('.page-btn.active');
            const prevPage = currentActive.previousElementSibling;

            if (prevPage && !prevPage.classList.contains('prev-btn')) {
                currentActive.classList.remove('active');
                prevPage.classList.add('active');
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const currentActive = document.querySelector('.page-btn.active');
            const nextPage = currentActive.nextElementSibling;

            if (nextPage && !nextPage.classList.contains('next-btn') && !nextPage.classList.contains('page-dots')) {
                currentActive.classList.remove('active');
                nextPage.classList.add('active');
            }
        });
    }
});

// Category toggle functionality
function toggleCategories() {
    const categoryList = document.getElementById('categoryList');
    const expandBtn = document.getElementById('categoryExpandBtn');
    const expandText = expandBtn.querySelector('.expand-text');
    const collapseText = expandBtn.querySelector('.collapse-text');
    const icon = expandBtn.querySelector('svg');
    
    if (categoryList.classList.contains('category-collapsed')) {
        // Expand categories
        categoryList.classList.remove('category-collapsed');
        expandText.style.display = 'none';
        collapseText.style.display = 'inline';
        icon.style.transform = 'rotate(180deg)';
    } else {
        // Collapse categories
        categoryList.classList.add('category-collapsed');
        expandText.style.display = 'inline';
        collapseText.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}