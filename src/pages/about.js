// About page

export function renderAbout() {
  return `
    <section class="about-page">
      <div class="container">
        <div class="about-hero">
          <span class="section-label">हमारी कहानी</span>
          <h1 class="about-hero__title">हनुमान सेतु के बारे में</h1>
          <p class="about-hero__subtitle">
            भक्ति और आपके दरवाजे के बीच एक सेतु। हम आपके लिए सावधानीपूर्वक चुने गए 
            धार्मिक और आध्यात्मिक उत्पाद लाते हैं जो आपकी दैनिक पूजा और आध्यात्मिक अभ्यास को बढ़ाते हैं।
          </p>
        </div>

        <div class="about-content">
          <div class="about-content__text">
            <h3>हमारा मिशन</h3>
            <p>
              हनुमान सेतु का जन्म एक साधारण विश्वास से हुआ था — सभी को प्रामाणिक, उच्च-गुणवत्ता वाले भक्ति उत्पादों तक पहुंच मिलनी चाहिए। हमने देखा कि ऑनलाइन वास्तविक धार्मिक वस्तुएं ढूंढना या तो महंगा था या अविश्वसनीय।
            </p>
            <p>
              हम आपके लिए ऐसे उत्पाद लाने के लिए पूरे भारत में कारीगरों और विश्वसनीय आपूर्तिकर्ताओं के साथ सीधे काम करते हैं जो न केवल सुंदर हैं, बल्कि हर विवरण में भक्ति का सार रखते हैं।
            </p>
            <p>
              हाथ से उकेरी गई मूर्तियों से लेकर शुद्ध पीतल की पूजा सामग्री तक, हमारे संग्रह में प्रत्येक उत्पाद देखभाल के साथ चुना गया है, जो प्रामाणिकता और आध्यात्मिक महत्व सुनिश्चित करता है।
            </p>
          </div>
          <div class="about-content__image">
            <div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg, var(--color-primary-50), var(--color-bg-warm));font-size:4rem;">
              🙏
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);padding:var(--space-12) 0;text-align:center;">
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">1000+</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">संतुष्ट भक्त</div>
          </div>
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">100%</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">प्रामाणिक उत्पाद</div>
          </div>
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">🇮🇳</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">मेड इन इंडिया</div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section" style="background:var(--color-surface);">
      <div class="container">
        <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
          <h3 class="contact-form__title">संपर्क करें</h3>

          <div class="form-group">
            <label for="contact-name">आपका नाम</label>
            <input type="text" id="contact-name" name="name" required placeholder="अपना नाम दर्ज करें" />
          </div>

          <div class="form-group">
            <label for="contact-email">ईमेल पता</label>
            <input type="email" id="contact-email" name="email" required placeholder="your@email.com" />
          </div>

          <div class="form-group">
            <label for="contact-message">संदेश</label>
            <textarea id="contact-message" name="message" required placeholder="हम आपकी कैसे मदद कर सकते हैं?"></textarea>
          </div>

          <button type="submit" class="btn btn--primary btn--lg" style="width:100%;">
            संदेश भेजें
          </button>

          <p style="margin-top:var(--space-4);font-size:var(--text-xs);color:var(--color-text-muted);text-align:center;">
            या हमसे सीधे संपर्क करें
            <a href="mailto:contact@hanumansetu.com" style="color:var(--color-primary);">contact@hanumansetu.com</a>
          </p>
        </form>
      </div>
    </section>
  `;
}

export function initAboutEvents() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name');

      // Simple client-side submission feedback
      // Replace the Formspree action URL with a real one to enable actual submissions
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'भेजा जा रहा है...';
      btn.disabled = true;

      // Simulate send (replace with actual fetch to Formspree when ready)
      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:var(--space-8);">
            <div style="font-size:3rem;margin-bottom:var(--space-4);">✅</div>
            <h3>धन्यवाद, ${name}!</h3>
            <p style="color:var(--color-text-secondary);margin-top:var(--space-3);">
              हमें आपका संदेश मिल गया है और हम जल्द ही आपसे संपर्क करेंगे।
            </p>
          </div>
        `;
      }, 1000);
    });
  }
}
