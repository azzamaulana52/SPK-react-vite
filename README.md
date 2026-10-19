# English Class SPK — SOT Package

Paket ini berisi dokumen perencanaan dan kontrak eksekusi untuk aplikasi SPK Penentuan Kelas Bahasa Inggris berbasis website.

## Isi
- `SOT/PRD.md` — kebutuhan produk dan ruang lingkup.
- `SOT/UI-GUIDELINE.md` — aturan desain dan pengalaman pengguna.
- `SOT/IMPLEMENTATION_PLAN.md` — tahapan implementasi dan quality gates.
- `AGENTS.md` — kontrak AI coding agent.
- `EXECUTION_PROMPT.md` — prompt untuk memulai fase Foundation.

## Cara Pakai
1. Ekstrak ZIP ke folder proyek.
2. Buka folder dengan editor kode dan AI coding agent.
3. Minta agen membaca `AGENTS.md`, `EXECUTION_PROMPT.md`, dan dokumen di `SOT/`.
4. Mulai hanya dari fase Foundation.
5. Tinjau hasil, lalu setujui fase berikutnya secara eksplisit.

## Penting
Paket ini adalah **paket dokumen SOT dan eksekusi**, bukan aplikasi React yang sudah dibangun. Backend, database, autentikasi produksi, kriteria/bobot final, rentang nilai, dan aturan pemetaan kelas masih perlu diputuskan sebelum implementasi terkait.
