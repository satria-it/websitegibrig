# TODO - Admin Panel "Hero / Landing Copy" (Gibrig Entertainment)

- [ ] Update `frontend/src/mock/mock.js`:
  - tambah `hero` config (headline, description, ctaLabel, ctaHref)
  - tambah `heroStats` ke dalam `config.hero.stats` (opsional editable)
  - (sesuai kebutuhan) tambah `heroPhoto`/`upload` placeholder bila diperlukan
- [ ] Update `frontend/src/components/sections/Hero.jsx` agar membaca headline/description/cta/stats dari `config.hero` alih-alih hardcode + `heroStats` dari mock.
  - Tambah dukungan upload foto artis (image) dari `config.artist` sudah ada, tapi headline hero + stats harus editable.
- [ ] Update `frontend/src/pages/Admin.jsx`:
  - tambah tab `hero`
  - buat editor untuk:
    - Headline
    - Deskripsi layanan
    - CTA label (default: Lihat Paket) dan target (#paket)
    - Stats: 100+ / 3 / 5★ (editable)
    - Foto (upload) untuk mengganti gambar artis di panel hero (mengarah ke `config.artist.image`).
- [ ] Jalankan build/dev / cek manual:
  - login admin, edit hero headline, simpan
  - refresh Home, verifikasi perubahan tampil


