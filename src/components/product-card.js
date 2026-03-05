// Product card component
import { formatPrice } from '../data/products.js';
import { addToCart } from '../utils/cart.js';
import { renderCarousel, initCarousel } from './carousel.js';

export function renderProductCard(product) {
  const renderStars = (rating) => {
    if (!rating) return '';
    const fullStars = Math.floor(rating);
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) starsHtml += '★';
      else starsHtml += '☆';
    }
    return `<div class="product-card__rating">${starsHtml} <span>${rating}</span></div>`;
  };

  const hasMultipleImages = product.images && product.images.length > 1;
  const carouselId = `card-carousel-${product.id}`;

  const carouselItems = hasMultipleImages
    ? product.images.map(img => `<img src="${img}" alt="${product.name}" loading="lazy" />`)
    : [];

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image-container">
        ${hasMultipleImages
      ? `<div class="product-card__carousel-wrapper">
               ${renderCarousel({ id: carouselId, items: carouselItems, autoPlayInterval: 4000 + (product.id * 200), className: 'carousel--square carousel--card' })}
             </div>`
      : `<a href="#/products/${product.slug}" class="product-card__image">
               <img src="${product.image}" alt="${product.name}" loading="lazy"
                    onerror="this.style.display='none';this.parentElement.innerHTML+='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;opacity:0.2;\\'>🕉️</div>'" />
             </a>`
    }
        ${product.tag ? `<span class="product-card__tag">${product.tag}</span>` : ''}
      </div>
      <div class="product-card__body">
        <div class="product-card__category">${product.category}</div>
        <h3 class="product-card__name">
          <a href="#/products/${product.slug}">${product.name}</a>
        </h3>
        
        ${renderStars(product.rating)}

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
  // Initialize carousels for cards
  document.querySelectorAll('.product-card').forEach(card => {
    const carousel = card.querySelector('.carousel');
    if (carousel) {
      initCarousel(carousel.id);
    }

    // Make entire card clickable
    card.addEventListener('click', (e) => {
      // Don't navigate if clicking add to cart or carousel dots
      if (e.target.closest('.add-to-cart-btn') || e.target.closest('.carousel__dot')) {
        return;
      }

      const productId = card.dataset.productId;
      const product = document.querySelector(`[data-product-id="${productId}"]`).querySelector('h3 a');
      if (product) {
        window.location.hash = product.getAttribute('href');
      }
    });
  });

  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = parseInt(btn.dataset.id);
      addToCart(productId);
    });
  });
}
