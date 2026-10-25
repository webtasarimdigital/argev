'use client';

import React, { useState, useEffect } from 'react';
import { Project, BlogPost, FAQItem } from '@/types/content';
import { FolderOpen, FileText, HelpCircle, Layers, Check, Plus } from 'lucide-react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'faqs'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial projects, blog posts, FAQs
    Promise.all([
      fetch('/api/admin/services').then(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-bronze block mb-1">
          MEDYA VE İÇERİK
        </span>
        <h1 className="text-2xl font-serif font-bold text-white">İçerik Yönetimi</h1>
        <p className="text-xs text-slate-400 mt-1">
          Tamamlanan çelik projeler, mühendislik blog yazıları ve sıkça sorulan sorular.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'projects'
              ? 'bg-bronze text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Referans Projeler</span>
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'blog'
              ? 'bg-bronze text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Blog Yazıları</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'faqs'
              ? 'bg-bronze text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Sıkça Sorulan Sorular</span>
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Mevcut Projeler</h3>
            <span className="text-xs text-emerald-400 font-medium">3 Aktif Proje Yayında</span>
          </div>
          <p className="text-xs text-slate-400">
            Düzce, Akçakoca ve Bolu referans projeleri portföy sayfasında görüntülenmektedir.
          </p>
        </div>
      )}

      {activeTab === 'blog' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Blog Makaleleri</h3>
            <span className="text-xs text-emerald-400 font-medium">3 Teknik Makale Yayında</span>
          </div>
          <p className="text-xs text-slate-400">
            Deprem dayanımı, hafif vs ağır çelik karşılaştırması ve ısı yalıtımı rehberleri.
          </p>
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Sıkça Sorulan Sorular</h3>
            <span className="text-xs text-emerald-400 font-medium">6 SSS Maddesi Aktif</span>
          </div>
          <p className="text-xs text-slate-400">
            Deprem güvenliği, ruhsat süreci ve ahşap/bungalov politikası açıklamaları ana sayfada yayınlanmaktadır.
          </p>
        </div>
      )}
    </div>
  );
}
