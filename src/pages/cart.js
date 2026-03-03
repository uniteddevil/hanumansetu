// Cart page
import { getCartItems, getCartTotal, removeFromCart, updateQuantity, getWhatsAppLink, clearCart } from '../utils/cart.js';
import { formatPrice } from '../data/products.js';

export function renderCart() {
  const items = getCartItems();

  if (items.length === 0) {
    return `
      <section class="cart-page">
        <div class="container">
          <div class="cart-empty">
            <div class="cart-empty__icon">🛒</div>
            <h2 class="cart-empty__title">आपका कार्ट खाली है</h2>
            <p class="cart-empty__text">ऐसा लगता है कि आपने अभी तक कोई पवित्र वस्तु नहीं जोड़ी है।</p>
            <a href="#/products" class="btn btn--primary btn--lg">उत्पाद देखें</a>
          </div>
        </div>
      </section>
    `;
  }

  const total = getCartTotal();
  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  return `
    <section class="cart-page">
      <div class="container">
        <h1 class="cart-page__title">शॉपिंग कार्ट</h1>

        <div class="cart-page__inner">
          <div class="cart-items" id="cart-items">
            ${items
      .map(
        (item) => `
              <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item__image">
                  <img src="${item.image}" alt="${item.name}"
                       onerror="this.style.display='none';this.parentElement.innerHTML+='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:1.5rem;opacity:0.2;\\'>🕉️</div>'" />
                </div>
                <div class="cart-item__info">
                  <div class="cart-item__name">${item.name}</div>
                  <div class="cart-item__price">${formatPrice(item.price)}</div>
                  <div style="display:flex;align-items:center;gap:var(--space-3);margin-top:var(--space-2);">
                    <div class="product-detail__quantity" style="display:inline-flex;">
                      <button class="cart-qty-btn" data-id="${item.id}" data-action="minus">−</button>
                      <span>${item.quantity}</span>
                      <button class="cart-qty-btn" data-id="${item.id}" data-action="plus">+</button>
                    </div>
                    <span style="font-size:var(--text-sm);color:var(--color-text-muted);">= ${formatPrice(item.subtotal)}</span>
                  </div>
                  <div class="cart-item__remove" data-remove-id="${item.id}">✕ हटाएं</div>
                </div>
              </div>
            `
      )
      .join('')}
          </div>

          <div class="cart-summary">
            <h3 class="cart-summary__title">ऑर्डर सारांश</h3>

            <div class="cart-summary__row">
              <span>उप-योग (${items.reduce((s, i) => s + i.quantity, 0)} आइटम)</span>
              <span>${formatPrice(total)}</span>
            </div>
            <div class="cart-summary__row">
              <span>शिपिंग</span>
              <span style="color:${shipping === 0 ? 'var(--color-success)' : 'inherit'}">
                ${shipping === 0 ? 'मुफ्त' : formatPrice(shipping)}
              </span>
            </div>
            ${shipping > 0 ? `<div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-1);">₹999 से अधिक के ऑर्डर पर मुफ्त डिलीवरी</div>` : ''}

            <div class="cart-summary__total">
              <span>कुल राशि</span>
              <span>${formatPrice(grandTotal)}</span>
            </div>

            <a href="${getWhatsAppLink()}" target="_blank" rel="noopener" class="btn btn--whatsapp cart-summary__checkout" id="checkout-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.124 1.526 5.858L0 24l6.335-1.498A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.993 0-3.877-.535-5.509-1.508l-.395-.234-4.098.97.987-3.605-.243-.397A9.78 9.78 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/>
              </svg>
              व्हाट्सएप द्वारा ऑर्डर करें
            </a>

            <p class="cart-summary__note">
              ऑर्डर की पुष्टि के लिए आपको व्हाट्सएप पर रीडायरेक्ट किया जाएगा। 
              पुष्टि के बाद UPI द्वारा भुगतान की व्यवस्था की जाएगी।
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initCartEvents() {
  // Quantity buttons
  document.querySelectorAll('.cart-qty-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const items = getCartItems();
      const item = items.find((i) => i.id === productId);

      if (item) {
        const newQty = action === 'plus' ? item.quantity + 1 : item.quantity - 1;
        if (newQty >= 1) {
          updateQuantity(productId, newQty);
          rerenderCart();
        }
      }
    });
  });

  // Remove buttons
  document.querySelectorAll('[data-remove-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.removeId);
      removeFromCart(productId);
      rerenderCart();
    });
  });
}

function rerenderCart() {
  const app = document.getElementById('app');
  // Preserve header + footer, just update the cart section
  const header = app.querySelector('.header');
  const footer = app.querySelector('.footer');

  // Re-import and render
  const cartSection = app.querySelector('.cart-page');
  if (cartSection) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderCart();
    const newCartSection = tempDiv.querySelector('.cart-page');
    if (newCartSection) {
      cartSection.replaceWith(newCartSection);
      initCartEvents();
    }
  }
}
