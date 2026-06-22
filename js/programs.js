// Filtrare programe
function initProgramFilters() {
    // Selecteaza toate butoanele de filtrare si cardurile programelor 
    const filterBtns = document.querySelectorAll('.program-filter-btn');
    const cards = document.querySelectorAll('.program-card-item');

    // Functia se opreste daca nu exista butoane sau carduri
    if (!filterBtns.length || !cards.length) return;

    const activeClasses = ['bg-red-600', 'text-white', 'shadow-sm'];
    const inactiveClasses = ['bg-white', 'text-gray-700', 'border', 'border-gray-200', 'hover:bg-gray-50'];

    // Schimbare buton activ
    function setActiveButton(activeBtn) {
        filterBtns.forEach(btn => {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...inactiveClasses);
            btn.classList.remove('active');
        });

        // Aplicare stil pentru butonul selectat
        activeBtn.classList.remove(...inactiveClasses);
        activeBtn.classList.add(...activeClasses);
        activeBtn.classList.add('active');
    }

    // flitrare carduri 
    function filterCards(type) {
        cards.forEach(card => {
            const show = type === 'all' || card.dataset.type === type;
            card.classList.toggle('hidden', !show);
            if (show) card.classList.add('fade-in');
        });
    }
    // Eveniment pentru butoanele de filtrare
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizeaza buton activ si filtreaza cardurile
            setActiveButton(btn);
            filterCards(btn.dataset.filter);
        });
    });
}

// Acordion pe cardurile de program
function initProgramCardAccordion() {2
    // Selectare toate cardurile
    const cards = document.querySelectorAll('.program-card-item');

    cards.forEach(card => {
        const btn = card.querySelector('.program-details-btn');
        const panel = card.querySelector('.program-details-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            // Verifica daca panoul este deja deschis
            const isOpen = !panel.classList.contains('hidden');

            // inchide restul panourilor
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
    // Selectare toate intrebarile
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        const icon = trigger?.querySelector('.fa-chevron-down');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', () => {
            // verifica daca intrebarea este deja deschisa
            const isOpen = !panel.classList.contains('hidden');
            // inchide restul intrebarilor
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
