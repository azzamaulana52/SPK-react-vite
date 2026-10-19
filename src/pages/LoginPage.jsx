import { useState } from 'react';

const DEMO_EMAIL = 'admin@englishclass.id';
const DEMO_PASSWORD = 'admin123';

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    const isValid =
      form.email.trim().toLowerCase() === DEMO_EMAIL &&
      form.password === DEMO_PASSWORD;

    if (!isValid) {
      setError('Login gagal. Cek kembali email dan kata sandi demo Anda.');
      return;
    }

    setError('');
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-hero">
          <div className="brand-mark large">E</div>
          <p className="eyebrow">Decision Support System</p>
          <h1>English Class SPK</h1>
          <p className="muted-text">Demo autentikasi dan dashboard rekomendasi kelas Bahasa Inggris.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2>Masuk</h2>

          <div className="demo-credentials" aria-label="Demo credentials">
            <span>Demo:</span>
            <strong>{DEMO_EMAIL}</strong>
            <span> / {DEMO_PASSWORD}</span>
          </div>

          <label>
            <span>Email atau username</span>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@englishclass.id"
              autoComplete="username"
            />
          </label>

          <label>
            <span>Kata sandi</span>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? 'Sembunyikan' : 'Lihat'}
              </button>
            </div>
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="primary-button">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
