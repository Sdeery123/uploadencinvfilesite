document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initFaqAccordion();
    initSmoothScrolling();
    initScrollAnimations();
    initStickyHeader();
    initMobileNavigation();
});

// FAQ Accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');

            // Close all items first
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Toggle current item based on previous state
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .cta-buttons a, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });

                    // Update URL without reloading page
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Animations on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .workflow-step, .download-card, .requirements, .changelog, .contact-method');

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add the CSS class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card, .workflow-step, .download-card, .requirements, .changelog, .contact-method {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .workflow-step:nth-child(2) { transition-delay: 0.2s; }
        .workflow-step:nth-child(3) { transition-delay: 0.4s; }
        .workflow-step:nth-child(4) { transition-delay: 0.6s; }
        
        .feature-card:nth-child(2) { transition-delay: 0.1s; }
        .feature-card:nth-child(3) { transition-delay: 0.2s; }
        .feature-card:nth-child(4) { transition-delay: 0.3s; }
        .feature-card:nth-child(5) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// Sticky header on scroll
function initStickyHeader() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    let headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight - 100) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }

        // Highlight active section in navigation
        highlightActiveSection();
    });

    // Add the CSS class for sticky navigation
    const style = document.createElement('style');
    style.innerHTML = `
        nav.sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--secondary-color);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 1rem 5%;
            transform: translateY(-100%);
            animation: slideDown 0.3s forwards;
        }
        
        @keyframes slideDown {
            to { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Highlight active navigation section
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });

    // Add the CSS class for active navigation links
    if (!document.querySelector('#navActiveStyles')) {
        const style = document.createElement('style');
        style.id = 'navActiveStyles';
        style.innerHTML = `
            .nav-links a.active {
                color: var(--accent-color);
            }
            
            .nav-links a.active::after {
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }
}

// Mobile navigation menu
function initMobileNavigation() {
    const nav = document.querySelector('nav');

    // Create mobile menu button
    const menuButton = document.createElement('div');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';

    // Add mobile menu button to navigation
    nav.appendChild(menuButton);

    // Toggle menu on click
    menuButton.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
        });
    });

    // Add the CSS for mobile navigation
    const style = document.createElement('style');
    style.innerHTML = `
        .menu-toggle {
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: white;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                max-width: 300px;
                height: 100vh;
                background: var(--secondary-color);
                flex-direction: column;
                justify-content: flex-start;
                padding: 80px 30px 30px;
                transition: right 0.3s ease;
                z-index: 900;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
            }
            
            .nav-links li {
                margin: 0 0 20px 0;
            }
            
            body.menu-open .nav-links {
                right: 0;
            }
            
            /* Add overlay */
            body.menu-open::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 800;
            }
        }
    `;
    document.head.appendChild(style);
}

// Interactive counter animation for feature cards
window.addEventListener('load', function () {
    // Add interactive hover effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.feature-icon').classList.add('pulse');
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.feature-icon').classList.remove('pulse');
        });
    });

    // Add the CSS for pulse animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .feature-icon.pulse {
            animation: pulse 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});