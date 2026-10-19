import { useMemo, useState } from 'react';

const defaultForm = {
  id: '',
  name: '',
  type: 'Benefit',
  weight: '0.1'
};

function CriteriaPage({ criteria, setCriteria }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState('');

  const totalWeight = useMemo(
    () => criteria.reduce((sum, item) => sum + Number(item.weight), 0),
    [criteria]
  );

  const isValidWeight = criteria.length > 0 && Math.abs(totalWeight - 1) < 0.0001;

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setFormError('');
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      id: item.id,
      name: item.name,
      type: item.type,
      weight: String(item.weight)
    });
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const weight = Number(form.weight);

    if (!name) {
      setFormError('Nama kriteria wajib diisi.');
      return;
    }

    if (criteria.some((item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== editingId)) {
      setFormError('Nama kriteria sudah digunakan.');
      return;
    }

    if (!Number.isFinite(weight) || weight <= 0 || weight > 1) {
      setFormError('Bobot demo harus lebih dari 0 dan maksimal 1.');
      return;
    }

    let id = editingId;
    if (!id) {
      const existingIds = new Set(criteria.map((item) => item.id));
      let sequence = 1;
      do {
        id = `C-${String(sequence).padStart(2, '0')}`;
        sequence += 1;
      } while (existingIds.has(id));
    }

    const prepared = {
      id,
      name,
      type: form.type,
      weight
    };

    if (editingId) {
      setCriteria((current) =>
        current.map((item) => (item.id === editingId ? prepared : item))
      );
    } else {
      setCriteria((current) => [...current, prepared]);
    }

    setShowForm(false);
    setForm(defaultForm);
    setEditingId(null);
    setFormError('');
  };

  const handleDelete = (criterionId) => {
    const target = criteria.find((item) => item.id === criterionId);
    if (!target) return;

    if (window.confirm(`Hapus kriteria ${target.name}?`)) {
      setCriteria((current) => current.filter((item) => item.id !== criterionId));
    }
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Konfigurasi</p>
          <h1>Kriteria &amp; Bobot</h1>
        </div>
        <div className="page-header-actions">
          <span className="badge neutral">Data demo</span>
          <button type="button" className="primary-button" onClick={handleOpenCreate}>+ Tambah kriteria</button>
        </div>
      </section>

      {showForm ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="criterion-form-title">
          <div className="modal-card">
            <div className="panel-head">
              <h2 id="criterion-form-title">{editingId ? 'Edit kriteria' : 'Tambah kriteria'}</h2>
              <button type="button" className="ghost-button" onClick={() => setShowForm(false)}>Tutup</button>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
              <label>
                <span>Nama kriteria</span>
                <input required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
              </label>
              <label>
                <span>Atribut</span>
                <select value={form.type} onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}>
                  <option value="Benefit">Benefit</option>
                  <option value="Cost">Cost</option>
                </select>
              </label>
              <label className="full-width">
                <span>Bobot</span>
                <input required type="number" step="0.01" min="0.01" max="1" value={form.weight} onChange={(event) => setForm((prev) => ({ ...prev, weight: event.target.value }))} />
              </label>

              {formError ? <p className="error-text full-width" role="alert">{formError}</p> : null}

              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Batal</button>
                <button type="submit" className="primary-button">{editingId ? 'Simpan' : 'Tambah'}</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <section className="panel">
        <div className="panel-head">
          <h2>Daftar kriteria</h2>
          <div className="page-header-actions">
            <span className={`badge ${isValidWeight ? 'success' : 'warning'}`}>
              Total bobot: {totalWeight.toFixed(2)} / 1.00
            </span>
            <span className="badge neutral">Aturan demo</span>
          </div>
        </div>

        <p className={`weight-status ${isValidWeight ? 'valid' : 'invalid'}`} role="status">
          {isValidWeight
            ? 'Total bobot demo valid.'
            : 'Total bobot demo harus tepat 1.00 sebelum perhitungan dapat digunakan.'}
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Atribut</th>
                <th>Bobot</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {criteria.length === 0 ? (
                <tr><td className="empty-state" colSpan="5">Belum ada kriteria demo.</td></tr>
              ) : criteria.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.weight.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${isValidWeight ? 'success' : 'warning'}`}>
                      {isValidWeight ? 'Valid' : 'Perlu review'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button type="button" className="link-button" onClick={() => handleEdit(item)}>Edit</button>
                    <button type="button" className="link-button danger" onClick={() => handleDelete(item.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default CriteriaPage;
