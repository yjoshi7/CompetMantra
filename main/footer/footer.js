// footer.js - Footer-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Footer animation on scroll
    const footer = document.querySelector('.main-footer');
    
    if (footer) {
        // Animate footer when it comes into view
        const animateFooter = () => {
            const footerPosition = footer.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (footerPosition < screenPosition) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }
        };

        // Set initial state
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footer.style.transition = 'all 0.5s ease-out';

        // Add scroll event listener
        window.addEventListener('scroll', animateFooter);
        
        // Run once on page load
        animateFooter();

        // Current year for copyright
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
        }

        // Smooth scrolling for footer links
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if it's an internal link
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // External links will behave normally
            });
        });
    }

    // Back to top button functionality
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.display = 'none';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.zIndex = '99';
    backToTopButton.style.border = 'none';
    backToTopButton.style.outline = 'none';
    backToTopButton.style.backgroundColor = '#FFD700';
    backToTopButton.style.color = '#002366';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.padding = '15px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.fontSize = '18px';
    backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});