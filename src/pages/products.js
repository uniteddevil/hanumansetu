import { fetchProducts } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';

export async function renderProducts(params = {}) {
  let allProducts = await fetchProducts();
  const category = params.category;

  if (category) {
    allProducts = allProducts.filter(p => p.category === category);
  }

  // Map category English names to Hindi for display if needed
  const categoryDisplay = {
    'Statues': 'पवित्र मूर्तियाँ',
    'Rosaries': 'सिद्ध माला',
    'Pooja Essentials': 'पूजा सामग्री'
  }[category] || category;

  return `
    <section class="section" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">${category ? 'पवित्र संग्रह' : 'दिव्य संग्रह'}</span>
          <h1 class="section-title">${category ? categoryDisplay : 'सभी उत्पाद'}</h1>
          <p class="section-subtitle" style="margin:0 auto;">
            ${category
      ? `आपकी आध्यात्मिक साधना के लिए हमारे चुनिंदा ${categoryDisplay.toLowerCase()}।`
      : 'आपकी धार्मिक और आध्यात्मिक यात्रा के लिए उत्तम भक्ति उत्पाद।'}
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${allProducts.length > 0
      ? allProducts.map((p) => renderProductCard(p)).join('')
      : `<div style="grid-column: 1/-1; text-align:center; padding: 100px 0;"><h3>इस श्रेणी में कोई उत्पाद नहीं मिला।</h3></div>`
    }
        </div>
      </div>
    </section>
  `;
}

export function initProductsEvents() {
  initProductCardEvents();
}
