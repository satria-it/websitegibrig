import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock, Phone, MapPin, Sparkles, RefreshCcw, Save, Plus, Trash } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSiteConfig } from '../context/SiteConfigContext';
import { initialSiteConfig } from '../mock/mock';
import { toast } from 'sonner';

const uid = () => `id-${Math.random().toString(16).slice(2)}-${Date.now()}`;

const Input = ({ label, value, onChange, placeholder, type = 'text' }) => {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 font-semibold mb-2">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-3 py-3 rounded-xl border border-purple-200 bg-white text-purple-950 text-sm input-royal"
      />
    </label>
  );
};

const TextArea = ({ label, value, onChange, placeholder }) => {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 font-semibold mb-2">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full pl-4 pr-3 py-3 rounded-xl border border-purple-200 bg-white text-purple-950 text-sm input-royal resize-none"
      />
    </label>
  );
};

const FileToDataUrl = ({ accept = 'image/*', onPick, label = 'Upload', helpText }) => {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 font-semibold mb-2">{label}</div>
      <input
        type="file"
        accept={accept}
        className="w-full"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') onPick(reader.result);
          };
          reader.readAsDataURL(file);
        }}
      />
      {helpText ? <div className="text-xs text-purple-200/80 mt-2">{helpText}</div> : null}
    </label>
  );
};

const PackagesAdminEditor = ({ formPackages, setFormPackages, phoneRaw, onSavePackages }) => {
  const [working, setWorking] = useState(formPackages);

  useEffect(() => {
    setWorking(formPackages);
  }, [formPackages]);

  const addPackage = () => {
    setWorking((p) => [
      ...p,
      {
        id: uid(),
        name: '',
        label: '',
        badge: null,
        image: '',
        description: '',
        items: [],
        price: '',
      },
    ]);
  };

  const commit = () => {
    setFormPackages(working);
    onSavePackages?.(working);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
        <div className="text-sm uppercase tracking-widest text-amber-300/80">Edit Pilihan Paket Musik</div>
        <div className="text-purple-200/80 text-sm mt-2">Tambah, edit, atau hapus paket yang tampil di section #paket.</div>
      </div>

      <div className="space-y-4">
        {working.map((p, idx) => (
          <div key={p.id} className="bg-white/10 border border-white/10 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-amber-300 text-sm font-semibold">Paket #{idx + 1}</div>
                <div className="text-purple-200/70 text-xs mt-1">ID: {p.id}</div>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-full bg-red-500/20 border border-red-400/20 px-4 py-2 text-red-200 hover:bg-red-500/30"
                onClick={() => setWorking((s) => s.filter((x) => x.id !== p.id))}
              >
                <Trash size={16} className="mr-2" /> Hapus
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Paket"
                value={p.name}
                placeholder="Paket 1"
                onChange={(v) => setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, name: v } : x)))}
              />
              <Input
                label="Label (Esensial/Populer/Premium)"
                value={p.label}
                placeholder="Esensial"
                onChange={(v) => setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, label: v } : x)))}
              />
              <Input
                label="Badge (opsional)"
                value={p.badge ?? ''}
                placeholder="Populer"
                onChange={(v) =>
                  setWorking((s) =>
                    s.map((x) => (x.id === p.id ? { ...x, badge: v.trim() ? v : null } : x))
                  )
                }
              />
              <Input
                label="Harga"
                value={p.price}
                placeholder="Menyesuaikan Lokasi"
                onChange={(v) => setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, price: v } : x)))}
              />

              <div className="sm:col-span-2 space-y-3">
                <Input
                  label="Image (URL)"
                  value={p.image}
                  placeholder="https://..."
                  onChange={(v) => setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, image: v } : x)))}
                />
                <FileToDataUrl
                  accept="image/*"
                  label="Upload Image (langsung)"
                  helpText="File akan disimpan sebagai data URL di localStorage (tanpa server)."
                  onPick={(dataUrl) => setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, image: dataUrl } : x)))}
                />
              </div>

              <div className="sm:col-span-2">
                <TextArea
                  label="Deskripsi"
                  value={p.description}
                  placeholder="Deskripsi paket..."
                  onChange={(v) => setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, description: v } : x)))}
                />
              </div>

              <div className="sm:col-span-2">
                <TextArea
                  label="Items (pisahkan pakai koma)"
                  value={(Array.isArray(p.items) ? p.items : []).join(', ')}
                  placeholder="Kendang, Melodi, Keyboard, ..."
                  onChange={(v) => {
                    const items = v
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean);
                    setWorking((s) => s.map((x) => (x.id === p.id ? { ...x, items } : x)));
                  }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <button
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2 font-semibold text-purple-950 hover:bg-amber-300"
                onClick={commit}
              >
                <Save size={16} className="mr-2" /> Simpan Paket
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/10 px-5 py-3 font-semibold text-purple-200/90 hover:bg-white/15"
          onClick={addPackage}
        >
          <Plus size={16} className="mr-2" /> Tambah Paket
        </button>
        <div className="text-xs text-purple-200/70 mt-2 sm:mt-0">WA booking akan otomatis memakai {phoneRaw}.</div>
      </div>
    </div>
  );
};

