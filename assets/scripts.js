document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const mouseIndicator = document.querySelector('.animate-bounce');
    
    // Reveal on scroll logic
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial reveal check
    reveal();
    window.addEventListener('scroll', reveal);

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
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '' || window.location.pathname.endsWith('/');
    
    const updateNav = () => {
        if (!nav) return;
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
    
    // Premium Mobile Menu Toggle Logic
    const hamburgerBtn = document.querySelector('button.md\\:hidden');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    const menuIcon = hamburgerBtn?.querySelector('.menu-icon');

    if (hamburgerBtn && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (!isOpen) {
                // Open menu
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                    if (menuIcon) menuIcon.classList.add('active');
                    document.body.classList.add('menu-open');
                }, 10);
            } else {
                // Close menu
                mobileMenu.classList.remove('active');
                if (menuIcon) menuIcon.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 500); // match transition duration
            }
        };

        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Close menu first
                mobileMenu.classList.remove('active');
                if (menuIcon) menuIcon.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 500);

                // If it's an anchor on the same page
                if (href.startsWith('#') || (isHomePage && href.startsWith('index.html#'))) {
                    const targetId = href.includes('#') ? '#' + href.split('#')[1] : href;
                    if (targetId === '#') return;
                    
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        e.preventDefault();
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
});
