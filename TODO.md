# TODO - Perbaikan Web (Admin & Tampilan)

## Bagian A — Fix tombol “Simpan Paket” & compile
- [ ] Rapikan `frontend/src/pages/Admin.jsx` (hapus literal `\r\n` yang tersisip di dalam kode/JSX)
- [ ] Pastikan tombol **Simpan Paket** memanggil `updatePackages(working)` lewat `onSavePackages`
- [ ] Pastikan `onSavePackages` di tab paket update ke localStorage via context

## Bagian B — Panel Admin: ganti logo Artis Utama + list tulisannya
- [ ] Tambahkan UI input di Admin tab **Artis**:
  - [ ] uploader/URL untuk gambar logo Artis Utama (Neng Syelfi Oktora)
  - [ ] editor list tulisan/props yang ingin ditampilkan (sesuai kebutuhan UI frontend)
- [ ] Pastikan perubahan langsung tampil di section `frontend/src/components/sections/Artist.jsx`

## Bagian C — Hapus “made with emerge”
- [ ] Cari dan hapus elemen/teks “made with emerge” di frontend (mis. `index.html`, komponen footer, atau file lain)

## Bagian D — Verifikasi
- [ ] Jalankan build/dev server
- [ ] Test manual:
  - [ ] Admin > Paket Musik > edit > klik **Simpan Paket** -> Home berubah
  - [ ] Admin > Artis Utama -> ganti logo & list -> Home berubah
  - [ ] Pastikan tidak ada “made with emerge” di halaman

