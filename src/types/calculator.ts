export type PricingType =
  | 'included'
  | 'fixed'
  | 'per_m2_building'
  | 'per_m2_custom'
  | 'per_linear_meter'
  | 'per_piece'
  | 'percentage_of_base'
  | 'multiplier'
  | 'tiered_m2'
  | 'quote_only'
  | 'safe_formula';

export type CalculatorFieldType =
  | 'number'
  | 'stepper'
  | 'select'
  | 'image_radio'
  | 'checkbox'
  | 'toggle'
  | 'text'
  | 'quantity'
  | 'info_note';

export interface PricingRule {
  id: string;
  serviceId?: string | null;
  category:
    | 'base'
    | 'package'
    | 'foundation'
    | 'permit'
    | 'facade'
    | 'flooring'
    | 'heating'
    | 'kitchen'
    | 'bathroom'
    | 'extra'
    | 'transport'
    | (string & {});
  code: string;
  title: string;
  description?: string;
  pricingType: PricingType;
  unitLabel: string; // '₺', '₺/m²', '₺/mtül', '₺/adet'
  unitPrice: number; // Kuruş bazlı or TL integer/decimal
  isOptional: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface CalculatorOption {
  id: string;
  fieldId: string;
  optionKey: string;
  label: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  pricingRuleCode?: string;
  customPrice?: number;
  isDefault?: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface DependencyCondition {
  field: string;
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  greaterThan?: number;
}

export interface CalculatorField {
  id: string;
  stepId: string;
  fieldKey: string;
  label: string;
  helpText?: string;
  fieldType: CalculatorFieldType;
  pricingRuleCode?: string;
  isRequired: boolean;
  minValue?: number;
  maxValue?: number;
  stepValue?: number;
  defaultValue?: string | number | boolean;
  dependencyCondition?: DependencyCondition;
  displayOrder: number;
  isActive: boolean;
  options?: CalculatorOption[];
}

export interface CalculatorStep {
  id: string;
  serviceId?: string | null;
  stepNumber: number;
  title: string;
  shortTitle: string;
  subtitle?: string;
  isActive: boolean;
  displayOrder: number;
  fields: CalculatorField[];
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  slug: 'kaba-yapi' | 'distan-bitmis' | 'anahtar-teslim';
  name: string;
  description?: string;
  priceMultiplier: number;
  isDefault?: boolean;
  inclusions: string[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  summary: string;
  description: string;
  iconName: string;
  featuredImage: string;
  pricingType: 'm2' | 'linear_meter' | 'piece' | 'custom';
  baseM2Price: number;
  minM2: number;
  maxM2: number;
  defaultTurnaroundDays: number;
  calculatorActive: boolean;
  isActive: boolean;
  displayOrder: number;
  packages: ServicePackage[];
}

export interface QuoteItemBreakdown {
  category: string;
  itemCode: string;
  itemTitle: string;
  quantity: number;
  unitLabel: string;
  unitPrice: number;
  totalPrice: number;
  isQuoteOnly: boolean;
  note?: string;
}

export interface QuoteCalculationInput {
  serviceSlug: string;
  packageSlug?: string;
  buildingM2: number;
  city: string;
  district?: string;
  // Field values keyed by fieldKey
  selections: Record<string, any>;
}

export interface QuoteCalculationResult {
  quoteCode: string;
  serviceName: string;
  packageTitle: string;
  buildingM2: number;
  basePrice: number;
  optionsTotal: number;
  shippingTotal: number;
  subtotal: number;
  kdvRate: number;
  kdvTotal: number;
  grandTotal: number;
  hasQuoteOnlyItems: boolean;
  quoteOnlyCount: number;
  items: QuoteItemBreakdown[];
  timestamp: string;
  warnings?: string[];
}
