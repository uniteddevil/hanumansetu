import { supabase } from '../utils/supabase.js';
import { navigate } from '../router.js';

export function renderLogin() {
  return `
    <section class="auth-page" style="padding: 120px 0;">
      <div class="container container--narrow">
        <div class="auth-card glass-card fade-in">
          <div class="auth-card__header">
            <h2>स्वागत है</h2>
            <p>अपने आध्यात्मिक खाते में लॉगिन करें</p>
          </div>
          
          <form class="auth-form" id="login-form">
            <div id="auth-error" class="auth-error" style="display:none; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.875rem;"></div>
            
            <div class="form-group">
              <label for="email">ईमेल पता</label>
              <input type="email" id="login-email" placeholder="example@email.com" required />
            </div>
            
            <div class="form-group">
              <label for="password">पासवर्ड</label>
              <input type="password" id="login-password" placeholder="••••••••" required />
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;" id="login-btn">
              लॉगिन करें 🙏
            </button>
          </form>
          
          <div class="auth-card__footer">
            <p>खाता नहीं है? <a href="#/register" style="color: var(--color-primary); font-weight: 600;">रजिस्टर करें</a></p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderRegister() {
  return `
    <section class="auth-page" style="padding: 120px 0;">
      <div class="container container--narrow">
        <div class="auth-card glass-card fade-in">
          <div class="auth-card__header">
            <h2>खाता बनाएं</h2>
            <p>हनुमान सेतु परिवार में आपका स्वागत है</p>
          </div>
          
          <form class="auth-form" id="register-form">
            <div id="auth-error" class="auth-error" style="display:none; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.875rem;"></div>
            
            <div class="form-group">
              <label for="full-name">पूरा नाम</label>
              <input type="text" id="full-name" placeholder="आपका नाम दर्ज करें" required />
            </div>

            <div class="form-group">
              <label for="email">ईमेल पता</label>
              <input type="email" id="register-email" placeholder="example@email.com" required />
            </div>
            
            <div class="form-group">
              <label for="password">पासवर्ड</label>
              <input type="password" id="register-password" placeholder="कम से कम 6 अक्षर" minlength="6" required />
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;" id="register-btn">
              खाता बनाएं ✨
            </button>
          </form>
          
          <div class="auth-card__footer">
            <p>पहले से खाता है? <a href="#/login" style="color: var(--color-primary); font-weight: 600;">लॉगिन करें</a></p>
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

        if (data.user && data.session) {
          navigate('/');
        } else {
          errorEl.textContent = 'सफलता! कृपया अपना ईमेल सत्यापित करें।';
          errorEl.style.display = 'block';
          errorEl.style.backgroundColor = '#dcfce7';
          errorEl.style.color = '#166534';
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
      errorEl.style.backgroundColor = '#fee2e2';
      errorEl.style.color = '#991b1b';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
