import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react';

const DEMO_EMAIL = 'admin@englishclass.id';
const DEMO_PASSWORD = 'admin123';

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleFillDemo = () => {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoading) return;

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
    setIsLoading(true);

    // Simulasi proses singkat agar tombol menampilkan indikator loading.
    window.setTimeout(() => {
      onLogin();
    }, 550);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Sisi hero */}
        <aside className="login-hero">
          <div className="login-hero-glow" aria-hidden="true" />
          <div className="login-hero-shapes" aria-hidden="true">
            <span className="shape shape-1" />
            <span className="shape shape-2" />
            <span className="shape shape-3" />
          </div>

          <div className="login-hero-content">
            <div className="login-brand-row">
              <span className="login-hero-mark">LC</span>
              <div className="login-brand-text">
                <strong>Life Course</strong>
                <small>English Learning Center</small>
              </div>
            </div>

            <span className="login-hero-pill"><Sparkles size={14} /> Decision Support System</span>
            <h1>Selamat datang kembali</h1>
            <p className="muted-text">
              Sistem rekomendasi penempatan kelas Bahasa Inggris berbasis SAW. Masuk untuk
              mengelola data siswa, kelas, kriteria, dan melihat hasil rekomendasi.
            </p>

            <ul className="login-hero-points">
              <li><CheckCircle2 size={18} /> Penempatan kelas otomatis berbasis SAW</li>
              <li><CheckCircle2 size={18} /> Kelola siswa, kriteria, bobot, dan nilai</li>
              <li><CheckCircle2 size={18} /> Hasil ranking & laporan rekomendasi</li>
            </ul>
          </div>

          <div className="login-hero-footer">
            <ShieldCheck size={16} />
            <span>Demo aman — kredensial hanya tersimpan lokal di browser Anda.</span>
          </div>
        </aside>

        {/* Sisi form */}
        <section className="login-form-wrap">
          <div className="login-form-head">
            <h2>Masuk</h2>
            <p className="muted-text">Gunakan akun demo untuk menjelajah sistem.</p>
          </div>

          <div className="demo-credentials" aria-label="Kredensial demo">
            <Info size={15} />
            <div className="demo-credentials-text">
              <span>Demo:</span>
              <strong>{DEMO_EMAIL}</strong>
              <span>·</span>
              <strong>{DEMO_PASSWORD}</strong>
            </div>
            <button
              type="button"
              className="demo-fill-button"
              onClick={handleFillDemo}
              aria-label="Isi kredensial demo secara otomatis"
            >
              <Wand2 size={14} /> Isi otomatis
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="login-field">
              <span>Email atau username</span>
              <div className={`login-input ${error ? 'has-error' : ''}`}>
                <Mail size={18} />
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@englishclass.id"
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="login-field">
              <span>Kata sandi</span>
              <div className={`login-input ${error ? 'has-error' : ''}`}>
                <Lock size={18} />
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="login-form-row">
              <label className="login-checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Ingat saya</span>
              </label>
              <span className="login-forgot">Lupa kata sandi?</span>
            </div>

            {error ? (
              <p className="error-text login-error" role="alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </p>
            ) : null}

            <button type="submit" className="primary-button login-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          <Link to="/" className="login-back-link">
            <span aria-hidden="true">←</span> Kembali ke beranda Life Course
          </Link>

          <p className="login-footnote muted-text">
            Belum punya akun? <span className="login-footnote-action">Hubungi admin Life Course</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
