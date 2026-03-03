// Simple hash-based SPA router

const routes = {};
let currentCleanup = null;

export function registerRoute(path, handler) {
    routes[path] = handler;
}

export function navigate(path) {
    window.location.hash = path;
}

export function getCurrentPath() {
    return window.location.hash.slice(1) || '/';
}

async function handleRoute() {
    const path = getCurrentPath();

    // Run cleanup for previous page
    if (currentCleanup && typeof currentCleanup === 'function') {
        currentCleanup();
        currentCleanup = null;
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Try exact match first
    if (routes[path]) {
        currentCleanup = await routes[path]();
        return;
    }

    // Try pattern matching (e.g., /products/:slug)
    for (const [pattern, handler] of Object.entries(routes)) {
        const paramNames = [];
        const regexStr = pattern.replace(/:(\w+)/g, (_, name) => {
            paramNames.push(name);
            return '([^/]+)';
        });

        const regex = new RegExp(`^${regexStr}$`);
        const match = path.match(regex);

        if (match) {
            const params = {};
            paramNames.forEach((name, i) => {
                params[name] = match[i + 1];
            });
            currentCleanup = await handler(params);
            return;
        }
    }

    // 404 fallback
    const app = document.getElementById('app');
    app.innerHTML = `
    <div style="text-align:center;padding:200px 20px;">
      <h1>Page Not Found</h1>
      <p style="margin:16px 0;color:var(--color-text-secondary)">The page you're looking for doesn't exist.</p>
      <a href="#/" class="btn btn--primary">Go Home</a>
    </div>
  `;
}

export function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    // Handle initial load
    handleRoute();
}

// Intercept clicks on internal links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const hash = link.getAttribute('href');
        window.location.hash = hash;
    }
});
