# AGENTS.md — AI Coding Agent Contract

## 1. Identitas Proyek
**Project:** English Class SPK  
**Tujuan:** SPK berbasis web untuk rekomendasi penempatan kelas Bahasa Inggris dengan metode SAW.  
**Frontend:** React + Vite.  
**Bahasa UI:** Bahasa Indonesia.

## 2. Source of Truth
Dokumen otoritatif:
- `SOT/PRD.md`
- `SOT/UI-GUIDELINE.md`
- `SOT/IMPLEMENTATION_PLAN.md`

Baca dokumen yang relevan sebelum mengubah kode. Jangan mengarang requirement atau mengubah spesifikasi yang disetujui. Jika dokumen konflik atau ambigu, berhenti dan minta klarifikasi.

## 3. Kontrol Ruang Lingkup
Implementasikan hanya fitur yang disetujui: login/logout, dashboard, siswa, kelas, kriteria/bobot, nilai tes, SAW, rekomendasi, laporan sesuai keputusan, dan profil sesuai keputusan.

Tanpa persetujuan, jangan menambah modul bisnis, integrasi, pembayaran, messaging, fitur AI, backend, atau dependensi yang tidak diminta.

## 4. Protokol Persetujuan
- Kerjakan satu fase yang telah diizinkan pada satu waktu.
- Jangan mulai fase berikutnya tanpa persetujuan eksplisit pengguna.
- Diam bukan persetujuan.
- Persetujuan dokumen tidak otomatis mengizinkan implementasi seluruh aplikasi.
- Laporkan status, file berubah, validasi, keterbatasan, dan fase berikutnya secara ringkas.
- Perubahan arsitektur, dependensi penting, atau ruang lingkup perlu persetujuan.

## 5. Efisiensi Token
- Baca konteks yang relevan saja.
- Jangan mengulang seluruh SOT.
- Gunakan perubahan terfokus.
- Hindari penjelasan berulang dan regenerasi file yang tidak berubah.
- Laporkan perubahan, hasil validasi, dan blocker yang relevan.

## 6. Aturan Frontend
- Gunakan React + Vite.
- Ikuti UI-GUIDELINE.
- Gunakan komponen reusable secara pragmatis.
- Pisahkan layout, UI bersama, halaman, dan logika bisnis.
- Sediakan state loading, empty, error, success sesuai kebutuhan.
- Gunakan HTML semantik dan interaksi yang aksesibel.
- Jangan menambah library tanpa kebutuhan jelas; minta persetujuan jika berdampak material pada stack.

## 7. Data dan Autentikasi
- Jangan menanam rahasia produksi di frontend.
- Jangan menyebut mock authentication sebagai autentikasi produksi yang aman.
- Tandai mock data sebagai data demonstrasi.
- Jangan mengekspos data siswa secara berlebihan.
- Proteksi client-side saja bukan keamanan produksi; backend harus menegakkan otorisasi.
- Jika backend/database/auth belum dipilih dan diperlukan, hentikan bagian terkait dan minta keputusan.

## 8. Aturan SAW
- Pisahkan mesin SAW dari komponen React.
- Validasi nilai dan bobot.
- Dukung atribut benefit/cost.
- Hitung normalisasi, nilai terbobot, preferensi, dan ranking.
- Tangani data kosong, nilai nol, dan kasus tepi.
- Hasil harus deterministik untuk input yang sama.
- Uji dengan contoh hitung manual.
- Dokumentasikan penanganan nilai seri.
- Ranking SAW tidak otomatis menentukan kelas tanpa aturan pemetaan yang disetujui.
- Jangan mengarang kriteria, bobot, rentang nilai, atau aturan penempatan final.

## 9. Kualitas Kode
Sebelum menyatakan pekerjaan selesai:
- Periksa file yang berubah.
- Jalankan tes yang tersedia.
- Jalankan lint/build jika tersedia dan relevan.
- Perbaiki error yang disebabkan perubahan.
- Laporkan pemeriksaan yang tidak dapat dijalankan.
Jangan pernah mengklaim tes/build berhasil tanpa menjalankannya. Hindari refactor yang tidak berkaitan.

## 10. Manajemen File
- Periksa proyek sebelum mengubahnya.
- Pertahankan pekerjaan pengguna.
- Jangan menimpa file yang tidak terkait.
- Simpan tiga dokumen sumber di `SOT/`.
- Simpan kontrak di `AGENTS.md` dan prompt awal di `EXECUTION_PROMPT.md`.
- Hindari spesifikasi duplikat.

## 11. Perubahan Requirement
Jika requirement tidak jelas:
1. Sebutkan ambiguitas.
2. Jelaskan dampak secara singkat.
3. Berikan opsi minimum yang masuk akal.
4. Tunggu keputusan pengguna.

Jika perubahan memengaruhi SOT, minta persetujuan sebelum memperbarui dokumen dan melanjutkan implementasi.

## 12. Format Laporan
Setiap fase melaporkan:
- Status.
- File dibuat/diubah.
- Fitur selesai.
- Validasi yang dijalankan.
- Keterbatasan.
- Fase berikutnya yang diusulkan.

## 13. Aturan Final
Persetujuan eksplisit pengguna mengendalikan perpindahan fase. Utamakan correctness, maintainability, keamanan, efisiensi token, dan kepatuhan terhadap SOT. Tidak ada perluasan ruang lingkup tanpa persetujuan.
