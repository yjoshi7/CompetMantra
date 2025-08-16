document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    // Initialize sidebar state
    function initSidebar() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            toggleBtn.classList.add('collapsed');
        }
        
        // Mobile view handling
        if (window.innerWidth < 992) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.add('active');
            toggleBtn.classList.add('active');
        }
    }
    
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
        
        // Save state to localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    }
    
    // Highlight active syllabus item
    function setActiveSyllabusItem() {
        const urlParams = new URLSearchParams(window.location.search);
        const activeTopic = urlParams.get('topic');
        
        if (activeTopic) {
            const activeItem = document.querySelector(`.syllabus-nav a[href*="${activeTopic}"]`);
            if (activeItem) {
                document.querySelectorAll('.syllabus-nav li').forEach(item => {
                    item.classList.remove('active');
                });
                activeItem.parentElement.classList.add('active');
            }
        }
        
        // Click handlers for syllabus items
        document.querySelectorAll('.syllabus-nav a').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelectorAll('.syllabus-nav li').forEach(item => {
                    item.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            });
        });
    }
    
    // Handle responsive behavior
    function handleResponsive() {
        if (window.innerWidth < 992) {
            // Mobile view
            sidebar.classList.remove('collapsed');
            if (!sidebar.classList.contains('active')) {
                sidebar.classList.add('active');
            }
            if (!toggleBtn.classList.contains('active')) {
                toggleBtn.classList.add('active');
            }
        } else {
            // Desktop view
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
        }
    }
    
    // Event listeners
    toggleBtn.addEventListener('click', toggleSidebar);
    window.addEventListener('resize', handleResponsive);
    
    // Initialize everything
    initSidebar();
    setActiveSyllabusItem();
    handleResponsive();
});