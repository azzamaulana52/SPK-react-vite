# IMPLEMENTATION_PLAN
## English Class SPK

**Status:** Approved

## 1. Tujuan
Menentukan urutan implementasi berdasarkan PRD dan UI-GUIDELINE. Pengerjaan bertahap; tidak menambah ruang lingkup tanpa persetujuan.

## 2. Teknologi
- Wajib: React + Vite.
- JavaScript atau TypeScript: menunggu keputusan.
- React Router, Lucide React, CSS Modules/design tokens, library grafik/validasi: pilihan berdasarkan kebutuhan, bukan dependensi wajib.
- Backend, database, dan autentikasi: belum ditetapkan.

Jangan memilih teknologi backend atau autentikasi secara sepihak. Jika diperlukan untuk fase yang sedang dikerjakan, hentikan bagian terkait dan minta keputusan.

## 3. Prinsip Arsitektur
1. Struktur berbasis fitur.
2. Pisahkan UI dan logika bisnis.
3. Mesin SAW independen dari React.
4. Komponen reusable secara pragmatis.
5. Design token konsisten.
6. Hindari duplikasi, abstraksi berlebihan, dan dependensi yang tidak dibutuhkan.
7. Pertahankan kompatibilitas dengan SOT yang disetujui.

## 4. Tahapan Implementasi
### Phase A — Foundation
- Periksa proyek yang sudah ada.
- Siapkan React + Vite jika belum ada.
- Struktur folder minimum, global styles, design tokens.
- Application shell, sidebar/topbar responsif, routing, komponen dasar.
**Gate:** aplikasi dapat dijalankan dan build tanpa error.

### Phase B — Authentication UI
- Halaman login, validasi input, status autentikasi sesuai keputusan arsitektur, proteksi halaman, logout.
**Gate:** alur UI diuji; autentikasi produksi tidak disimulasikan sebagai aman.

### Phase C — Dashboard
- Kartu statistik, ringkasan seleksi, grafik/aktivitas hanya jika data tersedia.
**Gate:** data sesuai sumber; mock data diberi label.

### Phase D — Master Data
- CRUD siswa dan kelas, form, pencarian/filter, konfirmasi hapus.
**Gate:** validasi dan integritas relasi terjaga.

### Phase E — Criteria and Scores
- CRUD kriteria, bobot, benefit/cost, validasi bobot, input nilai dan kelengkapan.
**Gate:** bobot valid; nilai tidak lengkap tidak digunakan tanpa aturan.

### Phase F — SAW Engine
- Matriks keputusan, normalisasi, pembobotan, nilai preferensi, ranking, edge cases.
**Gate:** modul dapat diuji tanpa UI dan sesuai hitungan manual.

### Phase G — Recommendations
- Peringkat, nilai, rincian perhitungan, pemetaan kelas berdasarkan aturan yang disetujui.
**Gate:** tidak mengklaim kelas final jika aturan pemetaan belum lengkap; kapasitas diperhitungkan jika berlaku.

### Phase H — Reports
- Halaman laporan, filter, tampilan cetak; ekspor tambahan hanya jika disetujui.
**Gate:** laporan konsisten dengan hasil seleksi.

### Phase I — Profile
- Profil dan pengaturan yang didukung mekanisme autentikasi.
**Gate:** fitur sesuai hak akses dan memiliki validasi.

### Phase J — Quality Assurance
- Lint/build, tes fungsi utama, tes SAW, responsivitas, navigasi, aksesibilitas, dan kepatuhan SOT.
**Gate:** hasil pengujian dicatat; masalah yang belum selesai diungkapkan.

## 5. Urutan Prioritas
1. Foundation/layout.
2. Login/logout.
3. Dashboard.
4. Data siswa.
5. Data kelas.
6. Kriteria/bobot.
7. Input nilai.
8. Mesin SAW.
9. Rekomendasi.
10. Laporan.
11. Profil.
12. QA/finalisasi.

Urutan boleh berubah hanya bila ada dependensi teknis atau keputusan yang disetujui.

## 6. Pengujian SAW
Kasus minimum:
- Benefit saja.
- Campuran benefit/cost.
- Bobot valid/tidak valid.
- Nilai minimum/maksimum.
- Nilai nol dan penyebut nol.
- Data kosong/tidak lengkap.
- Nilai preferensi sama.
- Perubahan bobot yang memengaruhi ranking.

Setiap tes mencatat input, hasil harapan, dan hasil aktual.

## 7. Strategi Data
- Mock data untuk prototipe, dengan penanda demonstrasi.
- Penyimpanan lokal hanya untuk demo terbatas bila disetujui.
- Backend/database untuk multiuser/produksi, setelah dipilih.
- Penyimpanan browser bukan mekanisme keamanan untuk data sensitif.

## 8. Quality Gates
- Sesuai ruang lingkup.
- Proyek dapat dijalankan.
- Tidak merusak fitur sebelumnya.
- UI mengikuti guideline.
- Tidak ada dependensi tanpa alasan.
- Tidak mengklaim tes/build tanpa menjalankannya.
- Perubahan ruang lingkup memerlukan persetujuan.

## 9. Definition of Done
- Fitur wajib sesuai PRD.
- Laporan dan profil mengikuti keputusan ruang lingkup.
- SAW diuji.
- Pemetaan rekomendasi sesuai aturan yang disetujui.
- UI responsif dan konsisten.
- Build berhasil dan hasil tes tercatat.
- Dokumentasi sesuai implementasi aktual.

## 10. Keputusan yang Belum Ditentukan
- JavaScript atau TypeScript.
- Backend, database, autentikasi, dan hak akses.
- Kriteria/bobot final.
- Rentang nilai.
- Pemetaan SAW ke kelas.
- Kapasitas dan distribusi.
- Format laporan.
