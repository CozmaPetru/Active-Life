// Navbar
function initMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("max-h-96");
        mobileMenu.classList.toggle("max-h-0", isOpen);
        mobileMenu.classList.toggle("max-h-96", !isOpen);
        menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });

    document.querySelectorAll("#mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("max-h-96");
            mobileMenu.classList.add("max-h-0");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

// Sectiunea Transformari
function initBeforeAfterSliders() {
    document.querySelectorAll(".before-after-slider").forEach(slider => {

        const handle = slider.querySelector(".ba-handle");
        const before = slider.querySelector(".ba-before");
        const beforeImg = before?.querySelector("img");

        if (!handle || !before || !beforeImg) return;
        let dragging = false;
        function syncImageWidth() {
            beforeImg.style.width = slider.offsetWidth + "px";
        }

        syncImageWidth();
        window.addEventListener("resize", syncImageWidth);
        function setPos(x) {
            const rect = slider.getBoundingClientRect();

            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(0, Math.min(100, pos));

            before.style.width = pos + "%";
            handle.style.left = pos + "%";
        }

        handle.addEventListener("mousedown", () => dragging = true);
        handle.addEventListener("touchstart", () => dragging = true);
        document.addEventListener("mouseup", () => dragging = false);
        document.addEventListener("touchend", () => dragging = false);

        slider.addEventListener("mousemove", e => {
            if (dragging) {
                setPos(e.clientX);
            }
        });

        slider.addEventListener("touchmove", e => {
            if (!dragging || !e.touches[0]) return;
            e.preventDefault();
            setPos(e.touches[0].clientX);
        }, { passive: false });

        slider.addEventListener("click", e => {
            if (!dragging) {
                setPos(e.clientX);
            }
        });
    });
}

// Counter
function initCounters() {
    const counters = document.querySelectorAll(".counter-number");
    if (!counters.length) return;

    function animate(counter) {
        const target = Number(counter.dataset.target);
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * eased).toLocaleString("ro-RO");
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = target.toLocaleString("ro-RO");
            }
        }
        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.2
    });
    counters.forEach(counter => observer.observe(counter));
}

// Filtrare antrenori
function initTrainerFilter() {
    const filterBtns = document.querySelectorAll(".trainer-filter-btn");
    const trainerCards = document.querySelectorAll(".trainer-card-item");
    if (!filterBtns.length || !trainerCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            // Stilizare buton activ
            filterBtns.forEach(b => {
                b.classList.remove("bg-red-600", "text-white");
                b.classList.add("bg-white", "border", "border-gray-200", "text-gray-700", "hover:bg-gray-50");
            });
            btn.classList.add("bg-red-600", "text-white");
            btn.classList.remove("bg-white", "border", "border-gray-200", "text-gray-700", "hover:bg-gray-50");

            // Afișare / ascundere carduri
            trainerCards.forEach(card => {
                const match = filter === "all" || card.dataset.specialty === filter;
                card.style.display = match ? "" : "none";
            });
        });
    });
}
// Initializare aplicatie
document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initBeforeAfterSliders();
    initCounters();
    initTrainerFilter();
});