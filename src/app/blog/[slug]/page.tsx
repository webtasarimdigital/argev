import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DataStore } from '@/lib/data-store';
import { formatDate } from '@/lib/utils';
import { Clock, ChevronRight, Calculator, ArrowRight, Share2, BookOpen } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await DataStore.getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Yazı Bulunamadı — ARGEV Blog' };

  return {
    title: `${post.title} — ARGEV Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await DataStore.getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-navy">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-navy">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy font-semibold line-clamp-1">{post.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-bronze" />
              {post.readingTimeMin} dakika okuma süresi
            </span>
            <span>•</span>
            <span>Yayınlanma: {formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-luxury bg-navy-dark">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="luxury-card p-6 sm:p-10 rounded-2xl mb-12">
          <div className="text-sm sm:text-base text-gray-800 leading-relaxed font-light space-y-6 whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-navy to-navy-dark text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury">
          <div>
            <span className="text-xs text-bronze-light font-bold uppercase tracking-wider block mb-1">
              PROJENİZ İÇİN HESAPLAMA YAPIN
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold">
              Kendi Çelik Evinizin Maliyetini Öğrenin
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Dilediğiniz m² ve oda sayısına göre anlık fiyat teklifi oluşturun.
            </p>
          </div>
          <Link
            href="/fiyat-hesaplama"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-bronze to-bronze-dark text-white text-xs font-semibold flex items-center justify-center gap-2 shrink-0 shadow-md"
          >
            <Calculator className="w-4 h-4" />
            <span>Fiyat Hesapla</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