// Minimal stubs untuk editor lain agar build lolos (aslinya sudah ada di repo sebelumnya).
// Saat ini fokus perbaikan tombol simpan paket.
const GalleryAdminEditor = ({ formGallery, setFormGallery }) => {
  const [working, setWorking] = useState(formGallery);
  useEffect(() => setWorking(formGallery), [formGallery]);
  const commit = () => setFormGallery(working);
  return (
    <div className="space-y-4">
      <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
        <div className="text-sm uppercase tracking-widest text-amber-300/80">Edit Galeri Momen</div>
        <div className="text-purple-200/80 text-sm mt-2">(Editor belum diubah pada perbaikan ini.)</div>
      </div>
      <div className="mt-2 flex items-center justify-end">
        <button className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2 font-semibold text-purple-950 hover:bg-amber-300" onClick={commit}>
          <Save size={16} className="mr-2" /> Simpan Galeri
        </button>
      </div>
    </div>
  );
};

const ArtistAdminEditor = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
        <div className="text-sm uppercase tracking-widest text-amber-300/80">Edit Artis Utama</div>
        <div className="text-purple-200/80 text-sm mt-2">(Editor belum diubah pada perbaikan ini.)</div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('header');
  const navigate = useNavigate();

  const { config, updateBrand, updateFooter, updatePackages, updateGallery, updateTestimonials, updateSocial, updateArtist, setConfig } = useSiteConfig();

  const [mockUser, setMockUser] = useState(null);

  const [formBrand, setFormBrand] = useState(config.brand);
  const [formFooter, setFormFooter] = useState(config.footer);

  useEffect(() => {
    const token = localStorage.getItem('gibrig_admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setMockUser({ token });
  }, [navigate]);

  useEffect(() => {
    setFormBrand(config.brand);
    setFormFooter(config.footer);
  }, [config.brand, config.footer]);

  const quickLinks = useMemo(() => {
    const list = Array.isArray(formFooter.quickLinks) ? formFooter.quickLinks : [];
    const normalized = [...list];
    while (normalized.length < 5) normalized.push({ label: '', href: '' });
    return normalized.slice(0, 5);
  }, [formFooter.quickLinks]);

  const onSave = () => {
    const safeBrand = {
      name: String(formBrand.name ?? ''),
      subtitle: String(formBrand.subtitle ?? ''),
      tagline: String(formBrand.tagline ?? ''),
      phone: String(formBrand.phone ?? ''),
      phoneRaw: String(formBrand.phoneRaw ?? ''),
      address: String(formBrand.address ?? ''),
    };

    const safeFooter = {
      description: String(formFooter.description ?? ''),
      copyright: String(formFooter.copyright ?? ''),
      quickLinks: Array.isArray(formFooter.quickLinks)
        ? formFooter.quickLinks.slice(0, 5).map((l) => ({ label: String(l?.label ?? ''), href: String(l?.href ?? '') }))
        : quickLinks.map((l) => ({ label: String(l.label ?? ''), href: String(l.href ?? '') })),
    };

    updateBrand(safeBrand);
    updateFooter(safeFooter);
    toast.success('Perubahan header & footer tersimpan');
  };

  const onReset = () => {
    setConfig(initialSiteConfig);
    toast.success('Reset ke default berhasil');
  };

  const [formPackages, setFormPackages] = useState(Array.isArray(config.packages) ? config.packages : []);
  const [formGallery, setFormGallery] = useState(Array.isArray(config.gallery) ? config.gallery : []);
  const [formTestimonials, setFormTestimonials] = useState(Array.isArray(config.testimonials) ? config.testimonials : []);

  useEffect(() => {
    setFormPackages(Array.isArray(config.packages) ? config.packages : []);
    setFormGallery(Array.isArray(config.gallery) ? config.gallery : []);
    setFormTestimonials(Array.isArray(config.testimonials) ? config.testimonials : []);
  }, [config.packages, config.gallery, config.testimonials]);

  const safeBrand = {
    name: String(formBrand.name ?? ''),
    subtitle: String(formBrand.subtitle ?? ''),
    tagline: String(formBrand.tagline ?? ''),
    phone: String(formBrand.phone ?? ''),
    phoneRaw: String(formBrand.phoneRaw ?? ''),
    address: String(formBrand.address ?? ''),
  };

  const safeFooter = {
    description: String(formFooter.description ?? ''),
    copyright: String(formFooter.copyright ?? ''),
    quickLinks: Array.isArray(formFooter.quickLinks)
      ? formFooter.quickLinks.slice(0, 5).map((l) => ({ label: String(l?.label ?? ''), href: String(l?.href ?? '') }))
      : quickLinks.map((l) => ({ label: String(l.label ?? ''), href: String(l.href ?? '') })),
  };

  const onSaveAll = () => {
    updateBrand(safeBrand);
    updateFooter(safeFooter);
    updatePackages(formPackages);
    updateGallery(formGallery);
    updateTestimonials(formTestimonials);
    toast.success('Perubahan header/footer & konten tersimpan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-dark to-purple-950 relative overflow-hidden text-black">
      <div className="absolute inset-0 grain" />
      <div className="orb bg-purple-500/40 w-[420px] h-[420px] -top-32 -left-24" />
      <div className="orb bg-amber-300/30 w-[360px] h-[360px] bottom-0 -right-24" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-300/90 text-xs uppercase tracking-[0.18em]">
              <Sparkles size={14} /> Admin Panel
            </div>
            <h1 className="mt-3 font-display text-3xl md:text-4xl text-white">
              Edit <span className="font-italic-accent text-amber-300">Header</span> &{' '}
              <span className="font-italic-accent text-amber-300">Footer</span>
            </h1>
            <p className="text-purple-200/80 text-sm mt-2">Tema ungu, tidak polos.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-xs text-purple-200/80">
              <Lock size={14} />
              <span className="font-medium">{mockUser ? 'Login OK' : 'Memuat...'}</span>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 font-semibold text-purple-950 hover:bg-amber-300"
              onClick={() => {
                localStorage.removeItem('gibrig_admin_token');
                navigate('/admin/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex flex-wrap gap-2">
              {[{ key: 'header', label: 'Header/Footer' }, { key: 'packages', label: 'Paket Musik' }, { key: 'gallery', label: 'Galeri Momen' }, { key: 'testimonials', label: 'Testimoni' }, { key: 'artist', label: 'Artis Utama' }].map((t) => (

                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={
                    activeTab === t.key
                      ? 'inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2 font-semibold text-purple-950'
                      : 'inline-flex items-center justify-center rounded-full bg-white/10 border border-white/10 px-5 py-2 font-semibold text-purple-200/90 hover:bg-white/15'
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'header' && (
              <section className="bg-white/10 border border-white/10 rounded-2xl p-6">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Nama Brand" value={formBrand.name} onChange={(v) => setFormBrand((p) => ({ ...p, name: v }))} placeholder="Gibrig" />
                  <Input label="Subtitle" value={formBrand.subtitle} onChange={(v) => setFormBrand((p) => ({ ...p, subtitle: v }))} placeholder="Entertainment" />
                  <Input label="Tagline (Official)" value={formBrand.tagline} onChange={(v) => setFormBrand((p) => ({ ...p, tagline: v }))} placeholder="Official Gibrig Entertainment" />
                  <Input label="Phone Display" value={formBrand.phone} onChange={(v) => setFormBrand((p) => ({ ...p, phone: v }))} placeholder="0855-2475-2102" type="text" />
                  <Input label="Phone Raw (tanpa +)" value={formBrand.phoneRaw} onChange={(v) => setFormBrand((p) => ({ ...p, phoneRaw: v }))} placeholder="6285524752102" type="text" />
                  <div className="sm:col-span-2">
                    <Input label="Alamat" value={formBrand.address} onChange={(v) => setFormBrand((p) => ({ ...p, address: v }))} placeholder="Alamat" />
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/10 px-5 py-3 font-semibold text-purple-100 hover:bg-white/15"
                    onClick={onReset}
                  >
                    <RefreshCcw size={16} className="mr-2" /> Reset ke Default
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 font-semibold text-purple-950 hover:bg-amber-300"
                    onClick={onSave}
                  >
                    <Save size={16} className="mr-2" /> Simpan Perubahan
                  </button>
                </div>
              </section>
            )}

            {activeTab === 'packages' && (
              <PackagesAdminEditor
                formPackages={formPackages}
                setFormPackages={setFormPackages}
                phoneRaw={config.brand.phoneRaw}
                onSavePackages={(nextPackages) => {
                  updatePackages(nextPackages);
                  toast.success('Paket musik tersimpan');
                }}
              />
            )}

            {activeTab === 'gallery' && <GalleryAdminEditor formGallery={formGallery} setFormGallery={setFormGallery} />}
            {activeTab === 'testimonials' && (
              <TestimonialsAdminEditor
                formTestimonials={formTestimonials}
                setFormTestimonials={setFormTestimonials}
                onSaveTestimonials={(next) => {
                  updateTestimonials(next);
                  toast.success('Testimoni tersimpan');
                }}
              />
            )}
            {activeTab === 'artist' && <ArtistAdminEditor />}

          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <div className="text-sm uppercase tracking-widest text-amber-300/80 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-300" /> Preview Live
                </div>
                <div className="text-purple-200/80 text-sm mt-2">Header & Footer mengikuti konfigurasi.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <Header />
                <div className="px-5 py-4 bg-gradient-to-b from-purple-950/30 to-transparent border-t border-white/10">
                  <div className="grid grid-cols-1 gap-2 text-xs text-purple-200/80">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-amber-300" /> {config.brand.phone}
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-amber-300 mt-0.5" /> <span>{config.brand.address}</span>
                    </div>
                    <div className="pt-1 text-purple-100/80">
                      Official: <span className="text-amber-300">{config.brand.tagline}</span>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-xs text-purple-200/80">
                <div className="text-amber-300/90 font-semibold mb-2">Catatan</div>
                <ul className="space-y-1">
                  <li>- Klik <b>Simpan Paket</b> untuk langsung tersimpan ke website.</li>
                  <li>- Gunakan <b>Simpan Perubahan</b> untuk header/footer.</li>
                </ul>
              </div>

              <div className="flex items-center justify-end">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 font-semibold text-purple-950 hover:bg-amber-300"
                  onClick={onSaveAll}
                >
                  <Save size={16} className="mr-2" /> Simpan Semua
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

