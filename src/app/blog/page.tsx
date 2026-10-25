import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { DataStore } from '@/lib/data-store';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çelik Yapı Rehberi & Mühendislik Blogu — ARGEV Yapı',
  description:
    'Çelik ev deprem dayanımı, taşyünü yalıtımı, betonarme ile karşılaştırmalar ve Düzce imar süreçleri hakkında teknik makaleler.',
};

export default async function BlogPage() {
  const posts = await DataStore.getBlogPosts();

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            MÜHENDİSLİK BİLGİ BANKASI
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
            Çelik Yapı Rehberi & Blog
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
            Deprem güvenliği, enerji verimliliği ve doğru yapı malzemesi seçimi üzerine uzman makaleleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-navy-dark">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-navy-dark/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-warm-white">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-bronze" />
                      {post.readingTimeMin} dk okuma
                    </span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <h2 className="text-lg font-bold font-serif text-navy-dark mb-3 line-clamp-2 hover:text-bronze transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4 font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-bronze transition-colors"
                >
                  <span>Yazının Devamını Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
