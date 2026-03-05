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
              🙏 5000+ भक्तों का अटूट विश्वास
            </div>
            <h1 class="hero__title">
              अपने घर लाएं <span>दिव्य आशीर्वाद</span>
            </h1>
            <p class="hero__description">
              प्रामाणिक आध्यात्मिक उत्पादों का हमारा चुनिंदा संग्रह - पवित्र मूर्तियों से लेकर सिद्ध मालाओं तक। प्रत्येक वस्तु परंपरा के साथ शुद्धिकृत और ऊर्जावान है।
            </p>
            <div class="hero__actions">
              <a href="#/products" class="btn btn--primary btn--lg">
                संग्रह देखें
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="#/about" class="btn btn--secondary btn--lg">हमारी कहानी</a>
            </div>
          </div>

          <div class="hero__image fade-in-up delay-2">
            <div class="hero__image-wrapper">
              <img src="/assets/hero-premium.png" alt="दिव्य हनुमान सेतु" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop by Category -->
    <section class="section">
      <div class="container">
        <div style="text-align:center; margin-bottom:var(--space-12);">
          <span class="section-label">श्रेणी के अनुसार चयन करें</span>
          <h2 class="section-title">संग्रह ब्राउज़ करें</h2>
        </div>
        
        <div class="category-grid">
          <div class="category-card fade-in-up delay-1" onclick="window.location.hash='#/products?category=Statues'">
            <img src="/assets/cat-murti.png" alt="पवित्र मूर्तियाँ" />
            <div class="category-card__content">
              <h3 class="category-card__title">पवित्र मूर्तियाँ</h3>
              <p>हाथ से निर्मित दिव्य मूर्तियाँ</p>
            </div>
          </div>
          <div class="category-card fade-in-up delay-2" onclick="window.location.hash='#/products?category=Rosaries'">
            <img src="/assets/cat-mala.png" alt="सिद्ध माला" />
            <div class="category-card__content">
              <h3 class="category-card__title">सिद्ध माला</h3>
              <p>ऊर्जावान प्रार्थना माला</p>
            </div>
          </div>
          <div class="category-card fade-in-up delay-3" onclick="window.location.hash='#/products?category=Pooja Essentials'">
            <img src="/assets/cat-puja.png" alt="पूजा सामग्री" />
            <div class="category-card__content">
              <h3 class="category-card__title">पूजा सामग्री</h3>
              <p>आपकी दैनिक पूजा के लिए सब कुछ</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section--lg" style="background:var(--color-surface); border-top:1px solid var(--color-border-light);">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--space-12);">
          <span class="section-label">दिव्य संग्रह</span>
          <h2 class="section-title">विशेष आशीर्वाद</h2>
          <p class="section-subtitle" style="margin:0 auto;">
            आपके घर के मंदिर के लिए चुनिंदा आध्यात्मिक उत्पाद।
          </p>
        </div>
        <div class="products-grid stagger-children">
          ${featuredProducts.map((p) => renderProductCard(p)).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-12);">
          <a href="#/products" class="btn btn--secondary btn--lg">सभी उत्पाद देखें →</a>
        </div>
      </div>
    </section>

    <!-- Divine Process -->
    <section class="section bg-mandala">
      <div class="container">
        <div style="text-align:center; margin-bottom:var(--space-12);">
          <span class="section-label">हमारा दर्शन</span>
          <h2 class="section-title">दिव्य यात्रा</h2>
        </div>
        
        <div class="process-grid">
          <div class="process-step">
            <div class="process-step__number">1</div>
            <h4>नैतिक स्रोत</h4>
            <p>भारत के पवित्र शहरों के कारीगरों से सीधे प्राप्त।</p>
          </div>
          <div class="process-step">
            <div class="process-step__number">2</div>
            <h4>शुद्धिकरण</h4>
            <p>प्रत्येक वस्तु पारंपरिक सफाई अनुष्ठानों से गुजरती है।</p>
          </div>
          <div class="process-step">
            <div class="process-step__number">3</div>
            <h4>अभिमंत्रित</h4>
            <p>वैदिक मंत्रों के साथ पुजारियों द्वारा आशीर्वादित।</p>
          </div>
          <div class="process-step">
            <div class="process-step__number">4</div>
            <h4>सुरक्षित डिलीवरी</h4>
            <p>पवित्रता बनाए रखने के लिए सावधानी से पैक किया गया।</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Devotee Stories -->
    <section class="section" style="border-top:1px solid var(--color-border-light);">
      <div class="container">
        <div style="text-align:center; margin-bottom:var(--space-12);">
          <span class="section-label">समुदाय</span>
          <h2 class="section-title">भक्तों के अनुभव</h2>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p>"हनुमान जी की मूर्ति अत्यंत सुंदर है। अनबॉक्स करते ही सकारात्मक ऊर्जा महसूस होती है।"</p>
            <div style="margin-top:var(--space-4); font-weight:700;">— राजेश खन्ना</div>
          </div>
          <div class="testimonial-card">
            <p>"प्रामाणिक उत्पाद और बहुत तेज़ डिलीवरी। व्हाट्सएप सपोर्ट बहुत मददगार है।"</p>
            <div style="margin-top:var(--space-4); font-weight:700;">— प्रिया शर्मा</div>
          </div>
          <div class="testimonial-card">
            <p>"मैंने रुद्राक्ष माला मंगवाई थी, गुणवत्ता बहुत अच्छी है। इस दुकान को पाकर धन्य महसूस कर रहा हूँ।"</p>
            <div style="margin-top:var(--space-4); font-weight:700;">— अमित सिंह</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section">
      <div class="container">
        <div class="newsletter-box shadow-xl">
          <h2>हमारे आध्यात्मिक समुदाय से जुड़ें</h2>
          <p>साप्ताहिक आध्यात्मिक ज्ञान और नए संग्रहों तक विशेष पहुंच के लिए सब्सक्राइब करें।</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Blessings! आप सब्सक्राइब हो गए हैं।');">
            <input type="email" placeholder="आपका ईमेल पता" required />
            <button type="submit" class="btn btn--primary">अभी जुड़ें</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function initHomeEvents() {
  initProductCardEvents();
}
