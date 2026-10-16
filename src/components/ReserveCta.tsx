import React from 'react';

interface ReserveCtaProps {
  onOpenReservation: () => void;
  onOpenFaq: () => void;
}

export const ReserveCta: React.FC<ReserveCtaProps> = ({ onOpenReservation, onOpenFaq }) => {
  return (
    <section className="w-full py-24 bg-[#121519]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="max-w-4xl mx-auto p-10 lg:p-14 rounded-2xl border border-[#C98E4B]/30 bg-[#080a0c] text-center relative shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c98e4b]/15 text-[#e2b378] font-sans-ui text-[10px] uppercase tracking-widest font-semibold mb-6">
            STRICTLY LIMITED CAPACITY FOR 2025 HARVEST
          </div>

          <h2 className="font-garamond text-4xl lg:text-5xl text-[#f2eee9] mb-4 font-normal">
            Reserve Your Heritage Keshar Tree Today
          </h2>

          <p className="font-sans-ui text-[15px] md:text-[16px] text-[#9ba1ad] mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Due to organic biological limits and our commitment to zero-chemical purity, we cap active patron allocations to just 150 trees per season.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onOpenReservation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[14px] font-semibold tracking-wide hover:bg-[#e2b378] transition-all duration-200 shadow-xl shadow-[#C98E4B]/15 cursor-pointer"
            >
              <span>Secure a Tree for ₹3,500 Deposit</span>
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>

            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded border border-white/[0.08] bg-[#1b2026] text-[#f2eee9] font-sans-ui text-[14px] font-medium tracking-wide hover:bg-[#232830] transition-colors"
              href="https://wa.me/917965853333"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9cd3b4]">chat</span>
              <span>Speak with Chief Agronomist</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-sans-ui text-[#666c77] pt-6 border-t border-white/[0.08]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C98E4B] text-[15px]">verified</span>
              100% Refundable Deposit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C98E4B] text-[15px]">pin</span>
              GI Registry #124 Certified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C98E4B] text-[15px]">flight</span>
              Free Nationwide Transit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
