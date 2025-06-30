//download dropdown menu
document.getElementById('downloadBtn').addEventListener('click', function () {
    const menu = document.getElementById('dropdownMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

// Optional: close the dropdown if clicking outside
window.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        document.getElementById('dropdownMenu').style.display = 'none';
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dark Mode Toggle Functionality
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
    localStorage.setItem('theme-manually-set', 'true');
    updateToggleIcons(newTheme === 'dark');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTheme();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme') || 'light';
    if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleIcons(theme === 'dark');
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const projectImages = document.querySelectorAll('.project-image');

  projectImages.forEach(imgDiv => {
    imgDiv.style.cursor = 'zoom-in';
    imgDiv.addEventListener('click', () => {
      const bgImage = imgDiv.style.backgroundImage;
      const imageUrl = bgImage.slice(5, -2); // extract URL from `url("...")`
      modalImg.src = imageUrl;
      modal.style.display = 'flex'; // use flex for centering
    });
  });

  // Close modal if user clicks outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
});
