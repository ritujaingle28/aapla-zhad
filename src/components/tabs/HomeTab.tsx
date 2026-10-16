import React from 'react';
import { Hero } from '../Hero';
import { MetricsBar } from '../MetricsBar';
import { TerroirSection } from '../TerroirSection';
import { StewardshipSteps } from '../StewardshipSteps';
import { HarvestSchedule } from '../HarvestSchedule';
import { PricingSection } from '../PricingSection';
import { TestimonialsSection } from '../TestimonialsSection';
import { ReserveCta } from '../ReserveCta';

interface HomeTabProps {
  onOpenReservation: (mode?: 'self' | 'gift') => void;
  onOpenPatronPortal: () => void;
  onNavigateTab: (tab: 'how-it-works' | 'harvest-cycle' | 'pricing' | 'faqs' | 'estate-desk') => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onOpenReservation,
  onOpenPatronPortal,
  onNavigateTab,
}) => {
  return (
    <div className="w-full">
      {/* Hero Split Ledger */}
      <Hero
        onOpenReservation={onOpenReservation}
        onOpenPatronPortal={onOpenPatronPortal}
      />

      {/* Protocol Metrics Bar */}
      <MetricsBar />

      {/* Terroir & Taste Profile */}
      <TerroirSection />

      {/* Stewardship Pathways (How Aapla Zhad Works) */}
      <StewardshipSteps
        onOpenReservation={() => onOpenReservation('self')}
        onOpenPatronPortal={onOpenPatronPortal}
        onNavigateToPricing={() => onNavigateTab('pricing')}
      />

      {/* The 3-Flush Delivery Schedule */}
      <HarvestSchedule />

      {/* Transparent Pricing & Allocation */}
      <PricingSection onOpenReservation={() => onOpenReservation('self')} />

      {/* Patron Chronicles (Testimonials) */}
      <TestimonialsSection />

      {/* Final Call to Patrons (Reserve CTA) */}
      <ReserveCta
        onOpenReservation={() => onOpenReservation('self')}
        onOpenFaq={() => onNavigateTab('faqs')}
      />
    </div>
  );
};
