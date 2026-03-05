import { supabase, isAdmin } from '../utils/supabase.js';
import { navigate } from '../router.js';
import { formatPrice, fetchProducts } from '../data/products.js';

// Mock Data Generator for high-fidelity demo
const generateMockData = () => {
    const orders = [];
    const statuses = ['Delivered', 'Pending', 'Shipped', 'Blessed'];
    const products = ['Rudraksha Mala', 'Brass Hanuman Statue', 'Incense Cones', 'Puja Thali Set', 'Hanuman Chalisa'];

    for (let i = 0; i < 20; i++) {
        orders.push({
            id: `MOCK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            created_at: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
            total_amount: Math.floor(Math.random() * 5000) + 500,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            customer_name: ['Meera Sharma', 'Rajesh Patel', 'Priya Singh', 'Vikram Rao', 'Anita Desai'][Math.floor(Math.random() * 5)],
            items_summary: products[Math.floor(Math.random() * products.length)] + (Math.random() > 0.5 ? ' x2' : ''),
            whatsapp_link: '#'
        });
    }
    return orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export async function renderAdmin() {
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
        setTimeout(() => navigate('/'), 0);
        return '';
    }

    // Try to get real orders, fallback to mock if empty
    let { data: realOrders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    const isDemoMode = !realOrders || realOrders.length === 0;
    const orders = isDemoMode ? generateMockData() : realOrders;

    return `
    <div class="admin-wrapper">
        <aside class="admin-sidebar">
            <div class="admin-sidebar__brand">
                <img src="/assets/logo.png" alt="Logo" />
                <span>हनुमान सेतु</span>
            </div>
            
            <nav class="admin-sidebar__nav">
                <button class="admin-nav-item active" data-view="dashboard">
                    <span class="icon">📊</span> डैशबोर्ड
                </button>
                <button class="admin-nav-item" data-view="orders">
                    <span class="icon">📦</span> ऑर्डर
                </button>
                <button class="admin-nav-item" data-view="products">
                    <span class="icon">🛍️</span> उत्पाद
                </button>
                <button class="admin-nav-item" data-view="customers">
                    <span class="icon">👥</span> ग्राहक
                </button>
            </nav>

            <div class="admin-sidebar__footer">
                <button class="admin-nav-item" onclick="window.location.hash='#/'">
                    <span class="icon">🏠</span> मुख्य साइट
                </button>
                <button class="admin-nav-item" id="admin-logout">
                    <span class="icon">🚪</span> लॉगआउट
                </button>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <div class="admin-topbar__search">
                    <input type="text" placeholder="खोजें..." />
                </div>
                <div class="admin-topbar__user">
                    ${isDemoMode ? '<span class="badge badge--pending" style="margin-right:12px;">डेमो मोड सक्रिय</span>' : ''}
                    <div class="user-info">
                        <strong>एडमिन</strong>
                        <span>अधिपति</span>
                    </div>
                </div>
            </header>

            <div id="admin-view-container" class="admin-view-content">
                ${renderDashboardView(orders)}
            </div>
        </main>
    </div>
    `;
}

function renderDashboardView(orders) {
    const totalRevenue = orders
        .filter(o => ['Delivered', 'Shipped', 'Blessed'].includes(o.status))
        .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

    const pendingOrders = orders.filter(o => o.status === 'Pending').length;

    return `
        <div class="view-header">
            <h2>डैशबोर्ड अवलोकन</h2>
            <p>${new Date().toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div class="admin-stats-grid">
            <div class="admin-stat-card glass-card">
                <div class="admin-stat-card__icon revenue">💰</div>
                <div class="admin-stat-card__info">
                    <span class="label">कुल राजस्व</span>
                    <strong class="value">${formatPrice(totalRevenue)}</strong>
                    <span class="trend positive">↑ 12.4%</span>
                </div>
            </div>
            <div class="admin-stat-card glass-card">
                <div class="admin-stat-card__icon orders">📦</div>
                <div class="admin-stat-card__info">
                    <span class="label">कुल ऑर्डर</span>
                    <strong class="value">${orders.length}</strong>
                    <span class="trend positive">↑ 8.7%</span>
                </div>
            </div>
            <div class="admin-stat-card glass-card">
                <div class="admin-stat-card__icon users">👥</div>
                <div class="admin-stat-card__info">
                    <span class="label">नए ग्राहक</span>
                    <strong class="value">235</strong>
                    <span class="trend positive">↑ 5.2%</span>
                </div>
            </div>
            <div class="admin-stat-card glass-card">
                <div class="admin-stat-card__icon pending">⏳</div>
                <div class="admin-stat-card__info">
                    <span class="label">लंबित ऑर्डर</span>
                    <strong class="value">${pendingOrders}</strong>
                    <span class="trend neutral">कार्रवाई आवश्यक</span>
                </div>
            </div>
        </div>

        <div class="dashboard-charts">
            <div class="chart-container glass-card">
                <h3>राजस्व रुझान (पिछले 7 दिन)</h3>
                <div class="mock-chart">
                    <svg viewBox="0 0 400 150" class="sparkline">
                        <path d="M0,120 L50,110 L100,130 L150,80 L200,90 L250,50 L300,70 L350,30 L400,40" fill="none" stroke="var(--color-primary)" stroke-width="3" />
                    </svg>
                    <div class="chart-labels">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="recent-orders glass-card">
            <div class="section-header">
                <h3>हाल के ऑर्डर</h3>
                <button class="btn btn--secondary btn--sm" onclick="document.querySelector('[data-view=\\'orders\\']').click()">सभी देखें</button>
            </div>
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ग्राहक</th>
                            <th>तिथि</th>
                            <th>राशि</th>
                            <th>स्थिति</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.slice(0, 6).map(order => `
                            <tr>
                                <td class="font-mono">#${order.id.slice(0, 8)}</td>
                                <td>${order.customer_name || 'Guest User'}</td>
                                <td>${new Date(order.created_at).toLocaleDateString()}</td>
                                <td>${formatPrice(order.total_amount)}</td>
                                <td><span class="badge badge--${order.status.toLowerCase()}">${order.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderOrdersView(orders) {
    return `
        <div class="view-header">
            <h2>ऑर्डर प्रबंधन</h2>
            <div class="view-actions">
                <button class="btn btn--secondary btn--sm">फ़िल्टर</button>
                <button class="btn btn--primary btn--sm">निर्यात करें (CSV)</button>
            </div>
        </div>

        <div class="table-container glass-card">
            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>तिथि</th>
                            <th>ग्राहक</th>
                            <th>आइटम</th>
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
                                <td>${order.customer_name || 'Anonymous'}</td>
                                <td class="text-truncate" style="max-width:150px;" title="${order.items_summary || 'Multiple items'}">${order.items_summary || 'Multiple items'}</td>
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
                                    <a href="${order.whatsapp_link}" target="_blank" class="icon-btn">💬</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function renderProductsView() {
    const products = await fetchProducts();
    return `
        <div class="view-header">
            <h2>उत्पाद प्रबंधन</h2>
            <button class="btn btn--primary" id="add-product-btn">+ नया उत्पाद जोड़ें</button>
        </div>

        <div class="admin-products-grid">
            ${products.map(p => `
                <div class="admin-product-card glass-card">
                    <div class="admin-product-card__img">
                        <img src="${p.image}" alt="${p.name}" />
                    </div>
                    <div class="admin-product-card__content">
                        <h4>${p.name}</h4>
                        <div class="details">
                            <span class="price">${formatPrice(p.price)}</span>
                            <span class="category">${p.category}</span>
                        </div>
                    </div>
                    <div class="admin-product-card__actions">
                        <button class="btn btn--sm btn--secondary edit-product-btn" data-id="${p.id}">संपादित</button>
                        <button class="btn btn--sm btn--danger delete-product-btn" data-id="${p.id}">हटाएं</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

export function initAdminEvents() {
    // Navigation
    document.querySelectorAll('.admin-nav-item').forEach(btn => {
        btn.addEventListener('click', async () => {
            const view = btn.dataset.view;
            if (!view) return;

            document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const container = document.getElementById('admin-view-container');
            container.innerHTML = '<div class="loading-spinner"></div>';

            // Shared logic - get orders/products
            let { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
            if (!orders || orders.length === 0) orders = generateMockData();

            if (view === 'dashboard') {
                container.innerHTML = renderDashboardView(orders);
            } else if (view === 'orders') {
                container.innerHTML = renderOrdersView(orders);
                attachOrderEvents();
            } else if (view === 'products') {
                container.innerHTML = await renderProductsView();
                attachProductEvents();
            } else {
                container.innerHTML = `<div class="view-empty"><h3>${view} जल्द आ रहा है...</h3></div>`;
            }
        });
    });

    // Logout
    document.getElementById('admin-logout')?.addEventListener('click', async () => {
        await supabase.auth.signOut();
        navigate('/');
    });

    attachOrderEvents();
}

function attachOrderEvents() {
    document.querySelectorAll('.admin-status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const orderId = e.target.dataset.orderId;
            if (orderId.startsWith('MOCK')) {
                alert('डेमो डेटा सुरक्षित है। इसे अपडेट नहीं किया जा सकता।');
                return;
            }
            const newStatus = e.target.value;
            const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
            if (error) alert('Error updating status');
            else alert('Status updated successfully! ✓');
        });
    });
}

function attachProductEvents() {
    document.getElementById('add-product-btn')?.addEventListener('click', () => {
        alert('उत्पाद जोड़ें सुविधा जल्द ही इस नए लेआउट में सक्रिय होगी!');
    });
}
