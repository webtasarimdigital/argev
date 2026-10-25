'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Phone,
} from 'lucide-react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {
        // Autoplay may be restricted in some browsers without user interaction
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-navy-dark overflow-hidden pt-24 pb-16">
      {/* Background Architectural Video with Luxury Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-yatay.mp4"
          poster="/celik-villa-aksam.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-85 contrast-105 brightness-100 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Sophisticated architectural gradient: maintains vivid video center while ensuring crystal clear text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-navy-dark/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/50 via-transparent to-navy-dark/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(13,26,40,0.5)_100%)] pointer-events-none" />

        {/* Video Control Pills (Bottom Right Corner) */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-navy-dark/80 hover:bg-navy-dark text-white/90 hover:text-white border border-white/15 backdrop-blur-md transition-all shadow-lg"
            title={isPlaying ? 'Videoyu Duraklat' : 'Videoyu Başlat'}
            aria-label={isPlaying ? 'Videoyu Duraklat' : 'Videoyu Başlat'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-navy-dark/80 hover:bg-navy-dark text-white/90 hover:text-white border border-white/15 backdrop-blur-md transition-all shadow-lg"
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Engineering Badge with Live Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/70 border border-white/20 text-xs font-medium text-warm-white mb-6 backdrop-blur-md shadow-lg animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <ShieldCheck className="w-4 h-4 text-bronze-light" />
          <span>Düzce Fabrika İmalatı • 1. Derece Deprem Çelik Mimarisi</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight max-w-4xl leading-[1.15] mb-6 drop-shadow-lg">
          Depreme Dayanıklı, <br className="hidden sm:inline" />
          <span className="bronze-text-gradient">Lüks Çelik Konut</span> ve Villalar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
          Milimetrik hassasiyette galvanizli çelik karkas, A+ ısı yalıtımı ve modern mimari estetik. Düzce fabrikamızda üretip arsanızda 45 günde anahtar teslim kuruyoruz.
        </p>

        {/* Action CTAs: On mobile, only 1 prominent button; on desktop all 3 */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/fiyat-hesaplama"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-bronze via-bronze-light to-bronze shadow-lg shadow-bronze/30 hover:shadow-bronze-glow hover:scale-[1.03] transition-all duration-300 shimmer-btn"
          >
            <Calculator className="w-5 h-5" />
            <span>Fiyatınızı Hesaplayın</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/projeler"
            className="hidden sm:flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 shadow-md hover:scale-[1.02]"
          >
            <span>Projelerimizi İnceleyin</span>
          </Link>

          <a
            href="tel:05413980081"
            className="hidden sm:flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-gray-200 hover:text-white bg-slate-900/60 hover:bg-slate-900/80 border border-white/15 backdrop-blur-md transition-all hover:border-bronze"
            title="Düzce Merkez Ofis"
          >
            <Phone className="w-4 h-4 text-bronze-light" />
            <span>0541 398 00 81</span>
          </a>
        </div>

        {/* Key Architectural Metrics Bar with Hover Transitions */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-bronze/50 backdrop-blur-md text-left shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white block">
              %100
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              1. Derece Deprem Güvenliği
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-bronze/50 backdrop-blur-md text-left shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-bronze-light block">
              35-45 Gün
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              Hızlı Anahtar Teslim Montaj
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-bronze/50 backdrop-blur-md text-left shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white block">
              100+ Yıl
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              Galvaniz Paslanmaz Korozyon Ömrü
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-bronze/50 backdrop-blur-md text-left shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-bronze-light block">
              Sabit Fiyat
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              Sözleşme Sonrası Sürpriz Masraf Yok
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
