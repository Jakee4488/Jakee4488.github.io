// Initialize animations (requires AOS script loaded before this file)
if (window.AOS && typeof AOS.init === 'function') {
    AOS.init();
}

// Theme switcher logic using checkbox #theme-toggle and data-theme attribute
(function setupThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');

    function getCurrentTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) themeToggle.checked = theme === 'dark';
    }

    setTheme(getCurrentTheme());
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
})();

// Mobile hamburger menu toggle with accessibility
(function setupMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    if (!menuIcon || !navLinks) return;

    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        menuIcon.setAttribute('aria-expanded', String(isActive));
    };

    menuIcon.addEventListener('click', toggleMenu);
    menuIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((anchor) => {
        anchor.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.setAttribute('aria-expanded', 'false');
        });
    });

    // Reset on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    });
})();

// Optional: Fetch latest GitHub repos if a container exists
(function fetchLatestRepos() {
    const repoContainer = document.getElementById('github-repos');
    if (!repoContainer) return;

    fetch('https://api.github.com/users/Jakee4488/repos?sort=updated&per_page=5')
        .then((res) => res.json())
        .then((repos) => {
            repos.forEach((repo) => {
                const repoDiv = document.createElement('div');
                repoDiv.classList.add('repo');
                repoDiv.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                `;
                repoContainer.appendChild(repoDiv);
            });
        })
        .catch(() => {
            // Silently ignore errors to avoid console noise on rate limits
        });
})();
