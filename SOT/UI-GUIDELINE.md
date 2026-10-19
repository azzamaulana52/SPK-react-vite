# UI-GUIDELINE
## English Class SPK — Blue Intelligence

**Status:** Approved

## 1. Prinsip Desain
- Modern, futuristik, profesional, dan bergaya SaaS.
- Minimalis, informatif, dan konsisten.
- Mengutamakan keterbacaan, aksesibilitas, dan kemudahan operasional.
- Efek futuristik menjadi aksen, bukan pengganggu fungsi.

## 2. Color Tokens

| Token | Hex | Penggunaan |
|---|---|---|
| Primary | `#2563EB` | Tombol utama, aksi penting |
| Primary Hover | `#1D4ED8` | Hover tombol utama |
| Primary Light | `#DBEAFE` | Latar aksen |
| Navy | `#0F172A` | Sidebar dan teks utama |
| Background | `#F8FAFC` | Latar halaman |
| Surface | `#FFFFFF` | Card, modal, tabel |
| Text Primary | `#0F172A` | Teks utama |
| Text Secondary | `#64748B` | Teks sekunder |
| Border | `#E2E8F0` | Garis pemisah |
| Success | `#16A34A` | Status berhasil |
| Warning | `#D97706` | Peringatan |
| Danger | `#DC2626` | Kesalahan/tindakan berisiko |
| Info | `#0284C7` | Informasi |

Gradient biru boleh dipakai secara terbatas untuk hero atau aksen statistik. Hindari gradient berlebihan pada tabel dan formulir.

## 3. Typography
Font utama: Inter; fallback: system sans-serif.
- Page title: 28–32 px.
- Section title: 20–24 px.
- Card title: 14–16 px.
- Body: 14–16 px.
- Caption: 12–13 px.
- Button: 14 px, medium/semibold.

Gunakan hierarki heading yang konsisten, kontras yang memadai, dan angka tabular untuk statistik jika tersedia.

## 4. Layout
- Application shell: sidebar, topbar, main content.
- Container fleksibel dan spacing konsisten.
- Sidebar menjadi drawer pada layar kecil.
- Breakpoints: mobile `<640px`, tablet `640–1023px`, desktop `>=1024px`.
- Tabel di layar kecil menggunakan overflow horizontal atau pola alternatif yang sesuai.

### Navigasi
1. Dashboard
2. Data Siswa
3. Data Kelas
4. Kriteria & Bobot
5. Input Nilai Tes
6. Perhitungan SAW
7. Hasil Rekomendasi
8. Laporan
9. Profil Pengguna

Tampilkan/aktifkan menu sesuai ruang lingkup dan hak akses yang disepakati.

## 5. Komponen
### Buttons
Varian: primary, secondary, outline, ghost, danger. Tinggi standar sekitar 40 px. Gunakan label jelas, loading state, dan visual khusus untuk tindakan berisiko.

### Cards
Permukaan putih, border tipis, radius 12–16 px, padding konsisten, shadow ringan bila diperlukan.

### Tables
Header jelas, baris nyaman dibaca, status dengan badge, aksi konsisten, empty state, dan search/filter dekat tabel. Pagination bila diperlukan.

### Forms
Setiap input memiliki label; field wajib ditandai; pesan validasi dekat input; tombol simpan/batal dibedakan; penghapusan perlu konfirmasi.

### Dialogs and Feedback
Modal untuk formulir sederhana dan konfirmasi. Formulir panjang dapat memakai halaman tersendiri. Sediakan toast, error message, loading indicator, skeleton, empty state, dan confirmation dialog sesuai konteks.

## 6. Spesifikasi Halaman
- **Login:** identitas aplikasi, username/email, kata sandi, toggle visibilitas, tombol masuk, validasi.
- **Dashboard:** statistik siswa/kelas/tes/rekomendasi, grafik bila datanya tersedia, aktivitas terbaru bila tersedia.
- **Data Siswa:** tambah, cari, filter, tabel, pagination, edit, hapus dengan konfirmasi.
- **Data Kelas:** daftar kelas, kapasitas, aturan penempatan, form tambah/edit.
- **Kriteria & Bobot:** nama/kode, jenis benefit/cost, bobot, indikator total, validasi.
- **Input Nilai Tes:** pilih siswa, nilai per kriteria, kelengkapan, simpan, riwayat jika disediakan.
- **Perhitungan SAW:** kesiapan data, aksi perhitungan, matriks, normalisasi, preferensi, status proses.
- **Hasil Rekomendasi:** peringkat, skor, kelas, status tinjauan, detail perhitungan. Jika aturan penempatan belum lengkap, nyatakan bahwa kelas belum dapat ditentukan.
- **Laporan:** filter yang disetujui, ringkasan, tabel, cetak; ekspor tambahan hanya bila disetujui.
- **Profil:** informasi akun dan pengaturan yang didukung.

## 7. Iconography
Gunakan satu keluarga ikon yang konsisten, misalnya Lucide. Ikon tidak menggantikan label penting. Tombol ikon perlu accessible label atau tooltip sesuai konteks.

## 8. Interaksi dan Aksesibilitas
- Transisi ringan sekitar 150–250 ms.
- Fokus keyboard terlihat.
- Hover bukan satu-satunya indikator.
- HTML semantik dan label input yang sesuai.
- Status tidak disampaikan melalui warna saja.
- Dialog dan menu mengikuti pola aksesibilitas.
- Operasi asinkron menampilkan status; kesalahan disertai pesan yang dapat ditindaklanjuti.

## 9. Aturan Frontend
- React + Vite.
- Gunakan komponen reusable dan design tokens.
- Pisahkan layout, halaman, komponen bersama, dan logika bisnis.
- Logika SAW tidak ditanam di komponen UI.
- Hindari duplikasi dan dependensi yang tidak diperlukan.
- Sediakan state loading/error/empty/success sesuai kebutuhan.

## 10. Kriteria Penerimaan Visual
- Sistem warna, tipografi, dan navigasi konsisten.
- Tabel dan formulir mudah dibaca.
- Layout responsif.
- Interaksi dan fokus jelas.
- Hasil SAW mudah ditinjau.
- Tidak ada fitur atau elemen di luar ruang lingkup tanpa persetujuan.
