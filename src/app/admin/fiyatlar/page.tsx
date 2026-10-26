'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { PricingRule, PricingType, Service } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils';
import {
  DollarSign,
  Save,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  Home,
  Building,
  Castle,
  ShieldCheck,
  Warehouse,
  Wrench,
  Layers,
  ChevronDown,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  X,
  HelpCircle,
  Tag,
} from 'lucide-react';

interface CategoryGroup {
  key: string;
  title: string;
  icon: string;
  description: string;
}

const PREDEFINED_CATEGORIES: CategoryGroup[] = [
  {
    key: 'bathroom',
    title: 'Islak Hacimler & Banyo / WC',
    icon: '🛁',
    description: 'Ebeveyn banyosu, misafir tuvaleti, vitrifiye ve armatür ekstraları.',
  },
  {
    key: 'kitchen',
    title: 'Mutfak & Dolap Sistemleri',
    icon: '🍳',
    description: 'Alt ve üst mutfak dolapları, Çimstone/porselen tezgâh birim fiyatları.',
  },
  {
    key: 'facade',
    title: 'Dış Cephe & Yalıtım',
    icon: '🧱',
    description: 'Fibercement ahşap desen, alüminyum kompozit ve dekoratif kaplamalar.',
  },
  {
    key: 'flooring',
    title: 'Zemin & Parke / Seramik',
    icon: '🪵',
    description: '32. sınıf laminat parke, 60x120 granit seramik kaplama opsiyonları.',
  },
  {
    key: 'heating',
    title: 'Isıtma Sistemleri & Yerden Isıtma',
    icon: '🔥',
    description: 'Sulu borulu ve elektrikli şilteli yerden ısıtma m² tarifeleri.',
  },
  {
    key: 'foundation',
    title: 'Temel & Altyapı',
    icon: '🏗️',
    description: 'Subasman betonu, radye temel ve kazı hafriyat keşif kalemleri.',
  },
  {
    key: 'permit',
    title: 'Ruhsat & Mühendislik Projeleri',
    icon: '📜',
    description: 'Mimari, statik, mekanik ve belediye ruhsat dosya takip bedelleri.',
  },
  {
    key: 'extra',
    title: 'Ekstralar & Donanımlar',
    icon: '✨',
    description: 'Çelik veranda, balkon korkuluğu, kış bahçesi ve diğer ilave imalatlar.',
  },
];

