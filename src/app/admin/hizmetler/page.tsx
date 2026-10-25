'use client';

import React, { useState, useEffect } from 'react';
import { Service } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils';
import { Layers, Save, Check, Clock, AlertCircle } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleUpdate = async (srv: Service) => {
    setSavingId(srv.id);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(srv),
      });
      if (res.ok) {
        setSuccessMsg(`${srv.name} başarıyla güncellendi.`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  const updateField = (id: string, field: keyof Service, val: any) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  if (loading) {
    return <div className="text-slate-400 text-sm">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
            YAPILANDIRMA
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">Hizmet Yönetimi</h1>
          <p className="text-xs text-slate-400 mt-1">
            Çelik yapı modellerinin baz m² / mtül fiyatlarını, teslim sürelerini ve aktiflik durumlarını yönetin.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-bronze shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-serif">{srv.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    /{srv.slug}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {srv.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Baz Birim Fiyat ({srv.pricingType === 'm2' ? '₺/m²' : '₺/mtül'})
                </label>
                <input
                  type="number"
                  value={srv.baseM2Price}
                  onChange={(e) =>
                    updateField(srv.id, 'baseM2Price', parseFloat(e.target.value) || 0)
                  }
                  className="w-36 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Montaj Süresi (Gün)
                </label>
                <input
                  type="number"
                  value={srv.defaultTurnaroundDays}
                  onChange={(e) =>
                    updateField(
                      srv.id,
                      'defaultTurnaroundDays',
                      parseInt(e.target.value) || 30
                    )
                  }
                  className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Hesaplayıcı
                </label>
                <button
                  type="button"
                  onClick={() =>
                    updateField(srv.id, 'calculatorActive', !srv.calculatorActive)
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    srv.calculatorActive
                      ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                      : 'bg-rose-950 border border-rose-800 text-rose-300'
                  }`}
                >
                  {srv.calculatorActive ? 'Aktif' : 'Kapalı'}
                </button>
              </div>

              <button
                type="button"
                disabled={savingId === srv.id}
                onClick={() => handleUpdate(srv)}
                className="self-end px-4 py-2 rounded-lg bg-bronze hover:bg-bronze-light text-white text-xs font-semibold flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingId === srv.id ? 'Kaydediliyor...' : 'Kaydet'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
