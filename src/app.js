/* ===== MAIN APPLICATION ===== */

(function () {
    'use strict';

    let currentPage = 'dashboard';
    let refreshTimer = null;

    // Page renderers
    const pages = {
        'dashboard': { title: 'Dashboard', render: renderDashboardPage },
        'core-network': { title: 'Core Network', render: renderCoreNetworkPage },
        'radio-access': { title: 'Radio Access', render: renderRadioAccessPage },
        'subscribers': { title: 'Subscribers', render: renderSubscribersPage },
        'alerts': { title: 'Alerts', render: renderAlertsPage },
    };

    // Navigate to page
    function navigateTo(page) {
        if (!pages[page]) return;
        currentPage = page;

        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });

        // Update title
        document.getElementById('page-title').textContent = pages[page].title;

        // Render page
        pages[page].render();

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
    }

    // Update clock
    function updateClock() {
        const el = document.getElementById('header-time');
        if (el) el.textContent = formatTime(new Date());
    }

    // Auto-refresh data
    function startAutoRefresh() {
        if (refreshTimer) clearInterval(refreshTimer);
        refreshTimer = setInterval(() => {
            if (pages[currentPage]) {
                pages[currentPage].render();
            }
        }, REFRESH_INTERVAL);
    }

    // Initialize
    function init() {
        // Nav click handlers
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(item.dataset.page);
            });
        });

        // Mobile menu toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Refresh button
        document.getElementById('refresh-btn').addEventListener('click', () => {
            const btn = document.getElementById('refresh-btn');
            btn.querySelector('svg').style.animation = 'spin 0.5s ease';
            setTimeout(() => {
                btn.querySelector('svg').style.animation = '';
            }, 500);
            if (pages[currentPage]) pages[currentPage].render();
        });

        // Clock
        updateClock();
        setInterval(updateClock, 1000);

        // Render default page
        navigateTo('dashboard');

        // Start auto-refresh
        startAutoRefresh();

        // Handle window resize for charts
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (pages[currentPage]) pages[currentPage].render();
            }, 300);
        });
    }

    // Boot
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
