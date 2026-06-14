# TODO - Panel Admin Edit Header & Footer

- [ ] Implement panel admin (tema ungu, tidak polos) di `frontend/src/pages/Admin.jsx`
  - [ ] Preview live Header + Footer memakai `useSiteConfig()`
  - [ ] Form edit `config.brand` (name, subtitle, tagline, phone, phoneRaw, address)
  - [ ] Form edit `config.footer` (description, copyright, quickLinks label+href)
  - [ ] Validasi/penanganan input minimal
  - [ ] Tombol **Simpan Perubahan** (update via `updateBrand`/`updateFooter`)
  - [ ] Tombol **Reset ke Default** (kembalikan ke `initialSiteConfig`)
- [ ] Test: login admin (admin/admin123) dan refresh browser memastikan perubahan tersimpan di localStorage
- [ ] Opsional: rapikan styling jika ada yang kurang sesuai

