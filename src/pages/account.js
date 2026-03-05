import { supabase } from '../utils/supabase.js';
import { navigate } from '../router.js';
import { fetchUserOrders } from '../utils/orders.js';
import { formatPrice } from '../data/products.js';

export async function renderAccount() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    setTimeout(() => navigate('/login'), 0);
    return '';
  }

  const orders = await fetchUserOrders();
  const section = window.location.hash.split('/')[2] || 'orders';

  const renderOrders = () => {
    if (orders.length === 0) {
      return `
                <div class="orders-empty">
                    <div class="orders-empty__icon">📦</div>
                    <h4>कोई ऑर्डर नहीं मिला</h4>
                    <p>आपने अभी तक कोई ऑर्डर नहीं दिया है।</p>
                    <a href="#/products" class="btn btn--primary btn--sm">अभी खरीदारी करें</a>
                </div>
            `;
    }

    return `
            <div class="orders-list">
                ${orders.map(order => `
                    <div class="order-card">
                        <div class="order-card__header">
                            <div>
                                <span class="order-card__id">#${order.id.slice(0, 8)}</span>
                                <span class="order-card__date">${new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <span class="order-status badge badge--${order.status.toLowerCase()}">${order.status}</span>
                        </div>
                        <div class="order-card__body">
                            <div class="order-card__items">
                                ${order.items.slice(0, 3).map(item => `
                                    <div class="order-item-thumb">
                                        <img src="${item.image}" alt="${item.name}" title="${item.name}" />
                                    </div>
                                `).join('')}
                                ${order.items.length > 3 ? `<div class="order-item-more">+${order.items.length - 3}</div>` : ''}
                            </div>
                            <div class="order-card__total">
                                <span>कुल राशि:</span>
                                <strong>${formatPrice(order.total_amount)}</strong>
                            </div>
                        </div>
                        <div class="order-card__footer">
                            <a href="${order.whatsapp_link}" target="_blank" class="btn btn--secondary btn--sm">व्हाट्सएप पर संपर्क करें</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
  };

  const renderProfile = () => `
        <div class="account-profile">
            <h3 class="account-section-title">प्रोफ़ाइल जानकारी</h3>
            <div class="profile-field">
                <label>ईमेल</label>
                <div class="profile-value">${user.email}</div>
            </div>
            <div class="profile-field">
                <label>सदस्यता तिथि</label>
                <div class="profile-value">${new Date(user.created_at).toLocaleDateString()}</div>
            </div>
            <p style="margin-top:var(--space-8);color:var(--color-text-muted);font-size:var(--text-sm);">नाम और पता जैसे प्रोफाइल विवरण जल्द ही उपलब्ध होंगे।</p>
        </div>
    `;

  const renderWishlist = () => `
        <div class="account-wishlist">
            <h3 class="account-section-title">मेरी पसंद</h3>
            <div class="orders-empty">
                <div class="orders-empty__icon">❤️</div>
                <h4>विशलिस्ट खाली है</h4>
                <p>आपने अभी तक कोई पसंद नहीं जोड़ी है।</p>
            </div>
        </div>
    `;

  let content = '';
  if (section === 'profile') content = renderProfile();
  else if (section === 'wishlist') content = renderWishlist();
  else content = `
        <h3 class="account-section-title">मेरे ऑर्डर</h3>
        ${renderOrders()}
    `;

  return `
    <section class="account-page" style="padding-top:calc(var(--header-height) + var(--space-12));">
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
              <a href="#/account" class="account-nav-link ${section === 'orders' ? 'active' : ''}">
                <span class="icon">📦</span> मेरे ऑर्डर
              </a>
              <a href="#/account/profile" class="account-nav-link ${section === 'profile' ? 'active' : ''}">
                <span class="icon">👤</span> प्रोफाइल विवरण
              </a>
              <a href="#/account/wishlist" class="account-nav-link ${section === 'wishlist' ? 'active' : ''}">
                <span class="icon">❤️</span> मेरी पसंद
              </a>
            </nav>
          </div>

          <div class="account-content fade-in-up" style="animation-delay: 0.1s;">
            ${content}
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
