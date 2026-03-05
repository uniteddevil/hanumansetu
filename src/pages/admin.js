import { supabase, isAdmin } from '../utils/supabase.js';
import { navigate } from '../router.js';
import { formatPrice } from '../data/products.js';

export async function renderAdmin() {
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
        setTimeout(() => navigate('/'), 0);
        return '';
    }

    const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

    return `
    <section class="admin-page" style="padding-top:calc(var(--header-height) + var(--space-12));">
      <div class="container">
        <div class="admin-header fade-in">
          <h1 class="admin-header__title">एडमिन डैशबोर्ड</h1>
          <div class="admin-tabs">
            <button class="admin-tab-btn active" data-tab="orders">ऑर्डर</button>
            <button class="admin-tab-btn" data-tab="products">उत्पाद</button>
            <button class="admin-tab-btn" data-tab="stats">सांख्यिकी</button>
          </div>
        </div>

        <div class="admin-content fade-in-up">
          <div id="admin-tab-content">
            ${renderAdminOrders(orders || [])}
          </div>
        </div>
      </div>

      <!-- Product Modal -->
      <div id="product-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 id="modal-title">उत्पाद संपादित करें</h3>
            <span class="close-modal">&times;</span>
          </div>
          <form id="product-form" class="admin-form">
            <input type="hidden" id="product-id" />
            <div class="form-group">
              <label>नाम</label>
              <input type="text" id="p-name" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>कीमत (₹)</label>
                <input type="number" id="p-price" required />
              </div>
              <div class="form-group">
                <label>मूल कीमत (Optional)</label>
                <input type="number" id="p-original-price" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>श्रेणी</label>
                <input type="text" id="p-category" required />
              </div>
              <div class="form-group">
                <label>स्लग (Unique URL)</label>
                <input type="text" id="p-slug" required />
              </div>
            </div>
            <div class="form-group">
              <label>विवरण</label>
              <textarea id="p-description" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label>मुख्य छवि URL</label>
              <input type="text" id="p-image" required />
            </div>
            <div class="form-group">
              <label>अतिरिक्त छवियाँ (Comma separated URLs)</label>
              <input type="text" id="p-images" />
            </div>
            <div class="form-group">
              <label>विशेषताएँ (Comma separated)</label>
              <input type="text" id="p-features" />
            </div>
            <div class="form-group">
              <label>टैग (जैसे: 'Best Seller')</label>
              <input type="text" id="p-tag" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn--secondary" id="cancel-modal">रद्द करें</button>
              <button type="submit" class="btn btn--primary" id="save-product-btn">सहेजें</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderAdminOrders(orders) {
    if (orders.length === 0) {
        return '<p style="text-align:center;padding:50px;">कोई ऑर्डर नहीं मिला।</p>';
    }

    return `
        <div class="admin-section">
            <h3 class="admin-section-title">सभी ऑर्डर (${orders.length})</h3>
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>तिथि</th>
                            <th>कुल राशि</th>
                            <th>स्थिति</th>
                            <th>कार्य</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td class="font-mono">#${order.id.slice(0, 8)}</td>
                                <td>${new Date(order.created_at).toLocaleDateString()}</td>
                                <td>${formatPrice(order.total_amount)}</td>
                                <td>
                                    <select class="admin-status-select" data-order-id="${order.id}">
                                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                        <option value="Blessed" ${order.status === 'Blessed' ? 'selected' : ''}>अभिमंत्रित</option>
                                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>भेज दिया गया</option>
                                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>वितरित</option>
                                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>रद्द</option>
                                    </select>
                                </td>
                                <td>
                                    <a href="${order.whatsapp_link}" target="_blank" class="btn btn--sm btn--secondary">Chat</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function renderAdminProducts() {
    const products = await fetchProducts();
    return `
        <div class="admin-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6);">
                <h3 class="admin-section-title" style="margin:0;">उत्पाद प्रबंधन (${products.length})</h3>
                <button class="btn btn--primary btn--sm" id="add-product-btn">नया उत्पाद जोड़ें</button>
            </div>
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>उत्पाद</th>
                            <th>कीमत</th>
                            <th>श्रेणी</th>
                            <th>कार्य</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(p => `
                            <tr>
                                <td>
                                    <div style="display:flex;align-items:center;gap:var(--space-3);">
                                        <img src="${p.image}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;" />
                                        <span>${p.name}</span>
                                    </div>
                                </td>
                                <td>${formatPrice(p.price)}</td>
                                <td>${p.category}</td>
                                <td>
                                    <div style="display:flex;gap:var(--space-2);">
                                        <button class="btn btn--sm btn--secondary edit-product-btn" data-id="${p.id}">संपादित करें</button>
                                        <button class="btn btn--sm btn--danger delete-product-btn" data-id="${p.id}">हटाएं</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

export function initAdminEvents() {
    // Tab switching
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const content = document.getElementById('admin-tab-content');
            if (tab === 'orders') {
                const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
                content.innerHTML = renderAdminOrders(orders || []);
                attachOrderEvents();
            } else if (tab === 'products') {
                content.innerHTML = await renderAdminProducts();
                attachProductEvents();
            } else if (tab === 'stats') {
                const { data: orders } = await supabase.from('orders').select('total_amount, status');
                content.innerHTML = renderAdminStats(orders || []);
            } else {
                content.innerHTML = '<p style="text-align:center;padding:50px;">आंकड़े जल्द आ रहे हैं...</p>';
            }
        });
    });

    attachOrderEvents();
    initModalEvents();
}

