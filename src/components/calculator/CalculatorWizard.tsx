'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  CalculatorStep,
  QuoteCalculationResult,
  Service,
} from '@/types/calculator';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Phone,
  FileText,
  Calculator,
  RotateCcw,
} from 'lucide-react';

interface CalculatorWizardProps {
  initialServiceSlug?: string;
  services: Service[];
  steps: CalculatorStep[];
}

export function CalculatorWizard({
  initialServiceSlug,
  services,
  steps,
}: CalculatorWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // All alternative demands/extras start at 0 or 'yok' (NO default cost additions)
  const [selections, setSelections] = useState<Record<string, any>>({
    service_slug: initialServiceSlug || 'hafif-celik-ev',
    building_m2: 100,
    city: 'Düzce',
    district: 'Merkez',
    floor_count: 1,
    room_count: '3+1',
    ceiling_height: '2.80m',
    package_slug: 'anahtar-teslim',
    foundation: 'temel_yok',
    permit_tracking: 'yok',
    facade_type: 'standart',
    heating_type: 'yok',
    heating_custom_m2: 0,
    flooring_parquet_m2: 0,
    flooring_ceramic_m2: 0,
    kitchen_status: 'yok',
    kitchen_lower_mtul: 0,
    kitchen_upper_mtul: 0,
    kitchen_countertop_mtul: 0,
    extra_wc_count: 0,
    extra_bath_count: 0,
    veranda_m2: 0,
    railing_mtul: 0,
  });

  const [calculationResult, setCalculationResult] = useState<QuoteCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    quoteCode: string;
    channel: string;
  } | null>(null);

  // Lead Form Inputs
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    kvkkConsent: true,
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Find currently selected service object
  const currentService = useMemo(() => {
    return (
      services.find((s) => s.slug === selections.service_slug) ||
      services[0] || {
        id: 'default',
        slug: 'hafif-celik-ev',
        name: 'Hafif Çelik Ev',
        baseM2Price: 16500,
        packages: [],
      }
    );
  }, [services, selections.service_slug]);

  // Recalculate quote on server whenever selections change
  const runCalculation = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: selections.service_slug,
          packageSlug: selections.package_slug,
          buildingM2: Number(selections.building_m2) || 100,
          city: selections.city,
          district: selections.district,
          selections,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCalculationResult(data);
      }
    } catch (e) {
      console.error('Calculation fetch error:', e);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      runCalculation();
    }, 150);
    return () => clearTimeout(timer);
  }, [selections]);

  const updateSelection = (key: string, value: any) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  // Review step is after all field steps
  const totalStepsCount = steps.length + 1;
  const isReviewStep = currentStepIndex === steps.length;
  const currentStep = !isReviewStep ? (steps[currentStepIndex] || steps[0]) : null;

  // Handle lead submission (WhatsApp or Form)
  const handleSubmitLead = async (channel: 'whatsapp_intent' | 'form') => {
    setFormError(null);
    if (!leadForm.fullName.trim() || leadForm.fullName.trim().length < 2) {
      setFormError('Lütfen adınızı ve soyadınızı eksiksiz giriniz.');
      return;
    }
    if (!leadForm.phone.trim() || leadForm.phone.trim().length < 10) {
      setFormError('Lütfen geçerli bir telefon numarası giriniz.');
      return;
    }
    if (!leadForm.kvkkConsent) {
      setFormError('Devam etmek için lütfen KVKK onayını işaretleyiniz.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: selections.service_slug,
          packageSlug: selections.package_slug,
          buildingM2: Number(selections.building_m2) || 100,
          city: selections.city,
          district: selections.district,
          channel,
          fullName: leadForm.fullName,
          phone: leadForm.phone,
          email: leadForm.email,
          notes: leadForm.notes,
          selections,
          kvkkConsent: leadForm.kvkkConsent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gönderim sırasında hata oluştu.');
      }

      setSubmissionSuccess({
        quoteCode: data.quoteCode,
        channel,
      });

      if (channel === 'whatsapp_intent' && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
    } catch (err: any) {
      setFormError(err.message || 'Gönderim başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="luxury-card p-8 sm:p-12 rounded-2xl border-emerald-500/30">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-bronze mb-2 block">
            BAŞVURUNUZ BAŞARIYLA ALINDI
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark mb-4">
            Teklif Kaydınız Oluşturuldu
          </h2>

          <div className="bg-warm-card border border-warm-border p-4 rounded-xl inline-block mb-6">
            <span className="text-xs text-gray-500 block mb-1">Referans Teklif Kodunuz:</span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-navy tracking-wider">
              {submissionSuccess.quoteCode}
            </span>
          </div>

          <p className="text-gray-600 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            {submissionSuccess.channel === 'whatsapp_intent'
              ? 'WhatsApp üzerinden ön bilgilendirmeniz hazırlandı. Yetkili mühendisimiz arsa ve proje detaylarınızı inceleyerek en kısa sürede tarafınıza dönüş sağlayacaktır.'
              : 'Detaylı teklif özetiniz sistemimize kaydedildi. Proje danışmanımız girdiğiniz telefon numarası üzerinden en geç 1 iş günü içinde sizinle iletişime geçecektir.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmissionSuccess(null);
                setCurrentStepIndex(0);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-navy/20 text-navy font-semibold text-sm hover:bg-navy/5 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeni Bir Hesaplama Yap</span>
            </button>
            <a
              href="tel:05413980081"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-navy-light flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Düzce Ofisi Ara: 0541 398 00 81</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 pb-12">
      {/* Top Progress Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="font-semibold text-navy flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            Adım {currentStepIndex + 1} / {totalStepsCount}
          </span>
          <span className="font-medium text-gray-700">
            {isReviewStep ? 'Teklif Özeti & İletişim' : currentStep?.shortTitle}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bronze to-navy transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / totalStepsCount) * 100}%` }}
          />
        </div>

        {/* Horizontal Step Tabs on larger screens */}
        <div className="hidden sm:flex items-center justify-between mt-2.5 overflow-x-auto pb-1 gap-1 text-[11px]">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-1 py-1 px-2 rounded-md transition-colors whitespace-nowrap ${
                  isCurrent
                    ? 'bg-navy text-white font-semibold'
                    : isDone
                    ? 'text-emerald-700 hover:bg-emerald-50'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-current text-[9px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                )}
                <span className="hidden md:inline">{step.shortTitle}</span>
              </button>
            );
          })}
          <button
            onClick={() => setCurrentStepIndex(steps.length)}
            className={`flex items-center gap-1 py-1 px-2 rounded-md transition-colors whitespace-nowrap ${
              isReviewStep
                ? 'bg-navy text-white font-semibold'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full border border-current text-[9px] flex items-center justify-center">
              {steps.length + 1}
            </span>
            <span>Teklif Özeti</span>
          </button>
        </div>
      </div>

      {/* Focused Step Card (No Live Summary distraction during selection) */}
      {!isReviewStep && currentStep && (
        <div className="luxury-card p-5 sm:p-7 rounded-2xl shadow-card">
          <div className="mb-4">
            <span className="text-[11px] uppercase font-bold tracking-wider text-bronze">
              {currentService.name} İÇİN ÖZELLEŞTİRME
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-navy-dark mt-0.5">
              {currentStep.title}
            </h2>
            {currentStep.subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{currentStep.subtitle}</p>
            )}
          </div>

          {/* Reassurance Banner */}
          <div className="mb-4 p-2.5 rounded-xl bg-warm-white border border-warm-border text-xs text-gray-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bronze shrink-0" />
            <span>
              Hesaplanan fiyatlara nakliye, montaj ve kurulum ücretleri dahildir. Alternatif taleplerinizi seçtikçe fiyatınız şekillenir.
            </span>
          </div>

          {/* Dynamic Step Fields */}
          <div className="space-y-4">
            {currentStep.fields.map((field) => {
              // Dependency condition check (e.g. if kitchen is 'yok', hide cabinet sizes)
              if (field.dependencyCondition) {
                const cond = field.dependencyCondition;
                const depValue = selections[cond.field];
                if (cond.equals !== undefined && depValue !== cond.equals) return null;
                if (cond.notEquals !== undefined && depValue === cond.notEquals) return null;
              }

              return (
                <div key={field.id} className="pt-2 border-t border-gray-100 first:border-0 first:pt-0">
                  <label className="block text-sm font-semibold text-navy-dark mb-1">
                    {field.label}
                    {field.isRequired && <span className="text-rose-500 ml-1">*</span>}
                  </label>

                  {field.helpText && (
                    <p className="text-xs text-gray-500 mb-2 flex items-start gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span>{field.helpText}</span>
                    </p>
                  )}

                  {/* Field Type: image_radio */}
                  {field.fieldType === 'image_radio' && field.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {field.options.map((opt) => {
                        const isSelected = selections[field.fieldKey] === opt.optionKey;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => updateSelection(field.fieldKey, opt.optionKey)}
                            className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-bronze bg-amber-50/20 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="font-semibold text-sm text-navy-dark flex items-center gap-1.5">
                                  <span>{opt.label}</span>
                                </div>
                                {opt.description && (
                                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    {opt.description}
                                  </p>
                                )}
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'border-bronze bg-bronze text-white'
                                    : 'border-gray-300'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                            {opt.badge && (
                              <span className="self-start mt-3 text-[10px] font-bold px-2 py-0.5 rounded bg-bronze/10 text-bronze uppercase tracking-wider">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Field Type: select */}
                  {field.fieldType === 'select' && field.options && (
                    <select
                      value={selections[field.fieldKey] || ''}
                      onChange={(e) => updateSelection(field.fieldKey, e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-bronze focus:border-bronze"
                    >
                      {field.options.map((opt) => (
                        <option key={opt.id} value={opt.optionKey}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Field Type: number */}
                  {field.fieldType === 'number' && (
                    <div className="relative max-w-xs">
                      <input
                        type="number"
                        min={field.minValue || 0}
                        max={field.maxValue || 10000}
                        step={field.stepValue || 1}
                        value={selections[field.fieldKey] ?? ''}
                        onChange={(e) =>
                          updateSelection(
                            field.fieldKey,
                            e.target.value === '' ? '' : parseFloat(e.target.value)
                          )
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-bronze"
                      />
                    </div>
                  )}

                  {/* Field Type: stepper */}
                  {field.fieldType === 'stepper' && (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const cur = Number(selections[field.fieldKey]) || 0;
                          const min = field.minValue ?? 0;
                          if (cur > min) updateSelection(field.fieldKey, cur - 1);
                        }}
                        className="w-10 h-10 rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-base text-navy">
                        {selections[field.fieldKey] ?? 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const cur = Number(selections[field.fieldKey]) || 0;
                          const max = field.maxValue ?? 10;
                          if (cur < max) updateSelection(field.fieldKey, cur + 1);
                        }}
                        className="w-10 h-10 rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* Field Type: text */}
                  {field.fieldType === 'text' && (
                    <input
                      type="text"
                      value={selections[field.fieldKey] || ''}
                      onChange={(e) => updateSelection(field.fieldKey, e.target.value)}
                      placeholder={field.helpText || ''}
                      className="w-full max-w-md px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-bronze"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStepIndex((prev) => prev + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-sm font-semibold shadow-md transition-all"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Teklifimi Hesapla & Özeti Gör' : 'Sonraki Adım'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Final Step: Complete Proposal Summary, Itemized Demands, and Lead Form */}
      {isReviewStep && (
        <div className="space-y-6">
          <div className="luxury-card p-6 sm:p-8 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-bronze">
                  TEKLİF DETAYI VE MALİYET DÖKÜMÜ
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-dark mt-1">
                  {currentService.name} Teklif Özeti
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Girdiğiniz ölçülere ve seçtiğiniz alternatif taleplere göre hesaplanmıştır.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStepIndex(0)}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Seçimleri Değiştir</span>
              </button>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="p-3 rounded-xl bg-warm-white border border-warm-border">
                <span className="text-[11px] text-gray-500 block">Yapı Alanı:</span>
                <span className="text-base font-bold text-navy">{selections.building_m2} m²</span>
              </div>
              <div className="p-3 rounded-xl bg-warm-white border border-warm-border">
                <span className="text-[11px] text-gray-500 block">Paket Türü:</span>
                <span className="text-base font-bold text-navy capitalize">
                  {selections.package_slug?.replace('-', ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-warm-white border border-warm-border">
                <span className="text-[11px] text-gray-500 block">Lokasyon:</span>
                <span className="text-base font-bold text-navy">{selections.city} / {selections.district || 'Merkez'}</span>
              </div>
              <div className="p-3 rounded-xl bg-warm-white border border-warm-border">
                <span className="text-[11px] text-gray-500 block">Kat & Oda:</span>
                <span className="text-base font-bold text-navy">{selections.floor_count} Kat • {selections.room_count}</span>
              </div>
            </div>

            {/* Line Items Breakdown Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 text-xs font-bold text-navy-dark uppercase tracking-wider flex justify-between">
                <span>İmalat Kalemi / Seçilen Alternatif Talep</span>
                <span>Tutar</span>
              </div>

              <div className="divide-y divide-gray-100 text-xs">
                {calculationResult?.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-start justify-between gap-4 hover:bg-gray-50/50">
                    <div>
                      <div className="font-semibold text-navy-dark text-sm">{item.itemTitle}</div>
                      <div className="text-gray-500 mt-0.5">
                        {item.category} • {item.isQuoteOnly ? 'Keşif Gerektirir' : `${item.quantity} ${item.unitLabel}`}
                        {item.note && ` (${item.note})`}
                      </div>
                    </div>
                    <div className="font-bold text-sm text-gray-900 shrink-0 text-right">
                      {item.isQuoteOnly ? (
                        <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                          Keşif Sonrası
                        </span>
                      ) : (
                        formatCurrency(item.totalPrice)
                      )}
                    </div>
                  </div>
                ))}

                {(!calculationResult?.items || calculationResult.items.length <= 1) && (
                  <div className="p-4 text-gray-500 italic text-center bg-gray-50/30">
                    Ekstra alternatif talep seçilmedi (Yalnızca standart çelik yapı karkası ve paket teslimi).
                  </div>
                )}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-warm-card border border-warm-border p-5 rounded-xl space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(calculationResult?.subtotal || 0)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>KDV (%{calculationResult?.kdvRate || 20}):</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(calculationResult?.kdvTotal || 0)}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
                <div>
                  <span className="text-base font-bold text-navy-dark block">Tahmini Toplam Tutar:</span>
                  <span className="text-xs text-gray-500">Tüm vergiler ve montaj dahil</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-navy">
                    {formatCurrency(calculationResult?.grandTotal || 0)}
                  </span>
                </div>
              </div>

              {calculationResult?.hasQuoteOnlyItems && (
                <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200/70 text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Temel / Subasman gibi araziye bağlı opsiyonlar seçildiğinden, nihai sözleşme bedeli parsel keşfi sonrasında netleşecektir.
                  </span>
                </div>
              )}
            </div>

            {/* Notice Note */}
            <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-8">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Hesaplanan fiyatlar 15 gün süreyle bağlayıcıdır. Sözleşme sonrası sürpriz masraf çıkmaz.
              </span>
            </div>

            {/* Lead Form Inputs */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-bronze/10 text-bronze flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy-dark text-lg">
                    Teklifinizi Hemen Alın ve İletişime Geçin
                  </h3>
                  <p className="text-xs text-gray-500">
                    Özet dökümünüzü WhatsApp üzerinden anında yetkiliye iletebilir veya proje danışmanımızın sizi aramasını sağlayabilirsiniz.
                  </p>
                </div>
              </div>

              {formError && (
                <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-dark mb-1">
                    Adınız ve Soyadınız <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-dark mb-1">
                    Telefon Numaranız <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="0 (5XX) XXX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-dark mb-1">
                    E-posta Adresiniz (Opsiyonel)
                  </label>
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="ornek@mail.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-dark mb-1">
                    Arsa / Parsel Durumu (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    placeholder="Örn: Akçakoca 500 m² eğimli arsa"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="kvkk"
                  checked={leadForm.kvkkConsent}
                  onChange={(e) => setLeadForm({ ...leadForm, kvkkConsent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-bronze focus:ring-bronze"
                />
                <label htmlFor="kvkk" className="text-xs text-gray-600 leading-normal">
                  <a href="/kvkk" target="_blank" className="text-bronze underline font-medium">
                    KVKK Aydınlatma Metni
                  </a>
                  &apos;ni okudum, kişisel verilerimin teklif ve keşif bilgilendirmesi amacıyla işlenmesini onaylıyorum.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmitLead('whatsapp_intent')}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Teklif Al & Hızlı İncelet</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmitLead('form')}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-navy hover:bg-navy-light text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <FileText className="w-4 h-4" />
                  <span>Teklif Kodunu Oluştur & Kaydet</span>
                </button>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStepIndex(steps.length - 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Önceki Adıma Dön</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
