// ============================================
// THEME
// ============================================
const themeToggle = document.getElementById('darkModeToggle');
const sunIcon = themeToggle.querySelector('.sun-icon');
const moonIcon = themeToggle.querySelector('.moon-icon');

function updateToggleIcons(isDark) {
    sunIcon.style.display = isDark ? 'inline-block' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'inline-block';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcons(newTheme === 'dark');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTheme();
    }
});

// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor = window.scrollY > 50
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(255,255,255,0.04)';
});

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ============================================
// DOWNLOAD DROPDOWN
// ============================================
document.getElementById('downloadBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        document.getElementById('dropdownMenu').style.display = 'none';
    }
});

// ============================================
// IMAGE MODAL
// ============================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

document.querySelectorAll('.project-image').forEach(imgDiv => {
    imgDiv.addEventListener('click', () => {
        const bgImage = imgDiv.style.backgroundImage;
        const imageUrl = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        modalImg.src = imageUrl;
        modal.style.display = 'flex';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalImg.src = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        modalImg.src = '';
    }
});

// ============================================
// AUTO YEAR
// ============================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================
// SCROLL REVEAL  ← this was the missing piece
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // fire once
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// INIT  (single DOMContentLoaded)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    let theme = localStorage.getItem('theme');
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleIcons(theme === 'dark');

    // Hero elements aren't in viewport on load — trigger them immediately
    document.querySelectorAll('.hero .reveal').forEach(el => {
        el.classList.add('visible');
    });
});