// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate icon (optional simple rotation or change)
    menuIcon.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
    });
});

// Navbar Scroll Effect (Glassmorphism intensity change)
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});
