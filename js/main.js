// Navbar
function MobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    // iesire din functie daca elementul nu exista
    if (!menuBtn || !mobileMenu) return;

    // Deschidere meniu la click
    menuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("max-h-96");
        mobileMenu.classList.toggle("max-h-0", isOpen);
        mobileMenu.classList.toggle("max-h-96", !isOpen);
        menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });

    // Inchidere automata la click pe link
    document.querySelectorAll("#mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("max-h-96");
            mobileMenu.classList.add("max-h-0");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

// Sectiunea Transformari
function BeforeAfterSliders() {
    // Selecteaza toate sliderele 
    document.querySelectorAll(".before-after-slider").forEach(slider => {

        const handle = slider.querySelector(".ba-handle");
        const before = slider.querySelector(".ba-before");
        const beforeImg = before?.querySelector("img");

        if (!handle || !before || !beforeImg) return;
        let dragging = false;
        function syncImageWidth() {
            beforeImg.style.width = slider.offsetWidth + "px";
        }
        // sincronizare latime imagine
        syncImageWidth();
        window.addEventListener("resize", syncImageWidth);

        // setare pizitie slider
        function setPos(x) {
            const rect = slider.getBoundingClientRect();
            // calculare procent pozitie mouse sau atingere 
            let pos = ((x - rect.left) / rect.width) * 100;
            // liminare intre 0 si 100%
            pos = Math.max(0, Math.min(100, pos));

            // ajustare overlay
            before.style.width = pos + "%";
            handle.style.left = pos + "%";
        }

        // evemente drag
        handle.addEventListener("mousedown", () => dragging = true);
        handle.addEventListener("touchstart", () => dragging = true);
        document.addEventListener("mouseup", () => dragging = false);
        document.addEventListener("touchend", () => dragging = false);

        // miscare mouse
        slider.addEventListener("mousemove", e => {
            if (dragging) {
                setPos(e.clientX);
            }
        });
        // miscare touch
        slider.addEventListener("touchmove", e => {
            if (!dragging || !e.touches[0]) return;
            e.preventDefault();
            setPos(e.touches[0].clientX);
        }, { passive: false });
        // click pe slider
        slider.addEventListener("click", e => {
            if (!dragging) {
                setPos(e.clientX);
            }
        });
    });
}


// Filtrare antrenori
function TrainerFilter() {
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

// Buton Back to top
function BackToTop() {
    const btn = document.querySelector('#back-to-top');
    if (!btn) return;
    // arata butonul dupa scroll
    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.pageYOffset > 300);
    });
    // scroll in sus la click
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll
function  SmoothScroll() {
    // Preluare inaltine Navbar
    const navbar = document.querySelector('nav');

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');

            //ignorare linkuri goale sau "#"
            if(!id || id === '#') return;

            const target = document.querySelector(id);
            if(!target) return; //elementul nu exista

            e.preventDefault();

            const inaltimeNav = navbar ? navbar.getBoundingClientRect().height : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - inaltimeNav -16;

            if('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({top: top, behavior: 'smooth'});
            } else {
                window.scroollTo(0, top);
            }
            // focul pe element pentru a fi accesibil
            target.setAttribute('tabindex', '-1');
            target.focus({preventScroll: true});
        });
    });
}

// Animatie Counter

function animatieCounter() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;
    // functie pentru o animatie mai naturala
    const easeOutQuad = t => t * (2 - t);
    function animateSingle(el) {
        const target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
        const duration = 750;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuad(progress);
            el.textContent = Math.round(easedProgress * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSingle(entry.target);
                obs.unobserve(entry.target); // rulează o singură dată
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Initializare aplicatie
document.addEventListener("DOMContentLoaded", () => {
    MobileMenu();
    BeforeAfterSliders();
    TrainerFilter();
    BackToTop();
    SmoothScroll();
    animatieCounter();
});