function renderAdminStats(orders) {
    const totalRevenue = orders
        .filter(o => ['Delivered', 'Shipped', 'Blessed'].includes(o.status))
        .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;

    return `
        <div class="admin-section">
            <h3 class="admin-section-title">सांख्यिकी अवलोकन</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-label">कुल आय</span>
                    <strong class="stat-value">${formatPrice(totalRevenue)}</strong>
                </div>
                <div class="stat-card">
                    <span class="stat-label">कुल ऑर्डर</span>
                    <strong class="stat-value">${totalOrders}</strong>
                </div>
                <div class="stat-card">
                    <span class="stat-label">पेंडिंग ऑर्डर</span>
                    <strong class="stat-value">${pendingOrders}</strong>
                </div>
            </div>
        </div>
    `;
}

function initModalEvents() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-modal');

    const closeModal = () => {
        modal.style.display = 'none';
        document.getElementById('product-form').reset();
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    document.getElementById('product-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveProduct();
        closeModal();
        // Refresh products tab if active
        const productsBtn = document.querySelector('.admin-tab-btn[data-tab="products"]');
        if (productsBtn?.classList.contains('active')) {
            productsBtn.click();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function attachOrderEvents() {
    document.querySelectorAll('.admin-status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const orderId = e.target.dataset.orderId;
            const newStatus = e.target.value;

            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) {
                alert('स्थिति अपडेट करने में विफल');
                console.error(error);
            }
        });
    });
}

function attachProductEvents() {
    document.getElementById('add-product-btn')?.addEventListener('click', () => {
        showProductModal();
    });

    document.querySelectorAll('.edit-product-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const { data: product } = await supabase.from('products').select('*').eq('id', id).single();
            if (product) showProductModal(product);
        });
    });

    document.querySelectorAll('.delete-product-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?')) {
                const id = btn.dataset.id;
                const { error } = await supabase.from('products').delete().eq('id', id);
                if (!error) {
                    document.querySelector('.admin-tab-btn[data-tab="products"]')?.click();
                } else {
                    alert('हटाने में विफल');
                }
            }
        });
    });
}

function showProductModal(product = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('product-form');

    title.textContent = product ? 'उत्पाद संपादित करें' : 'नया उत्पाद जोड़ें';

    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('p-name').value = product.name;
        document.getElementById('p-price').value = product.price;
        document.getElementById('p-original-price').value = product.original_price || '';
        document.getElementById('p-category').value = product.category;
        document.getElementById('p-slug').value = product.slug;
        document.getElementById('p-description').value = product.description;
        document.getElementById('p-image').value = product.image;
        document.getElementById('p-images').value = (product.images || []).join(', ');
        document.getElementById('p-features').value = (product.features || []).join(', ');
        document.getElementById('p-tag').value = product.tag || '';
    } else {
        form.reset();
        document.getElementById('product-id').value = '';
    }

    modal.style.display = 'block';
}

async function saveProduct() {
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('p-name').value;
    const price = parseFloat(document.getElementById('p-price').value);
    const original_price = parseFloat(document.getElementById('p-original-price').value) || null;
    const category = document.getElementById('p-category').value;
    const slug = document.getElementById('p-slug').value;
    const description = document.getElementById('p-description').value;
    const image = document.getElementById('p-image').value;
    const images = document.getElementById('p-images').value.split(',').map(s => s.trim()).filter(Boolean);
    const features = document.getElementById('p-features').value.split(',').map(s => s.trim()).filter(Boolean);
    const tag = document.getElementById('p-tag').value;

    const productData = {
        name,
        price,
        original_price,
        category,
        slug,
        description,
        image,
        images,
        features,
        tag,
        updated_at: new Date().toISOString()
    };

    if (id) {
        // Update
        const { error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id);

        if (error) {
            alert('अपडेट करने में विफल: ' + error.message);
        }
    } else {
        // Create - using timestamp for ID as table uses bigint
        productData.id = Math.floor(Date.now() / 1000);
        const { error } = await supabase
            .from('products')
            .insert(productData);

        if (error) {
            alert('जोड़ने में विफल: ' + error.message);
        }
    }
}
