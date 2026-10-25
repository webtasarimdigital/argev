import { QuoteCalculationResult } from './calculator';

export type LeadChannel = 'whatsapp_intent' | 'form' | 'phone_direct';

export type LeadStatus = 'new' | 'contacted' | 'proposal_sent' | 'won' | 'lost';

export interface Lead {
  id: string;
  quoteId?: string;
  quoteCode: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  district?: string;
  notes?: string;
  channel: LeadChannel;
  status: LeadStatus;
  kvkkConsent: boolean;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  quoteSnapshot?: QuoteCalculationResult;
}

export interface LeadSubmissionPayload {
  quoteCode?: string;
  serviceSlug: string;
  packageSlug?: string;
  buildingM2: number;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  district?: string;
  notes?: string;
  channel: LeadChannel;
  selections: Record<string, any>;
  kvkkConsent: boolean;
}
