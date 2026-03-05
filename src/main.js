// Main entry point — wires router, header, footer, and pages
import { registerRoute, initRouter } from './router.js';
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome, initHomeEvents } from './pages/home.js';
import { renderProducts, initProductsEvents } from './pages/products.js';
import { renderProductDetail, initProductDetailEvents } from './pages/product-detail.js';
import { renderCart, initCartEvents } from './pages/cart.js';
import { renderAbout, initAboutEvents } from './pages/about.js';
import { renderLogin, renderRegister, initAuthEvents } from './pages/auth.js';
import { renderAccount, initAccountEvents } from './pages/account.js';
import { renderAdmin, initAdminEvents } from './pages/admin.js';

const app = document.getElementById('app');

async function renderPage(pageContentPromise, isFullScreen = false) {
    // Show header/footer only if not full screen
    if (isFullScreen) {
        app.innerHTML = `<main id="page-content" class="full-screen-main"><div class="loading-container"><div class="loading-spinner"></div></div></main>`;
    } else {
        app.innerHTML = renderHeader() + `<main id="page-content"><div class="loading-container"><div class="loading-spinner"></div></div></main>` + renderFooter();
        initHeaderEvents();
    }

    try {
        const pageContent = await pageContentPromise;
        const main = document.getElementById('page-content');
        if (main) main.innerHTML = pageContent;

        // Close mobile menu on navigate
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) navMenu.classList.remove('open');

        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error rendering page:', error);
        const main = document.getElementById('page-content');
        if (main) main.innerHTML = `<div class="container" style="padding: 100px 20px; text-align: center;"><h2>Error loading page</h2><p>${error.message}</p></div>`;
    }
}

// Register routes
registerRoute('/', async () => {
    await renderPage(renderHome());
    initHomeEvents();
});

registerRoute('/products', async () => {
    await renderPage(renderProducts());
    initProductsEvents();
});

registerRoute('/products/:slug', async (params) => {
    await renderPage(renderProductDetail(params.slug));
    initProductDetailEvents(params.slug);
});

registerRoute('/cart', async () => {
    await renderPage(renderCart());
    initCartEvents();
});

registerRoute('/about', async () => {
    await renderPage(renderAbout());
    initAboutEvents();
});

registerRoute('/login', async () => {
    await renderPage(renderLogin());
    initAuthEvents('login');
});

registerRoute('/register', async () => {
    await renderPage(renderRegister());
    initAuthEvents('register');
});

registerRoute('/account', async () => {
    await renderPage(renderAccount());
    initAccountEvents();
});

registerRoute('/account/:section', async () => {
    await renderPage(renderAccount());
    initAccountEvents();
});

// SUBDOMAIN JAIL
// If on admin.hanumansetu.com, force EVERYTHING to the admin view
if (window.location.hostname === 'admin.hanumansetu.com') {
    const runAdminJail = async () => {
        await renderPage(renderAdmin(), true);
        initAdminEvents();
    };
    runAdminJail();
    // Stop regular route execution by overwriting window.location.hash logic
    window.addEventListener('hashchange', (e) => {
        if (window.location.hash !== '#/admin') {
            window.location.hash = '#/admin';
        }
        runAdminJail();
    });
} else {
    // If someone tries to reach #/admin on the root domain, clear it
    if (window.location.hash === '#/admin') {
        window.location.hash = '#/';
    }
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#/admin') {
            window.location.hash = '#/';
        }
    });

    // Start the app normally (excludes /admin route)
    initRouter();
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('SW registered: ', registration.scope);

            // Check for updates periodically
            setInterval(() => {
                registration.update();
            }, 60 * 60 * 1000); // Check every hour

            // Detect new service worker and reload
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker) {
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available!
                            console.log('New version found, reloading...');
                            window.location.reload();
                        }
                    };
                }
            };
        }).catch((error) => {
            console.log('SW registration failed: ', error);
        });
    });

    // Handle controller change (e.g. self.skipWaiting() was called)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
    });
}
