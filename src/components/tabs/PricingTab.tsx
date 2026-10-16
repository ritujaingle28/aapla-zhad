import React from 'react';
import { PricingSection } from '../PricingSection';
import { TestimonialsSection } from '../TestimonialsSection';
import { ReserveCta } from '../ReserveCta';

interface PricingTabProps {
  onOpenReservation: () => void;
}

export const PricingTab: React.FC<PricingTabProps> = ({ onOpenReservation }) => {
  return (
    <div className="w-full">
      {/* Editorial Header Banner */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#121519] to-[#0c0e11] py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C98E4B]/30 bg-[#15181e] text-[#C98E4B] text-[11px] uppercase tracking-[0.2em] font-medium mb-5">
              <span className="material-symbols-outlined text-[15px]">payments</span>
              TRANSPARENT VALUE · SEASON 2025
            </div>
            <h1 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#f2eee9] font-normal leading-tight mb-6">
              Pricing &amp; Allocation Model
            </h1>
            <p className="font-sans-ui text-[16px] text-[#9ba1ad] leading-relaxed font-light">
              Full tree stewardship is reserved for ₹10,500 with complete financial transparency. An initial ₹3,500 booking deposit secures your numbered tree, with the ₹7,000 balance due only when your harvest is verified and crated.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing & Allocation Cards */}
      <PricingSection onOpenReservation={onOpenReservation} />

      {/* Patron Chronicles */}
      <TestimonialsSection />

      {/* Reserve CTA */}
      <ReserveCta
        onOpenReservation={onOpenReservation}
        onOpenFaq={() => {}}
      />
    </div>
  );
};
