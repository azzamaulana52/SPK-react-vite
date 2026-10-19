import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  SlidersHorizontal,
  UserCircle2,
  Users,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Data Siswa', to: '/students', icon: Users },
  { label: 'Data Kelas', to: '/classes', icon: BookOpen },
  { label: 'Kriteria & Bobot', to: '/criteria', icon: SlidersHorizontal },
  { label: 'Input Nilai Tes', to: '/scores', icon: BriefcaseBusiness },
  { label: 'Perhitungan SAW', to: '/saw', icon: BarChart3 },
  { label: 'Hasil Rekomendasi', to: '/recommendations', icon: FileText },
  { label: 'Laporan', to: '/reports', icon: FileText },
  { label: 'Profil Pengguna', to: '/profile', icon: UserCircle2 },
];

function Sidebar({ onLogout, onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    onNavigate();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="brand-box">
        <div className="brand-mark">E</div>
        <div>
          <p className="eyebrow">SPK</p>
          <h1>English Class</h1>
        </div>
      </div>

      <nav id="main-navigation" className="sidebar-nav" aria-label="Main navigation">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="logout-button" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
