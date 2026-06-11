const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('max-h-96');
    mobileMenu.classList.toggle('max-h-0', isOpen);
    mobileMenu.classList.toggle('max-h-96', !isOpen);
});