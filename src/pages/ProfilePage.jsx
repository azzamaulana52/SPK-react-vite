function ProfilePage({ user }) {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Akun</p>
          <h1>Profil Pengguna</h1>
        </div>
      </section>

      <section className="panel profile-card">
        <div className="profile-header">
          <div className="user-avatar large">A</div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <label>
            <span>Nama tampilan</span>
            <input value={user.name} readOnly />
          </label>
          <label>
            <span>Email</span>
            <input value={user.email} readOnly />
          </label>
          <button type="button" className="primary-button">Simpan perubahan</button>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
