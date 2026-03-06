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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.setProperty('background-color', '#455043', 'important');
            nav.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 'important');
        } else {
            nav.style.setProperty('background-color', 'transparent', 'important');
            nav.style.setProperty('box-shadow', 'none', 'important');
        }
    });
    
    // Header navigation links processing (desktop)
    const headerButtons = document.querySelectorAll('.hidden.md\\:flex button');
    const sections = ['#home', '#about', '#services', '#testimonials', '#contact'];
    
    headerButtons.forEach((btn, index) => {
        if(sections[index]) {
            btn.addEventListener('click', () => {
                const target = document.querySelector(sections[index]);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    // Mobile Menu Toggle Logic
    const hamburgerBtn = document.querySelector('button.md\\:hidden');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileMenu) {
        // Toggle menu open/close
        hamburgerBtn.addEventListener('click', () => {
            // Check if hidden class is present
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                // Ensure navbar background gets dark so menu matches
                nav.style.setProperty('background-color', '#455043', 'important');
            } else {
                mobileMenu.classList.add('hidden');
                // Re-evaluate navbar background based on scroll
                if (window.scrollY <= 50) {
                     nav.style.setProperty('background-color', 'transparent', 'important');
                }
            }
        });

        // Close menu when a link is clicked and smoothly scroll to target
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // If the link has a hash, treat it as a smooth scroll anchor
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                // Hide the menu
                mobileMenu.classList.add('hidden');
                
                // Re-evaluate padding/background
                if (window.scrollY <= 50) {
                     nav.style.setProperty('background-color', 'transparent', 'important');
                }
            });
        });
    }
});
