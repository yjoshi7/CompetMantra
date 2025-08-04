/**
 * CompeteMantra - Main JavaScript File
 * Handles dynamic content loading and all interactive features
 */

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. Load Dynamic Components
    // ======================
    loadDynamicComponents();
    
    // ======================
    // 2. Initialize Smooth Scrolling
    // ======================
    initSmoothScrolling();
    
    // ======================
    // 3. Initialize Course Cards
    // ======================
    initCourseCards();
    
    // ======================
    // 4. Initialize Testimonials
    // ======================
    initTestimonials();
    
    // ======================
    // 5. Initialize Back to Top Button
    // ======================
    initBackToTopButton();
    
    // ======================
    // 6. Initialize Animations
    // ======================
    initAnimations();
});

/**
 * Loads header and footer components dynamically
 */
async function loadDynamicComponents() {
    try {
        // Load header content
        const headerResponse = await fetch('main/header/header.html');
        if (!headerResponse.ok) throw new Error('Failed to load header');
        document.getElementById('main-header').innerHTML = await headerResponse.text();
        
        // Load footer content
        const footerResponse = await fetch('main/footer/footer.html');
        if (!footerResponse.ok) throw new Error('Failed to load footer');
        document.getElementById('main-footer').innerHTML = await footerResponse.text();
        
        console.log('Components loaded successfully');
    } catch (error) {
        console.error('Error loading components:', error);
        loadFallbackComponents();
    }
}

/**
 * Fallback components if dynamic loading fails
 */
function loadFallbackComponents() {
    // Fallback header
    document.getElementById('main-header').innerHTML = `
        <div class="header-container">
            <div class="logo">
                <h1>CompeteMantra</h1>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="#" class="active">Home</a></li>
                    <li><a href="#courses">Courses</a></li>
                    <li><a href="#features">Features</a></li>
                </ul>
            </nav>
        </div>
    `;
    
    // Fallback footer
    document.getElementById('main-footer').innerHTML = `
        <div class="footer-container">
            <div class="footer-logo">
                <h2>CompeteMantra</h2>
                <p>Your complete guide to competitive exams</p>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} CompeteMantra. All Rights Reserved.</p>
            </div>
        </div>
    `;
    
    initMobileMenu(); // Initialize mobile menu for fallback
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.main-nav.active');
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Initialize course cards with horizontal scroll
 */
function initCourseCards() {
    const coursesContainer = document.querySelector('.courses-container');
    if (!coursesContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    coursesContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - coursesContainer.offsetLeft;
        scrollLeft = coursesContainer.scrollLeft;
        coursesContainer.style.cursor = 'grabbing';
    });

    coursesContainer.addEventListener('mouseleave', () => {
        isDown = false;
        coursesContainer.style.cursor = 'grab';
    });

    coursesContainer.addEventListener('mouseup', () => {
        isDown = false;
        coursesContainer.style.cursor = 'grab';
    });

    coursesContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - coursesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        coursesContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    coursesContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - coursesContainer.offsetLeft;
        scrollLeft = coursesContainer.scrollLeft;
    });

    coursesContainer.addEventListener('touchend', () => {
        isDown = false;
    });

    coursesContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - coursesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        coursesContainer.scrollLeft = scrollLeft - walk;
    });
}

/**
 * Initialize testimonials slider
 */
function initTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;

    function setupTestimonialSlider() {
        if (window.innerWidth <= 768) {
            const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
            let currentIndex = 0;
            
            function showTestimonial(index) {
                testimonialCards.forEach((card, i) => {
                    card.style.display = i === index ? 'block' : 'none';
                });
            }
            
            // Create navigation if it doesn't exist
            if (!document.querySelector('.testimonial-nav')) {
                const nav = document.createElement('div');
                nav.className = 'testimonial-nav';
                
                const prevBtn = document.createElement('button');
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                prevBtn.className = 'testimonial-nav-btn';
                
                const nextBtn = document.createElement('button');
                nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                nextBtn.className = 'testimonial-nav-btn';
                
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                    showTestimonial(currentIndex);
                });
                
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % testimonialCards.length;
                    showTestimonial(currentIndex);
                });
                
                nav.appendChild(prevBtn);
                nav.appendChild(nextBtn);
                testimonialsContainer.parentNode.appendChild(nav);
            }
            
            showTestimonial(currentIndex);
        } else {
            // Desktop view - show all testimonials
            document.querySelectorAll('.testimonial-card').forEach(card => {
                card.style.display = 'block';
            });
            
            // Remove navigation if exists
            const existingNav = document.querySelector('.testimonial-nav');
            if (existingNav) {
                existingNav.remove();
            }
        }
    }

    window.addEventListener('resize', setupTestimonialSlider);
    setupTestimonialSlider();
}

/**
 * Initialize back to top button
 */
function initBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card');
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    function animateOnScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}

/**
 * Initialize mobile menu (fallback)
 */
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.style.display = 'none';
    
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            const nav = document.querySelector('.main-nav');
            if (nav) {
                nav.classList.toggle('active');
            }
        });

        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'flex';
            } else {
                mobileMenuBtn.style.display = 'none';
                const nav = document.querySelector('.main-nav');
                if (nav) {
                    nav.classList.remove('active');
                }
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
}
