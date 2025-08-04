/**
 * CompeteMantra - Main JavaScript File
 * Handles dynamic content loading and all interactive features
 */

// Helper function to load scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

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
        
        // Load header and footer scripts after content is inserted
        await loadScript('main/header/header.js');
        await loadScript('main/footer/footer.js');
        
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
            }
        });
    });
}

/**
 * Initialize all functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load dynamic components (header/footer)
    loadDynamicComponents();
    
    // 2. Initialize smooth scrolling
    initSmoothScrolling();
    
    // 3. Initialize other features (add your existing functions here)
    // initCourseCards();
    // initTestimonials();
    // etc...
});
