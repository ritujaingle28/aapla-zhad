import React from 'react';
import { ESTATE_IMAGES } from '../data/orchardData';
import { ActiveTab } from '../types';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenReservation: () => void;
  onOpenFaqDrawer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onTabChange,
  onOpenReservation,
  onOpenFaqDrawer,
}) => {
  return (
    <footer className="w-full bg-[#080a0c] border-t border-white/[0.08] py-16">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand & Terroir Bio */}
          <div className="lg:col-span-4">
            <button
              onClick={() => onTabChange('home')}
              className="flex items-center gap-3 mb-4 text-left cursor-pointer group"
            >
              <img
                alt="Aapla Zhad Logo"
                className="h-8 w-auto rounded object-contain"
                src={ESTATE_IMAGES.footerLogo}
              />
              <div className="flex flex-col">
                <span className="font-garamond text-2xl text-[#f2eee9] group-hover:text-[#fbba72] transition-colors">
                  Aapla Zhad
                </span>
                <span className="font-sans-ui text-[10px] uppercase tracking-[0.2em] text-[#C98E4B] font-semibold">
                  Manik Mangoes Heritage Reserve
                </span>
              </div>
            </button>
            <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light leading-relaxed max-w-sm mb-6">
              Private Keshar reserve stewardship by Manik Mangoes at Gothangaon Farm. Authentic farm-to-crate provenance, strictly organic micro-batches, and hand-delivered harvest allocations.
            </p>
            <div className="flex items-center gap-2 font-sans-ui text-[11px] text-[#666c77]">
              <span className="material-symbols-outlined text-[15px] text-[#C98E4B]">pin_drop</span>
              <span>GOTHANGAON FARM TERROIR</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-sans-ui text-[11px] uppercase tracking-[0.2em] text-[#C98E4B] font-bold mb-4">
              Reserve Navigation
            </h4>
            <ul className="space-y-2.5 font-sans-ui text-[13px] text-[#9ba1ad] font-light">
              <li>
                <button
                  onClick={() => onTabChange('home')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer"
                >
                  Home Reserve
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('how-it-works')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('harvest-cycle')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer"
                >
                  The Harvest Cycle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('pricing')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer"
                >
                  Pricing &amp; Allocation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('portal')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer"
                >
                  Patron Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('signin')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer flex items-center gap-1.5 text-[#C98E4B]"
                >
                  <span className="material-symbols-outlined text-[15px]">login</span>
                  <span>Patron Sign In</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('faqs')}
                  className="hover:text-[#f2eee9] transition-colors text-left cursor-pointer"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Protocol Desk */}
          <div className="lg:col-span-3">
            <h4 className="font-sans-ui text-[11px] uppercase tracking-[0.2em] text-[#C98E4B] font-bold mb-4">
              Estate Protocol Desk
            </h4>
            <div className="space-y-2 font-sans-ui text-[13px] text-[#9ba1ad] font-light leading-relaxed">
              <p>
                Aapla Zhad by Manik Mangoes<br />
                Gothangaon Farm
              </p>
              <p className="text-[#f2eee9]">concierge@aaplazhad.estate</p>
              <p className="text-[#f2eee9]">+91 79658 53333 (10:00 - 18:00 IST)</p>
              <div className="pt-2">
                <button
                  onClick={() => onTabChange('estate-desk')}
                  className="text-[#C98E4B] hover:text-[#fbba72] font-medium transition-colors cursor-pointer text-[12px] inline-flex items-center gap-1"
                >
                  <span>Open Estate Desk View</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Private Concierge Messaging */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-sans-ui text-[11px] uppercase tracking-[0.2em] text-[#C98E4B] font-bold mb-4">
                Private Concierge
              </h4>
              <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light leading-relaxed mb-4">
                Engage our estate agronomist directly via encrypted messaging for customized allocation orders and grove visits.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                className="inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded bg-[#1b2026] border border-white/[0.08] text-[#f2eee9] font-sans-ui text-[13px] hover:border-[#C98E4B]/30 transition-colors"
                href="https://wa.me/917965853333"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">chat</span>
                <span>WhatsApp Concierge</span>
              </a>
              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 rounded bg-[#C98E4B]/10 hover:bg-[#C98E4B]/20 text-[#C98E4B] border border-[#C98E4B]/30 font-sans-ui text-[12px] font-semibold transition-colors cursor-pointer"
              >
                Rent a Tree (₹3,500 Deposit)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 font-sans-ui text-[12px] text-[#666c77]">
          <p>© 2025 Aapla Zhad by Manik Mangoes. Keshar Certified Geographical Indication (GI #124).</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onTabChange('faqs')}
              className="hover:text-[#9ba1ad] transition-colors cursor-pointer"
            >
              Harvest Guarantee
            </button>
            <button
              onClick={() => onTabChange('faqs')}
              className="hover:text-[#9ba1ad] transition-colors cursor-pointer"
            >
              Terms of Stewardship
            </button>
            <button
              onClick={() => onTabChange('faqs')}
              className="hover:text-[#9ba1ad] transition-colors cursor-pointer"
            >
              Privacy Charter
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

