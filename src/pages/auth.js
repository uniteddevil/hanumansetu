import { supabase } from '../utils/supabase.js';
import { navigate } from '../router.js';

export function renderLogin() {
    return `
    <section class="auth-page">
      <div class="container container--narrow">
        <div class="auth-card fade-in">
          <div class="auth-card__header">
            <h2>स्वागत है</h2>
            <p>अपने खाते में लॉगिन करें</p>
          </div>
          
          <form class="auth-form" id="login-form">
            <div id="auth-error" class="auth-error" style="display:none;"></div>
            
            <div class="form-group">
              <label for="email">ईमेल</label>
              <input type="email" id="email" id="login-email" placeholder="example@email.com" required />
            </div>
            
            <div class="form-group">
              <label for="password">पासवर्ड</label>
              <input type="password" id="password" id="login-password" placeholder="••••••••" required />
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;" id="login-btn">
              लॉगिन करें
            </button>
          </form>
          
          <div class="auth-card__footer">
            <p>खाता नहीं है? <a href="#/register">रजिस्टर करें</a></p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderRegister() {
    return `
    <section class="auth-page">
      <div class="container container--narrow">
        <div class="auth-card fade-in">
          <div class="auth-card__header">
            <h2>खाता बनाएं</h2>
            <p>हनुमान सेतु परिवार में आपका स्वागत है</p>
          </div>
          
          <form class="auth-form" id="register-form">
            <div id="auth-error" class="auth-error" style="display:none;"></div>
            
            <div class="form-group">
              <label for="full-name">पूरा नाम</label>
              <input type="text" id="full-name" placeholder="आपका नाम" required />
            </div>

            <div class="form-group">
              <label for="email">ईमेल</label>
              <input type="email" id="email" placeholder="example@email.com" required />
            </div>
            
            <div class="form-group">
              <label for="password">पासवर्ड</label>
              <input type="password" id="password" placeholder="कम से कम 6 अक्षर" minlength="6" required />
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;" id="register-btn">
              रजिस्टर करें
            </button>
          </form>
          
          <div class="auth-card__footer">
            <p>पहले से खाता है? <a href="#/login">लॉगिन करें</a></p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initAuthEvents(type) {
    const form = document.querySelector(type === 'login' ? '#login-form' : '#register-form');
    const errorEl = document.getElementById('auth-error');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        // UI Loading state
        btn.disabled = true;
        btn.textContent = 'प्रतीक्षा करें...';
        errorEl.style.display = 'none';

        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            if (type === 'register') {
                const fullName = document.getElementById('full-name').value;
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });

                if (error) throw error;

                // Note: Supabase might require email confirmation.
                if (data.user && data.session) {
                    navigate('/');
                } else {
                    errorEl.textContent = 'सफलता! कृपया अपना ईमेल सत्यापित करें।';
                    errorEl.style.display = 'block';
                    errorEl.classList.add('auth-success');
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;
                navigate('/');
            }
        } catch (err) {
            errorEl.textContent = err.message || 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।';
            errorEl.style.display = 'block';
            errorEl.classList.remove('auth-success');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}
