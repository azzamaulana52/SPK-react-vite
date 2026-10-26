import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from 'lucide-react';

// Data dummy program / kelas Bahasa Inggris.
// Catatan: ini data demonstrasi untuk landing page, bukan data produksi.
const programs = [
  {
    id: 'beginner',
    name: 'Beginner A1',
    level: 'Pemula',
    duration: '12 minggu',
    format: 'Online / Offline',
    price: 'Rp 850.000',
    schedule: '2x / minggu',
    seats: 25,
    badge: 'Populer',
    description: 'Fondasi pertama untuk pelajar yang baru mengenal Bahasa Inggris.',
    features: ['Grammar dasar', 'Kosakata sehari-hari', 'Pengucapan (pronunciation)', 'Listening dasar'],
  },
  {
    id: 'elementary',
    name: 'Elementary A2',
    level: 'Dasar',
    duration: '12 minggu',
    format: 'Online / Offline',
    price: 'Rp 950.000',
    schedule: '2x / minggu',
    seats: 22,
    badge: '',
    description: 'Penguatan struktur kalimat dan komunikasi sederhana.',
    features: ['Tenses dasar', 'Reading pendek', 'Speaking percakapan', 'Writing sederhana'],
  },
  {
    id: 'intermediate',
    name: 'Intermediate B1',
    level: 'Menengah',
    duration: '14 minggu',
    format: 'Online / Offline',
    price: 'Rp 1.100.000',
    schedule: '3x / minggu',
    seats: 20,
    badge: 'Populer',
    description: 'Komunikasi aktif untuk situasi sehari-hari dan akademik.',
    features: ['Grammar lanjutan', 'Discussion & debate', 'Listening advanced', 'Essay writing'],
  },
  {
    id: 'advanced',
    name: 'Advanced B2',
    level: 'Tinggi',
    duration: '14 minggu',
    format: 'Offline',
    price: 'Rp 1.250.000',
    schedule: '3x / minggu',
    seats: 18,
    badge: '',
    description: 'Menguasai Bahasa Inggris untuk kebutuhan profesional dan akademik.',
    features: ['Academic writing', 'Public speaking', 'IELTS / TOEFL prep', 'Business English'],
  },
  {
    id: 'conversation',
    name: 'Conversation Class',
    level: 'Semua Level',
    duration: '8 minggu',
    format: 'Online',
    price: 'Rp 700.000',
    schedule: '1x / minggu',
    seats: 15,
    badge: '',
    description: 'Fokus percakapan langsung bersama native speaker.',
    features: ['Native speaker', 'Role play', 'Topic discussion', 'Pronunciation clinic'],
  },
  {
    id: 'business',
    name: 'Business English',
    level: 'Menengah+',
    duration: '10 minggu',
    format: 'Offline / Corporate',
    price: 'Rp 1.500.000',
    schedule: '2x / minggu',
    seats: 16,
    badge: 'Korporat',
    description: 'Bahasa Inggris profesional untuk dunia kerja dan karier.',
    features: ['Email & report', 'Meeting & negosiasi', 'Presentasi', 'Networking'],
  },
];

const stats = [
  { label: 'Siswa aktif', value: '1.200+' },
  { label: 'Program kelas', value: '6' },
  { label: 'Pengajar bersertifikat', value: '18' },
  { label: 'Tahun pengalaman', value: '8' },
];

const features = [
  { icon: Target, title: 'Penempatan Kelas Akurat', text: 'Sistem rekomendasi berbasis SAW menempatkanmu di kelas yang paling sesuai dengan kemampuanmu.' },
  { icon: GraduationCap, title: 'Pengajar Bersertifikat', text: 'Diajar langsung oleh instruktur berpengalaman dan tersertifikasi TEFL / TESOL.' },
  { icon: Calendar, title: 'Jadwal Fleksibel', text: 'Pilihan kelas online dan offline dengan jadwal yang dapat disesuaikan.' },
  { icon: Award, title: 'Sertifikat Resmi', text: 'Dapatkan sertifikat resmi setelah menyelesaikan setiap program pembelajaran.' },
  { icon: Users, title: 'Kelas Kecil', text: 'Maksimal 25 siswa per kelas agar pembelajaran tetap fokus dan personal.' },
  { icon: HeartHandshake, title: 'Pendampingan Personal', text: 'Konsultan akademik mendampingi progres belajar dari awal hingga lulus.' },
];

const steps = [
  { no: '01', title: 'Tes Penempatan', text: 'Ikuti tes diagnostik yang menilai Grammar, Vocabulary, Reading, Listening, dan Speaking.' },
  { no: '02', title: 'Penilaian SAW', text: 'Sistem menghitung nilai dengan metode SAW berdasarkan kriteria dan bobot yang ditentukan.' },
  { no: '03', title: 'Rekomendasi Kelas', text: 'Dapatkan rekomendasi kelas yang paling cocok dengan profil kemampuanmu.' },
];

