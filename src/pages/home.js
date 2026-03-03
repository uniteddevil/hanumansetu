// Home page
import { products, formatPrice } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';

export function renderHome() {
    const featuredProducts = products.slice(0, 4);

    return `
    <section class="hero">
      <div class="container">
        <div class="hero__inner">
          <div class="hero__content">
            <div class="hero__badge">
              🙏 Trusted by 1000+ devotees
            </div>
            <h1 class="hero__title">
              Sacred Essentials for Your
              <span>Spiritual Journey</span>
            </h1>
            <p class="hero__description">
              Discover handpicked devotional products — from exquisite murtis
              to pure pooja essentials. Each item is sourced with care and
              delivered with blessings.
            </p>
            <div class="hero__actions">
              <a href="#/products" class="btn btn--primary btn--lg">
                Explore Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="#/about" class="btn btn--secondary btn--lg">
                Our Story
              </a>
            </div>
          </div>

          <div class="hero__image">
            <div class="hero__image-wrapper" id="hero-image">
              <div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg, var(--color-primary-50), var(--color-bg-warm));font-size:5rem;">
                🙏
              </div>
            </div>
            <div class="hero__image-deco"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--lg" style="background:var(--color-surface);">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">Our Collection</span>
          <h2 class="section-title">Featured Products</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            Each product is carefully selected to enhance your spiritual practice and bring divine energy to your home.
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${featuredProducts.map((p) => renderProductCard(p)).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-12);">
          <a href="#/products" class="btn btn--secondary btn--lg">
            View All Products →
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);text-align:center;">
          <div style="padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-bg-card);border:1px solid var(--color-border-light);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4);">🚚</div>
            <h4 style="margin-bottom:var(--space-2);">Pan-India Delivery</h4>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);">Safe & secure packaging. Delivered to your doorstep.</p>
          </div>
          <div style="padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-bg-card);border:1px solid var(--color-border-light);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4);">✨</div>
            <h4 style="margin-bottom:var(--space-2);">Authentic & Blessed</h4>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);">Every product is genuine, handcrafted, and sourced ethically.</p>
          </div>
          <div style="padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-bg-card);border:1px solid var(--color-border-light);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4);">💝</div>
            <h4 style="margin-bottom:var(--space-2);">Easy Ordering</h4>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);">Order via WhatsApp. Simple, fast, and personal.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--color-text);color:white;text-align:center;">
      <div class="container" style="max-width:700px;">
        <h2 style="color:white;margin-bottom:var(--space-4);">Ready to Begin Your Spiritual Journey?</h2>
        <p style="color:rgba(255,255,255,0.7);margin-bottom:var(--space-8);font-size:var(--text-lg);">
          Browse our curated collection of devotional products and bring sacred energy into your home.
        </p>
        <a href="#/products" class="btn btn--primary btn--lg">
          Shop Now 🙏
        </a>
      </div>
    </section>
  `;
}

export function initHomeEvents() {
    initProductCardEvents();
}
