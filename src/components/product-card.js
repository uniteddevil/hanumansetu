// Product card component
import { formatPrice } from '../data/products.js';
import { addToCart } from '../utils/cart.js';

export function renderProductCard(product) {
  return `
    <article class="product-card" data-product-id="${product.id}">
      <a href="#/products/${product.slug}" class="product-card__image">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.style.display='none';this.parentElement.innerHTML+='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;opacity:0.2;\\'>🕉️</div>'" />
        ${product.tag ? `<span class="product-card__tag">${product.tag}</span>` : ''}
      </a>
      <div class="product-card__body">
        <div class="product-card__category">${product.category}</div>
        <h3 class="product-card__name">
          <a href="#/products/${product.slug}">${product.name}</a>
        </h3>
        <div class="product-card__price">
          ${formatPrice(product.price)}
          ${product.originalPrice ? `<span class="product-card__price-old">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-card__action">
          <button class="btn btn--primary btn--sm add-to-cart-btn" data-id="${product.id}" style="width:100%">
            कार्ट में डालें
          </button>
        </div>
      </div>
    </article>
  `;
}

export function initProductCardEvents() {
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = parseInt(btn.dataset.id);
      addToCart(productId);
    });
  });
}
