import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock, Phone, MapPin, Sparkles, RefreshCcw, Save } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSiteConfig } from '../context/SiteConfigContext';
import { initialSiteConfig } from '../mock/mock';
import { toast } from 'sonner';

const Input = ({ label, value, onChange, placeholder, type = 'text' }) => {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 font-semibold mb-2">
        {label}
      </div>
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
      <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 font-semibold mb-2">
        {label}
      </div>
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

const Admin = () => {
  const navigate = useNavigate();
  const { config, updateBrand, updateFooter, setConfig } = useSiteConfig();

  const [mockUser, setMockUser] = useState(null);

  // Local form state (supaya user bisa edit tanpa langsung commit ke storage)
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
    // Pastikan minimal 5 biar UI stabil (sesuai initial)
    const normalized = [...list];
    while (normalized.length < 5) normalized.push({ label: '', href: '' });
    return normalized.slice(0, 5);
  }, [formFooter.quickLinks]);

  const onSave = () => {
    // sanitize minimal
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
        ? formFooter.quickLinks.slice(0, 5).map((l) => ({
            label: String(l?.label ?? ''),
            href: String(l?.href ?? ''),
          }))
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-dark to-purple-950 text-white relative overflow-hidden">
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
            <p className="text-purple-200/80 text-sm mt-2">
              Tema ungu, tidak polos. Pastikan bagian bertuliskan <b>Official Gibrig Entertainment</b> tetap ada.
            </p>
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
            <section className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-widest text-amber-300/80 flex items-center gap-2">
                    <Crown size={16} className="text-amber-300" /> Header / Brand
                  </div>
                  <div className="text-purple-200/80 text-sm mt-2">
                    Konten yang muncul di navbar: nama, subtitle, tagline, dan kontak.
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Brand"
                  value={formBrand.name}
                  onChange={(v) => setFormBrand((p) => ({ ...p, name: v }))}
                  placeholder="Gibrig"
                />
                <Input
                  label="Subtitle"
                  value={formBrand.subtitle}
                  onChange={(v) => setFormBrand((p) => ({ ...p, subtitle: v }))}
                  placeholder="Entertainment"
                />
                <Input
                  label="Tagline (Official)"
                  value={formBrand.tagline}
                  onChange={(v) => setFormBrand((p) => ({ ...p, tagline: v }))}
                  placeholder="Official Gibrig Entertainment"
                />
                <Input
                  label="Phone Display"
                  value={formBrand.phone}
                  onChange={(v) => setFormBrand((p) => ({ ...p, phone: v }))}
                  placeholder="0855-2475-2102"
                  type="text"
                />
                <Input
                  label="Phone Raw (tanpa +)"
                  value={formBrand.phoneRaw}
                  onChange={(v) => setFormBrand((p) => ({ ...p, phoneRaw: v }))}
                  placeholder="6285524752102"
                  type="text"
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Alamat"
                    value={formBrand.address}
                    onChange={(v) => setFormBrand((p) => ({ ...p, address: v }))}
                    placeholder="Kp Baranangsiang, ..."
                  />
                </div>
              </div>
            </section>

            <section className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-widest text-amber-300/80">
                    Footer / Tautan Cepat
                  </div>
                  <div className="text-purple-200/80 text-sm mt-2">
                    Deskripsi footer, copyright, dan Tautan Cepat (5 item).
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5">
                <TextArea
                  label="Deskripsi Footer"
                  value={formFooter.description}
                  onChange={(v) => setFormFooter((p) => ({ ...p, description: v }))}
                  placeholder="Gibrig Entertainment menghadirkan ..."
                />

                <TextArea
                  label="Copyright"
                  value={formFooter.copyright}
                  onChange={(v) => setFormFooter((p) => ({ ...p, copyright: v }))}
                  placeholder="© 2026 Official Gibrig Entertainment..."
                />

                <div className="mt-2">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700 font-semibold mb-3">
                    Quick Links (5)
                  </div>
                  <div className="space-y-3">
                    {quickLinks.map((l, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          label={`Label #${idx + 1}`}
                          value={l.label}
                          onChange={(v) => {
                            const next = [...quickLinks];
                            next[idx] = { ...next[idx], label: v };
                            setFormFooter((p) => ({ ...p, quickLinks: next }));
                          }}
                          placeholder="Artis"
                        />
                        <Input
                          label={`Href #${idx + 1}`}
                          value={l.href}
                          onChange={(v) => {
                            const next = [...quickLinks];
                            next[idx] = { ...next[idx], href: v };
                            setFormFooter((p) => ({ ...p, quickLinks: next }));
                          }}
                          placeholder="#artis"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
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
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <div className="text-sm uppercase tracking-widest text-amber-300/80 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-300" /> Preview Live
                </div>
                <div className="text-purple-200/80 text-sm mt-2">
                  Header & Footer akan mengikuti perubahan dari konfigurasi.
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Preview pakai komponen asli */}
                <Header />
                <div className="px-5 py-4 bg-gradient-to-b from-purple-950/30 to-transparent border-t border-white/10">
                  <div className="grid grid-cols-1 gap-2 text-xs text-purple-200/80">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-amber-300" /> {config.brand.phone}
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-amber-300 mt-0.5" />{' '}
                      <span>{config.brand.address}</span>
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
                  <li>- Klik <b>Simpan Perubahan</b> agar tersimpan ke localStorage.</li>
                  <li>- Klik <b>Reset ke Default</b> untuk mengembalikan data ke awal.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;


