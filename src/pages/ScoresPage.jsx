import { useEffect, useMemo, useState } from 'react';

function ScoresPage({ students, criteria, scores, setScores }) {
  const [draftScores, setDraftScores] = useState(scores);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setDraftScores(scores);
  }, [scores]);

  const completeStudentCount = useMemo(
    () => students.filter((student) =>
      criteria.length > 0 && criteria.every((criterion) => {
        const value = draftScores[student.id]?.[criterion.id];
        return value !== undefined && value !== '' && Number.isFinite(Number(value)) &&
          Number(value) >= 0 && Number(value) <= 100;
      })
    ).length,
    [students, criteria, draftScores]
  );

  const handleInputChange = (studentId, criterionId, value) => {
    setDraftScores((current) => ({
      ...current,
      [studentId]: {
        ...(current[studentId] ?? {}),
        [criterionId]: value
      }
    }));
    setError('');
    setSuccess('');
  };

  const handleSave = () => {
    if (!criteria.length) {
      setError('Tambahkan kriteria demo sebelum memasukkan nilai.');
      setSuccess('');
      return;
    }

    const hasInvalidScore = students.some((student) =>
      criteria.some((criterion) => {
        const value = draftScores[student.id]?.[criterion.id];
        if (value === undefined || String(value).trim() === '') return false;
        const numericValue = Number(value);
        return !Number.isFinite(numericValue) || numericValue < 0 || numericValue > 100;
      })
    );

    if (hasInvalidScore) {
      setError('Nilai demo harus berupa angka dalam rentang 0 sampai 100.');
      setSuccess('');
      return;
    }

    setScores(draftScores);
    setError('');
    setSuccess('Nilai demo disimpan selama sesi ini.');
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Penilaian</p>
          <h1>Input Nilai Tes</h1>
        </div>
        <div className="page-header-actions">
          <span className="badge neutral">Data demo</span>
          <button type="button" className="primary-button" onClick={handleSave}>Simpan nilai</button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Nilai siswa</h2>
          <span className="badge neutral">{completeStudentCount}/{students.length} siswa lengkap (demo)</span>
        </div>

        <p className="muted-text">Rentang nilai 0–100 hanya untuk data demo; nilai kosong ditandai belum lengkap.</p>
        {error ? <p className="error-text" role="alert">{error}</p> : null}
        {success ? <p className="success-text" role="status">{success}</p> : null}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Siswa</th>
                {criteria.map((criterion) => (
                  <th key={criterion.id}>{criterion.name}</th>
                ))}
                <th>Kelengkapan</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td className="empty-state" colSpan={criteria.length + 2}>Belum ada siswa demo untuk dinilai.</td></tr>
              ) : students.map((student) => {
                const studentScores = draftScores[student.id] ?? {};
                const isComplete = criteria.length > 0 && criteria.every((criterion) => {
                  const value = studentScores[criterion.id];
                  return value !== undefined && value !== '' && Number.isFinite(Number(value)) &&
                    Number(value) >= 0 && Number(value) <= 100;
                });

                return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  {criteria.map((criterion) => (
                    <td key={`${student.id}-${criterion.id}`}>
                      <input
                        className="score-input"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        aria-label={`${student.name}, nilai ${criterion.name}`}
                        value={studentScores[criterion.id] ?? ''}
                        onChange={(event) => handleInputChange(student.id, criterion.id, event.target.value)}
                      />
                    </td>
                  ))}
                  <td>
                    <span className={`badge ${isComplete ? 'success' : 'warning'}`}>
                      {isComplete ? 'Lengkap' : 'Belum lengkap'}
                    </span>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ScoresPage;