export default function AdminPricingPage() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('srv-hafif-celik-ev');

  // Status and Alerts
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Base price inline edit
  const [editingBasePrice, setEditingBasePrice] = useState<number | null>(null);
  const [isSavingBasePrice, setIsSavingBasePrice] = useState(false);

  // Add Parameter Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRuleForm, setNewRuleForm] = useState({
    serviceId: 'srv-hafif-celik-ev',
    category: 'bathroom',
    customCategoryName: '',
    title: '',
    description: '',
    pricingType: 'per_piece' as PricingType,
    unitPrice: 0,
    unitLabel: '₺/adet',
  });
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Delete Confirmation State
  const [deletingRule, setDeletingRule] = useState<PricingRule | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [rulesRes, servicesRes] = await Promise.all([
        fetch('/api/admin/pricing'),
        fetch('/api/admin/services'),
      ]);
      const rulesData = await rulesRes.json();
      const servicesData = await servicesRes.json();

      setRules(rulesData);
      setServices(servicesData);

      if (servicesData.length > 0 && !servicesData.some((s: Service) => s.id === activeTab || s.slug === activeTab)) {
        setActiveTab(servicesData[0].id || servicesData[0].slug);
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Currently selected service object
  const currentService = useMemo(() => {
    if (activeTab === 'all') return null;
    return services.find((s) => s.id === activeTab || s.slug === activeTab) || null;
  }, [services, activeTab]);

  useEffect(() => {
    if (currentService) {
      setEditingBasePrice(currentService.baseM2Price);
    }
  }, [currentService]);

  // Filter rules for active tab
  const tabRules = useMemo(() => {
    if (activeTab === 'all') {
      return rules;
    }
    // Rules specific to this service OR general rules with no serviceId
    return rules.filter(
      (r) => !r.serviceId || r.serviceId === currentService?.id || r.serviceId === currentService?.slug
    );
  }, [rules, activeTab, currentService]);

  // Group tabRules by category
  const categorizedRules = useMemo(() => {
    const groups: { group: CategoryGroup; rules: PricingRule[] }[] = [];

    // Predefined categories
    for (const cat of PREDEFINED_CATEGORIES) {
      const matched = tabRules.filter((r) => r.category === cat.key);
      if (matched.length > 0 || activeTab !== 'all') {
        groups.push({ group: cat, rules: matched });
      }
    }

    // Custom categories created by user
    const predefinedKeys = new Set(PREDEFINED_CATEGORIES.map((c) => c.key));
    const customCategories = Array.from(
      new Set(tabRules.map((r) => r.category).filter((c) => !predefinedKeys.has(c)))
    );

    for (const customKey of customCategories) {
      const matched = tabRules.filter((r) => r.category === customKey);
      groups.push({
        group: {
          key: customKey,
          title: customKey.charAt(0).toUpperCase() + customKey.slice(1),
          icon: '🏷️',
          description: 'Kullanıcı tarafından eklenen özel kategori.',
        },
        rules: matched,
      });
    }

    return groups;
  }, [tabRules, activeTab]);

  // Save rule changes
  const handleSaveRule = async (rule: PricingRule) => {
    setSavingId(rule.id);
    setSavedMsg(null);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      });
      if (res.ok) {
        setSavedMsg(`"${rule.title}" başarıyla güncellendi.`);
        setTimeout(() => setSavedMsg(null), 3000);
      } else {
        throw new Error('Güncelleme başarısız oldu.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || 'Kural kaydedilemedi.');
    } finally {
      setSavingId(null);
    }
  };

  const updateRuleField = (id: string, field: keyof PricingRule, val: any) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  // Save Service Base Price
  const handleSaveBasePrice = async () => {
    if (!currentService || editingBasePrice === null) return;
    setIsSavingBasePrice(true);
    try {
      const updated = { ...currentService, baseM2Price: editingBasePrice };
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === currentService.id ? updated : s))
        );
        setSavedMsg(`${currentService.name} taban fiyatı ${formatCurrency(editingBasePrice)} olarak güncellendi.`);
        setTimeout(() => setSavedMsg(null), 3500);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Taban fiyat güncellenirken hata oluştu.');
    } finally {
      setIsSavingBasePrice(false);
    }
  };

  // Handle Add New Rule
  const handleAddNewRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleForm.title.trim()) {
      setErrorMsg('Lütfen parametre başlığını giriniz.');
      return;
    }

    const finalCategory =
      newRuleForm.category === 'custom'
        ? newRuleForm.customCategoryName.trim().toLowerCase().replace(/\s+/g, '_') || 'ekstra'
        : newRuleForm.category;

    const slugifiedCode =
      `extra_${newRuleForm.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '_')}_${Date.now().toString().slice(-4)}`;

    setIsSubmittingNew(true);
    setErrorMsg(null);

    try {
      const payload: Partial<PricingRule> = {
        serviceId: newRuleForm.serviceId === 'all' ? null : newRuleForm.serviceId,
        category: finalCategory as any,
        code: slugifiedCode,
        title: newRuleForm.title.trim(),
        description: newRuleForm.description.trim(),
        pricingType: newRuleForm.pricingType,
        unitPrice: Number(newRuleForm.unitPrice) || 0,
        unitLabel: newRuleForm.unitLabel.trim() || '₺',
        isOptional: true,
        isActive: true,
        displayOrder: rules.length + 1,
      };

      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Parametre eklenemedi.');
      }

      const resData = await res.json();
      setRules((prev) => [...prev, resData.rule]);

      setSavedMsg(`"${newRuleForm.title}" başarıyla eklendi ve hesaplayıcıya tanımlandı.`);
      setTimeout(() => setSavedMsg(null), 3500);

      setIsAddModalOpen(false);
      setNewRuleForm({
        serviceId: activeTab === 'all' ? 'srv-hafif-celik-ev' : activeTab,
        category: 'bathroom',
        customCategoryName: '',
        title: '',
        description: '',
        pricingType: 'per_piece',
        unitPrice: 0,
        unitLabel: '₺/adet',
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Eklenirken bir hata oluştu.');
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // Handle Delete Rule
  const handleDeleteConfirm = async () => {
    if (!deletingRule) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/pricing?id=${deletingRule.id || deletingRule.code}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRules((prev) => prev.filter((r) => r.id !== deletingRule.id && r.code !== deletingRule.code));
        setSavedMsg(`"${deletingRule.title}" parametresi silindi.`);
        setTimeout(() => setSavedMsg(null), 3000);
      } else {
        throw new Error('Silme işlemi başarısız.');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || 'Silme işlemi sırasında hata oluştu.');
    } finally {
      setIsDeleting(false);
      setDeletingRule(null);
    }
  };

  // Open modal preselected to category
  const openAddModalWithCategory = (catKey: string) => {
    setNewRuleForm({
      serviceId: activeTab === 'all' ? 'srv-hafif-celik-ev' : activeTab,
      category: catKey,
      customCategoryName: '',
      title: '',
      description: '',
      pricingType: catKey === 'bathroom' ? 'per_piece' : catKey === 'facade' || catKey === 'flooring' ? 'per_m2_custom' : 'per_piece',
      unitPrice: 0,
      unitLabel: catKey === 'bathroom' ? '₺/adet' : catKey === 'facade' || catKey === 'flooring' ? '₺/m²' : '₺/adet',
    });
    setIsAddModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[350px]">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-bronze animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Fiyat motoru ve hizmet kuralları yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
            FİYAT MOTORU & PARAMETRE YÖNETİMİ
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Hizmet Bazlı Fiyat Tarifeleri
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Her çelik yapı hizmeti için ayrı ayrı kategori ve fiyat ekleyebilir, sitede seçenek olarak anlık yayınlayabilirsiniz.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNewRuleForm((prev) => ({
              ...prev,
              serviceId: activeTab === 'all' ? 'srv-hafif-celik-ev' : activeTab,
            }));
            setIsAddModalOpen(true);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-bronze hover:bg-bronze-light text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-orange-950 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Yeni Parametre / Fiyat Ekle</span>
        </button>
      </div>

      {/* Notifications */}
      {savedMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{savedMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs sm:text-sm flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Service Tabs Navigation */}
      <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {services.map((srv) => {
            const isCurrent = activeTab === srv.id || activeTab === srv.slug;
            const count = rules.filter(
              (r) => r.serviceId === srv.id || r.serviceId === srv.slug || !r.serviceId
            ).length;

            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setActiveTab(srv.id || srv.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-bronze text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{srv.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isCurrent ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-bronze text-white font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tüm Hizmetler (Tümü)</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'all' ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {rules.length}
            </span>
          </button>
        </div>
      </div>

      {/* Selected Service Base Price & Info Card */}
      {currentService && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-bronze">
                SEÇİLİ HİZMET
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                {currentService.defaultTurnaroundDays} Günde Teslim
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">{currentService.name}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{currentService.summary}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4 shrink-0 w-full md:w-auto">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Taban m² / mtül Birim Fiyatı
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editingBasePrice ?? ''}
                  onChange={(e) => setEditingBasePrice(parseFloat(e.target.value) || 0)}
                  className="w-32 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-lg font-bold text-amber-400 focus:outline-none focus:ring-2 focus:ring-bronze"
                />
                <span className="text-xs text-slate-400 font-medium">
                  {currentService.pricingType === 'm2' ? '₺/m²' : '₺/mtül'}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isSavingBasePrice || editingBasePrice === currentService.baseM2Price}
              onClick={handleSaveBasePrice}
              className="px-3.5 py-2 rounded-lg bg-bronze hover:bg-bronze-light disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingBasePrice ? '...' : 'Kaydet'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Categorized Rules List */}
      <div className="space-y-6">
        {categorizedRules.map(({ group, rules: groupRules }) => {
          return (
            <div
              key={group.key}
              className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-card"
            >
              {/* Category Header */}
              <div className="p-4 sm:p-5 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl p-2 rounded-xl bg-slate-800/80">
                    {group.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-white">{group.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {groupRules.length} Parametre
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{group.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openAddModalWithCategory(group.key)}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-slate-700 hover:border-bronze hover:bg-bronze/10 text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-bronze" />
                  <span>Bu Kategoriye Ekle</span>
                </button>
              </div>

              {/* Items List */}
              {groupRules.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Bu kategoride henüz tanımlı bir parametre bulunmuyor. Sağ üstteki &quot;Bu Kategoriye Ekle&quot; butonuyla ekleyebilirsiniz.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80">
                  {groupRules.map((rule) => {
                    const isServiceSpecific = Boolean(rule.serviceId);

                    return (
                      <div
                        key={rule.id}
                        className="p-4 sm:p-5 hover:bg-slate-900/30 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        {/* Title and Details */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm sm:text-base text-white">
                              {rule.title}
                            </span>

                            {isServiceSpecific ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                                Sadece {currentService?.name || 'Seçili Hizmet'}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-medium">
                                Tüm Hizmetlerde Ortak
                              </span>
                            )}

                            <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-900/60 text-amber-300 text-[10px] font-mono">
                              {rule.pricingType === 'per_piece'
                                ? 'Adet Başına'
                                : rule.pricingType === 'per_m2_custom'
                                ? 'm² Başına'
                                : rule.pricingType === 'per_linear_meter'
                                ? 'mtül Başına'
                                : rule.pricingType === 'quote_only'
                                ? 'Keşif Gerekli'
                                : 'Sabit Paket'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed">
                            {rule.description || 'Açıklama girilmedi.'}
                          </p>
                        </div>

                        {/* Interactive Pricing Controls */}
                        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                          {/* Price Input */}
                          <div className="flex items-center gap-1.5">
                            {rule.pricingType === 'quote_only' ? (
                              <span className="text-xs text-amber-400 font-semibold px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60">
                                Keşif Gerektirir
                              </span>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={rule.unitPrice}
                                  onChange={(e) =>
                                    updateRuleField(rule.id, 'unitPrice', parseFloat(e.target.value) || 0)
                                  }
                                  className="w-28 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-bronze"
                                />
                                <input
                                  type="text"
                                  value={rule.unitLabel}
                                  onChange={(e) => updateRuleField(rule.id, 'unitLabel', e.target.value)}
                                  className="w-16 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs text-center focus:outline-none focus:ring-1 focus:ring-bronze"
                                  title="Birim Etiketi (Örn: ₺/adet, ₺/m²)"
                                />
                              </div>
                            )}
                          </div>

                          {/* Active Toggle */}
                          <button
                            type="button"
                            onClick={() => updateRuleField(rule.id, 'isActive', !rule.isActive)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              rule.isActive
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {rule.isActive ? 'Aktif' : 'Pasif'}
                          </button>

                          {/* Save Button */}
                          <button
                            type="button"
                            disabled={savingId === rule.id}
                            onClick={() => handleSaveRule(rule)}
                            className="px-3 py-1.5 rounded-lg bg-bronze hover:bg-bronze-light text-white font-semibold text-xs flex items-center gap-1 shadow-sm disabled:opacity-50"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>{savingId === rule.id ? '...' : 'Kaydet'}</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => setDeletingRule(rule)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Bu parametreyi sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: Yeni Parametre / Fiyat Ekle */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl space-y-5 animate-scaleUp my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-bronze" />
                <h3 className="font-serif font-bold text-lg text-white">
                  Yeni Parametre / Fiyat Ekle
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewRule} className="space-y-4 text-xs">
              {/* Hizmet Seçimi */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Hangi Hizmete Tanımlanacak? <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newRuleForm.serviceId}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, serviceId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-bronze"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      Sadece: {srv.name}
                    </option>
                  ))}
                  <option value="all">Tüm Hizmetlerde Ortak (Genel)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Yalnızca seçtiğiniz hizmete özel olarak fiyatlandırma hesaplayıcısında listelenir.
                </p>
              </div>

              {/* Kategori Seçimi */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Kategori <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newRuleForm.category}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-bronze"
                >
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.icon} {cat.title}
                    </option>
                  ))}
                  <option value="custom">➕ Yeni Kategori İsmi Yaz...</option>
                </select>
              </div>

              {newRuleForm.category === 'custom' && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Yeni Kategori İsmi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newRuleForm.customCategoryName}
                    onChange={(e) =>
                      setNewRuleForm({ ...newRuleForm, customCategoryName: e.target.value })
                    }
                    placeholder="Örn: Havuz & Peyzaj, Akıllı Ev, Güneş Paneli"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>
              )}

              {/* Parametre Başlığı */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Parametre / Donanım Başlığı <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRuleForm.title}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, title: e.target.value })}
                  placeholder="Örn: Banyo Ekstrası, Ebeveyn Jakuzisi, Sauna Odası"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-bronze"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Açıklama (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={newRuleForm.description}
                  onChange={(e) =>
                    setNewRuleForm({ ...newRuleForm, description: e.target.value })
                  }
                  placeholder="Örn: Temperli cam duşakabin, gömme rezervuar ve banyo dolabı dahil."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none focus:ring-1 focus:ring-bronze"
                />
              </div>

              {/* Fiyatlama Şekli & Birim Fiyat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Fiyatlama Şekli <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newRuleForm.pricingType}
                    onChange={(e) => {
                      const type = e.target.value as PricingType;
                      let label = '₺';
                      if (type === 'per_piece') label = '₺/adet';
                      if (type === 'per_m2_custom') label = '₺/m²';
                      if (type === 'per_linear_meter') label = '₺/mtül';
                      if (type === 'fixed') label = '₺/paket';
                      if (type === 'quote_only') label = 'Keşif';
                      setNewRuleForm({ ...newRuleForm, pricingType: type, unitLabel: label });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-bronze"
                  >
                    <option value="per_piece">Adet Başına (Banyo, WC, Şömine vb.)</option>
                    <option value="per_m2_custom">Metrekare Başına (m²)</option>
                    <option value="per_linear_meter">Metretül Başına (mtül)</option>
                    <option value="fixed">Sabit Tutar (Paket Bedeli)</option>
                    <option value="quote_only">Keşif Sonrası Kesinleşir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Birim Fiyat (₺) <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      disabled={newRuleForm.pricingType === 'quote_only'}
                      value={newRuleForm.pricingType === 'quote_only' ? 0 : newRuleForm.unitPrice}
                      onChange={(e) =>
                        setNewRuleForm({
                          ...newRuleForm,
                          unitPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="Örn: 25000"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:ring-1 focus:ring-bronze disabled:opacity-40"
                    />
                    <input
                      type="text"
                      value={newRuleForm.unitLabel}
                      onChange={(e) =>
                        setNewRuleForm({ ...newRuleForm, unitLabel: e.target.value })
                      }
                      className="w-20 px-2 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="px-5 py-2 rounded-xl bg-bronze hover:bg-bronze-light text-white font-semibold flex items-center gap-1.5 shadow disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmittingNew ? 'Kaydediliyor...' : 'Kaydet ve Hizmete Ekle'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Silme Onayı */}
      {deletingRule && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-white shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h4 className="font-bold text-base text-white">Parametreyi Silmek İstiyor Musunuz?</h4>
              <p className="text-xs text-slate-400 mt-1">
                &quot;{deletingRule.title}&quot; parametresi fiyat motorundan ve hesaplayıcıdan tamamen kaldırılacaktır.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingRule(null)}
                className="flex-1 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
              >
                Vazgeç
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow disabled:opacity-50"
              >
                {isDeleting ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
