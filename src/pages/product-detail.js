// Product detail page
import { getProductBySlug, formatPrice } from '../data/products.js';
import { addToCart } from '../utils/cart.js';

export function renderProductDetail(slug) {
    const product = getProductBySlug(slug);

    if (!product) {
        return `
      <div style="text-align:center;padding:200px 20px;">
        <h1>Product Not Found</h1>
        <p style="margin:16px 0;color:var(--color-text-secondary)">This product doesn't exist or has been removed.</p>
        <a href="#/products" class="btn btn--primary">Browse Products</a>
      </div>
    `;
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return `
    <section class="product-detail">
      <div class="container">
        <nav style="margin-bottom:var(--space-8);font-size:var(--text-sm);color:var(--color-text-muted);">
          <a href="#/" style="color:var(--color-text-secondary);">Home</a>
          <span style="margin:0 var(--space-2);">›</span>
          <a href="#/products" style="color:var(--color-text-secondary);">Products</a>
          <span style="margin:0 var(--space-2);">›</span>
          <span style="color:var(--color-text);">${product.name}</span>
        </nav>

        <div class="product-detail__inner">
          <div class="product-detail__gallery fade-in">
            <div class="product-detail__main-image">
              <img src="${product.image}" alt="${product.name}"
                   onerror="this.style.display='none';this.parentElement.innerHTML+='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:5rem;opacity:0.2;\\'>🕉️</div>'" />
            </div>
          </div>

          <div class="product-detail__info fade-in-up">
            <div class="product-detail__category">${product.category}</div>
            <h1 class="product-detail__name">${product.name}</h1>

            <div class="product-detail__price">
              ${formatPrice(product.price)}
              ${product.originalPrice ? `<span class="product-detail__price-old">${formatPrice(product.originalPrice)}</span>` : ''}
              ${discount > 0 ? `<span style="margin-left:var(--space-3);font-size:var(--text-sm);color:var(--color-success);font-weight:600;">${discount}% OFF</span>` : ''}
            </div>

            <p class="product-detail__description">${product.description}</p>

            ${product.features && product.features.length > 0
            ? `
              <ul class="product-detail__features">
                ${product.features.map((f) => `<li>${f}</li>`).join('')}
              </ul>
            `
            : ''
        }

            <div class="product-detail__actions">
              <div class="product-detail__quantity" id="qty-control">
                <button id="qty-minus">−</button>
                <span id="qty-value">1</span>
                <button id="qty-plus">+</button>
              </div>
              <button class="btn btn--primary btn--lg" id="add-to-cart-detail" data-id="${product.id}" style="flex:1;">
                Add to Cart
              </button>
            </div>

            <div style="margin-top:var(--space-8);padding:var(--space-5);background:var(--color-bg-warm);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-text-secondary);">
              <strong>🚚 Free shipping</strong> on orders above ₹999<br />
              <strong>✅ Secure packaging</strong> for safe delivery<br />
              <strong>💬 Order via WhatsApp</strong> for instant confirmation
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initProductDetailEvents(slug) {
    let quantity = 1;
    const qtyValue = document.getElementById('qty-value');
    const product = getProductBySlug(slug);

    document.getElementById('qty-minus')?.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyValue.textContent = quantity;
        }
    });

    document.getElementById('qty-plus')?.addEventListener('click', () => {
        quantity++;
        qtyValue.textContent = quantity;
    });

    document.getElementById('add-to-cart-detail')?.addEventListener('click', () => {
        if (product) {
            addToCart(product.id, quantity);
        }
    });
}
