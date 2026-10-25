'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorStep, CalculatorField, Service } from '@/types/calculator';
import {
  Calculator,
  Plus,
  Trash2,
  Save,
  Check,
  ChevronDown,
  Layers,
  Settings,
  Eye,
} from 'lucide-react';

export default function AdminHesaplayiciEditorPage() {
  const [steps, setSteps] = useState<CalculatorStep[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('hafif-celik-ev');
  const [loading, setLoading] = useState(true);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/steps').then((r) => r.json()),
      fetch('/api/admin/services').then((r) => r.json()),
    ])
      .then(([stepsData, servicesData]) => {
        setSteps(stepsData);
        setServices(servicesData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveStep = async (step: CalculatorStep) => {
    setSavedMsg(null);
    try {
      const res = await fetch('/api/admin/steps', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step),
      });
      if (res.ok) {
        setSavedMsg(`${step.title} başarıyla kaydedildi.`);
        setTimeout(() => setSavedMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateStepTitle = (stepId: string, title: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, title } : s))
    );
  };

  if (loading) {
    return <div className="text-slate-400 text-sm">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
            SİHİRBAZ YAPILANDIRMASI
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            Hesaplama Adımları ve Soru Editörü
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fiyat hesaplayıcı sihirbazındaki adımları, soruları, seçenekleri ve koşulları hizmet bazında düzenleyin.
          </p>
        </div>

        {/* Service Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Hedef Hizmet:</span>
          <select
            value={selectedServiceSlug}
            onChange={(e) => setSelectedServiceSlug(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-bronze"
          >
            {services.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Steps List */}
      <div className="space-y-6">
        {steps.map((step, sIdx) => (
          <div
            key={step.id}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-bronze font-bold text-xs flex items-center justify-center">
                  {sIdx + 1}
                </span>
                <div>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStepTitle(step.id, e.target.value)}
                    className="font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-bronze focus:outline-none px-1"
                  />
                  <span className="text-[11px] text-slate-500 block px-1">
                    Kısa Başlık: {step.shortTitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveStep(step)}
                  className="px-3 py-1.5 rounded-lg bg-bronze hover:bg-bronze-light text-white font-semibold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Adımı Kaydet</span>
                </button>
              </div>
            </div>

            {/* Questions in this step */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Bu Adımdaki Alanlar ve Sorular ({step.fields.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {step.fields.map((field) => (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-xs text-white block">
                          {field.label}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-bronze-light">
                          {field.fieldType}
                        </span>
                      </div>
                      {field.helpText && (
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {field.helpText}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Zorunlu: {field.isRequired ? 'Evet' : 'Hayır'}</span>
                      {field.options && <span>{field.options.length} Seçenek</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
