// Main entry point — wires router, header, footer, and pages
import { registerRoute, initRouter } from './router.js';
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome, initHomeEvents } from './pages/home.js';
import { renderProducts, initProductsEvents } from './pages/products.js';
import { renderProductDetail, initProductDetailEvents } from './pages/product-detail.js';
import { renderCart, initCartEvents } from './pages/cart.js';
import { renderAbout, initAboutEvents } from './pages/about.js';

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

// Start the app
initRouter();
