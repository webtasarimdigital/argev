'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-warm-card border-t border-warm-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            MERAK EDİLENLER
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-dark tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm text-gray-600 mt-3">
            Çelik ev inşaatı, ruhsat, statik ve maliyetler hakkında teknik bilgiler.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="luxury-card rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-navy-dark font-serif">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-bronze shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
