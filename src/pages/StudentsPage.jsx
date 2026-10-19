import { useMemo, useState } from 'react';

const defaultForm = {
  id: '',
  name: '',
  contact: '',
  status: 'Aktif'
};

function StudentsPage({ students, setStudents, scores, setScores }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState('');
  const [detailStudent, setDetailStudent] = useState(null);

  const visibleStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = `${student.id} ${student.name} ${student.contact}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === 'Semua' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setFormError('');
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      id: student.id,
      name: student.name,
      contact: student.contact,
      status: student.status
    });
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = form.id.trim();
    const name = form.name.trim();
    const contact = form.contact.trim();

    if (!id || !name || !contact) {
      setFormError('ID siswa, nama, dan kontak wajib diisi.');
      return;
    }

    if (students.some((student) => student.id.toLowerCase() === id.toLowerCase() && student.id !== editingId)) {
      setFormError('ID siswa sudah digunakan. Masukkan ID yang berbeda.');
      return;
    }

    if (editingId) {
      if (editingId !== id && scores[editingId]) {
        setScores((current) => {
          const next = { ...current, [id]: current[editingId] };
          delete next[editingId];
          return next;
        });
      }
      setStudents((current) =>
        current.map((student) =>
          student.id === editingId
            ? { ...student, id, name, contact, status: form.status }
            : student
        )
      );
    } else {
      setStudents((current) => [
        ...current,
        {
          id,
          name,
          contact,
          status: form.status
        }
      ]);
    }

    setShowForm(false);
    setForm(defaultForm);
    setEditingId(null);
    setFormError('');
  };

  const handleDelete = (studentId) => {
    const target = students.find((student) => student.id === studentId);
    if (!target) return;

    if (window.confirm(`Hapus siswa ${target.name}?`)) {
      setStudents((current) => current.filter((student) => student.id !== studentId));
      setScores((current) => {
        const next = { ...current };
        delete next[studentId];
        return next;
      });
    }
  };

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Master data</p>
          <h1>Data Siswa</h1>
        </div>
        <div className="page-header-actions">
          <span className="badge neutral">Data demo</span>
          <button type="button" className="primary-button" onClick={handleOpenCreate}>+ Tambah siswa</button>
        </div>
      </section>

      {showForm ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="student-form-title">
          <div className="modal-card">
            <div className="panel-head">
              <h2 id="student-form-title">{editingId ? 'Edit siswa' : 'Tambah siswa baru'}</h2>
              <button type="button" className="ghost-button" onClick={() => setShowForm(false)}>Tutup</button>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
              <label>
                <span>ID siswa</span>
                <input required value={form.id} onChange={(event) => setForm((prev) => ({ ...prev, id: event.target.value }))} />
              </label>
              <label>
                <span>Nama</span>
                <input required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
              </label>
              <label>
                <span>Kontak</span>
                <input required value={form.contact} onChange={(event) => setForm((prev) => ({ ...prev, contact: event.target.value }))} />
              </label>
              <label>
                <span>Status</span>
                <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}>
                  <option value="Aktif">Aktif</option>
                  <option value="Baru">Baru</option>
                  <option value="Review">Review</option>
                </select>
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

      {detailStudent ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="student-detail-title">
          <div className="modal-card">
            <div className="panel-head">
              <h2 id="student-detail-title">Detail siswa</h2>
              <button type="button" className="ghost-button" onClick={() => setDetailStudent(null)}>Tutup</button>
            </div>
            <dl className="detail-list">
              <div><dt>ID siswa</dt><dd>{detailStudent.id}</dd></div>
              <div><dt>Nama</dt><dd>{detailStudent.name}</dd></div>
              <div><dt>Kontak</dt><dd>{detailStudent.contact}</dd></div>
              <div><dt>Status</dt><dd>{detailStudent.status}</dd></div>
            </dl>
          </div>
        </div>
      ) : null}

      <section className="panel">
        <div className="panel-head">
          <h2>Daftar siswa</h2>
          <span className="badge neutral">{visibleStudents.length} data</span>
        </div>

        <div className="toolbar-row">
          <input
            type="search"
            aria-label="Cari siswa berdasarkan nama atau ID"
            value={search}
            placeholder="Cari nama atau ID..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <select aria-label="Filter status siswa" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="Semua">Semua status</option>
            <option value="Aktif">Aktif</option>
            <option value="Baru">Baru</option>
            <option value="Review">Review</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Kontak</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.length === 0 ? (
                <tr>
                  <td className="empty-state" colSpan="5">Tidak ada siswa yang cocok dengan pencarian atau filter.</td>
                </tr>
              ) : visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    <button type="button" className="link-button" onClick={() => setDetailStudent(student)}>
                      {student.name}
                    </button>
                  </td>
                  <td>{student.contact}</td>
                  <td>
                    <span className={`badge ${student.status === 'Aktif' ? 'success' : student.status === 'Baru' ? 'info' : 'warning'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button type="button" className="link-button" onClick={() => handleEdit(student)}>Edit</button>
                    <button type="button" className="link-button danger" onClick={() => handleDelete(student.id)}>Hapus</button>
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

export default StudentsPage;
