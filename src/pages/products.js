// Products catalog page
import { products } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';

export function renderProducts() {
    return `
    <section class="section" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">Sacred Collection</span>
          <h1 class="section-title">All Products</h1>
          <p class="section-subtitle" style="margin:0 auto;">
            Handpicked devotional products to enrich your spiritual practice.
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${products.map((p) => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initProductsEvents() {
    initProductCardEvents();
}
