import React from 'react';
import { HarvestSchedule } from '../HarvestSchedule';
import { MetricsBar } from '../MetricsBar';
import { TestimonialsSection } from '../TestimonialsSection';
import { ReserveCta } from '../ReserveCta';

interface HarvestCycleTabProps {
  onOpenReservation: () => void;
}

export const HarvestCycleTab: React.FC<HarvestCycleTabProps> = ({ onOpenReservation }) => {
  return (
    <div className="w-full">
      {/* Editorial Header Banner */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#121519] to-[#0c0e11] py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C98E4B]/30 bg-[#15181e] text-[#C98E4B] text-[11px] uppercase tracking-[0.2em] font-medium mb-5">
              <span className="material-symbols-outlined text-[15px]">calendar_month</span>
              MAY – JUNE 2025 · 3-FLUSH ALLOCATION
            </div>
            <h1 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#f2eee9] font-normal leading-tight mb-6">
              The 3-Flush Harvest Schedule
            </h1>
            <p className="font-sans-ui text-[16px] text-[#9ba1ad] leading-relaxed font-light">
              Keshar matures in three distinct solar flushes across May and June. To prevent household spoilage and deliver fruit at peak physiological brix, your 50 KGs yield is dispatched in three timed ventilated wooden crates.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Flush Harvest Calendar & Crate Specifications */}
      <HarvestSchedule />

      {/* Protocol Metrics Bar */}
      <MetricsBar />

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
