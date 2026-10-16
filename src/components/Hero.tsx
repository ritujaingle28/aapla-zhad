import React from 'react';
import { ESTATE_IMAGES } from '../data/orchardData';

interface HeroProps {
  onOpenReservation: (mode?: 'self' | 'gift') => void;
  onOpenPatronPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenPatronPortal }) => {
  return (
    <section id="hero" className="relative border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#121519] via-[#0c0e11] to-[#0c0e11]">
      {/* Ambient Lighting Blobs */}
      <div className="absolute -top-32 left-1/3 w-[580px] h-[580px] bg-[#C98E4B]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#184E37]/15 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1380px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Story, Title & Terms (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Monogram Seal & Terroir Origin */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[#C98E4B]/25 bg-[#15181e]/80 backdrop-blur-md mb-8">
              <span className="material-symbols-outlined text-[15px] text-[#C98E4B]">verified</span>
              <span className="font-sans-ui text-[11px] tracking-[0.16em] uppercase text-[#e2b378] font-medium">
                certified heritage. gothangaon. 2025 allocation
              </span>
            </div>

            <h1 className="font-garamond text-5xl md:text-6xl lg:text-[68px] leading-[1.08] text-[#f2eee9] tracking-tight font-normal mb-6">
              Rent a Mango Tree.<br />
              <span className="italic font-garamond text-[#e2b378] font-normal">
                Enjoy Nature’s Sweetness.
              </span>
            </h1>

            <p className="font-sans-ui text-[16px] md:text-[17px] text-[#9ba1ad] leading-relaxed mb-8 max-w-2xl font-light">
              Through <span className="text-[#f2eee9] font-medium">Aapla Zhad by Manik Mangoes</span>, rent a numbered heritage tree in our organic farm for{' '}
              <span className="text-[#f2eee9] font-medium">₹10,500</span> and receive{' '}
              <span className="text-[#e2b378] font-medium">50 KGs of authentic Keshar mangoes</span>{' '}
              — intensely sweet, fibreless, and zero-chemical, delivered directly from branch to your doorstep.
            </p>

            {/* Dual Booking Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => onOpenReservation('self')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[14px] font-semibold tracking-wide hover:bg-[#e2b378] transition-all duration-200 shadow-xl shadow-[#C98E4B]/15 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Rent a Tree Now (₹3,500)</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => onOpenReservation('gift')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded border border-white/[0.08] bg-[#1b2026]/60 hover:bg-[#232830] text-[#f2eee9] font-sans-ui text-[14px] font-medium tracking-wide transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#C98E4B]">card_giftcard</span>
                <span>Gift a Tree</span>
              </button>
            </div>

            {/* Structured Trust Ledger Bar */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-y border-white/[0.08] py-4 bg-[#080a0c]/40">
              <div className="flex flex-col py-2 sm:py-0 sm:px-5 first:pl-0">
                <div className="flex items-center gap-1.5 text-[#C98E4B] mb-1">
                  <span className="material-symbols-outlined text-[17px]">eco</span>
                  <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] font-semibold">
                    Purity Guarantee
                  </span>
                </div>
                <span className="font-sans-ui text-[14px] text-[#f2eee9] font-medium">100% Chemical-Free</span>
                <span className="font-sans-ui text-[12px] text-[#9ba1ad] mt-0.5 font-light">
                  Cow-dung &amp; neem cake nurture
                </span>
              </div>
              <div className="flex flex-col py-2 sm:py-0 sm:px-5">
                <div className="flex items-center gap-1.5 text-[#C98E4B] mb-1">
                  <span className="material-symbols-outlined text-[17px]">inventory_2</span>
                  <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] font-semibold">
                    Crate Delivery
                  </span>
                </div>
                <span className="font-sans-ui text-[14px] text-[#f2eee9] font-medium">50 KGs Farm Fresh</span>
                <span className="font-sans-ui text-[12px] text-[#9ba1ad] mt-0.5 font-light">
                  Shipped across 3 ripe flushes
                </span>
              </div>
              <div className="flex flex-col py-2 sm:py-0 sm:px-5 last:pr-0">
                <div className="flex items-center gap-1.5 text-[#C98E4B] mb-1">
                  <span className="material-symbols-outlined text-[17px]">verified_user</span>
                  <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] font-semibold">
                    Provenance
                  </span>
                </div>
                <span className="font-sans-ui text-[14px] text-[#f2eee9] font-medium">Farm to Doorstep</span>
                <span className="font-sans-ui text-[12px] text-[#9ba1ad] mt-0.5 font-light">
                  No middlemen, GI Tag #124
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Living Certificate Card Showcase (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl border border-[#C98E4B]/50 bg-[#080a0c] p-3 shadow-2xl overflow-hidden group">
              {/* Real Estate Image with Golden Vignette */}
              <div className="relative h-[480px] rounded-lg overflow-hidden border border-white/[0.08]">
                <img
                  alt="Sunlit ancient Keshar mango tree at Gothangaon Farm"
                  className="w-full h-full object-cover filter contrast-[105%]"
                  src={ESTATE_IMAGES.treeHero}
                />
                {/* Atmospheric Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-[#0c0e11]/30 to-transparent"></div>

                {/* Top Architectural Plaque */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between p-3 rounded bg-[#0c0e11]/85 backdrop-blur-md border border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#C98E4B] text-[20px]">workspace_premium</span>
                    <div>
                      <div className="font-sans-ui text-[9px] uppercase tracking-widest text-[#C98E4B] font-bold">
                        MANIK MANGOES · PLOT #14
                      </div>
                      <div className="font-garamond text-[18px] text-[#f2eee9] leading-tight font-normal">
                        KESAR mangoes
                      </div>
                    </div>
                  </div>
                  <span className="font-sans-ui text-[11px] px-2 py-0.5 rounded bg-[#9cd3b4]/10 text-[#9cd3b4] border border-[#9cd3b4]/20">
                    38 YRS OLD
                  </span>
                </div>

                {/* Bottom Floating Ledger Certificate */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#15181e]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-[11px] font-sans-ui">
                    <span className="flex items-center gap-2 text-[#9cd3b4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9cd3b4] animate-pulse"></span>
                      Live Phenology Status
                    </span>
                    <span className="text-[#e2b378] font-medium uppercase tracking-wider">
                      March: Fruit Set (Pea-Size)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div>
                      <span className="font-sans-ui text-[11px] text-[#666c77] uppercase tracking-wider block">
                        Guaranteed Harvest
                      </span>
                      <span className="font-garamond text-[24px] text-[#f2eee9] leading-none">
                        50 KGs
                      </span>
                      <span className="font-sans-ui text-[11px] text-[#9ba1ad] block mt-1">
                        in 3 wooden crates
                      </span>
                    </div>
                    <div className="border-l border-white/[0.08] pl-3">
                      <span className="font-sans-ui text-[11px] text-[#666c77] uppercase tracking-wider block">
                        Subscription Model
                      </span>
                      <span className="font-garamond text-[24px] text-[#C98E4B] leading-none">
                        ₹3,500 <span className="text-[13px] font-sans-ui text-[#9ba1ad]">Deposit</span>
                      </span>
                      <span className="font-sans-ui text-[11px] text-[#9ba1ad] block mt-1">
                        ₹7,000 on harvest
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-sans-ui text-[#666c77]">
                    <span>Gothangaon Farm</span>
                    <span>Basaltic Clay pH 7.4</span>
                  </div>
                </div>
              </div>

              {/* Sub-plaque Footer Stamp */}
              <div className="px-3 pt-3 pb-1 flex items-center justify-between text-[11px] font-sans-ui text-[#9ba1ad]">
                <button
                  onClick={onOpenPatronPortal}
                  className="flex items-center gap-1.5 text-[#e2b378] hover:text-[#fbba72] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  Engraved Brass Provenance Plaque Included
                </button>
                <span className="text-[#666c77]">₹10,500 Total Season</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