const testimonials = [
  { name: 'Alya Putri', role: 'Siswa Intermediate B1', rating: 5, text: 'Sistem rekomendasi membantu saya masuk ke kelas yang pas. Progres speaking saya naik drastis dalam tiga bulan.' },
  { name: 'Budi Setiawan', role: 'Alumni Business English', rating: 5, text: 'Materinya praktis untuk dunia kerja. Saya jadi lebih percaya diri saat meeting dengan klien luar negeri.' },
  { name: 'Citra Lestari', role: 'Siswa Conversation Class', rating: 4, text: 'Kelas kecil dan diajar native speaker, jadi saya terbiasa ngomong Inggris tanpa ragu.' },
];

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Program', href: '#program' },
  { label: 'Cara Pemilihan', href: '#cara-pemilihan' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'Kontak', href: '#kontak' },
];

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="landing-page">
      {/* ===== Header / Navigasi ===== */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <a href="#beranda" className="landing-brand" onClick={closeMobileMenu}>
            <span className="landing-brand-mark">LC</span>
            <span className="landing-brand-text">
              <strong>Life Course</strong>
              <small>English Learning Center</small>
            </span>
          </a>

          <nav className="landing-nav" aria-label="Navigasi landing page">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div className="landing-header-actions">
            <Link to="/login" className="landing-login-link">Masuk</Link>
            <Link to="/login" className="primary-button landing-cta-button">Coba Demo SPK</Link>
            <button
              type="button"
              className="landing-menu-toggle"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="landing-mobile-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}</a>
            ))}
            <Link to="/login" onClick={closeMobileMenu} className="primary-button landing-cta-button">Coba Demo SPK</Link>
          </div>
        ) : null}
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section id="beranda" className="landing-hero">
          <div className="landing-hero-inner">
            <div className="landing-hero-copy">
              <span className="landing-pill"><Sparkles size={14} /> Kursus Bahasa Inggris Terpercaya</span>
              <h1>
                Temukan kelas Bahasa Inggris<br />
                yang paling <span className="landing-accent">pas untukmu</span>
              </h1>
              <p className="muted-text">
                Life Course membantu kamu menemukan kelas yang tepat lewat sistem rekomendasi
                berbasis SAW, sehingga pembelajaran lebih efektif dan sesuai kemampuan.
              </p>
              <div className="landing-hero-actions">
                <Link to="/login" className="primary-button landing-cta-button large">
                  Mulai Coba Demo SPK
                </Link>
                <a href="#program" className="secondary-button landing-cta-button large">Lihat Program</a>
              </div>
              <ul className="landing-hero-points">
                <li><CheckCircle2 size={18} /> Penempatan kelas berbasis SAW</li>
                <li><CheckCircle2 size={18} /> Pengajar bersertifikat</li>
                <li><CheckCircle2 size={18} /> Sertifikat resmi</li>
              </ul>
            </div>

            <div className="landing-hero-card" aria-hidden="true">
              <div className="landing-hero-card-head">
                <span className="landing-pill small">Rekomendasi SAW</span>
                <strong>Profil Siswa</strong>
              </div>
              <ul className="landing-hero-scores">
                <li><span>Grammar</span><div className="landing-bar"><span style={{ width: '88%' }} /></div><strong>88</strong></li>
                <li><span>Vocabulary</span><div className="landing-bar"><span style={{ width: '90%' }} /></div><strong>90</strong></li>
                <li><span>Reading</span><div className="landing-bar"><span style={{ width: '85%' }} /></div><strong>85</strong></li>
                <li><span>Listening</span><div className="landing-bar"><span style={{ width: '78%' }} /></div><strong>78</strong></li>
                <li><span>Speaking</span><div className="landing-bar"><span style={{ width: '86%' }} /></div><strong>86</strong></li>
              </ul>
              <div className="landing-hero-result">
                <CheckCircle2 size={18} />
                <div>
                  <small>Rekomendasi kelas</small>
                  <strong>Intermediate B1</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Statistik ===== */}
        <section className="landing-stats" aria-label="Statistik Life Course">
          <div className="landing-container landing-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="landing-stat">
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Program / Pemilihan Kelas ===== */}
        <section id="program" className="landing-section">
          <div className="landing-container">
            <div className="landing-section-head">
              <p className="eyebrow">Program Kelas</p>
              <h2>Pilih kelas Bahasa Inggris yang sesuai levelmu</h2>
              <p className="muted-text">
                Data berikut adalah contoh program kelas yang tersedia di Life Course.
                Sistem SPK akan membantu menentukan kelas mana yang paling cocok untukmu.
              </p>
            </div>

            <div className="landing-program-grid">
              {programs.map((program) => (
                <article key={program.id} className="landing-program-card">
                  <div className="landing-program-card-head">
                    <div>
                      <span className="badge info">{program.level}</span>
                      <h3>{program.name}</h3>
                    </div>
                    {program.badge ? <span className="landing-program-badge">{program.badge}</span> : null}
                  </div>

                  <p className="muted-text">{program.description}</p>

                  <ul className="landing-program-meta">
                    <li><Clock size={15} /> {program.duration}</li>
                    <li><Calendar size={15} /> {program.schedule}</li>
                    <li><BookOpen size={15} /> {program.format}</li>
                    <li><Users size={15} /> Maks. {program.seats} siswa</li>
                  </ul>

                  <ul className="landing-program-features">
                    {program.features.map((feature) => (
                      <li key={feature}><CheckCircle2 size={16} /> {feature}</li>
                    ))}
                  </ul>

                  <div className="landing-program-footer">
                    <div className="landing-program-price">
                      <small>Investasi / program</small>
                      <strong>{program.price}</strong>
                    </div>
                    <Link to="/login" className="secondary-button landing-cta-button">Daftar</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Cara Pemilihan Kelas ===== */}
        <section id="cara-pemilihan" className="landing-section alt">
          <div className="landing-container">
            <div className="landing-section-head">
              <p className="eyebrow">Cara Kerja</p>
              <h2>Bagaimana sistem menentukan kelas terbaik untukmu</h2>
              <p className="muted-text">
                Life Course memanfaatkan metode Simple Additive Weighting (SAW) untuk
                menempatkan setiap siswa di kelas yang paling sesuai.
              </p>
            </div>

            <div className="landing-steps">
              {steps.map((step) => (
                <article key={step.no} className="landing-step">
                  <span className="landing-step-no">{step.no}</span>
                  <h3>{step.title}</h3>
                  <p className="muted-text">{step.text}</p>
                </article>
              ))}
            </div>

            <div className="landing-steps-cta">
              <Link to="/login" className="primary-button landing-cta-button large">Coba Demo Penempatan Kelas</Link>
            </div>
          </div>
        </section>

        {/* ===== Keunggulan ===== */}
        <section id="keunggulan" className="landing-section">
          <div className="landing-container">
            <div className="landing-section-head">
              <p className="eyebrow">Keunggulan</p>
              <h2>Kenapa belajar di Life Course?</h2>
              <p className="muted-text">
                Kami menggabungkan pendekatan personal dengan teknologi agar pembelajaran
                lebih terarah dan terukur.
              </p>
            </div>

            <div className="landing-features-grid">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="landing-feature">
                  <span className="landing-feature-icon"><Icon size={22} /></span>
                  <h3>{title}</h3>
                  <p className="muted-text">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimoni ===== */}
        <section id="testimoni" className="landing-section alt">
          <div className="landing-container">
            <div className="landing-section-head">
              <p className="eyebrow">Testimoni</p>
              <h2>Apa kata siswa Life Course</h2>
              <p className="muted-text">Cerita nyata dari para pelajar yang menemukan kelas yang tepat.</p>
            </div>

            <div className="landing-testimonials">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="landing-testimonial">
                  <Quote size={26} className="landing-quote-icon" />
                  <div className="landing-testimonial-rating" aria-label={`${testimonial.rating} dari 5 bintang`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={index < testimonial.rating ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                  </div>
                  <p>{testimonial.text}</p>
                  <div className="landing-testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.role}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA Akhir ===== */}
        <section className="landing-cta-section">
          <div className="landing-container landing-cta-box">
            <div>
              <p className="eyebrow">Mulai Sekarang</p>
              <h2>Tentukan kelas Bahasa Inggris terbaik untukmu</h2>
              <p className="muted-text">
                Coba demo sistem rekomendasi kelas berbasis SAW dan temukan program yang
                paling cocok dengan kemampuanmu.
              </p>
            </div>
            <Link to="/login" className="primary-button landing-cta-button large">Masuk ke Sistem SPK</Link>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer id="kontak" className="landing-footer">
        <div className="landing-container landing-footer-grid">
          <div className="landing-footer-brand">
            <a href="#beranda" className="landing-brand">
              <span className="landing-brand-mark">LC</span>
              <span className="landing-brand-text">
                <strong>Life Course</strong>
                <small>English Learning Center</small>
              </span>
            </a>
            <p className="muted-text">
              Kursus Bahasa Inggris dengan sistem rekomendasi penempatan kelas berbasis SAW.
              Membantu setiap siswa belajar di level yang tepat.
            </p>
          </div>

          <div className="landing-footer-col">
            <h4>Navigasi</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="landing-footer-col">
            <h4>Program</h4>
            <ul>
              {programs.map((program) => (
                <li key={program.id}><a href="#program">{program.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="landing-footer-col">
            <h4>Kontak</h4>
            <ul className="landing-footer-contact">
              <li><MapPin size={16} /> Jl. Pendidikan No. 12, Jakarta</li>
              <li><Phone size={16} /> (021) 5550-1234</li>
              <li><Mail size={16} /> halo@lifecourse.id</li>
            </ul>
            <Link to="/login" className="secondary-button landing-cta-button">Masuk Sistem</Link>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <div className="landing-container">
            <small>© 2026 Life Course — English Learning Center. Data yang ditampilkan merupakan data demonstrasi.</small>
            <small className="muted-text">Demo SPK Penempatan Kelas Bahasa Inggris</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
