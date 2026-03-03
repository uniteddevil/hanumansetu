// About page

export function renderAbout() {
    return `
    <section class="about-page">
      <div class="container">
        <div class="about-hero">
          <span class="section-label">Our Story</span>
          <h1 class="about-hero__title">About HanumanSetu</h1>
          <p class="about-hero__subtitle">
            A bridge between devotion and your doorstep. We bring you carefully curated
            religious and spiritual products that enhance your daily worship and spiritual practice.
          </p>
        </div>

        <div class="about-content">
          <div class="about-content__text">
            <h3>Our Mission</h3>
            <p>
              HanumanSetu was born out of a simple belief — everyone deserves access to
              authentic, high-quality devotional products. We noticed that finding genuine
              religious items online was either expensive or unreliable.
            </p>
            <p>
              We work directly with artisans and trusted suppliers across India to bring you
              products that are not just beautiful, but carry the essence of devotion in every detail.
            </p>
            <p>
              From hand-carved murtis to pure brass pooja essentials, every product in our
              collection is selected with care, ensuring authenticity and spiritual significance.
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
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">Happy Devotees</div>
          </div>
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">100%</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">Authentic Products</div>
          </div>
          <div>
            <div style="font-size:var(--text-4xl);font-weight:700;color:var(--color-primary);margin-bottom:var(--space-2);font-family:var(--font-heading);">🇮🇳</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">Made in India</div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section" style="background:var(--color-surface);">
      <div class="container">
        <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
          <h3 class="contact-form__title">Get in Touch</h3>

          <div class="form-group">
            <label for="contact-name">Your Name</label>
            <input type="text" id="contact-name" name="name" required placeholder="Enter your name" />
          </div>

          <div class="form-group">
            <label for="contact-email">Email Address</label>
            <input type="email" id="contact-email" name="email" required placeholder="your@email.com" />
          </div>

          <div class="form-group">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" required placeholder="How can we help you?"></textarea>
          </div>

          <button type="submit" class="btn btn--primary btn--lg" style="width:100%;">
            Send Message
          </button>

          <p style="margin-top:var(--space-4);font-size:var(--text-xs);color:var(--color-text-muted);text-align:center;">
            Or reach us directly at
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
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate send (replace with actual fetch to Formspree when ready)
            setTimeout(() => {
                form.innerHTML = `
          <div style="text-align:center;padding:var(--space-8);">
            <div style="font-size:3rem;margin-bottom:var(--space-4);">✅</div>
            <h3>Thank you, ${name}!</h3>
            <p style="color:var(--color-text-secondary);margin-top:var(--space-3);">
              We've received your message and will get back to you soon.
            </p>
          </div>
        `;
            }, 1000);
        });
    }
}
