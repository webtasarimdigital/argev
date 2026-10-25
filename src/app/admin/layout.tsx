'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If login page, do not render admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = 'argev_admin_session=; path=/; max-age=0; SameSite=Lax';
    router.push('/admin/login');
  };

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
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar: Responsive Desktop & Slide-out Mobile */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 lg:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Mobile Close Button */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#FF6B00]/20">
                A
              </div>
              <div>
                <span className="font-bold tracking-wider text-white text-sm block">ARGEV YAPI</span>
                <span className="text-[10px] text-[#FF6B00] uppercase tracking-widest block font-medium">
                  YÖNETİM PANELİ
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 sm:p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
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
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20'
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

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">Canlı Sistem Aktif</span>
              <span className="text-xs text-slate-400 sm:hidden">argev admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Siteyi Gör</span>
            </Link>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-white block">argev</span>
                <span className="text-[10px] text-emerald-400 font-medium">Yönetici</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center font-bold text-xs text-white shadow-md shadow-[#FF6B00]/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content: mobile-optimized padding */}
        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">{children}</div>
      </main>

      {/* Mobile Bottom Navigation Bar (Sade & Şık) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <Link
          href="/admin"
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            pathname === '/admin' ? 'text-[#FF6B00]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Özet</span>
        </Link>
        <Link
          href="/admin/teklifler"
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            pathname.startsWith('/admin/teklifler') ? 'text-[#FF6B00]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Teklifler</span>
        </Link>
        <Link
          href="/admin/fiyatlar"
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            pathname.startsWith('/admin/fiyatlar') ? 'text-[#FF6B00]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Fiyatlar</span>
        </Link>
        <Link
          href="/admin/hizmetler"
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            pathname.startsWith('/admin/hizmetler') ? 'text-[#FF6B00]' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Hizmetler</span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium text-slate-400 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span>Menü</span>
        </button>
      </nav>
    </div>
  );
}
