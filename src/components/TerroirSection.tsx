import React from 'react';
import { ESTATE_IMAGES } from '../data/orchardData';

export const TerroirSection: React.FC = () => {
  return (
    <section id="terroir" className="w-full py-24 bg-[#0c0e11] border-b border-white/[0.08]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-sans-ui text-[11px] uppercase tracking-[0.24em] text-[#C98E4B] font-bold block mb-3">
              Terroir &amp; Taste Profile
            </span>
            <h2 className="font-garamond text-4xl lg:text-5xl text-[#f2eee9] font-normal leading-tight">
              Crafted by 110 Days of Sun &amp; Deccani Rock
            </h2>
          </div>
          <p className="font-sans-ui text-[14px] text-[#9ba1ad] max-w-md font-light leading-relaxed">
            Unlike commercial cultivars force-ripened with calcium carbide, Aapla Zhad Keshar develops unhurried on the limb, producing unmatched aroma and silkiness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Large Sensorial Visual Column (7 Cols) */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#15181e] min-h-[480px] flex flex-col justify-end p-8 lg:p-10 shadow-xl">
            <img
              alt="Macro close-up of sliced golden Keshar mango"
              className="absolute inset-0 w-full h-full object-cover filter saturate-[110%]"
              src={ESTATE_IMAGES.mangoMacro}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-[#0c0e11]/55 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="font-garamond text-3xl md:text-4xl text-[#f2eee9] mb-3">
                Unrivaled 19° to 22° Brix Sweetness
              </h3>
              <p className="font-sans-ui text-[15px] text-[#9ba1ad] max-w-xl mb-6 font-light leading-relaxed">
                Silky, stringless saffron pulp with a honeyed floral bouquet. Each fruit matures through 110 days of warm dry sun and cold dew-drenched nights.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm font-sans-ui">
                <div className="flex items-center gap-2 text-[#f2eee9]">
                  <span className="material-symbols-outlined text-[#C98E4B] text-[19px]">check_circle</span>
                  <span>Naturally Tree-Ripened</span>
                </div>
                <div className="flex items-center gap-2 text-[#f2eee9]">
                  <span className="material-symbols-outlined text-[#C98E4B] text-[19px]">check_circle</span>
                  <span>Completely Fibreless</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ledger Specification Tiles (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#1b2026]/70 hover:border-[#C98E4B]/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#091f14] border border-[#9cd3b4]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#9cd3b4] text-[24px]">volcano</span>
                </div>
                <div>
                  <h4 className="font-garamond text-[22px] text-[#f2eee9] mb-1 leading-snug">
                    Volcanic Mineral Terroir
                  </h4>
                  <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light">
                    Black basaltic loam enriched by seasonal river runoffs across Gothangaon Farm infuses distinct iron and magnesium trace minerals into the roots.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#1b2026]/70 hover:border-[#C98E4B]/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#232830] border border-[#C98E4B]/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#e2b378] text-[24px]">local_florist</span>
                </div>
                <div>
                  <h4 className="font-garamond text-[22px] text-[#f2eee9] mb-1 leading-snug">
                    Intense Honey-Florals
                  </h4>
                  <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light">
                    Unmistakable fragrance that fills an entire room within minutes of opening the wooden crate. Gentle undertones of wild honey, saffron strands, and fresh citrus blossom.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#1b2026]/70 hover:border-[#C98E4B]/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#080a0c] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#9cd3b4] text-[24px]">science_off</span>
                </div>
                <div>
                  <h4 className="font-garamond text-[22px] text-[#f2eee9] mb-1 leading-snug">
                    Zero Artificial Ripening
                  </h4>
                  <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light">
                    We use traditional hay-curing in shaded open-air farm pavilions. Never treated with toxic calcium carbide or ethylene gassing rooms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
