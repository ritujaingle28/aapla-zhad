import React from 'react';

export const MetricsBar: React.FC = () => {
  return (
    <section className="w-full bg-[#080a0c] border-b border-white/[0.08] py-12">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] text-center">
          <div className="flex flex-col items-center pt-4 sm:pt-0 px-4">
            <span className="font-garamond text-4xl lg:text-5xl text-[#e2b378] mb-1">100+</span>
            <span className="font-sans-ui text-[11px] uppercase tracking-[0.18em] text-[#9ba1ad] font-semibold">
              Connoisseur Patrons
            </span>
            <span className="font-sans-ui text-[12px] text-[#666c77] mt-1 font-light">
              Across Metro India
            </span>
          </div>

          <div className="flex flex-col items-center pt-4 sm:pt-0 px-4">
            <span className="font-garamond text-4xl lg:text-5xl text-[#9cd3b4] mb-1">25</span>
            <span className="font-sans-ui text-[11px] uppercase tracking-[0.18em] text-[#9ba1ad] font-semibold">
              Acres Living Agro-Forest
            </span>
            <span className="font-sans-ui text-[12px] text-[#666c77] mt-1 font-light">
              Mineral-rich Gothangaon terroir
            </span>
          </div>

          <div className="flex flex-col items-center pt-4 sm:pt-0 px-4">
            <span className="font-garamond text-4xl lg:text-5xl text-[#C98E4B] mb-1">1,500+</span>
            <span className="font-sans-ui text-[11px] uppercase tracking-[0.18em] text-[#9ba1ad] font-semibold">
              Numbered Heritage Trees
            </span>
            <span className="font-sans-ui text-[12px] text-[#666c77] mt-1 font-light">
              Deep-rooted 40-75 yr trees
            </span>
          </div>

          <div className="flex flex-col items-center pt-4 sm:pt-0 px-4">
            <span className="font-garamond text-4xl lg:text-5xl text-[#f2eee9] mb-1">100%</span>
            <span className="font-sans-ui text-[11px] uppercase tracking-[0.18em] text-[#9ba1ad] font-semibold">
              Chemical-Free Promise
            </span>
            <span className="font-sans-ui text-[12px] text-[#666c77] mt-1 font-light">
              No carbide ripening ever
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
