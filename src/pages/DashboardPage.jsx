import StatCard from '../components/StatCard';

const stats = [
  { title: 'Total Siswa', value: '248', hint: '+12 dari bulan lalu', tone: 'blue' },
  { title: 'Kelas Aktif', value: '6', hint: '2 kelas baru dibuka', tone: 'navy' },
  { title: 'Sudah Tes', value: '182', hint: '73% siswa lengkap', tone: 'yellow' },
  { title: 'Rekomendasi', value: '24', hint: 'Perlu review petugas', tone: 'green' }
];

const activities = [
  { type: 'success', title: 'Nilai tes disimpan', meta: 'Rina Fadila · 09:20' },
  { type: 'info', title: 'Bobot kriteria diperbarui', meta: 'Grammar, Vocabulary · 08:45' },
  { type: 'warning', title: 'Review rekomendasi kelas', meta: '3 item menunggu review' }
];

const pipeline = [
  { label: 'Data siswa', value: 92, tone: 'blue' },
  { label: 'Kriteria & bobot', value: 78, tone: 'navy' },
  { label: 'Nilai tes', value: 67, tone: 'green' },
  { label: 'Rekomendasi', value: 54, tone: 'warning' }
];

const classes = [
  { name: 'Beginner A', total: 26, capacity: 30, status: 'Siap' },
  { name: 'Elementary B', total: 22, capacity: 25, status: 'Penuh 88%' },
  { name: 'Intermediate', total: 18, capacity: 20, status: 'Ideal' }
];

function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Ringkasan</p>
          <h1>Dashboard</h1>
        </div>
        <span className="badge neutral">Data demo</span>
      </section>

      <section className="stat-grid">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="content-grid two-col">
        <div className="panel">
          <div className="panel-head">
            <h2>Aktivitas terbaru</h2>
            <span className="badge info">Demo</span>
          </div>
          <ul className="activity-list">
            {activities.map((activity) => (
              <li key={activity.title}>
                <span className={`dot ${activity.type}`} />
                <div>
                  <strong>{activity.title}</strong>
                  <small>{activity.meta}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Performa</h2>
            <span className="badge neutral">Data demo</span>
          </div>
          <div className="chart-bars" aria-label="Grafik demo performa">
            <span style={{ height: '35%' }} />
            <span style={{ height: '55%' }} />
            <span style={{ height: '42%' }} />
            <span style={{ height: '68%' }} />
            <span style={{ height: '78%' }} />
            <span style={{ height: '92%' }} />
          </div>
          <div className="chart-labels">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>Mei</span>
            <span>Jun</span>
          </div>
        </div>
      </section>

      <section className="content-grid two-col">
        <div className="panel">
          <div className="panel-head">
            <h2>Progres proses</h2>
            <span className="badge neutral">Data demo</span>
          </div>
          <div className="progress-list">
            {pipeline.map((item) => (
              <div key={item.label} className="progress-item">
                <div className="progress-header">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="progress-track">
                  <span className={item.tone} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Kapasitas kelas</h2>
            <span className="badge neutral">Data demo</span>
          </div>
          <div className="class-list">
            {classes.map((klass) => (
              <div key={klass.name} className="class-row">
                <div>
                  <strong>{klass.name}</strong>
                  <small>{klass.total}/{klass.capacity} siswa</small>
                </div>
                <span className="badge neutral">{klass.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
