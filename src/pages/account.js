import { supabase } from '../utils/supabase.js';
import { navigate } from '../router.js';

export function renderAccount() {
    const user = JSON.parse(localStorage.getItem('sb-qwmqxdxkgzdgdyyynlku-auth-token'))?.user;

    if (!user) {
        setTimeout(() => navigate('/login'), 0);
        return '';
    }

    return `
    <section class="account-page">
      <div class="container">
        <div class="account-header fade-in">
          <div class="account-header__info">
            <h1 class="account-header__title">मेरा खाता</h1>
            <p class="account-header__email">${user.email}</p>
          </div>
          <button class="btn btn--secondary btn--sm" id="logout-btn">लॉगआउट</button>
        </div>

        <div class="account-grid">
          <div class="account-sidebar fade-in-up">
            <nav class="account-nav">
              <a href="#/account" class="account-nav-link active">
                <span class="icon">📦</span> मेरे ऑर्डर
              </a>
              <a href="#/account/profile" class="account-nav-link">
                <span class="icon">👤</span> प्रोफाइल जानकारी
              </a>
              <a href="#/account/wishlist" class="account-nav-link">
                <span class="icon">❤️</span> मेरी पसंद
              </a>
            </nav>
          </div>

          <div class="account-content fade-in-up" style="animation-delay: 0.1s;">
            <div class="account-orders">
              <h3 class="account-section-title">मेरे हालिया ऑर्डर</h3>
              <div class="orders-empty">
                <div class="orders-empty__icon">📦</div>
                <h4>कोई ऑर्डर नहीं मिला</h4>
                <p>आपने अभी तक कोई ऑर्डर नहीं दिया है।</p>
                <a href="#/products" class="btn btn--primary btn--sm">अभी खरीदारी करें</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initAccountEvents() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            navigate('/');
        });
    }
}
