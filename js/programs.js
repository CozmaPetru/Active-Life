// Filtrare programe
function initProgramFilters() {
    const filterBtns = document.querySelectorAll('.program-filter-btn');
    const cards = document.querySelectorAll('.program-card-item');

    if (!filterBtns.length || !cards.length) return;

    const activeClasses = ['bg-red-600', 'text-white', 'shadow-sm'];
    const inactiveClasses = ['bg-white', 'text-gray-700', 'border', 'border-gray-200', 'hover:bg-gray-50'];

    function setActiveButton(activeBtn) {
        filterBtns.forEach(btn => {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...inactiveClasses);
            btn.classList.remove('active');
        });
        activeBtn.classList.remove(...inactiveClasses);
        activeBtn.classList.add(...activeClasses);
        activeBtn.classList.add('active');
    }

    function filterCards(type) {
        cards.forEach(card => {
            const show = type === 'all' || card.dataset.type === type;
            card.classList.toggle('hidden', !show);
            if (show) card.classList.add('fade-in');
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn);
            filterCards(btn.dataset.filter);
        });
    });
}

// Acordion pe cardurile de program
function initProgramCardAccordion() {
    const cards = document.querySelectorAll('.program-card-item');

    cards.forEach(card => {
        const btn = card.querySelector('.program-details-btn');
        const panel = card.querySelector('.program-details-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            const isOpen = !panel.classList.contains('hidden');

            cards.forEach(other => {
                if (other === card) return;
                other.querySelector('.program-details-panel')?.classList.add('hidden');
                const otherBtn = other.querySelector('.program-details-btn');
                if (otherBtn) otherBtn.textContent = 'Vezi detalii';
            });

            panel.classList.toggle('hidden', isOpen);
            btn.textContent = isOpen ? 'Vezi detalii' : 'Ascunde detalii';
        });
    });
}

// Acordion FAQ - Informații utile
function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        const icon = trigger?.querySelector('.fa-chevron-down');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = !panel.classList.contains('hidden');

            items.forEach(other => {
                other.querySelector('.faq-panel')?.classList.add('hidden');
                other.querySelector('.faq-trigger')?.classList.remove('bg-red-50');
                const otherIcon = other.querySelector('.fa-chevron-down');
                if (otherIcon) otherIcon.style.transform = '';
            });

            if (!isOpen) {
                panel.classList.remove('hidden');
                trigger.classList.add('bg-red-50');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}
// Executa evenimentul dupa ce sa incarcat tot html-ul
document.addEventListener('DOMContentLoaded', () => {
    initProgramFilters();
    initProgramCardAccordion();
    initFaqAccordion();
});
