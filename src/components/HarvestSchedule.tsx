import React from 'react';

export const HarvestSchedule: React.FC = () => {
  return (
    <section id="harvest-cycle" className="w-full py-24 bg-[#0c0e11] border-b border-white/[0.08]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="rounded-2xl border border-[#C98E4B]/30 bg-[#15181e]/80 p-8 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left intro (4 cols) */}
            <div className="lg:col-span-4">
              <span className="font-sans-ui text-[11px] uppercase tracking-[0.2em] text-[#C98E4B] font-bold block mb-2">
                Stewardship Calendar 2025
              </span>
              <h3 className="font-garamond text-3xl lg:text-4xl text-[#f2eee9] font-normal mb-4 leading-tight">
                The 3-Flush Delivery Schedule
              </h3>
              <p className="font-sans-ui text-[14px] text-[#9ba1ad] leading-relaxed font-light mb-6">
                Nature doesn't ripen 50 kilograms at once. We stagger deliveries over three distinct picking phases to ensure you enjoy peak sweetness all through summer.
              </p>
              <div className="p-4 rounded-lg bg-[#1b2026] border border-white/[0.08]">
                <div className="flex items-center gap-2 text-[#f2eee9] font-sans-ui text-[13px] font-semibold mb-1">
                  <span className="material-symbols-outlined text-[#9cd3b4] text-[18px]">flight</span>
                  <span>Free Insured Air Logistics</span>
                </div>
                <p className="font-sans-ui text-[12px] text-[#666c77] font-light">
                  Direct door dispatch to Mumbai, Delhi NCR, Bangalore, Pune, Ahmedabad &amp; Hyderabad.
                </p>
              </div>
            </div>

            {/* Right 3 flushes (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Flush 01 */}
              <div className="p-6 rounded-xl bg-[#1b2026] border border-white/[0.08] flex flex-col justify-between hover:border-[#C98E4B]/30 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-sans-ui font-bold bg-[#C98E4B]/15 text-[#C98E4B]">
                      BATCH 01
                    </span>
                    <span className="font-sans-ui text-[11px] text-[#666c77] uppercase tracking-wider">
                      EARLY MAY
                    </span>
                  </div>
                  <div className="font-garamond text-3xl text-[#f2eee9] mb-1">16 - 18 KGs</div>
                  <p className="font-sans-ui text-[12px] text-[#9ba1ad] font-light leading-relaxed mt-2">
                    First canopy flush. Intensely aromatic with crisp floral honey notes.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between font-sans-ui text-[11px] text-[#9cd3b4]">
                  <span>1 Wooden Crate</span>
                  <span>4-5 Dozens</span>
                </div>
              </div>

              {/* Flush 02 */}
              <div className="p-6 rounded-xl bg-[#1b2026] border border-white/[0.08] flex flex-col justify-between hover:border-[#9cd3b4]/30 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-sans-ui font-bold bg-[#9cd3b4]/15 text-[#9cd3b4]">
                      BATCH 02
                    </span>
                    <span className="font-sans-ui text-[11px] text-[#666c77] uppercase tracking-wider">
                      MID MAY
                    </span>
                  </div>
                  <div className="font-garamond text-3xl text-[#f2eee9] mb-1">16 - 18 KGs</div>
                  <p className="font-sans-ui text-[12px] text-[#9ba1ad] font-light leading-relaxed mt-2">
                    Peak mid-season harvest. Deep saffron pulp with high natural Brix sweetness.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between font-sans-ui text-[11px] text-[#9cd3b4]">
                  <span>1 Wooden Crate</span>
                  <span>4-5 Dozens</span>
                </div>
              </div>

              {/* Flush 03 */}
              <div className="p-6 rounded-xl bg-[#1b2026] border border-white/[0.08] flex flex-col justify-between hover:border-[#C98E4B]/30 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-sans-ui font-bold bg-[#C98E4B]/15 text-[#C98E4B]">
                      BATCH 03
                    </span>
                    <span className="font-sans-ui text-[11px] text-[#666c77] uppercase tracking-wider">
                      EARLY JUNE
                    </span>
                  </div>
                  <div className="font-garamond text-3xl text-[#f2eee9] mb-1">14 - 16 KGs</div>
                  <p className="font-sans-ui text-[12px] text-[#9ba1ad] font-light leading-relaxed mt-2">
                    Final canopy maturation. Velvety, rich, and concentrated dessert profile.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between font-sans-ui text-[11px] text-[#9cd3b4]">
                  <span>1 Wooden Crate</span>
                  <span>3-4 Dozens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
