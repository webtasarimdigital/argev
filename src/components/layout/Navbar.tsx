'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Phone,
  Menu,
  X,
  ChevronRight,
  Shield,
  Layers,
  Instagram,
  MapPin,
} from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Fiyat Hesaplama', href: '/fiyat-hesaplama', highlight: true },
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'Projeler', href: '/projeler' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-luxury py-3'
            : 'bg-navy-dark/95 border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg border border-white/20 bg-navy/80 p-0.5 group-hover:scale-105 transition-all duration-300 ring-2 ring-bronze/30 shrink-0">
                <img
                  src="/logo.png"
                  alt="ARGEV Yapı Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-white font-serif flex items-center gap-1.5">
                  ARGEV <span className="text-bronze text-base font-sans font-semibold">YAPI</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gray-300 font-medium">
                  Çelik Teknolojileri • Düzce
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'text-white bg-white/10 font-semibold'
                        : link.highlight
                        ? 'text-bronze-light hover:text-white hover:bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              <a
                href="https://www.instagram.com/argevyapiduzce/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                title="Instagram @argevyapiduzce"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:05413980081"
                className="flex items-center gap-2 text-xs xl:text-sm font-medium text-gray-300 hover:text-white transition-colors"
                title="Düzce Ofis Telefonu"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-bronze-light">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="hidden xl:inline whitespace-nowrap">0541 398 00 81</span>
              </a>

              <Link
                href="/fiyat-hesaplama"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-bronze to-bronze-dark hover:from-bronze-light hover:to-bronze shadow-md shadow-bronze/20 hover:shadow-lg transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <Calculator className="w-4 h-4" />
                <span>Teklif Hesapla</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/fiyat-hesaplama"
                className="p-2 rounded-lg bg-bronze text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                <span>Hesapla</span>
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2.5 rounded-lg text-gray-300 hover:text-white bg-white/5 focus:outline-none"
                aria-label="Menüyü Aç"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-navy-dark border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-navy/80 p-0.5 ring-2 ring-bronze/30 shrink-0">
                    <img
                      src="/logo.png"
                      alt="ARGEV Yapı Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white tracking-wider font-serif text-base">ARGEV YAPI</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">Düzce Çelik</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-bronze text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:05413980081"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/5 text-gray-200 text-sm font-medium hover:bg-white/10"
              >
                <Phone className="w-4 h-4 text-bronze" />
                <span>0541 398 00 81</span>
              </a>
              <a
                href="https://www.instagram.com/argevyapiduzce/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 text-gray-200 text-xs font-medium hover:bg-white/10"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram: @argevyapiduzce</span>
              </a>
              <Link
                href="/fiyat-hesaplama"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-bronze to-bronze-dark text-white font-semibold text-center text-sm shadow-md"
              >
                Detaylı Teklif Hesapla
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
