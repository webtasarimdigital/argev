'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Calculator,
  DollarSign,
  Users,
  FolderOpen,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If login page, do not render admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Hizmet Yönetimi', href: '/admin/hizmetler', icon: Layers },
    { label: 'Hesaplayıcı Editörü', href: '/admin/hesaplayici', icon: Calculator },
    { label: 'Parametrik Fiyatlar', href: '/admin/fiyatlar', icon: DollarSign },
    { label: 'Teklifler & Başvurular', href: '/admin/teklifler', icon: Users },
    { label: 'İçerik Yönetimi', href: '/admin/icerik', icon: FolderOpen },
    { label: 'Site Ayarları', href: '/admin/ayarlar', icon: Settings },
    { label: 'Güvenlik & Audit', href: '/admin/guvenlik', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-bronze flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <span className="font-bold tracking-wider text-white text-sm block">ARGEV YAPI</span>
                <span className="text-[10px] text-bronze uppercase tracking-widest block">YÖNETİM PANELİ</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-bronze text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Siteyi Görüntüle
            </span>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">Canlı Sistem Aktif</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-white block">Sistem Yöneticisi</span>
              <span className="text-[10px] text-slate-400">admin@argevyapi.com</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-bronze">
              SY
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
