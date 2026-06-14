# TODO - Admin Panel Enhancements

- [ ] Update `frontend/src/pages/Admin.jsx`:
  - [ ] Add section/tab untuk edit **Pilih Paket Musik (Packages)**: tambah / edit / hapus paket, termasuk image, badge, items, price.
  - [ ] Add section/tab untuk edit **Galeri Momen (Gallery)**: tambah / hapus (image/video). Data field: `type`, `src`, `caption`.
  - [ ] Add section/tab untuk edit **Artis Utama** + **Social links** (TikTok/YouTube/Instagram): ganti foto artis utama dan handles.
  - [ ] Pastikan input sosial tampil rapi (tidak keluar area teks) dengan UI/textarea wrapping yang sesuai.
- [ ] Update `frontend/src/context/SiteConfigContext.js`:
  - [ ] Pastikan `updateBrand/updateSocial` tetap bisa menyimpan `artist` & `social` (atau tambah field updateArtist jika diperlukan).
- [ ] Update `frontend/src/mock/mock.js` (jika diperlukan):
  - [ ] Tambahkan default data untuk `artist` (utama) agar editor bisa jalan saat localStorage kosong.
- [ ] Update komponen yang masih memakai data statis:
  - [ ] `frontend/src/components/sections/Artist.jsx` agar membaca **artist image/name/bio** dan **social** dari `config` (bukan dari `mock` statis).
- [ ] Testing:
  - [ ] Jalankan frontend build/start dan verifikasi editor tersimpan ke localStorage.


