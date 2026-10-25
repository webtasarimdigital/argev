'use client';

import React, { useState, useEffect } from 'react';
import { PricingRule } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, Save, Check, RefreshCw } from 'lucide-react';

export default function AdminPricingPage() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const fetchRules = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      const data = await res.json();
      setRules(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleSave = async (rule: PricingRule) => {
    setSavingId(rule.id);
    setSavedMsg(null);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      });
      if (res.ok) {
        setSavedMsg(`${rule.title} fiyat kuralı güncellendi.`);
        setTimeout(() => setSavedMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  const updateRuleField = (id: string, field: keyof PricingRule, val: any) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
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
            FİYAT MOTORU YAPILANDIRMASI
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">Parametrik Fiyat Tablosu</h1>
          <p className="text-xs text-slate-400 mt-1">
            Temel, ruhsat, dış cephe, parke, seramik, yerden ısıtma, mutfak ve ıslak hacim birim tarifeleri.
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{savedMsg}</span>
        </div>
      )}

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Kalem / Açıklama</th>
                <th className="px-5 py-3">Kategori</th>
                <th className="px-5 py-3">Fiyatlama Tipi</th>
                <th className="px-5 py-3">Birim Fiyat</th>
                <th className="px-5 py-3">Birim</th>
                <th className="px-5 py-3">Durum</th>
                <th className="px-5 py-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-3.5 max-w-xs">
                    <span className="font-semibold text-white block">{rule.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">
                      {rule.description}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium">
                      {rule.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-bronze-light">
                    {rule.pricingType}
                  </td>
                  <td className="px-5 py-3.5">
                    {rule.pricingType === 'quote_only' ? (
                      <span className="text-amber-400 font-semibold text-[11px]">
                        Keşif Gerektirir
                      </span>
                    ) : (
                      <input
                        type="number"
                        value={rule.unitPrice}
                        onChange={(e) =>
                          updateRuleField(
                            rule.id,
                            'unitPrice',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-28 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:ring-1 focus:ring-bronze"
                      />
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    <input
                      type="text"
                      value={rule.unitLabel}
                      onChange={(e) =>
                        updateRuleField(rule.id, 'unitLabel', e.target.value)
                      }
                      className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-bronze"
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      onClick={() =>
                        updateRuleField(rule.id, 'isActive', !rule.isActive)
                      }
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                        rule.isActive
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {rule.isActive ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      disabled={savingId === rule.id}
                      onClick={() => handleSave(rule)}
                      className="px-3 py-1.5 rounded-lg bg-bronze hover:bg-bronze-light text-white font-semibold text-xs inline-flex items-center gap-1 shadow-sm disabled:opacity-50"
                    >
                      <Save className="w-3 h-3" />
                      <span>{savingId === rule.id ? '...' : 'Kaydet'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
