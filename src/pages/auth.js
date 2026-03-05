import { supabase } from '../utils/supabase.js';
import { navigate } from '../router.js';

export function renderLogin() {
  return `
    <section class="auth-page" style="padding: 120px 0;">
      <div class="container container--narrow">
        <div class="auth-card glass-card fade-in">
          <div class="auth-card__header">
            <h2>Welcome Back</h2>
            <p>Login to your spiritual account</p>
          </div>
          
          <form class="auth-form" id="login-form">
            <div id="auth-error" class="auth-error" style="display:none; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.875rem;"></div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="login-email" placeholder="devotee@example.com" required />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="login-password" placeholder="••••••••" required />
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;" id="login-btn">
              Login 🙏
            </button>
          </form>
          
          <div class="auth-card__footer">
            <p>Don't have an account? <a href="#/register" style="color: var(--color-primary); font-weight: 600;">Register Now</a></p>
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
            <h2>Create Account</h2>
            <p>Join the HanumanSetu family of devotees</p>
          </div>
          
          <form class="auth-form" id="register-form">
            <div id="auth-error" class="auth-error" style="display:none; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.875rem;"></div>
            
            <div class="form-group">
              <label for="full-name">Full Name</label>
              <input type="text" id="full-name" placeholder="Enter your name" required />
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="register-email" placeholder="devotee@example.com" required />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="register-password" placeholder="Minimum 6 characters" minlength="6" required />
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;" id="register-btn">
              Create Account ✨
            </button>
          </form>
          
          <div class="auth-card__footer">
            <p>Already have an account? <a href="#/login" style="color: var(--color-primary); font-weight: 600;">Login Here</a></p>
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
    btn.textContent = 'Please wait...';
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
          errorEl.textContent = 'Success! Please check your email for verification.';
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
      errorEl.textContent = err.message || 'Something went wrong. Please try again.';
      errorEl.style.display = 'block';
      errorEl.style.backgroundColor = '#fee2e2';
      errorEl.style.color = '#991b1b';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
