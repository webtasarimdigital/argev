'use client';

import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Users,
  Search,
  Download,
  Eye,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  MessageSquare,
} from 'lucide-react';

export default function AdminTekliflerPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['Teklif Kodu', 'Ad Soyad', 'Telefon', 'E-Posta', 'Şehir', 'Kanal', 'Durum', 'Tarih', 'Tutar'];
    const rows = leads.map((l) => [
      l.quoteCode,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.city} ${l.district || ''}"`,
      l.channel,
      l.status,
      l.createdAt,
      l.quoteSnapshot ? l.quoteSnapshot.grandTotal : 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `argev-teklifler-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.quoteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
            MÜŞTERİ TALEPLERİ VE TEKLİFLER
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">Gelen Teklifler ve Başvurular</h1>
          <p className="text-xs text-slate-400 mt-1">
            Hesaplayıcıdan gelen fiyat kırılımları ve müşteri iletişim kayıtları.
          </p>
        </div>

        <button
          type="button"
          onClick={exportToCSV}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 border border-slate-700"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>CSV Olarak Dışa Aktar</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="İsim, teklif kodu veya telefon ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-bronze"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'new', 'contacted', 'proposal_sent', 'won', 'lost'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-bronze text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' && 'Tümü'}
              {st === 'new' && 'Yeni'}
              {st === 'contacted' && 'Görüşüldü'}
              {st === 'proposal_sent' && 'Teklif Verildi'}
              {st === 'won' && 'Kazanıldı'}
              {st === 'lost' && 'Kaybedildi'}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Cards List (Optimized for small screens) */}
      <div className="md:hidden space-y-3">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#FF6B00]">
                {lead.quoteCode}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                  lead.channel === 'whatsapp_intent'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-blue-950 text-blue-400 border border-blue-800'
                }`}
              >
                {lead.channel === 'whatsapp_intent' ? 'WhatsApp' : 'Web Formu'}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm">{lead.fullName}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lead.city} {lead.district ? `/ ${lead.district}` : ''} • {formatDate(lead.createdAt)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ara</span>
                </a>
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Merhaba%20${encodeURIComponent(lead.fullName)},%20ARGEV%20Yapı'dan%20${lead.quoteCode}%20nolu%20çelik%20yapı%20teklifiniz%20için%20ulaşıyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold text-xs flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(lead)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs inline-flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>İncele</span>
              </button>
            </div>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <div className="p-8 text-center text-slate-500 bg-slate-950 border border-slate-800 rounded-2xl">
            Henüz bu filtreye uygun teklif bulunmuyor.
          </div>
        )}
      </div>

      {/* Desktop Table (Visible on medium and larger screens) */}
      <div className="hidden md:block bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Teklif Kodu</th>
                <th className="px-5 py-3">Müşteri</th>
                <th className="px-5 py-3">Lokasyon</th>
                <th className="px-5 py-3">Kanal</th>
                <th className="px-5 py-3">Durum</th>
                <th className="px-5 py-3">Tarih</th>
                <th className="px-5 py-3 text-right">Detay Snapshot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-bronze">
                    {lead.quoteCode}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-white block">{lead.fullName}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium hover:underline text-[11px]"
                        title="Hemen Ara"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Merhaba%20${encodeURIComponent(lead.fullName)},%20ARGEV%20Yapı'dan%20${lead.quoteCode}%20nolu%20çelik%20yapı%20teklifiniz%20için%20ulaşıyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 transition-colors"
                        title="WhatsApp Mesajı Gönder"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    {lead.city} {lead.district ? `/ ${lead.district}` : ''}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        lead.channel === 'whatsapp_intent'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      {lead.channel === 'whatsapp_intent' ? 'WhatsApp' : 'Web Formu'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1 focus:outline-none"
                    >
                      <option value="new">Yeni</option>
                      <option value="contacted">Görüşüldü</option>
                      <option value="proposal_sent">Teklif Verildi</option>
                      <option value="won">Kazanıldı</option>
                      <option value="lost">Kaybedildi</option>
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-bronze" />
                      <span>İncele</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Modal Popup for Selected Lead Snapshot */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-bronze block">
                  TEKLİF DETAY SNAPSHOT
                </span>
                <h3 className="text-xl font-bold font-serif text-white">
                  {selectedLead.fullName} — {selectedLead.quoteCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Müşteri Telefonu:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedLead.phone.replace(/\s+/g, '')}`}
                    className="font-bold text-emerald-400 hover:underline flex items-center gap-1.5 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{selectedLead.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Merhaba%20${encodeURIComponent(selectedLead.fullName)},%20ARGEV%20Yapı'dan%20${selectedLead.quoteCode}%20nolu%20çelik%20yapı%20teklifiniz%20için%20ulaşıyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm"
                  >
                    WhatsApp ile İletişime Geç
                  </a>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">E-Posta:</span>
                <span className="font-semibold text-white">{selectedLead.email || 'Belirtilmedi'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lokasyon:</span>
                <span className="font-semibold text-white">{selectedLead.city} / {selectedLead.district || 'Merkez'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Kanal:</span>
                <span className="font-semibold text-emerald-400">
                  {selectedLead.channel === 'whatsapp_intent' ? 'WhatsApp Niyeti' : 'Form Başvurusu'}
                </span>
              </div>
              {selectedLead.notes && (
                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-500 block">Müşteri Notu:</span>
                  <p className="text-slate-300 mt-0.5">{selectedLead.notes}</p>
                </div>
              )}
            </div>

            {/* Itemized Pricing Snapshot */}
            {selectedLead.quoteSnapshot ? (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Hesaplama Tarihi Fiyat Kalemleri Snapshot&apos;ı
                </h4>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  {selectedLead.quoteSnapshot.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-slate-800/60 last:border-0">
                      <div>
                        <span className="text-white font-medium block">{item.itemTitle}</span>
                        <span className="text-[10px] text-slate-500">
                          {item.quantity} {item.unitLabel}
                        </span>
                      </div>
                      <span className="font-bold text-white">
                        {item.isQuoteOnly ? 'Keşif Gerektirir' : formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-slate-700 flex justify-between text-sm font-bold text-white">
                    <span>Toplam Snapshot Tutarı:</span>
                    <span className="text-bronze font-mono">
                      {formatCurrency(selectedLead.quoteSnapshot.grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Teklif detay verisi arşivde doğrudan mevcut.</p>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
