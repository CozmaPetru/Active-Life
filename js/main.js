// Buton meniu mobil
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('max-h-96');
    mobileMenu.classList.toggle('max-h-0', isOpen);
    mobileMenu.classList.toggle('max-h-96', !isOpen);
});

//sectiunea Transformari
function initBeforeAfterSliders() {
    document.querySelectorAll(".before-after-slider").forEach(function (slider) {
        const handle = slider.querySelector(".ba-handle");
        const before = slider.querySelector(".ba-before");
        // Find the interior image of the 'before' container to match width dynamic constraints
        const beforeImg = before ? before.querySelector("img") : null;

        if (!handle || !before || !beforeImg) return;
        let dragging = false;

        // Sincronizare dinamica
        function syncImageWidth() {
            beforeImg.style.width = slider.offsetWidth + "px";
        }

        // Initial sync and listen for resizing windows
        syncImageWidth();
        window.addEventListener("resize", syncImageWidth);

        function setPos(x) {
            const rect = slider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(0, Math.min(100, pos)); // Allowed 0-100% boundary range
            before.style.width = pos + "%";
            handle.style.left = pos + "%";
        }

        handle.addEventListener("mousedown", function () {
            dragging = true;
        });
        handle.addEventListener("touchstart", function () {
            dragging = true;
        });
        document.addEventListener("mouseup", function () {
            dragging = false;
        });
        document.addEventListener("touchend", function () {
            dragging = false;
        });

        // General interaction event listeners
        slider.addEventListener("mousemove", function (e) {
            if (dragging) setPos(e.clientX);
        });
        slider.addEventListener("touchmove", function (e) {
            if (dragging && e.touches[0]) setPos(e.touches[0].clientX);
        });
        slider.addEventListener("click", function (e) {
            if (!dragging) setPos(e.clientX);
        });
    });
}
//Initializare functie cand DOM este gata
document.addEventListener("DOMContentLoaded", initBeforeAfterSliders);

// Animatie counter.
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    function animate(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            el.textContent = Math.floor(target * eased).toLocaleString('ro-RO');

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString('ro-RO');
            }
        }
        requestAnimationFrame(tick);
    }

    // Incepe animatia data elementul este vizibil
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 }); //Activat cand 20% din element este vizibil

    counters.forEach(counter => observer.observe(counter));
}


// Initializare counter cand DOM este gata
document.addEventListener('DOMContentLoaded', initCounters);


