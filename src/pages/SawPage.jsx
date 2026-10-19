import { useState } from 'react';
import { calculateSaw } from '../lib/saw';

const createAlternatives = (students, scores) =>
  students.map((student) => ({
    id: student.id,
    student: student.name,
    ...(scores[student.id] ?? {})
  }));

function SawPage({ students, criteria, scores }) {
  const [result, setResult] = useState(() =>
    calculateSaw(createAlternatives(students, scores), criteria)
  );

  const handleRecalculate = () => {
    setResult(calculateSaw(createAlternatives(students, scores), criteria));
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Algoritma</p>
          <h1>Perhitungan SAW</h1>
        </div>
        <div className="page-header-actions">
          <span className="badge neutral">Demo</span>
          <button type="button" className="primary-button" onClick={handleRecalculate}>Hitung ulang</button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Hasil preferensi</h2>
          <span className={`badge ${result.valid ? 'success' : 'warning'}`}>
            {result.valid ? 'Perhitungan berhasil' : 'Data belum siap'}
          </span>
        </div>

        <p className={result.valid ? 'success-text' : 'error-text'} role={result.valid ? 'status' : 'alert'}>
          {result.message}
        </p>
        <p className="muted-text">
          Total bobot: {result.totalWeight.toFixed(2)}. Penyebut nol menghasilkan normalisasi 0. Jika preferensi enam desimal sama, urutan ditentukan berdasarkan nama siswa secara alfabetis, lalu ID siswa.
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Urutan</th>
                <th>Siswa</th>
                <th>Nilai Preferensi</th>
              </tr>
            </thead>
            <tbody>
              {!result.valid ? (
                <tr><td className="empty-state" colSpan="3">Peringkat belum tersedia.</td></tr>
              ) : result.ranked.map((row) => (
                <tr key={row.id}>
                  <td>{row.rank}</td>
                  <td>{row.student}</td>
                  <td>{row.score.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Detail matriks keputusan</h2>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Siswa</th>
                {criteria.map((criterion) => (
                  <th key={criterion.id} colSpan="2">{criterion.name} ({criterion.type})</th>
                ))}
              </tr>
              <tr>
                <th />
                {criteria.flatMap((criterion) => [
                  <th key={`${criterion.id}-normalized`}>Normalisasi</th>,
                  <th key={`${criterion.id}-weighted`}>Terbobot</th>
                ])}
              </tr>
            </thead>
            <tbody>
              {!result.valid ? (
                <tr><td className="empty-state" colSpan={criteria.length * 2 + 1}>Matriks belum tersedia.</td></tr>
              ) : result.matrix.map((row) => (
                <tr key={row.id}>
                  <td>{row.student}</td>
                  {row.details.flatMap((detail) => [
                    <td key={`${row.id}-${detail.criterion}-normalized`}>{detail.normalized.toFixed(3)}</td>,
                    <td key={`${row.id}-${detail.criterion}-weighted`}>{detail.weighted.toFixed(3)}</td>
                  ])}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default SawPage;
