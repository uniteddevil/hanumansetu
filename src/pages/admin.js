import { supabase, isAdmin } from '../utils/supabase.js';
import { navigate } from '../router.js';
import { fetchProducts, formatPrice } from '../data/products.js';

/**
 * Render the Admin Dashboard
 */
export async function renderAdmin() {
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
        setTimeout(() => navigate('/'), 0);
        return '';
    }

    const products = await fetchProducts();
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
                                    <button class="btn btn--sm btn--secondary edit-product-btn" data-id="${p.id}">Edit</button>
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
            } else {
                content.innerHTML = '<p style="text-align:center;padding:50px;">आंकड़े जल्द आ रहे हैं...</p>';
            }
        });
    });

    attachOrderEvents();
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
            } else {
                // Show toast or subtle confirmation
                console.log('Status updated to', newStatus);
            }
        });
    });
}

function attachProductEvents() {
    document.getElementById('add-product-btn')?.addEventListener('click', () => {
        alert('उत्पाद जोड़ें सुविधा जल्द आ रही है। अभी के लिए, मौजूदा डेटा का उपयोग करें।');
    });

    document.querySelectorAll('.edit-product-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('संपादन सुविधा जल्द आ रही है।');
        });
    });
}
