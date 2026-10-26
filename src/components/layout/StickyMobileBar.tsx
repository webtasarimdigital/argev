'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Calculator, BookOpen, MessageSquare, Phone } from 'lucide-react';

export function StickyMobileBar() {
  const pathname = usePathname();

  // Do not show on admin routes or when directly in calculator (to let wizard total bar show)
  if (pathname.startsWith('/admin') || pathname.startsWith('/fiyat-hesaplama')) {
    return null;
  }

  const isHome = pathname === '/';
  const isServices = pathname.startsWith('/hizmetler');
  const isBlog = pathname.startsWith('/blog');
  const isContact = pathname.startsWith('/iletisim');

  return (
    <nav
      aria-label="Mobil Alt Navigasyon"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy-dark/95 backdrop-blur-lg border-t border-white/10 px-1 py-1 shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-5 items-center max-w-sm mx-auto text-center relative">
        {/* 1. Ana Sayfa */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-medium transition-colors ${
            isHome ? 'text-bronze font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className={`w-4 h-4 mb-0.5 ${isHome ? 'text-bronze' : 'text-gray-400'}`} />
          <span>Ana Sayfa</span>
        </Link>

        {/* 2. Hizmetler */}
        <Link
          href="/hizmetler"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-medium transition-colors ${
            isServices ? 'text-bronze font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className={`w-4 h-4 mb-0.5 ${isServices ? 'text-bronze' : 'text-gray-400'}`} />
          <span>Hizmetler</span>
        </Link>

        {/* 3. Ortada Tam Ortalı Buton: Fiyat Hesapla */}
        <div className="flex flex-col items-center justify-center">
          <Link
            href="/fiyat-hesaplama"
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-bronze to-orange-500 text-white flex items-center justify-center shadow-lg shadow-bronze/40 border-2 border-navy-dark hover:scale-105 active:scale-95 transition-all -mt-3.5"
            aria-label="Fiyat Hesapla"
          >
            <Calculator className="w-5 h-5" />
          </Link>
          <span className="text-[9px] font-bold text-bronze mt-0.5 tracking-tight block">
            Hesapla
          </span>
        </div>

        {/* 4. Blog */}
        <Link
          href="/blog"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-medium transition-colors ${
            isBlog ? 'text-bronze font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className={`w-4 h-4 mb-0.5 ${isBlog ? 'text-bronze' : 'text-gray-400'}`} />
          <span>Blog</span>
        </Link>

        {/* 5. İletişim */}
        <Link
          href="/iletisim"
          className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-medium transition-colors ${
            isContact ? 'text-bronze font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className={`w-4 h-4 mb-0.5 ${isContact ? 'text-bronze' : 'text-gray-400'}`} />
          <span>İletişim</span>
        </Link>
      </div>
    </nav>
  );
}
