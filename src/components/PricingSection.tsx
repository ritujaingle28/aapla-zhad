import React from 'react';

interface PricingSectionProps {
  onOpenReservation: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="pricing" className="w-full py-24 bg-[#121519] border-b border-white/[0.08]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans-ui text-[11px] uppercase tracking-[0.24em] text-[#C98E4B] font-bold block mb-2">
            Transparent Pricing &amp; Allocation
          </span>
          <h2 className="font-garamond text-4xl text-[#f2eee9] font-normal">
            A Direct Connoisseur Model
          </h2>
          <p className="font-sans-ui text-[14px] text-[#9ba1ad] mt-2 font-light">
            No intermediaries. Pure agricultural transparency from blossom to dispatch.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl border border-[#C98E4B]/30 bg-[#15181e] overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {/* Left 7 cols */}
            <div className="md:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#C98E4B] font-semibold">
                    Season 2025 Tier
                  </span>
                  <span className="text-[11px] font-sans-ui px-2 py-0.5 rounded bg-[#c98e4b]/20 text-[#e2b378] font-medium">
                    1 TREE SUBSCRIPTION
                  </span>
                </div>
                <h3 className="font-garamond text-3xl text-[#f2eee9] mb-2">
                  Heritage Keshar Tree
                </h3>
                <p className="font-sans-ui text-[14px] text-[#9ba1ad] font-light leading-relaxed mb-6">
                  Complete seasonal allocation guaranteeing 50 KGs of export-grade GI certified mangoes dispatched across 3 wooden crates to your home.
                </p>
                <div className="space-y-3 font-sans-ui text-[13px]">
                  <div className="flex items-center gap-2.5 text-[#f2eee9]">
                    <span className="material-symbols-outlined text-[#C98E4B] text-[18px]">check</span>
                    <span>Engraved Brass Plaque with Family Inscription</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#f2eee9]">
                    <span className="material-symbols-outlined text-[#C98E4B] text-[18px]">check</span>
                    <span>Fortnightly Video &amp; Phenology Field Reports</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#f2eee9]">
                    <span className="material-symbols-outlined text-[#C98E4B] text-[18px]">check</span>
                    <span>Free Temperature-Controlled Air Courier Delivery</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[12px] font-sans-ui text-[#666c77]">
                <span>Effective Rate: ₹210 / KG</span>
                <span>GI Registry #124 Certified</span>
              </div>
            </div>

            {/* Right 5 cols */}
            <div className="md:col-span-5 p-8 lg:p-10 bg-[#080a0c]/60 flex flex-col justify-between">
              <div>
                <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#666c77] block mb-1">
                  Total Subscription
                </span>
                <div className="font-garamond text-4xl lg:text-5xl text-[#f2eee9] mb-1">
                  ₹10,500
                </div>
                <span className="font-sans-ui text-[12px] text-[#9ba1ad] block mb-6 font-light">
                  All inclusive of harvesting, curing &amp; doorstep logistics
                </span>

                <div className="p-4 rounded-lg bg-[#1b2026] border border-white/[0.08] mb-6 font-sans-ui text-[12px]">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#9ba1ad]">Payable to Reserve Now:</span>
                    <span className="text-[#e2b378] font-semibold">₹3,500</span>
                  </div>
                  <div className="flex justify-between text-[#666c77]">
                    <span>Balance upon First May Flush:</span>
                    <span className="text-[#f2eee9]">₹7,000</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenReservation}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold tracking-wide hover:bg-[#e2b378] transition-all duration-200 shadow-lg cursor-pointer"
              >
                <span>Reserve Tree for ₹3,500</span>
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
