'use client';

import React, { useState, useEffect } from 'react';
import { Service, PricingRule, ServicePackage } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils';
import {
  Calculator,
  Plus,
  Trash2,
  Save,
  Check,
  AlertCircle,
  Layers,
  Sparkles,
  Home,
  Building,
  Castle,
  ShieldCheck,
  Warehouse,
  Wrench,
  DollarSign,
  CheckCircle2,
  X,
  RefreshCw,
} from 'lucide-react';

export default function AdminHesaplayiciEditorPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [activeSlug, setActiveSlug] = useState('hafif-celik-ev');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // New Parameter Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newParam, setNewParam] = useState<{
    title: string;
    category: PricingRule['category'];
    pricingType: PricingRule['pricingType'];
    unitPrice: number;
    unitLabel: string;
    description: string;
  }>({
    title: '',
    category: 'extra',
    pricingType: 'per_m2_building',
    unitPrice: 0,
    unitLabel: '₺/m²',
    description: '',
  });

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const loadData = async () => {
    try {
      const [srvRes, rulesRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/admin/pricing'),
      ]);
      const srvData = await srvRes.json();
      const rulesData = await rulesRes.json();
      setServices(srvData);
      setPricingRules(rulesData);
    } catch (err) {
      console.error('Error fetching admin calculator data:', err);
      showNotification('Veriler yüklenirken hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeService = services.find((s) => s.slug === activeSlug) || services[0];

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'hafif-celik-ev':
        return <Home className="w-4 h-4" />;
      case 'agir-celik-ev':
        return <Building className="w-4 h-4" />;
      case 'celik-villa':
        return <Castle className="w-4 h-4" />;
      case 'agir-celik-villa':
        return <ShieldCheck className="w-4 h-4" />;
      case 'celik-garaj':
        return <Warehouse className="w-4 h-4" />;
      case 'ferforje':
        return <Wrench className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const handleUpdateServiceField = (field: keyof Service, val: any) => {
    if (!activeService) return;
    setServices((prev) =>
      prev.map((s) => (s.id === activeService.id ? { ...s, [field]: val } : s))
    );
  };

  const handleSaveService = async () => {
    if (!activeService) return;
    setSavingId('service_base');
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeService),
      });
      if (res.ok) {
        showNotification(`${activeService.name} taban fiyatı ve bilgileri başarıyla güncellendi.`);
      } else {
        showNotification('Güncelleme kaydedilemedi', 'error');
      }
    } catch (e) {
      showNotification('Hata oluştu', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleUpdatePackageMultiplier = (pkgId: string, multiplier: number) => {
    if (!activeService) return;
    const updatedPackages = (activeService.packages || []).map((p) =>
      p.id === pkgId ? { ...p, priceMultiplier: multiplier } : p
    );
    handleUpdateServiceField('packages', updatedPackages);
  };

  const serviceRules = pricingRules.filter(
    (r) => !r.serviceId || r.serviceId === activeService?.id || r.serviceId === activeService?.slug
  );

  const handleUpdateRuleField = (id: string, field: keyof PricingRule, val: any) => {
    setPricingRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleSaveRule = async (rule: PricingRule) => {
    setSavingId(rule.id);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      });
      if (res.ok) {
        showNotification(`"${rule.title}" parametresi güncellendi.`);
      } else {
        showNotification('Fiyat kaydedilemedi', 'error');
      }
    } catch (e) {
      showNotification('Hata oluştu', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteRule = async (id: string, title: string) => {
    if (!confirm(`"${title}" parametresini silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/admin/pricing?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPricingRules((prev) => prev.filter((r) => r.id !== id));
        showNotification(`"${title}" parametresi başarıyla silindi.`);
      } else {
        showNotification('Silme işlemi başarısız', 'error');
      }
    } catch (e) {
      showNotification('Hata oluştu', 'error');
    }
  };

  const handleCreateNewParam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParam.title.trim()) {
      alert('Lütfen parametre adını giriniz');
      return;
    }

    try {
      const payload: Partial<PricingRule> = {
        title: newParam.title.trim(),
        category: newParam.category,
        pricingType: newParam.pricingType,
        unitPrice: Number(newParam.unitPrice) || 0,
        unitLabel: newParam.unitLabel,
        description: newParam.description,
        serviceId: activeService.id,
        code: `PARAM_${activeService.slug.toUpperCase()}_${Date.now()}`,
        isActive: true,
      };

      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setPricingRules((prev) => [...prev, data.rule]);
        setShowAddModal(false);
        setNewParam({
          title: '',
          category: 'extra',
          pricingType: 'per_m2_building',
          unitPrice: 0,
          unitLabel: '₺/m²',
          description: '',
        });
        showNotification(`"${payload.title}" başarıyla eklendi! Sitede anında aktif.`);
      } else {
        showNotification('Parametre eklenirken hata oluştu', 'error');
      }
    } catch (e) {
      showNotification('Hata oluştu', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 text-sm gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-[#D4560A]" />
        <span>Hesaplayıcı ve fiyat parametreleri yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4560A] block mb-1">
            CANLI SİTE SENKRONİZASYONU
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Hesaplayıcı & Fiyat Yönetimi
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            6 hizmete ait taban fiyatları, paket çarpanlarını ve alternatif donanım parametrelerini tek panelden yönetin.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4560A] hover:bg-orange-600 text-white font-semibold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Parametre / Fiyat Ekle</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
              : 'bg-rose-950/80 border-rose-800 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMsg(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 6 Hizmet Tab Bar (Mobil Uyumlu Yatay Scroll) */}
      <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1 pb-2">
          Hizmet Seçimi (6 Hizmet Sekmesi)
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {services.map((srv) => {
            const isActive = srv.slug === activeSlug;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setActiveSlug(srv.slug)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#D4560A] text-white shadow-lg shadow-[#D4560A]/25'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {getServiceIcon(srv.slug)}
                <span>{srv.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? 'bg-black/20 text-white' : 'bg-slate-800 text-[#D4560A]'
                  }`}
                >
                  {formatCurrency(srv.baseM2Price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeService && (
        <div className="space-y-6">
          {/* Section 1: Taban m² Fiyatı ve Temel Bilgiler */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4560A]/10 text-[#D4560A] flex items-center justify-center border border-[#D4560A]/20">
                  {getServiceIcon(activeService.slug)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{activeService.name} — Taban Fiyatlandırma</h2>
                  <p className="text-xs text-slate-400">{activeService.summary}</p>
                </div>
              </div>

              <button
                type="button"
                disabled={savingId === 'service_base'}
                onClick={handleSaveService}
                className="px-4 py-2 rounded-xl bg-[#D4560A] hover:bg-orange-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{savingId === 'service_base' ? 'Kaydediliyor...' : 'Taban Fiyatı Kaydet'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Başlangıç Taban Fiyatı ({activeService.pricingType === 'm2' ? '₺/m²' : '₺/mtül'})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={activeService.baseM2Price}
                    onChange={(e) => handleUpdateServiceField('baseM2Price', Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#D4560A]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">₺</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Min Yapı Alanı ({activeService.pricingType === 'm2' ? 'm²' : 'mtül'})
                </label>
                <input
                  type="number"
                  value={activeService.minM2}
                  onChange={(e) => handleUpdateServiceField('minM2', Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4560A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Max Yapı Alanı ({activeService.pricingType === 'm2' ? 'm²' : 'mtül'})
                </label>
                <input
                  type="number"
                  value={activeService.maxM2}
                  onChange={(e) => handleUpdateServiceField('maxM2', Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4560A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teslim Süresi (~ Gün)
                </label>
                <input
                  type="number"
                  value={activeService.defaultTurnaroundDays}
                  onChange={(e) => handleUpdateServiceField('defaultTurnaroundDays', Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4560A]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Paket Seçenekleri */}
          {activeService.packages && activeService.packages.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Paket Fiyat Çarpanları</h3>
                  <p className="text-xs text-slate-400">
                    Taban fiyata uygulanacak oran (Örnek: 1.00 = Tam Fiyat, 0.70 = %30 İndirimli Kaba Yapı).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveService}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5 text-[#D4560A]" />
                  <span>Çarpanları Kaydet</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeService.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{pkg.name}</span>
                        {pkg.isDefault && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#D4560A]/20 text-[#D4560A] font-bold">
                            Varsayılan
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                        {pkg.description || 'Paket içeriği ve montaj standardı.'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Fiyat Çarpanı:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          value={pkg.priceMultiplier}
                          onChange={(e) => handleUpdatePackageMultiplier(pkg.id, Number(e.target.value) || 1)}
                          className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-right text-xs font-mono font-bold text-[#D4560A] focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                        />
                        <span className="text-xs text-slate-400 font-mono">x</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Bu Hizmete Ait Parametreler */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Alternatif Talep ve Donanım Parametreleri</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-[#D4560A]">
                    {serviceRules.length} Parametre
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Müşterinin formda seçtiği zemin, ısıtma, mutfak, banyo, temel ve ruhsat gibi seçeneklerin birim fiyatları.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#D4560A] hover:bg-orange-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Parametre Ekle</span>
              </button>
            </div>

            <div className="space-y-3">
              {serviceRules.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Bu hizmete özel henüz parametre bulunmuyor. Yukarıdaki &quot;Parametre Ekle&quot; butonuyla ekleyebilirsiniz.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {serviceRules.map((rule) => {
                    const isSaving = savingId === rule.id;
                    return (
                      <div
                        key={rule.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-xs sm:text-sm text-white">{rule.title}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                              {rule.category}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-[#D4560A]">
                              {rule.pricingType === 'per_m2_building' || rule.pricingType === 'per_m2_custom'
                                ? 'm² Çarpanlı'
                                : rule.pricingType === 'per_linear_meter'
                                ? 'mtül Çarpanlı'
                                : rule.pricingType === 'quote_only'
                                ? 'Keşif Gerektirir'
                                : 'Sabit Tutar'}
                            </span>
                            {!rule.isActive && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-950 text-rose-300 font-bold">
                                Pasif
                              </span>
                            )}
                          </div>
                          {rule.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1">{rule.description}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          {rule.pricingType !== 'quote_only' ? (
                            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700">
                              <input
                                type="number"
                                value={rule.unitPrice}
                                onChange={(e) =>
                                  handleUpdateRuleField(rule.id, 'unitPrice', Number(e.target.value) || 0)
                                }
                                className="w-20 bg-transparent text-right font-mono font-bold text-xs text-white focus:outline-none"
                              />
                              <span className="text-[11px] text-slate-400 font-mono">{rule.unitLabel || '₺'}</span>
                            </div>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-400 px-2 py-1 bg-amber-950/40 rounded-lg">
                              Keşif Tutar
                            </span>
                          )}

                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => handleSaveRule(rule)}
                            className="p-2 rounded-lg bg-[#D4560A] hover:bg-orange-600 text-white transition-all disabled:opacity-50"
                            title="Değişikliği Kaydet"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleSaveRule({ ...rule, isActive: !rule.isActive })
                            }
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold border ${
                              rule.isActive
                                ? 'border-emerald-600/40 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-950'
                                : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                            title="Aktif/Pasif Durumu Değiştir"
                          >
                            {rule.isActive ? 'Aktif' : 'Pasif'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteRule(rule.id, rule.title)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Parametreyi Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Yeni Parametre / Fiyat Ekleme Formu */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4560A]/10 text-[#D4560A] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Yeni Parametre Ekle</h3>
                  <span className="text-[10px] text-slate-400">{activeService?.name} için</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewParam} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Parametre / Donanım Başlığı <span className="text-[#D4560A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newParam.title}
                  onChange={(e) => setNewParam((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Örn: Akıllı Ev Otomasyon Paketi"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newParam.category}
                    onChange={(e) => setNewParam((prev) => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                  >
                    <option value="extra">Ekstralar</option>
                    <option value="foundation">Temel & Altyapı</option>
                    <option value="permit">Resmi İşlemler & Ruhsat</option>
                    <option value="facade">Dış Cephe</option>
                    <option value="flooring">Zemin Kaplama</option>
                    <option value="heating">Isıtma & Tesisat</option>
                    <option value="kitchen">Mutfak</option>
                    <option value="bathroom">Islak Hacim / Banyo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fiyatlandırma Tipi
                  </label>
                  <select
                    value={newParam.pricingType}
                    onChange={(e) => {
                      const pType = e.target.value as PricingRule['pricingType'];
                      const label =
                        pType === 'per_m2_building'
                          ? '₺/m²'
                          : pType === 'per_linear_meter'
                          ? '₺/mtül'
                          : pType === 'quote_only'
                          ? 'Keşif'
                          : '₺/adet';
                      setNewParam((prev) => ({ ...prev, pricingType: pType, unitLabel: label }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                  >
                    <option value="per_m2_building">m² Çarpanlı (₺/m²)</option>
                    <option value="per_linear_meter">mtül Çarpanlı (₺/mtül)</option>
                    <option value="fixed">Sabit / Adet Tutar (₺)</option>
                    <option value="quote_only">Keşif Gerektirir (0 ₺)</option>
                  </select>
                </div>
              </div>

              {newParam.pricingType !== 'quote_only' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Birim Fiyat (₺)
                    </label>
                    <input
                      type="number"
                      value={newParam.unitPrice}
                      onChange={(e) => setNewParam((prev) => ({ ...prev, unitPrice: Number(e.target.value) || 0 }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Birim Etiketi
                    </label>
                    <input
                      type="text"
                      value={newParam.unitLabel}
                      onChange={(e) => setNewParam((prev) => ({ ...prev, unitLabel: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Açıklama (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  value={newParam.description}
                  onChange={(e) => setNewParam((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Kullanıcıya gösterilecek kısa açıklama"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#D4560A]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#D4560A] hover:bg-orange-600 text-white text-xs font-semibold shadow"
                >
                  Parametreyi Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
