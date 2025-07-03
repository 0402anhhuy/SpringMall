function createTooltips() {
    const tooltip = document.createElement('div');
    tooltip.id = 'custom-tooltip';
    tooltip.innerHTML = `<div class="tooltip-text"></div>`;
    document.body.appendChild(tooltip);

    let showTimeout, hideTimeout;

    const elementsWithTitle = document.querySelectorAll('[title]');

    elementsWithTitle.forEach((element) => {
        const originalTitle = element.getAttribute('title');
        element.removeAttribute('title');
        element.setAttribute('data-tooltip', originalTitle);

        element.addEventListener('mouseenter', function () {
            clearTimeout(hideTimeout);

            showTimeout = setTimeout(() => {
                const tooltipText = tooltip.querySelector('.tooltip-text');
                tooltipText.textContent = originalTitle;
                positionTooltip(this);
                tooltip.classList.add('show');
            }, 200); // Delay for smoothness
        });

        element.addEventListener('mouseleave', function () {
            clearTimeout(showTimeout);

            hideTimeout = setTimeout(() => {
                tooltip.classList.remove('show');
            }, 100);
        });
    });

    function positionTooltip(element) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top - tooltipRect.height - 10;

        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) top = rect.bottom + 10;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }
}
