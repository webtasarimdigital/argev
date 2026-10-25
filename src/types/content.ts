export interface Project {
  id: string;
  slug: string;
  title: string;
  serviceSlug: string;
  serviceName: string;
  locationCity: string;
  locationDistrict: string;
  areaM2: number;
  year: number;
  durationDays: number;
  steelTonnage: number;
  summary: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  isFeatured: boolean;
  features: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readingTimeMin: number;
  publishedAt: string;
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  instagramUrl: string;
  kdvRate: number;
  heroVideoUrl?: string;
  heroPosterUrl: string;
  defaultPriceValidityDays: number;
}
