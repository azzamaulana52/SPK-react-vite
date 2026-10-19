import { Bell, Search, SlidersHorizontal } from 'lucide-react';

function Topbar({ userName = 'Admin SPK', isMobileMenuOpen, onMenuToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-title-group">
        <button
          type="button"
          className="mobile-only icon-button"
          aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation"
          onClick={onMenuToggle}
        >
          ☰
        </button>
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>English Class Placement</h2>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="search-box" aria-label="Pencarian">
          <Search size={18} />
          <input type="text" placeholder="Cari data..." />
        </label>
        <button type="button" className="icon-button" aria-label="Filter">
          <SlidersHorizontal size={18} />
        </button>
        <button type="button" className="icon-button" aria-label="Notifikasi">
          <Bell size={18} />
        </button>
        <div className="user-pill">
          <span className="user-avatar">A</span>
          <div>
            <strong>{userName}</strong>
            <small>Admin</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
