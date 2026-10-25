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
} from 'lucide-react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
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
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-45 scale-105 transition-transform duration-1000"
          aria-hidden="true"
        />

        {/* Multi-layered luxury architectural gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/65 to-navy-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 via-transparent to-navy-dark/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,107,85,0.15)_0%,transparent_75%)]" />

        {/* Video Control Pills (Bottom Right Corner) */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-navy-dark/75 hover:bg-navy-dark text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all shadow-lg"
            title={isPlaying ? 'Videoyu Duraklat' : 'Videoyu Başlat'}
            aria-label={isPlaying ? 'Videoyu Duraklat' : 'Videoyu Başlat'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-navy-dark/75 hover:bg-navy-dark text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all shadow-lg"
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Engineering Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-warm-white mb-6 backdrop-blur-md shadow-md animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-bronze-light" />
          <span>Düzce ve Batı Karadeniz&apos;in Güvenli Çelik Mimarisi</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight max-w-4xl leading-[1.15] mb-6 drop-shadow-md">
          Depreme Dayanıklı, <br className="hidden sm:inline" />
          <span className="bronze-text-gradient">Lüks Çelik Konut</span> ve Villalar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
          Milimetrik hassasiyette galvanizli çelik karkas, A+ ısı yalıtımı ve modern mimari estetik. Düzce fabrikamızda üretip arsanızda 45 günde anahtar teslim kuruyoruz.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/fiyat-hesaplama"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-bronze to-bronze-dark hover:from-bronze-light hover:to-bronze shadow-lg shadow-bronze/30 hover:scale-[1.02] transition-all"
          >
            <Calculator className="w-5 h-5" />
            <span>Fiyatınızı Hesaplayın</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/projeler"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md hover:border-white/30 transition-all shadow-md"
          >
            <span>Projelerimizi İnceleyin</span>
          </Link>
        </div>

        {/* Key Architectural Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-left shadow-lg">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white block">
              %100
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              1. Derece Deprem Güvenliği
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-left shadow-lg">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-bronze-light block">
              35-45 Gün
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              Hızlı Anahtar Teslim Montaj
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-left shadow-lg">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white block">
              100+ Yıl
            </span>
            <span className="text-xs text-gray-300 mt-0.5 block font-medium">
              Galvaniz Paslanmaz Korozyon Ömrü
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md text-left shadow-lg">
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
