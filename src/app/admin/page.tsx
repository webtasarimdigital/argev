import React from 'react';
import Link from 'next/link';
import { DataStore } from '@/lib/data-store';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Users,
  MessageSquare,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const leads = await DataStore.getLeads();
  const services = await DataStore.getServices();

  const totalLeads = leads.length;
  const whatsappIntents = leads.filter((l) => l.channel === 'whatsapp_intent').length;
  const formSubmissions = leads.filter((l) => l.channel === 'form').length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
          KONTROL MERKEZİ
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Yönetim Paneli & Genel Durum
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Gelen teklif talepleri, WhatsApp başvuruları ve fiyatlandırma istatistikleri.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Toplam Başvuru</span>
            <Users className="w-4 h-4 text-bronze" />
          </div>
          <span className="text-2xl font-bold font-serif text-white">{totalLeads}</span>
          <span className="text-[10px] text-emerald-400 block mt-1">Aktif Müşteri Adayı</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">WhatsApp Niyetleri</span>
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-bold font-serif text-white">{whatsappIntents}</span>
          <span className="text-[10px] text-slate-400 block mt-1">wa.me ile açılanlar</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Form Başvuruları</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-bold font-serif text-white">{formSubmissions}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Web formu kayıtları</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Aktif Çelik Hizmetleri</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-bold font-serif text-white">{services.length}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Hafif/Ağır Çelik & Villa</span>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white font-serif">Son Teklif Talepleri</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hesaplayıcı ve iletişim formlarından gelen güncel talepler.
            </p>
          </div>
          <Link
            href="/admin/teklifler"
            className="text-xs text-bronze hover:text-white flex items-center gap-1 font-semibold"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

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
                <th className="px-5 py-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-bronze">
                    {lead.quoteCode}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-white block">{lead.fullName}</span>
                    <span className="text-slate-400">{lead.phone}</span>
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-200">
                      {lead.status === 'new' && 'Yeni'}
                      {lead.status === 'contacted' && 'Görüşüldü'}
                      {lead.status === 'proposal_sent' && 'Teklif Verildi'}
                      {lead.status === 'won' && 'Kazanıldı'}
                      {lead.status === 'lost' && 'Kaybedildi'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/teklifler`}
                      className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium text-[11px]"
                    >
                      İncele
                    </Link>
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
