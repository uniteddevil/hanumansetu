// Cart utility — localStorage-based cart management
import { STORE_CONFIG, formatPrice, products } from '../data/products.js';

const CART_KEY = 'hanumansetu_cart';

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
}

export function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    saveCart(cart);
    showToast('कार्ट में जोड़ा गया ✓');
    return cart;
}

export function removeFromCart(productId) {
    const cart = getCart().filter((item) => item.productId !== productId);
    saveCart(cart);
    return cart;
}

export function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find((i) => i.productId === productId);

    if (item) {
        item.quantity = Math.max(1, quantity);
    }

    saveCart(cart);
    return cart;
}

export function getCartItems() {
    const cart = getCart();
    return cart
        .map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            return {
                ...product,
                quantity: item.quantity,
                subtotal: product.price * item.quantity,
            };
        })
        .filter(Boolean);
}

export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
    return getCartItems().reduce((sum, item) => sum + item.subtotal, 0);
}

export function clearCart() {
    saveCart([]);
}

export function generateWhatsAppMessage() {
    const items = getCartItems();
    if (items.length === 0) return '';

    let message = `🙏 *हनुमान सेतु से नया ऑर्डर*\n\n`;
    message += `*ऑर्डर विवरण:*\n`;
    message += `─────────────\n`;

    items.forEach((item, i) => {
        message += `${i + 1}. ${item.name}\n`;
        message += `   मात्रा: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.subtotal)}\n\n`;
    });

    message += `─────────────\n`;
    message += `*कुल राशि: ${formatPrice(getCartTotal())}*\n\n`;
    message += `कृपया उपलब्धता की पुष्टि करें और भुगतान विवरण साझा करें। 🙏`;

    return message;
}

export function getWhatsAppLink() {
    const message = encodeURIComponent(generateWhatsAppMessage());
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
}

// Toast notification
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast toast--success';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}
