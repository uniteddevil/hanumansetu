// Footer component

export function renderFooter() {
    const year = new Date().getFullYear();

    return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <h3>🙏 HanumanSetu</h3>
          <p>
            Bringing sacred devotional products to your doorstep. Each item is
            carefully sourced and blessed, connecting you to your spiritual journey.
          </p>
        </div>

        <div>
          <h4 class="footer__heading">Quick Links</h4>
          <div class="footer__links">
            <a href="#/">Home</a>
            <a href="#/products">Products</a>
            <a href="#/about">About Us</a>
            <a href="#/cart">Cart</a>
          </div>
        </div>

        <div>
          <h4 class="footer__heading">Contact</h4>
          <div class="footer__links">
            <a href="mailto:contact@hanumansetu.com">contact@hanumansetu.com</a>
            <a href="#/about">Get in Touch</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© ${year} HanumanSetu. All rights reserved. Made with 🙏 in India.</p>
      </div>
    </footer>
  `;
}
