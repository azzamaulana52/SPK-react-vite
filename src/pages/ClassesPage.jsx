import { useMemo, useState } from 'react';

const initialClasses = [
  { id: 'K-01', name: 'Beginner A', capacity: 25, placement: 'Level 1-39', description: 'Kelas pemula untuk siswa yang baru mulai.' },
  { id: 'K-02', name: 'Elementary B', capacity: 22, placement: 'Level 40-59', description: 'Kelas dasar untuk penguatan kosakata dan struktur.' },
  { id: 'K-03', name: 'Intermediate', capacity: 20, placement: 'Level 60-79', description: 'Kelas menengah untuk komunikasi aktif.' },
];

const defaultForm = {
  id: '',
  name: '',
  capacity: 20,
  placement: '',
  description: ''
};

function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState('');

  const visibleClasses = useMemo(() => {
    return classes.filter((klass) => {
      const text = `${klass.id} ${klass.name} ${klass.placement}`.toLowerCase();
      return text.includes(search.trim().toLowerCase());
    });
  }, [classes, search]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setFormError('');
    setShowForm(true);
  };

  const handleEdit = (klass) => {
    setEditingId(klass.id);
    setForm({
      id: klass.id,
      name: klass.name,
      capacity: klass.capacity,
      placement: klass.placement,
      description: klass.description
    });
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = form.id.trim();
    const name = form.name.trim();
    const placement = form.placement.trim();
    const capacity = Number(form.capacity);

    if (!id || !name || !placement) {
      setFormError('ID kelas, nama kelas, dan aturan penempatan wajib diisi.');
      return;
    }

    if (!Number.isInteger(capacity) || capacity < 1) {
      setFormError('Kapasitas harus berupa bilangan bulat minimal 1.');
      return;
    }

    if (classes.some((klass) => klass.id.toLowerCase() === id.toLowerCase() && klass.id !== editingId)) {
      setFormError('ID kelas sudah digunakan. Masukkan ID yang berbeda.');
      return;
    }

    const prepared = {
      id,
      name,
      capacity,
      placement,
      description: form.description.trim() || 'Kelas demo.'
    };

    if (editingId) {
      setClasses((current) =>
        current.map((klass) => (klass.id === editingId ? prepared : klass))
      );
    } else {
      setClasses((current) => [...current, prepared]);
    }

    setShowForm(false);
    setForm(defaultForm);
    setEditingId(null);
    setFormError('');
  };

  const handleDelete = (classId) => {
    const target = classes.find((klass) => klass.id === classId);
    if (!target) return;

    if (window.confirm(`Hapus kelas ${target.name}?`)) {
      setClasses((current) => current.filter((klass) => klass.id !== classId));
    }
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Master data</p>
          <h1>Data Kelas</h1>
        </div>
        <div className="page-header-actions">
          <span className="badge neutral">Data demo</span>
          <button type="button" className="primary-button" onClick={handleOpenCreate}>+ Tambah kelas</button>
        </div>
      </section>

      {showForm ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="class-form-title">
          <div className="modal-card">
            <div className="panel-head">
              <h2 id="class-form-title">{editingId ? 'Edit kelas' : 'Tambah kelas baru'}</h2>
              <button type="button" className="ghost-button" onClick={() => setShowForm(false)}>Tutup</button>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
              <label>
                <span>ID kelas</span>
                <input required value={form.id} onChange={(event) => setForm((prev) => ({ ...prev, id: event.target.value }))} />
              </label>
              <label>
                <span>Nama kelas</span>
                <input required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
              </label>
              <label>
                <span>Kapasitas</span>
                <input required type="number" min="1" step="1" value={form.capacity} onChange={(event) => setForm((prev) => ({ ...prev, capacity: event.target.value }))} />
              </label>
              <label>
                <span>Aturan penempatan</span>
                <input required value={form.placement} onChange={(event) => setForm((prev) => ({ ...prev, placement: event.target.value }))} />
              </label>
              <label className="full-width">
                <span>Deskripsi</span>
                <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} rows="3" />
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
          <h2>Daftar kelas</h2>
          <span className="badge neutral">{visibleClasses.length} kelas</span>
        </div>

        <div className="toolbar-row">
          <input
            type="search"
            aria-label="Cari kelas berdasarkan nama atau aturan penempatan"
            value={search}
            placeholder="Cari kelas atau aturan..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="card-grid three-col">
          {visibleClasses.length === 0 ? (
            <p className="empty-state full-width">Tidak ada kelas yang cocok dengan pencarian.</p>
          ) : visibleClasses.map((klass) => (
            <article key={klass.id} className="mini-card">
              <div className="mini-card-header">
                <span className="badge info">{klass.id}</span>
                <strong>{klass.name}</strong>
              </div>
              <p>{klass.placement}</p>
              <small>{klass.description}</small>
              <div className="capacity-row">
                <span>Kapasitas</span>
                <strong>{klass.capacity} siswa</strong>
              </div>
              <div className="table-actions action-block">
                <button type="button" className="link-button" onClick={() => handleEdit(klass)}>Edit</button>
                <button type="button" className="link-button danger" onClick={() => handleDelete(klass.id)}>Hapus</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClassesPage;
