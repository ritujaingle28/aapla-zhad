export interface HeritageTree {
  id: string;
  plotNumber: string;
  treeCode: string;
  ageYears: number;
  location: string;
  soilType: string;
  soilPh: string;
  avgBrixRating: number;
  expectedHarvestKg: number;
  status: 'Available' | 'Reserved' | 'Allocated';
  image: string;
  phenologyStatus: string;
  story: string;
}

export interface PlaqueDetails {
  patronName: string;
  inscriptionMessage: string;
  year: string;
  isGift: boolean;
  giftRecipientName?: string;
  giftNote?: string;
}

export interface PatronReservation {
  id: string;
  treeId: string;
  treeCode: string;
  plotNumber: string;
  patronName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  pincode: string;
  specialInstructions?: string;
  plaque: PlaqueDetails;
  reservationDate: string;
  depositPaid: number;
  balanceDue: number;
  certificateNumber: string;
}

export interface PhenologyMilestone {
  stageNumber: number;
  title: string;
  timeline: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  agronomistNote: string;
  brixLevel?: string;
  fruitSizeMm?: number;
}

export interface FieldUpdate {
  id: string;
  date: string;
  stage: string;
  title: string;
  notes: string;
  agronomistName: string;
  image: string;
  sugarBrix?: string;
}

export interface DeliveryFlush {
  batchNumber: string;
  batchCode: string;
  timeframe: string;
  weightKgRange: string;
  quantityDozens: string;
  flavorProfile: string;
  crateCount: string;
  status: 'Scheduled' | 'Curing in Hay' | 'Dispatched' | 'Delivered';
}

export interface FaqItem {
  question: string;
  category: 'Provenance' | 'Harvest & Delivery' | 'Purity Guarantee' | 'Farm Visits';
  answer: string;
}

export type ActiveTab =
  | 'home'
  | 'how-it-works'
  | 'harvest-cycle'
  | 'pricing'
  | 'faqs'
  | 'estate-desk'
  | 'portal'
  | 'signin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  role: 'patron' | 'guest';
  treeAllocated?: string;
  plotNumber?: string;
  certificateNumber?: string;
  joinedDate: string;
}

export interface PatronReview {
  id: string;
  author: string;
  initials: string;
  role: string;
  location: string;
  rating: number;
  reviewText: string;
  date: string;
  timestamp: number;
  treeCode?: string;
  verified: boolean;
}

