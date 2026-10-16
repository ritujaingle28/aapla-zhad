import React from 'react';

export const AnnouncementTicker: React.FC = () => {
  return (
    <aside className="w-full bg-[#080a0c] border-b border-white/[0.08] text-[11px] font-sans-ui tracking-wider py-2.5 px-6">
      <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-4 text-[#9ba1ad]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#C98E4B] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B] animate-pulse"></span>
            MANIK MANGOES · SEASON 2025 ALLOCATION
          </span>
          <span className="text-[#666c77]">|</span>
          <span className="text-[#f2eee9] font-light">Strictly 150 Heritage Trees Available at Gothangaon Farm</span>
          <span className="hidden md:inline px-2 py-0.5 rounded bg-[#C98E4B]/10 text-[#C98E4B] text-[10px] uppercase font-semibold">
            GI Cert #124
          </span>
        </div>
        <div className="flex items-center gap-5 text-[11px]">
          <span className="hidden sm:inline text-[#666c77] font-light">Direct Field Agrology Desk:</span>
          <a
            className="text-[#f2eee9] hover:text-[#C98E4B] transition-colors flex items-center gap-1.5"
            href="tel:+917965853333"
          >
            <span className="material-symbols-outlined text-[14px] text-[#C98E4B]">call</span>
            +91 79658 53333
          </a>
        </div>
      </div>
    </aside>
  );
};
