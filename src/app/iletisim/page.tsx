'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Düzce',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send as inquiry lead
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: 'hafif-celik-ev',
          buildingM2: 100,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          notes: formData.message,
          channel: 'form',
          selections: {},
          kvkkConsent: true,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            BİZE ULAŞIN
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
            Düzce Merkez Ofisimiz ve İletişim
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
            Çelik ev projeleriniz, zemin keşfi ve mimari planlama için ofisimize bekleriz veya telefonla bize dilediğiniz zaman ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="luxury-card p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-xl font-serif font-bold text-navy-dark border-b border-gray-100 pb-4">
                İletişim Bilgileri
              </h2>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block uppercase">Ofis Adresi</span>
                  <p className="text-sm text-gray-800 font-medium mt-0.5">
                    Kültür Mahallesi, Mehmet Akif Caddesi No: 42/B, Merkez / DÜZCE
                  </p>
                  <a
                    href="https://share.google/hRm0NKr0D9ILdZyGQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-bronze font-semibold mt-1 hover:underline"
                  >
                    <span>Google Haritalarda Aç</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block uppercase">Telefon & Danışma</span>
                  <a href="tel:05413980081" className="text-sm text-gray-800 font-bold hover:text-navy mt-0.5 block">
                    0541 398 00 81
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block uppercase">WhatsApp Hızlı Teklif Hattı</span>
                  <a
                    href="https://wa.me/905413980081?text=Merhaba%20ARGEV%20Yapı,%20çelik%20ev%20ve%20yapı%20projeleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-700 font-bold hover:underline mt-0.5 block"
                  >
                    0541 398 00 81
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block uppercase">E-Posta</span>
                  <a href="mailto:bilgi@argevyapi.com" className="text-sm text-gray-800 font-medium hover:text-navy mt-0.5 block">
                    bilgi@argevyapi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block uppercase">Çalışma Saatleri</span>
                  <p className="text-sm text-gray-800 mt-0.5">
                    Hafta İçi & Cumartesi: 08:30 - 18:30<br />
                    Pazar: Saha randevusu ile
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/argevyapiduzce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 text-pink-700 text-xs font-semibold hover:bg-pink-100 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@argevyapiduzce</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="luxury-card p-6 sm:p-10 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-bronze block mb-1">
                BİLGİ & KEŞİF TALEBİ
              </span>
              <h2 className="text-2xl font-serif font-bold text-navy-dark mb-6">
                Bize Mesaj Gönderin
              </h2>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">Mesajınız Alındı</h3>
                  <p className="text-xs text-emerald-700">
                    Proje yöneticimiz en kısa sürede girdiğiniz iletişim numarası üzerinden tarafınıza geri dönüş sağlayacaktır.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Örn: Mehmet Aksoy"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0 (5XX) XXX XX XX"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        E-Posta Adresiniz
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@posta.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Proje İli / Mevkii
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Düzce / Akçakoca vb."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mesajınız / Arsa Detayları *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Arsanızın m² büyüklüğü, eğim durumu veya aklınızdaki çelik yapı modelini belirtebilirsiniz..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-navy hover:bg-navy-light text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
