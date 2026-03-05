import { fetchProducts } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';

export async function renderProducts(params = {}) {
  let allProducts = await fetchProducts();
  const category = params.category;

  if (category) {
    allProducts = allProducts.filter(p => p.category === category);
  }

  return `
    <section class="section" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">${category ? 'Sanctuary Collection' : 'Divine Collection'}</span>
          <h1 class="section-title">${category ? category : 'All Products'}</h1>
          <p class="section-subtitle" style="margin:0 auto;">
            ${category
      ? `Discover our hand-picked ${category.toLowerCase()} for your spiritual practice.`
      : 'Excellent devotional products for your religious and spiritual journey.'}
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${allProducts.length > 0
      ? allProducts.map((p) => renderProductCard(p)).join('')
      : `<div style="grid-column: 1/-1; text-align:center; padding: 100px 0;"><h3>No products found in this category.</h3></div>`
    }
        </div>
      </div>
    </section>
  `;
}

export function initProductsEvents() {
  initProductCardEvents();
}
