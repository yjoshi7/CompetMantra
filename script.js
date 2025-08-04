        // Mobile Menu Toggle - Will work with your header.html
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Testimonial slider functionality for mobile
            function setupTestimonialSlider() {
                const testimonialsContainer = document.querySelector('.testimonials-container');
                if (!testimonialsContainer) return;
                
                let isDown = false;
                let startX;
                let scrollLeft;
                
                testimonialsContainer.addEventListener('mousedown', (e) => {
                    isDown = true;
                    startX = e.pageX - testimonialsContainer.offsetLeft;
                    scrollLeft = testimonialsContainer.scrollLeft;
                });
                
                testimonialsContainer.addEventListener('mouseleave', () => {
                    isDown = false;
                });
                
                testimonialsContainer.addEventListener('mouseup', () => {
                    isDown = false;
                });
                
                testimonialsContainer.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - testimonialsContainer.offsetLeft;
                    const walk = (x - startX) * 2;
                    testimonialsContainer.scrollLeft = scrollLeft - walk;
                });
            }

            setupTestimonialSlider();

            // Responsive adjustments
            function handleResponsive() {
                // Any additional responsive JS can go here
            }

            window.addEventListener('resize', handleResponsive);
            handleResponsive();
        });