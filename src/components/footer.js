// Footer component

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <h3>🙏 हनुमान सेतु</h3>
          <p>
            पवित्र भक्ति उत्पाद आपके दरवाजे तक पहुंचाना। प्रत्येक वस्तु सावधानी से प्राप्त और अभिमंत्रित की जाती है, जो आपको अपनी आध्यात्मिक यात्रा से जोड़ती है।
          </p>
        </div>

        <div>
          <h4 class="footer__heading">महत्वपूर्ण लिंक</h4>
          <div class="footer__links">
            <a href="#/">होम</a>
            <a href="#/products">उत्पाद</a>
            <a href="#/about">हमारे बारे में</a>
            <a href="#/cart">कार्ट</a>
          </div>
        </div>

        <div>
          <h4 class="footer__heading">संपर्क सूत्र</h4>
          <div class="footer__links">
            <a href="mailto:contact@hanumansetu.com">contact@hanumansetu.com</a>
            <a href="#/about">हमसे संपर्क करें</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© ${year} हनुमान सेतु. सभी अधिकार सुरक्षित। भारत में 🙏 के साथ निर्मित।</p>
      </div>
    </footer>
  `;
}
