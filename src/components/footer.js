// Footer component

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <h3>🙏 HanumanSetu</h3>
          <p>
            Bringing sacred devotional products to your doorstep. Each item is carefully sourced and energized, connecting you with your spiritual journey.
          </p>
        </div>

        <div>
          <h4 class="footer__heading">Quick Links</h4>
          <div class="footer__links">
            <a href="#/">Home</a>
            <a href="#/products">Products</a>
            <a href="#/about">About Us</a>
            <a href="#/cart">View Cart</a>
          </div>
        </div>

        <div>
          <h4 class="footer__heading">Connect</h4>
          <div class="footer__links">
            <a href="mailto:contact@hanumansetu.com">contact@hanumansetu.com</a>
            <a href="#/about">Contact Us</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© ${year} HanumanSetu. All rights reserved. Made in India with 🙏</p>
      </div>
    </footer>
  `;
}
