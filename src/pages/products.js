// Products catalog page
import { products } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';

export function renderProducts() {
  return `
    <section class="section" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">पवित्र संग्रह</span>
          <h1 class="section-title">सभी उत्पाद</h1>
          <p class="section-subtitle" style="margin:0 auto;">
            धार्मिक और आध्यात्मिक यात्रा के लिए उत्तम भक्ति उत्पाद।
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
