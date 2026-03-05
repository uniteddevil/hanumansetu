import { getCartCount } from '../utils/cart.js';
import { getCurrentPath } from '../router.js';
import { supabase, isAdmin } from '../utils/supabase.js';

export function renderHeader() {
  const path = getCurrentPath();
  const user = JSON.parse(localStorage.getItem('sb-qwmqxdxkgzdgdyyynlku-auth-token'))?.user;

  return `
    <header class="header" id="site-header">
      <div class="header__inner">
        <a href="#/" class="header__logo">
          <img src="/assets/logo.png" alt="HanumanSetu Logo" class="header__logo-img" />
          <span>HanumanSetu</span>
        </a>

        <nav class="header__nav" id="nav-menu">
          <a href="#/" class="header__nav-link ${path === '/' ? 'active' : ''}">Home</a>
          <a href="#/products" class="header__nav-link ${path === '/products' ? 'active' : ''}">Products</a>
          <a href="#/about" class="header__nav-link ${path === '/about' ? 'active' : ''}">About Us</a>
          <span id="admin-link-placeholder"></span>
          ${user ? `<a href="#/account" class="header__nav-link ${path.startsWith('/account') ? 'active' : ''}">My Account</a>` : `<a href="#/login" class="header__nav-link ${path === '/login' ? 'active' : ''}">Login</a>`}
        </nav>

        <div class="header__right" style="display:flex;align-items:center;gap:8px;">
          <a href="#/cart" class="header__cart" id="header-cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>Cart</span>
            ${getCartCount() > 0 ? `<span class="header__cart-badge" id="cart-badge">${getCartCount()}</span>` : ''}
          </a>

          <button class="header__menu-toggle" id="menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export async function initHeaderEvents() {
  const path = getCurrentPath();

  // Check for admin status and update placeholder
  const adminPlaceholder = document.getElementById('admin-link-placeholder');
  if (adminPlaceholder) {
    const isUserAdmin = await isAdmin();
    if (isUserAdmin) {
      adminPlaceholder.innerHTML = `<a href="#/admin" class="header__nav-link ${path === '/admin' ? 'active' : ''}">एडमिन</a>`;
    }
  }

  // Scroll effect
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Update cart badge on cart changes
  window.addEventListener('cart-updated', () => {
    const count = getCartCount();
    const badge = document.getElementById('cart-badge');
    const cartEl = document.getElementById('header-cart');

    if (count > 0) {
      if (badge) {
        badge.textContent = count;
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 300);
      } else if (cartEl) {
        const newBadge = document.createElement('span');
        newBadge.className = 'header__cart-badge';
        newBadge.id = 'cart-badge';
        newBadge.textContent = count;
        cartEl.appendChild(newBadge);
      }
    } else if (badge) {
      badge.remove();
    }
  });

}

// Global Auth state change listener (only register once)
supabase.auth.onAuthStateChange((event) => {
  // Only re-render on actual sign in/out events to prevent loops
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
      const parent = siteHeader.parentElement;
      const nextSibling = siteHeader.nextSibling;
      siteHeader.remove();
      const newHeaderHtml = renderHeader();
      const temp = document.createElement('div');
      temp.innerHTML = newHeaderHtml;
      parent.insertBefore(temp.firstElementChild, nextSibling);
      initHeaderEvents();
    }
  }
});
