document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar functionality with persistent state
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const contentArea = document.querySelector('.content-area');
    
    // Check localStorage for sidebar state
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    if (sidebarState === 'true') {
        sidebar.classList.add('collapsed');
        if (toggleSidebar) {
            const icon = toggleSidebar.querySelector('i');
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        }
        if (contentArea) contentArea.style.marginLeft = '0';
    }
    
    if (toggleSidebar && sidebar && contentArea) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Save state to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
            
            // Rotate the chevron icon
            const icon = this.querySelector('i');
            if (isCollapsed) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
                contentArea.style.marginLeft = '0';
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
                contentArea.style.marginLeft = '';
            }
        });
    }

    // Highlight active topic from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const activeTopic = urlParams.get('topic');
    
    if (activeTopic) {
        // Remove active class from all items
        document.querySelectorAll('.syllabus-nav li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to matching item
        const activeItem = document.querySelector(`.syllabus-nav a[href*="${activeTopic}"]`)?.parentElement;
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
    
    // Make syllabus items clickable
    document.querySelectorAll('.syllabus-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active item
            document.querySelectorAll('.syllabus-nav li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });
    
    // Responsive adjustments
    function handleResponsive() {
        if (window.innerWidth < 992) {
            if (sidebar) {
                const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
                if (!isCollapsed) {
                    sidebar.classList.add('collapsed');
                    localStorage.setItem('sidebarCollapsed', 'true');
                }
            }
            if (toggleSidebar) {
                const icon = toggleSidebar.querySelector('i');
                icon?.classList.remove('fa-chevron-left');
                icon?.classList.add('fa-chevron-right');
            }
            if (contentArea) contentArea.style.marginLeft = '0';
        } else {
            if (sidebar) {
                const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
                if (isCollapsed) {
                    sidebar.classList.remove('collapsed');
                    localStorage.setItem('sidebarCollapsed', 'false');
                }
            }
            if (toggleSidebar) {
                const icon = toggleSidebar.querySelector('i');
                icon?.classList.remove('fa-chevron-right');
                icon?.classList.add('fa-chevron-left');
            }
            if (contentArea) contentArea.style.marginLeft = '';
        }
    }
    
    window.addEventListener('resize', handleResponsive);
    handleResponsive(); // Run once on page load
});