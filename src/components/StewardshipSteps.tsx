import React from 'react';

interface StewardshipStepsProps {
  onOpenReservation: () => void;
  onOpenPatronPortal: () => void;
  onNavigateToPricing: () => void;
}

export const StewardshipSteps: React.FC<StewardshipStepsProps> = ({
  onOpenReservation,
  onOpenPatronPortal,
  onNavigateToPricing,
}) => {
  return (
    <section id="how-it-works" className="w-full py-24 bg-[#121519] border-b border-white/[0.08]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans-ui text-[11px] uppercase tracking-[0.24em] text-[#C98E4B] font-bold block mb-3">
            Seamless Direct Ownership
          </span>
          <h2 className="font-garamond text-4xl lg:text-5xl text-[#f2eee9] font-normal mb-3">
            How Aapla Zhad Works
          </h2>
          <p className="font-sans-ui text-[15px] text-[#9ba1ad] font-light leading-relaxed">
            From winter flowering to late spring harvest, experience the intimacy of having your personal tree at Gothangaon Farm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="relative p-8 rounded-xl border border-white/[0.08] bg-[#15181e] flex flex-col justify-between hover:border-[#C98E4B]/30 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <span className="font-garamond text-4xl text-[#C98E4B]/40 group-hover:text-[#e2b378] transition-colors">
                  01
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#1b2026] border border-white/[0.08] flex items-center justify-center text-[#C98E4B]">
                  <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                </div>
              </div>
              <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#C98E4B] font-semibold block mb-2">
                Stewardship Reserve
              </span>
              <h3 className="font-garamond text-2xl text-[#f2eee9] mb-3">
                Choose &amp; Name Your Tree
              </h3>
              <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light mb-8">
                Select your aged Keshar tree from our registered Gothangaon Farm groves. Receive an engraved vintage brass plaque bearing your family name or message.
              </p>
            </div>
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 font-sans-ui text-[12px] uppercase tracking-wider text-[#e2b378] group-hover:text-[#fbba72] font-semibold text-left cursor-pointer"
            >
              <span>The 4-Step Stewardship Journey</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                east
              </span>
            </button>
          </div>

          {/* Step 02 */}
          <div className="relative p-8 rounded-xl border border-white/[0.08] bg-[#15181e] flex flex-col justify-between hover:border-[#C98E4B]/30 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <span className="font-garamond text-4xl text-[#9cd3b4]/40 group-hover:text-[#9cd3b4] transition-colors">
                  02
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#1b2026] border border-white/[0.08] flex items-center justify-center text-[#9cd3b4]">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
              </div>
              <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#9cd3b4] font-semibold block mb-2">
                Continuous Chronicle
              </span>
              <h3 className="font-garamond text-2xl text-[#f2eee9] mb-3">
                Track Tree Phenology
              </h3>
              <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light mb-8">
                Receive high-definition fortnightly updates via WhatsApp: blossom pollination, fruit thinning, and canopy maturation monitored by our chief agronomist.
              </p>
            </div>
            <button
              onClick={onOpenPatronPortal}
              className="inline-flex items-center gap-2 font-sans-ui text-[12px] uppercase tracking-wider text-[#9cd3b4] group-hover:text-[#9cd3b4]/80 font-semibold text-left cursor-pointer"
            >
              <span>Explore The 3-Stage Harvest</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                east
              </span>
            </button>
          </div>

          {/* Step 03 */}
          <div className="relative p-8 rounded-xl border border-white/[0.08] bg-[#15181e] flex flex-col justify-between hover:border-[#C98E4B]/30 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <span className="font-garamond text-4xl text-[#e2b378]/40 group-hover:text-[#e2b378] transition-colors">
                  03
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#1b2026] border border-white/[0.08] flex items-center justify-center text-[#e2b378]">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
              </div>
              <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#e2b378] font-semibold block mb-2">
                Branch To Doorstep
              </span>
              <h3 className="font-garamond text-2xl text-[#f2eee9] mb-3">
                50 KGs Delivered in Batches
              </h3>
              <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light mb-8">
                Fruit is hand-plucked at optimal physiological maturity and shipped in 3 timed flushes (May - June) inside ventilated wooden crates packed with natural grass.
              </p>
            </div>
            <button
              onClick={onNavigateToPricing}
              className="inline-flex items-center gap-2 font-sans-ui text-[12px] uppercase tracking-wider text-[#C98E4B] group-hover:text-[#e2b378] font-semibold text-left cursor-pointer"
            >
              <span>Review Transparent Pricing</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                east
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
