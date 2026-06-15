// Filtrare programe
function initProgramFilters() {
    // UPDATED: Matches the HTML class '.program-filter-btn'
    const filterBtns = document.querySelectorAll('.program-filter-btn');
    // UPDATED: Matches the HTML wrapper class '.program-card-item'
    const cards = document.querySelectorAll('.program-card-item');

    if (!filterBtns.length || !cards.length) return;

    // Tailwind utility styles matching your active/inactive pill buttons
    const activeClasses = ['bg-red-600', 'text-white', 'shadow-sm'];
    const inactiveClasses = ['bg-white', 'text-gray-700', 'border', 'border-gray-200', 'hover:bg-gray-50'];

    function setActiveButton(activeBtn) {
        filterBtns.forEach(btn => {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...inactiveClasses);
            btn.classList.remove('active'); // Clear structural state class if any
        });
        activeBtn.classList.remove(...inactiveClasses);
        activeBtn.classList.add(...activeClasses);
        activeBtn.classList.add('active');
    }

    function filterCards(type) {
        cards.forEach(card => {
            // UPDATED: HTML code uses 'all' instead of 'toate' for the master filter
            const show = type === 'all' || card.dataset.type === type;
            
            if (show) {
                card.classList.remove('hidden');
                // Optional: Re-trigger an animation framework class if applicable
                card.classList.add('fade-in'); 
            } else {
                card.classList.add('hidden');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn);
            filterCards(btn.dataset.filter); // Reads data-filter="all", "cardio", etc.
        });
    });
}

// Acordion programe
function initProgramsAccordion() {
    // UPDATED: Matches the HTML ID 'programsAccordion' (CamelCase)
    const accordion = document.getElementById('programsAccordion');
    if (!accordion) return;

    // UPDATED: Matches Bootstrap framework class markup '.accordion-item'
    const items = accordion.querySelectorAll('.accordion-item');

    function openItem(targetItem) {
        items.forEach(item => {
            const shouldBeOpen = item === targetItem;
            
            // UPDATED: Target Bootstrap internal layout elements inside your HTML
            const button = item.querySelector('.accordion-button');
            const collapsePanel = item.querySelector('.accordion-collapse');

            if (shouldBeOpen) {
                // Button states
                button.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                
                // Content section transitions
                collapsePanel.classList.add('show');
                collapsePanel.style.display = 'block'; // Fallback display mechanism
            } else {
                // Button states
                button.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                
                // Content section transitions
                collapsePanel.classList.remove('show');
                collapsePanel.style.display = 'none';
            }
        });
    }

    items.forEach(item => {
        const triggerButton = item.querySelector('.accordion-button');
        
        triggerButton.addEventListener('click', (e) => {
            e.preventDefault(); // Stop native Bootstrap JS interference if both are present
            
            const collapsePanel = item.querySelector('.accordion-collapse');
            const isAlreadyOpen = collapsePanel.classList.contains('show');
            
            openItem(isAlreadyOpen ? null : item);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProgramFilters();
    initProgramsAccordion();
});