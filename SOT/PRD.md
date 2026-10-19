# Product Requirements Document (PRD)
## English Class SPK

**Status:** Approved  
**Product type:** Web-based Decision Support System  
**Frontend:** React + Vite  
**Decision method:** Simple Additive Weighting (SAW)  
**Interface language:** Bahasa Indonesia

## 1. Latar Belakang
Penentuan kelas Bahasa Inggris perlu dilakukan berdasarkan kemampuan dan hasil evaluasi siswa. Sistem ini membantu mengelola data siswa, kelas, kriteria, bobot, dan hasil tes secara terstruktur. Metode SAW digunakan untuk menghitung nilai preferensi dan membuat peringkat alternatif. Hasil peringkat menjadi masukan untuk rekomendasi penempatan kelas; keputusan akhir tetap ditinjau petugas berwenang.

## 2. Tujuan Produk
1. Mengelola data siswa dan kelas.
2. Mengelola kriteria, bobot, dan atribut benefit/cost.
3. Mencatat dan memvalidasi nilai tes.
4. Menghitung nilai preferensi menggunakan SAW.
5. Menampilkan peringkat dan rekomendasi kelas berdasarkan aturan penempatan yang disepakati.
6. Menyediakan ringkasan dashboard dan laporan hasil seleksi.

## 3. Target Pengguna
- **Admin:** mengelola seluruh data dan konfigurasi sesuai hak akses.
- **Petugas seleksi:** menjalankan proses operasional sesuai hak akses yang ditetapkan.

Pembagian hak akses rinci harus disepakati sebelum implementasi produksi.

## 4. Ruang Lingkup Fitur

### F01 — Login dan Logout (Wajib)
- Form login dan validasi input.
- Pesan kesalahan saat autentikasi gagal.
- Logout.
- Akses halaman internal mengikuti status autentikasi.

### F02 — Dashboard (Wajib)
- Ringkasan jumlah siswa, kelas, siswa yang sudah tes, dan rekomendasi.
- Aktivitas terbaru jika sumber data tersedia.
- Grafik hanya jika relevan dan didukung data.

### F03 — Data Siswa (Wajib)
- Daftar, tambah, edit, detail, dan hapus dengan konfirmasi.
- Pencarian dan filter.
- Data minimum: ID, nomor/kode siswa, nama, kontak jika diperlukan, dan status.

### F04 — Data Kelas (Wajib)
- Daftar, tambah, edit, dan hapus dengan konfirmasi.
- Kapasitas kelas.
- Aturan atau rentang penempatan kelas.
- Data minimum: ID, nama, deskripsi, kapasitas, dan aturan penempatan.

### F05 — Data Kriteria dan Bobot (Wajib)
- CRUD kriteria.
- Jenis atribut benefit atau cost.
- Bobot dan validasi total bobot.
- Contoh kriteria awal untuk dikonfirmasi: Grammar, Vocabulary, Reading, Listening, Speaking.
- Total bobot harus 1 atau 100%, sesuai format yang dipilih.

### F06 — Input Nilai Tes (Wajib)
- Pilih siswa dan masukkan nilai untuk tiap kriteria.
- Validasi rentang dan kelengkapan.
- Simpan, ubah, dan tinjau nilai.
- Data tidak lengkap tidak digunakan dalam perhitungan final tanpa aturan eksplisit.

### F07 — Perhitungan SAW (Wajib)
- Membentuk matriks keputusan.
- Normalisasi atribut benefit/cost.
- Mengalikan nilai normalisasi dengan bobot.
- Menjumlahkan nilai terbobot dan mengurutkan alternatif.
- Menampilkan rincian perhitungan.
- Menangani nilai nol, data kosong, dan input tidak valid.

Rumus:
- Benefit: `r_ij = x_ij / max(x_j)`
- Cost: `r_ij = min(x_j) / x_ij`
- Preferensi: `V_i = Σ(w_j × r_ij)`

Keterangan: `x_ij` adalah nilai alternatif pada kriteria, `r_ij` nilai normalisasi, `w_j` bobot, dan `V_i` nilai preferensi. Implementasi harus menentukan perilaku aman untuk penyebut nol dan kondisi khusus.

### F08 — Hasil Rekomendasi Kelas (Wajib)
- Daftar peringkat, nilai preferensi, rekomendasi kelas, dan status peninjauan.
- Detail nilai dan perhitungan.
- Filter dan pencarian jika relevan.
- Peringkat SAW tidak otomatis menentukan nama kelas. Pemetaan skor ke kelas harus mengikuti aturan yang disepakati.
- Jika kapasitas kelas berlaku, aturan distribusi siswa harus didefinisikan secara eksplisit.

### F09 — Laporan Hasil Seleksi (Disarankan)
- Laporan hasil seleksi dengan filter yang relevan.
- Ringkasan dan tabel hasil.
- Tampilan siap cetak.
- Ekspor PDF/Excel hanya jika disetujui pada tahap implementasi.

### F10 — Profil Pengguna (Opsional)
- Informasi profil.
- Perubahan nama tampilan dan informasi yang diizinkan.
- Perubahan kata sandi jika didukung oleh mekanisme autentikasi.

## 5. Alur Utama
1. Pengguna login.
2. Admin mengelola siswa dan kelas.
3. Admin mengatur kriteria dan bobot.
4. Petugas memasukkan nilai tes.
5. Sistem memvalidasi data.
6. Sistem menjalankan SAW.
7. Sistem menampilkan peringkat siswa.
8. Sistem memetakan peringkat/nilai ke kelas menggunakan aturan yang disetujui.
9. Petugas meninjau rekomendasi.
10. Sistem menampilkan hasil dan laporan jika diaktifkan.

## 6. Kebutuhan Nonfungsional
- UI modern, futuristik, SaaS, dan responsif.
- Navigasi dan formulir mudah digunakan.
- Loading, empty, error, dan success states yang sesuai.
- Validasi data dan integritas relasi.
- Algoritma SAW dapat diuji ulang dan ditelusuri.
- Tidak menanam rahasia atau kredensial produksi di frontend.
- Struktur React modular, logika SAW terpisah dari UI, dan dependensi dijaga seminimal mungkin.

## 7. Batasan
- Frontend wajib React + Vite.
- Metode keputusan wajib SAW.
- Backend, database, dan penyedia autentikasi belum ditetapkan.
- Mock data hanya untuk demonstrasi dan harus diberi label.
- Tidak menambah ruang lingkup tanpa persetujuan eksplisit.

## 8. Kriteria Penerimaan
1. Login/logout berfungsi sesuai mekanisme yang disetujui.
2. Dashboard menampilkan ringkasan yang konsisten dengan sumber data.
3. CRUD siswa dan kelas berjalan.
4. Kriteria, bobot, dan atribut dapat dikelola serta divalidasi.
5. Nilai tes dapat dimasukkan dan divalidasi.
6. Hasil SAW sesuai contoh perhitungan manual.
7. Hasil rekomendasi memakai aturan pemetaan kelas yang disetujui.
8. Laporan tersedia jika masuk ruang lingkup implementasi yang disetujui.
9. UI responsif dan sesuai UI-GUIDELINE.
10. Tidak ada penambahan fitur tanpa persetujuan.

## 9. Keputusan yang Belum Ditentukan
- JavaScript atau TypeScript.
- Backend, database, dan autentikasi.
- Peran dan hak akses.
- Kriteria dan bobot final.
- Rentang nilai tes.
- Aturan pemetaan SAW ke kelas.
- Kapasitas dan distribusi siswa.
- Format laporan.
