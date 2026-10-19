const recommendations = [
  { student: 'Alya Putri', score: 0.91, className: 'Intermediate', status: 'Disetujui' },
  { student: 'Citra Lestari', score: 0.88, className: 'Intermediate', status: 'Review' },
  { student: 'Budi Setiawan', score: 0.74, className: 'Elementary B', status: 'Usulan' },
];

function RecommendationsPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Rekomendasi</p>
          <h1>Hasil Rekomendasi</h1>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Peringkat kelas</h2>
          <span className="badge info">Aturan pemetaan menunggu finalisasi</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Skor SAW</th>
                <th>Kelas usulan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((row) => (
                <tr key={row.student}>
                  <td>{row.student}</td>
                  <td>{row.score}</td>
                  <td>{row.className}</td>
                  <td><span className="badge success">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default RecommendationsPage;
