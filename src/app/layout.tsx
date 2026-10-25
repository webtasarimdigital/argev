import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';

export const metadata: Metadata = {
  title: 'ARGEV Yapı — Düzce Çelik Ev, Çelik Villa ve Depreme Dayanıklı Çelik Mimarisi',
  description:
    'Düzce ve Batı Karadeniz genelinde hafif çelik ev, ağır çelik ev, lüks çelik villa, çelik garaj ve ferforje imalatı. 1. derece deprem dayanımı, A+ taşyünü yalıtım ve 45 günde anahtar teslim kurulum.',
  keywords: [
    'Düzce Çelik Ev',
    'Düzce Hafif Çelik Ev',
    'Düzce Ağır Çelik Ev',
    'Düzce Çelik Villa',
    'Batı Karadeniz Çelik Ev',
    'Bolu Çelik Ev',
    'Sakarya Çelik Villa',
    'Depreme Dayanıklı Çelik Ev',
    'ARGEV Yapı',
    'Çelik Ev Fiyat Hesaplama',
  ],
  authors: [{ name: 'ARGEV Yapı ve Çelik Teknolojileri' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://argevyapi.com'),
  openGraph: {
    title: 'ARGEV Yapı — Güvenli Çelik Mimarisi & Fiyat Hesaplayıcı',
    description: 'Düzce ve Batı Karadeniz için depreme tam dayanıklı hafif ve ağır çelik evler, çelik villalar. Şeffaf teklif hesaplama.',
    url: 'https://argevyapi.com',
    siteName: 'ARGEV Yapı',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: 'ARGEV Yapı ve Çelik Teknolojileri',
    description: 'Düzce ve Batı Karadeniz genelinde hafif ve ağır çelik ev, çelik villa ve çelik garaj inşaatı.',
    url: 'https://argevyapi.com',
    telephone: '+903805240000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kültür Mah. Mehmet Akif Cad. No: 42/B',
      addressLocality: 'Düzce',
      addressRegion: 'Düzce',
      postalCode: '81010',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8438',
      longitude: '31.1565',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '18:30',
      },
    ],
  };

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-white text-gray-900 antialiased selection:bg-bronze selection:text-white">
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
