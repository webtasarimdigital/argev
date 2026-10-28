import type { Metadata } from 'next';
import './globals.css';
import { SiteLayoutWrapper } from '@/components/layout/SiteLayoutWrapper';

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
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'dGsO2BgfvjDEPvZtTRGqQX1hAw5AtoI12iOvjDxjjXA',
  },
  openGraph: {
    title: 'ARGEV Yapı — Güvenli Çelik Mimarisi & Fiyat Hesaplayıcı',
    description: 'Düzce ve Batı Karadeniz için depreme tam dayanıklı hafif ve ağır çelik evler, çelik villalar. Şeffaf teklif hesaplama.',
    url: 'https://argevyapi.com',
    siteName: 'ARGEV Yapı',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'ARGEV Yapı Logo',
      },
      {
        url: '/celik-villa-aksam.jpg',
        width: 1200,
        height: 800,
        alt: 'ARGEV Yapı Çelik Villa',
      },
    ],
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
    logo: 'https://argevyapi.com/logo.png',
    image: 'https://argevyapi.com/logo.png',
    telephone: '+905413980081',
    sameAs: [
      'https://www.instagram.com/argevyapiduzce/',
      'https://share.google/hRm0NKr0D9ILdZyGQ',
    ],
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
        <meta name="google-site-verification" content="dGsO2BgfvjDEPvZtTRGqQX1hAw5AtoI12iOvjDxjjXA" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-white text-gray-900 antialiased selection:bg-bronze selection:text-white">
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
