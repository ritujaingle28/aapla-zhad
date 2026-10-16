import React from 'react';
import { StewardshipSteps } from '../StewardshipSteps';
import { TerroirSection } from '../TerroirSection';
import { TestimonialsSection } from '../TestimonialsSection';
import { ReserveCta } from '../ReserveCta';

interface HowItWorksTabProps {
  onOpenReservation: (mode?: 'self' | 'gift') => void;
  onOpenPatronPortal: () => void;
  onNavigateToPricing: () => void;
}

export const HowItWorksTab: React.FC<HowItWorksTabProps> = ({
  onOpenReservation,
  onOpenPatronPortal,
  onNavigateToPricing,
}) => {
  return (
    <div className="w-full">
      {/* Editorial Header Banner */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#121519] to-[#0c0e11] py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C98E4B]/30 bg-[#15181e] text-[#C98E4B] text-[11px] uppercase tracking-[0.2em] font-medium mb-5">
              <span className="material-symbols-outlined text-[15px]">eco</span>
              GI CERTIFIED PROTOCOL · THREE STEPS
            </div>
            <h1 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#f2eee9] font-normal leading-tight mb-6">
              How Tree Stewardship Works
            </h1>
            <p className="font-sans-ui text-[16px] text-[#9ba1ad] leading-relaxed font-light">
              From hand-selecting your designated heritage tree at Gothangaon Farm to engraving your family brass plaque, receiving live WhatsApp phenology journals, and savouring 50 KGs of certified fruit across 3 ripe flushes.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Stewardship Steps */}
      <StewardshipSteps
        onOpenReservation={() => onOpenReservation('self')}
        onOpenPatronPortal={onOpenPatronPortal}
        onNavigateToPricing={onNavigateToPricing}
      />

      {/* Terroir & Purity Foundations */}
      <TerroirSection />

      {/* Verified Patron Chronicles */}
      <TestimonialsSection />

      {/* Reserve CTA */}
      <ReserveCta
        onOpenReservation={() => onOpenReservation('self')}
        onOpenFaq={() => {}}
      />
    </div>
  );
};
