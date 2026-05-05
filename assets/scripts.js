document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const mouseIndicator = document.querySelector('.animate-bounce');
    
    // Initial check for mouse indicator
    if (mouseIndicator) {
        if (window.innerWidth < 768) {
            mouseIndicator.style.display = 'none';
        } else {
            mouseIndicator.style.display = 'block';
        }
    }

    // Handle resize events
    window.addEventListener('resize', () => {
        if (mouseIndicator) {
            if (window.innerWidth < 768) {
                mouseIndicator.style.display = 'none';
            } else {
                mouseIndicator.style.display = 'block';
            }
        }
    });
    
    // Handle scroll for sticky nav
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    
    const updateNav = () => {
        if (window.scrollY > 50 || !isHomePage) {
            nav.style.setProperty('background-color', '#455043', 'important');
            nav.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 'important');
        } else {
            nav.style.setProperty('background-color', 'transparent', 'important');
            nav.style.setProperty('box-shadow', 'none', 'important');
        }
    };

    window.addEventListener('scroll', updateNav);
    updateNav(); // Initial call
    
    // Desktop navigation logic removed - using standard <a> links with CSS scroll-behavior: smooth
    
    // Mobile Menu Toggle Logic
    const hamburgerBtn = document.querySelector('button.md\\:hidden');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                nav.style.setProperty('background-color', '#455043', 'important');
            } else {
                mobileMenu.classList.add('hidden');
                updateNav();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // If it's an anchor on the same page
                if (href.startsWith('#') || (isHomePage && href.startsWith('index.html#'))) {
                    const targetId = href.includes('#') ? '#' + href.split('#')[1] : href;
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        e.preventDefault();
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                mobileMenu.classList.add('hidden');
                updateNav();
            });
        });
    }
});
