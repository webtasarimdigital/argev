'use client';

import React, { useState, useEffect } from 'react';
import { AuditLog } from '@/lib/data-store';
import { formatDate } from '@/lib/utils';
import { ShieldAlert, ShieldCheck, History, User, Lock } from 'lucide-react';

export default function AdminSecurityPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/audit')
      .then((r) => r.json())
      .then((data) => setLogs(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
          GÜVENLİK VE İZLEME
        </span>
        <h1 className="text-2xl font-serif font-bold text-white">Denetim Günlüğü & Audit Logs</h1>
        <p className="text-xs text-slate-400 mt-1">
          Fiyat güncellemeleri, başvuru durum değişiklikleri ve sisteme yapılan tüm müdahalelerin zaman damgalı kayıtları.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Yetkilendirme</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-white block">Supabase Auth & RLS</span>
          <span className="text-[10px] text-slate-500 block mt-1">Satır Bazlı Güvenlik Aktif</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Fiyat Değişiklik İzi</span>
            <History className="w-4 h-4 text-bronze" />
          </div>
          <span className="text-sm font-bold text-white block">Tarihsel Snapshot Koruma</span>
          <span className="text-[10px] text-slate-500 block mt-1">Geçmiş Teklifler Değiştirilemez</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Anonim Form İzolasyonu</span>
            <Lock className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-bold text-white block">Server Action Doğrulama</span>
          <span className="text-[10px] text-slate-500 block mt-1">Service Key İstemciye Çıkmaz</span>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white">Sistem İşlem Günlükleri</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Zaman</th>
                <th className="px-5 py-3">Kullanıcı</th>
                <th className="px-5 py-3">İşlem</th>
                <th className="px-5 py-3">Hedef</th>
                <th className="px-5 py-3">Detay / Değişiklik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-3 text-slate-400 font-mono text-[11px]">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="px-5 py-3 font-semibold text-white">
                    {log.actor}
                  </td>
                  <td className="px-5 py-3 text-bronze-light font-medium">
                    {log.action}
                  </td>
                  <td className="px-5 py-3 text-slate-300">
                    {log.target}
                  </td>
                  <td className="px-5 py-3 text-slate-400 font-mono text-[10px]">
                    {log.oldValue !== undefined
                      ? `${JSON.stringify(log.oldValue)} -> ${JSON.stringify(log.newValue)}`
                      : 'Sistem kaydı oluşturuldu'}
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
