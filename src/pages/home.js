import { products, formatPrice } from '../data/products.js';
import { renderProductCard, initProductCardEvents } from '../components/product-card.js';
import { renderCarousel, initCarousel } from '../components/carousel.js';

export function renderHome() {
  const featuredProducts = products.slice(0, 4);

  const heroSlides = [
    { html: `<img src="/assets/hero.png" alt="HanumanSetu Hero Banner" style="width: 100%; height: 100%; object-fit: cover;" />` },
    { html: `<img src="/assets/product-1.png" alt="Hanuman Marble" style="width: 100%; height: 100%; object-fit: cover;" />` },
    { html: `<img src="/assets/product-6.png" alt="Silver Ganesha" style="width: 100%; height: 100%; object-fit: cover;" />` }
  ];

  return `
    <section class="hero">
      <div class="container">
        <div class="hero__inner">
          <div class="hero__content">
            <div class="hero__badge">
              🙏 1000+ भक्तों द्वारा विश्वसनीय
            </div>
            <h1 class="hero__title">
              आपकी आध्यात्मिक यात्रा के लिए
              <span>पवित्र सामग्री</span>
            </h1>
            <p class="hero__description">
              चुनिंदा भक्ति उत्पादों की खोज करें - उत्कृष्ट मूर्तियों से लेकर शुद्ध पूजा सामग्री तक। प्रत्येक वस्तु सावधानी से चुनी गई है और आशीर्वाद के साथ वितरित की जाती है।
            </p>
            <div class="hero__actions">
              <a href="#/products" class="btn btn--primary btn--lg">
                उत्पाद देखें
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="#/about" class="btn btn--secondary btn--lg">
                हमारी कहानी
              </a>
            </div>
          </div>

          <div class="hero__image">
            <div class="hero__image-wrapper" id="hero-carousel-container" style="overflow:visible;">
              ${renderCarousel({ id: 'home-hero-carousel', items: heroSlides, autoPlayInterval: 6000 })}
            </div>
            <div class="hero__image-deco"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--lg" style="background:var(--color-surface);">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">हमारा संग्रह</span>
          <h2 class="section-title">प्रमुख उत्पाद</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            प्रत्येक उत्पाद आपके आध्यात्मिक अभ्यास को बढ़ाने और आपके घर में दिव्य ऊर्जा लाने के लिए सावधानीपूर्वक चुना गया है।
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${featuredProducts.map((p) => renderProductCard(p)).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-12);">
          <a href="#/products" class="btn btn--secondary btn--lg">
            सभी उत्पाद देखें →
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);text-align:center;">
          <div style="padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-bg-card);border:1px solid var(--color-border-light);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4);">🚚</div>
            <h4 style="margin-bottom:var(--space-2);">पूरे भारत में डिलीवरी</h4>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);">सुरक्षित पैकेजिंग। आपके दरवाजे पर डिलीवरी।</p>
          </div>
          <div style="padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-bg-card);border:1px solid var(--color-border-light);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4);">✨</div>
            <h4 style="margin-bottom:var(--space-2);">प्रामाणिक और अभिमंत्रित</h4>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);">हर उत्पाद असली, हस्तनिर्मित और नैतिक रूप से प्राप्त किया गया है।</p>
          </div>
          <div style="padding:var(--space-8);border-radius:var(--radius-lg);background:var(--color-bg-card);border:1px solid var(--color-border-light);">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4);">💝</div>
            <h4 style="margin-bottom:var(--space-2);">आसान ऑर्डरिंग</h4>
            <p style="font-size:var(--text-sm);color:var(--color-text-secondary);">व्हाट्सएप से ऑर्डर करें। सरल, तेज़ और व्यक्तिगत।</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--color-text);color:white;text-align:center;">
      <div class="container" style="max-width:700px;">
        <h2 style="color:white;margin-bottom:var(--space-4);">अपनी आध्यात्मिक यात्रा शुरू करने के लिए तैयार हैं?</h2>
        <p style="color:rgba(255,255,255,0.7);margin-bottom:var(--space-8);font-size:var(--text-lg);">
          भक्ति उत्पादों के हमारे क्यूरेटेड संग्रह को ब्राउज़ करें और अपने घर में पवित्र ऊर्जा लाएं।
        </p>
        <a href="#/products" class="btn btn--primary btn--lg">
          अभी खरीदें 🙏
        </a>
      </div>
    </section>
  `;
}

export function initHomeEvents() {
  initCarousel('home-hero-carousel');
  initProductCardEvents();
}
