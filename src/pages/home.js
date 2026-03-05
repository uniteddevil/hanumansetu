import { fetchProducts, formatPrice } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';

export async function renderHome() {
  const allProducts = await fetchProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return `
    <!-- Hero Section -->
    <section class="hero bg-mandala">
      <div class="container">
        <div class="hero__inner">
          <div class="hero__content fade-in-up">
            <div class="hero__badge shadow-sm">
              🙏 Trusted by 5000+ Devotees
            </div>
            <h1 class="hero__title">
              Bring Home the <span>Divine Blessings</span>
            </h1>
            <p class="hero__description">
              Discover our curated collection of authentic spiritual products - from blessed idols to sacred rosaries. Each item is ethically sourced and energized with tradition.
            </p>
            <div class="hero__actions">
              <a href="#/products" class="btn btn--primary btn--lg">
                Explore Collection
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="#/about" class="btn btn--secondary btn--lg">Our Story</a>
            </div>
          </div>

          <div class="hero__image fade-in-up delay-2">
            <div class="hero__image-wrapper">
              <img src="/assets/hero-premium.png" alt="Divine HanumanSetu" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop by Category -->
    <section class="section">
      <div class="container">
        <div style="text-align:center; margin-bottom:var(--space-12);">
          <span class="section-label">Browse Sanctuary</span>
          <h2 class="section-title">Shop by Category</h2>
        </div>
        
        <div class="category-grid">
          <div class="category-card fade-in-up delay-1" onclick="window.location.hash='#/products?category=Statues'">
            <img src="/assets/cat-murti.png" alt="Pavitra Murti" />
            <div class="category-card__content">
              <h3 class="category-card__title">Pavitra Murti</h3>
              <p>Hand-crafted divine idols</p>
            </div>
          </div>
          <div class="category-card fade-in-up delay-2" onclick="window.location.hash='#/products?category=Rosaries'">
            <img src="/assets/cat-mala.png" alt="Siddha Mala" />
            <div class="category-card__content">
              <h3 class="category-card__title">Siddha Mala</h3>
              <p>Energized prayer beads</p>
            </div>
          </div>
          <div class="category-card fade-in-up delay-3" onclick="window.location.hash='#/products?category=Pooja Essentials'">
            <img src="/assets/cat-puja.png" alt="Pooja Essentials" />
            <div class="category-card__content">
              <h3 class="category-card__title">Pooja Rituals</h3>
              <p>Everything for your daily prayers</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section--lg" style="background:var(--color-surface); border-top:1px solid var(--color-border-light);">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">Divine Collection</span>
          <h2 class="section-title">Featured Blessings</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            Hand-picked spiritual essentials to elevate your home sanctuary.
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${featuredProducts.map((p) => renderProductCard(p)).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-12);">
          <a href="#/products" class="btn btn--secondary btn--lg">View All Products →</a>
        </div>
      </div>
    </section>

    <!-- Divine Process -->
    <section class="section bg-mandala">
      <div class="container">
        <div style="text-align:center; margin-bottom:var(--space-12);">
          <span class="section-label">Our Philosophy</span>
          <h2 class="section-title">The Divine Journey</h2>
        </div>
        
        <div class="process-grid">
          <div class="process-step">
            <div class="process-step__number">1</div>
            <h4>Ethical Sourcing</h4>
            <p>Directly from artisans across India's holy cities.</p>
          </div>
          <div class="process-step">
            <div class="process-step__number">2</div>
            <h4>Purification</h4>
            <p>Every item undergoes traditional cleaning rituals.</p>
          </div>
          <div class="process-step">
            <div class="process-step__number">3</div>
            <h4>Abhimantrit</h4>
            <p>Blessed by priests with sacred Vedic chants.</p>
          </div>
          <div class="process-step">
            <div class="process-step__number">4</div>
            <h4>Safe Delivery</h4>
            <p>Packed with care to maintain sanctity until your door.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Devotee Stories -->
    <section class="section" style="border-top:1px solid var(--color-border-light);">
      <div class="container">
        <div style="text-align:center; margin-bottom:var(--space-12);">
          <span class="section-label">Community</span>
          <h2 class="section-title">Devotee Stories</h2>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p>"The Hanuman statue is magnificent. You can feel the positive energy the moment you unbox it."</p>
            <div style="margin-top:var(--space-4); font-weight:700;">— Rajesh Khanna</div>
          </div>
          <div class="testimonial-card">
            <p>"Authentic products and very fast delivery. The WhatsApp support is very helpful and personal."</p>
            <div style="margin-top:var(--space-4); font-weight:700;">— Priya Sharma</div>
          </div>
          <div class="testimonial-card">
            <p>"I ordered the Rudraksha Mala, and the quality is exceptional. Truly blessed to have found this store."</p>
            <div style="margin-top:var(--space-4); font-weight:700;">— Amit Singh</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section">
      <div class="container">
        <div class="newsletter-box shadow-xl">
          <h2>Join Our Spiritual Community</h2>
          <p>Subscribe to receive weekly spiritual insights and exclusive early access to new collections.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Blessings! You are now subscribed.');">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" class="btn btn--primary">Join Now</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function initHomeEvents() {
  initProductCardEvents();
}
