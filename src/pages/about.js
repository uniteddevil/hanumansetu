// About page

export function renderAbout() {
  return `
    <section class="about-page" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div class="about-hero">
          <span class="section-label">Our Story</span>
          <h1 class="about-hero__title">About HanumanSetu</h1>
          <p class="about-hero__subtitle">
            A bridge between devotion and your doorstep. We bring you carefully selected 
            religious and spiritual products that enhance your daily pooja and spiritual practice.
          </p>
        </div>

        <div class="about-content">
          <div class="about-content__text">
            <h3>Our Mission</h3>
            <p>
              HanumanSetu was born from a simple belief — everyone should have access to authentic, high-quality devotional products. We noticed that finding genuine religious items online was either expensive or unreliable.
            </p>
            <p>
              We work directly with artisans and trusted suppliers across India to bring you products that are not only beautiful but carry the essence of devotion in every detail.
            </p>
            <p>
              From hand-carved idols to pure brass pooja essentials, every product in our collection is chosen with care, ensuring authenticity and spiritual significance.
            </p>
          </div>
          <div class="about-content__image">
            <img src="/assets/about-mission.png" alt="HanumanSetu Artisans" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg); shadow: var(--shadow-lg);" />
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);padding:var(--space-12) 0;text-align:center;">
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">5000+</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">Satisfied Devotees</div>
          </div>
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">100%</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">Authentic Products</div>
          </div>
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">🇮🇳</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">Made In India</div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section" style="background:var(--color-surface); padding: var(--space-20) 0;">
      <div class="container">
        <form class="contact-form glass-card" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style="max-width: 600px; margin: 0 auto; padding: var(--space-10);">
          <h3 class="contact-form__title" style="text-align:center; margin-bottom: var(--space-8);">Get In Touch</h3>

          <div class="form-group">
            <label for="contact-name">Your Name</label>
            <input type="text" id="contact-name" name="name" required placeholder="Enter your full name" />
          </div>

          <div class="form-group">
            <label for="contact-email">Email Address</label>
            <input type="email" id="contact-email" name="email" required placeholder="your@email.com" />
          </div>

          <div class="form-group">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" required placeholder="How can we help you on your spiritual journey?" style="min-height: 150px;"></textarea>
          </div>

          <button type="submit" class="btn btn--primary btn--lg" style="width:100%;">
            Send Message 🙏
          </button>

          <p style="margin-top:var(--space-4);font-size:var(--text-xs);color:var(--color-text-muted);text-align:center;">
            Or contact us directly at
            <a href="mailto:contact@hanumansetu.com" style="color:var(--color-primary); font-weight: 600;">contact@hanumansetu.com</a>
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

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending Blessings...';
      btn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:var(--space-8);">
            <div style="font-size:4rem;margin-bottom:var(--space-4);">✨</div>
            <h3>Thank you, ${name}!</h3>
            <p style="color:var(--color-text-secondary);margin-top:var(--space-3);">
              We have received your message and will reach out to you shortly. Jai Shri Ram!
            </p>
            <button onclick="window.location.reload()" class="btn btn--secondary" style="margin-top: var(--space-6);">Send Another Message</button>
          </div>
        `;
      }, 1000);
    });
  }
}
