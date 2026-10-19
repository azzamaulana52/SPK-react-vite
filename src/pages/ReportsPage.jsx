function ReportsPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Laporan</p>
          <h1>Laporan Hasil Seleksi</h1>
        </div>
        <button type="button" className="secondary-button">Cetak laporan</button>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Ringkasan hasil</h2>
          <span className="badge neutral">Format menunggu keputusan</span>
        </div>

        <div className="report-summary">
          <div>
            <strong>182</strong>
            <span>Siswa memiliki data lengkap</span>
          </div>
          <div>
            <strong>24</strong>
            <span>Rekomendasi siap review</span>
          </div>
          <div>
            <strong>6</strong>
            <span>Kelas terdaftar</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportsPage;
