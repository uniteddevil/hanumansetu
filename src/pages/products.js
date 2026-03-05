import { products } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';
import { renderCarousel, initCarousel } from '../components/carousel.js';

export function renderProducts() {
  const promoSlides = [
    {
      html: `
      <div style="background:linear-gradient(135deg, var(--color-primary), var(--color-primary-600)); color:white; padding:var(--space-12); border-radius:var(--radius-lg); height:300px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
        <h2 style="color:white; margin-bottom:var(--space-4);">विशेष उत्सव संग्रह</h2>
        <p style="opacity:0.9; margin-bottom:var(--space-6);">अपनी पूजा को दिव्य वस्तुओं के साथ खास बनाएं।</p>
        <span class="btn btn--white">अभी देखें</span>
      </div>
    ` },
    {
      html: `
      <div style="background:linear-gradient(135deg, var(--color-gold), var(--color-gold-600)); color:white; padding:var(--space-12); border-radius:var(--radius-lg); height:300px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
        <h2 style="color:white; margin-bottom:var(--space-4);">प्रीमियम पीतल सामग्री</h2>
        <p style="opacity:0.9; margin-bottom:var(--space-6);">शुद्ध पीतल से निर्मित दीये और पूजा पात्र।</p>
        <span class="btn btn--white">संग्रह देखें</span>
      </div>
    ` }
  ];

  return `
    <section class="section" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div style="margin-bottom:var(--space-12);">
          ${renderCarousel({ id: 'products-promo-carousel', items: promoSlides, autoPlayInterval: 5000 })}
        </div>

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
  initCarousel('products-promo-carousel');
  initProductCardEvents();
}
