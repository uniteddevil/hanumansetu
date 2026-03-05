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

const app = document.getElementById('app');

function renderPage(pageContent) {
    app.innerHTML = renderHeader() + `<main>${pageContent}</main>` + renderFooter();
    initHeaderEvents();

    // Close mobile menu on navigate
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('open');
}

// Register routes
registerRoute('/', () => {
    renderPage(renderHome());
    initHomeEvents();
});

registerRoute('/products', () => {
    renderPage(renderProducts());
    initProductsEvents();
});

registerRoute('/products/:slug', (params) => {
    renderPage(renderProductDetail(params.slug));
    initProductDetailEvents(params.slug);
});

registerRoute('/cart', () => {
    renderPage(renderCart());
    initCartEvents();
});

registerRoute('/about', () => {
    renderPage(renderAbout());
    initAboutEvents();
});

registerRoute('/login', () => {
    renderPage(renderLogin());
    initAuthEvents('login');
});

registerRoute('/register', () => {
    renderPage(renderRegister());
    initAuthEvents('register');
});

// Start the app
initRouter();

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
