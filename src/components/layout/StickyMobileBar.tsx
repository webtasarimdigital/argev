'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, MessageSquare, Phone } from 'lucide-react';

export function StickyMobileBar() {
  const pathname = usePathname();

  // Do not show on admin routes or when directly in calculator to avoid double bars
  if (pathname.startsWith('/admin') || pathname.startsWith('/fiyat-hesaplama')) {
    return null;
  }

  return (
    <aside
      aria-label="Hızlı İletişim ve Teklif Çubuğu"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy-dark/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 shadow-2xl safe-area-bottom"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href="tel:05413980081"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4 text-bronze-light mb-0.5" />
          <span className="text-[10px] font-semibold">Hemen Ara</span>
        </a>

        <a
          href="https://wa.me/905413980081?text=Merhaba%20ARGEV%20Yapı,%20çelik%20ev%20projeleriniz%20hakkında%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>

        <Link
          href="/fiyat-hesaplama"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-gradient-to-r from-bronze to-bronze-dark text-white shadow-md hover:from-bronze-light hover:to-bronze transition-all"
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold">Fiyat Hesapla</span>
        </Link>
      </div>
    </aside>
  );
}
