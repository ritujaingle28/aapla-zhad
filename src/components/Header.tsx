import React, { useState } from 'react';
import { ESTATE_IMAGES } from '../data/orchardData';
import { ActiveTab, AuthUser } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenReservation: (mode?: 'self' | 'gift') => void;
  currentUser?: AuthUser | null;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenReservation,
  currentUser,
  onSignOut,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e11]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1380px] mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
        {/* Monogram & Estate Brand */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-4 group text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-lg bg-[#1b2026] border border-[#C98E4B]/25 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              alt="Aapla Zhad Logo"
              className="h-8 w-8 object-contain"
              src={ESTATE_IMAGES.logo}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-garamond text-[26px] tracking-wide text-[#f2eee9] leading-tight font-normal group-hover:text-[#fbba72] transition-colors">
                Aapla Zhad
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 rounded bg-[#C98E4B]/15 text-[#e2b378] font-sans-ui font-semibold border border-[#C98E4B]/30">
                Manik Mangoes
              </span>
            </div>
            <span className="font-sans-ui text-[9px] uppercase tracking-[0.22em] text-[#C98E4B] font-semibold">
              by Manik Mangoes · Gothangaon Keshar Reserve
            </span>
          </div>
        </button>

        {/* Primary Estate Navigation */}
        <nav className="hidden lg:flex items-center gap-7 font-sans-ui text-[13px] tracking-wide">
          <button
            onClick={() => onTabChange('home')}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#C98E4B] font-medium'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>Home</span>
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C98E4B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => onTabChange('how-it-works')}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              activeTab === 'how-it-works'
                ? 'text-[#C98E4B] font-medium'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>How It Works</span>
            {activeTab === 'how-it-works' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C98E4B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => onTabChange('harvest-cycle')}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              activeTab === 'harvest-cycle'
                ? 'text-[#C98E4B] font-medium'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>The Harvest Cycle</span>
            {activeTab === 'harvest-cycle' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C98E4B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => onTabChange('pricing')}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              activeTab === 'pricing'
                ? 'text-[#C98E4B] font-medium'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>Pricing &amp; Allocation</span>
            {activeTab === 'pricing' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C98E4B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => onTabChange('faqs')}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              activeTab === 'faqs'
                ? 'text-[#C98E4B] font-medium'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>FAQs</span>
            {activeTab === 'faqs' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C98E4B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => onTabChange('estate-desk')}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              activeTab === 'estate-desk'
                ? 'text-[#C98E4B] font-medium'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>Estate Desk</span>
            {activeTab === 'estate-desk' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C98E4B] rounded-full"></span>
            )}
          </button>
        </nav>

        {/* Fast Action Tiers */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#15181e] border border-[#C98E4B]/30 hover:border-[#C98E4B] transition-colors cursor-pointer text-left"
              >
                <div className="w-7 h-7 rounded-full bg-[#C98E4B]/20 border border-[#C98E4B]/40 text-[#e2b378] font-sans-ui text-[11px] font-bold flex items-center justify-center">
                  {currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase() || 'P'}
                </div>
                <div className="hidden sm:block">
                  <div className="font-sans-ui text-[12px] text-[#f2eee9] font-medium leading-none">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="font-sans-ui text-[10px] text-[#C98E4B] mt-0.5 leading-none">
                    {currentUser.treeAllocated ? 'Tree Steward' : 'Patron'}
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#9ba1ad]">
                  {isUserMenuOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#12151a] border border-[#C98E4B]/30 shadow-2xl p-2 z-50 animate-fade-in font-sans-ui text-[12px]">
                  <div className="px-3 py-2 border-b border-white/[0.08] mb-1">
                    <div className="font-medium text-[#f2eee9] truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-[#666c77] truncate">{currentUser.email}</div>
                    {currentUser.treeAllocated && (
                      <div className="text-[10px] text-[#C98E4B] mt-1 font-mono">
                        {currentUser.treeAllocated}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onTabChange('portal');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-[#f2eee9] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#C98E4B]">dashboard</span>
                    <span>My Patron Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onSignOut) onSignOut();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 flex items-center gap-2 cursor-pointer mt-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => onTabChange('signin')}
                className={`flex items-center gap-1.5 font-sans-ui text-[12px] uppercase tracking-wider px-3 py-2 transition-all rounded cursor-pointer ${
                  activeTab === 'signin'
                    ? 'text-[#C98E4B] bg-[#C98E4B]/10 border border-[#C98E4B]/30'
                    : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                }`}
                title="Patron Sign In"
              >
                <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">login</span>
                <span>Sign In</span>
              </button>

              <button
                onClick={() => onTabChange('portal')}
                className={`hidden sm:flex items-center gap-1.5 font-sans-ui text-[12px] uppercase tracking-wider px-3 py-2 transition-all rounded cursor-pointer ${
                  activeTab === 'portal'
                    ? 'text-[#C98E4B] bg-[#C98E4B]/10 border border-[#C98E4B]/30'
                    : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                }`}
                title="Access Your Reserved Tree Chronicle"
              >
                <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">lock</span>
                <span>Portal</span>
              </button>
            </>
          )}

          <button
            onClick={() => onOpenReservation('self')}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold tracking-wide hover:bg-[#e2b378] transition-all duration-200 shadow-md shadow-[#C98E4B]/10 cursor-pointer shrink-0"
          >
            <span>Rent a Tree (₹3,500)</span>
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#9ba1ad] hover:text-[#f2eee9] cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#121519] border-b border-white/[0.08] px-6 py-5 flex flex-col gap-3 font-sans-ui text-[14px]">
          <button
            onClick={() => {
              onTabChange('home');
              setIsMobileMenuOpen(false);
            }}
            className={`text-left py-1.5 flex items-center justify-between ${
              activeTab === 'home' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>Home</span>
            {activeTab === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
          </button>
          <button
            onClick={() => {
              onTabChange('how-it-works');
              setIsMobileMenuOpen(false);
            }}
            className={`text-left py-1.5 flex items-center justify-between ${
              activeTab === 'how-it-works' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>How It Works</span>
            {activeTab === 'how-it-works' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
          </button>
          <button
            onClick={() => {
              onTabChange('harvest-cycle');
              setIsMobileMenuOpen(false);
            }}
            className={`text-left py-1.5 flex items-center justify-between ${
              activeTab === 'harvest-cycle' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>The Harvest Cycle</span>
            {activeTab === 'harvest-cycle' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
          </button>
          <button
            onClick={() => {
              onTabChange('pricing');
              setIsMobileMenuOpen(false);
            }}
            className={`text-left py-1.5 flex items-center justify-between ${
              activeTab === 'pricing' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>Pricing &amp; Allocation</span>
            {activeTab === 'pricing' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
          </button>
          <button
            onClick={() => {
              onTabChange('faqs');
              setIsMobileMenuOpen(false);
            }}
            className={`text-left py-1.5 flex items-center justify-between ${
              activeTab === 'faqs' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>FAQs</span>
            {activeTab === 'faqs' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
          </button>
          <button
            onClick={() => {
              onTabChange('estate-desk');
              setIsMobileMenuOpen(false);
            }}
            className={`text-left py-1.5 flex items-center justify-between ${
              activeTab === 'estate-desk' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            <span>Estate Desk</span>
            {activeTab === 'estate-desk' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
          </button>
          
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="flex items-center justify-between py-1 text-[12px] text-[#9ba1ad]">
                  <span>Signed in as <strong className="text-[#f2eee9]">{currentUser.name}</strong></span>
                  <button
                    onClick={() => {
                      if (onSignOut) onSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
                <button
                  onClick={() => {
                    onTabChange('portal');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-1.5 ${
                    activeTab === 'portal' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">dashboard</span>
                    <span>My Patron Portal</span>
                  </div>
                  {activeTab === 'portal' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onTabChange('signin');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-1.5 ${
                    activeTab === 'signin' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">login</span>
                    <span>Patron Sign In</span>
                  </div>
                  {activeTab === 'signin' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
                </button>

                <button
                  onClick={() => {
                    onTabChange('portal');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-1.5 ${
                    activeTab === 'portal' ? 'text-[#C98E4B] font-medium' : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">lock</span>
                    <span>Patron Portal</span>
                  </div>
                  {activeTab === 'portal' && <span className="w-1.5 h-1.5 rounded-full bg-[#C98E4B]"></span>}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

