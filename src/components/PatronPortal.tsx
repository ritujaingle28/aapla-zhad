import React, { useState } from 'react';
import {
  HERITAGE_TREES,
  PHENOLOGY_TIMELINE,
  FIELD_UPDATES,
  DELIVERY_FLUSHES,
  ESTATE_IMAGES,
} from '../data/orchardData';
import { PatronReservation, AuthUser } from '../types';

interface PatronPortalProps {
  reservation: PatronReservation | null;
  currentUser?: AuthUser | null;
  onBackToHome: () => void;
  onOpenReservation: () => void;
  onNavigateToSignIn?: () => void;
}

export const PatronPortal: React.FC<PatronPortalProps> = ({
  reservation,
  currentUser,
  onBackToHome,
  onOpenReservation,
  onNavigateToSignIn,
}) => {
  const [activeTab, setActiveTab] = useState<'chronicle' | 'crates' | 'certificate'>('chronicle');

  // Default tree if no custom reservation made yet
  const defaultTree = HERITAGE_TREES[0];
  const treeCode = reservation
    ? reservation.treeCode
    : currentUser?.treeAllocated || defaultTree.treeCode;
  const plotNumber = reservation
    ? reservation.plotNumber
    : currentUser?.plotNumber || defaultTree.plotNumber;
  const patronName = reservation
    ? reservation.patronName
    : currentUser?.name || 'Siddharth Mehta';
  const certNumber = reservation
    ? reservation.certificateNumber
    : currentUser?.certificateNumber || 'AZ-2025-KSH104-089';

  return (
    <div className="min-h-screen bg-[#0c0e11] text-[#f2eee9] pb-24">
      {/* Top Protocol Bar */}
      <div className="bg-[#080a0c] border-b border-white/[0.08] px-6 py-3">
        <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-4 text-[12px] font-sans-ui text-[#9ba1ad]">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-[#C98E4B] hover:text-[#fbba72] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Gothangaon Farm</span>
          </button>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <span className="flex items-center gap-1.5 text-[#e2b378]">
                <span className="material-symbols-outlined text-[15px] text-[#9cd3b4]">verified_user</span>
                <span>Authenticated Patron: <strong className="text-[#f2eee9]">{currentUser.name}</strong></span>
              </span>
            ) : onNavigateToSignIn ? (
              <button
                onClick={onNavigateToSignIn}
                className="flex items-center gap-1.5 text-[#C98E4B] hover:text-[#fbba72] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">login</span>
                <span>Sign in to personal tree</span>
              </button>
            ) : null}
            <span className="text-[#666c77]">|</span>
            <span className="flex items-center gap-1.5 text-[#9cd3b4]">
              <span className="w-2 h-2 rounded-full bg-[#9cd3b4] animate-pulse"></span>
              Live Telemetry: 29°C · Soil pH 7.4
            </span>
            <span className="text-[#666c77]">|</span>
            <span className="text-[#e2b378]">GI Cert #124 Provenance</span>
          </div>
        </div>
      </div>

      {/* Hero Patron Banner */}
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#15181e] to-[#0c0e11] px-6 lg:px-10 py-12">
        <div className="max-w-[1380px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C98E4B]/10 border border-[#C98E4B]/30 text-[#e2b378] text-[11px] font-sans-ui uppercase tracking-widest font-semibold mb-4">
              {plotNumber} · {treeCode}
            </div>
            <h1 className="font-garamond text-4xl lg:text-5xl text-[#f2eee9]">
              Patron Chronicle for {patronName}
            </h1>
            <p className="font-sans-ui text-[14px] text-[#9ba1ad] mt-2 font-light max-w-xl">
              Real-time biological monitoring of your designated 38-year-old heritage tree by Manik Mangoes at Gothangaon Farm.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/917965853333"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1b2026] border border-white/[0.08] hover:border-[#C98E4B]/40 text-[#f2eee9] font-sans-ui text-[13px] transition-colors"
            >
              <span className="material-symbols-outlined text-[17px] text-[#9cd3b4]">chat</span>
              <span>Field Agrologist Desk</span>
            </a>
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold hover:bg-[#e2b378] transition-colors cursor-pointer"
            >
              <span>Add Another Tree</span>
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>

        {/* Live Farm Telemetry Grid */}
        <div className="max-w-[1380px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/[0.08]">
          <div className="p-4 rounded-xl bg-[#1b2026]/70 border border-white/[0.08]">
            <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] block mb-1">
              Active Stage
            </span>
            <span className="font-garamond text-2xl text-[#9cd3b4] block">Fruit Set (Pea-Size)</span>
            <span className="font-sans-ui text-[11px] text-[#9ba1ad] block mt-0.5">
              18mm cluster diameter
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#1b2026]/70 border border-white/[0.08]">
            <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] block mb-1">
              Ambient Sunlight
            </span>
            <span className="font-garamond text-2xl text-[#e2b378] block">10.5 Hrs / Day</span>
            <span className="font-sans-ui text-[11px] text-[#9ba1ad] block mt-0.5">
              Concentrating tree sugars
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#1b2026]/70 border border-white/[0.08]">
            <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] block mb-1">
              Current Brix Testing
            </span>
            <span className="font-garamond text-2xl text-[#f2eee9] block">7.2° Brix</span>
            <span className="font-sans-ui text-[11px] text-[#9ba1ad] block mt-0.5">
              Target at flush: 20°-22°
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#1b2026]/70 border border-white/[0.08]">
            <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] block mb-1">
              Soil Vitality
            </span>
            <span className="font-garamond text-2xl text-[#9cd3b4] block">pH 7.4 Basaltic</span>
            <span className="font-sans-ui text-[11px] text-[#9ba1ad] block mt-0.5">
              Organic humus enriched
            </span>
          </div>
        </div>
      </div>

      {/* Portal Tabs */}
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10 mt-8">
        <div className="flex border-b border-white/[0.08] gap-6 font-sans-ui text-[13px]">
          <button
            onClick={() => setActiveTab('chronicle')}
            className={`pb-3 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'chronicle'
                ? 'text-[#C98E4B]'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            Live Phenology &amp; Field Chronicle
            {activeTab === 'chronicle' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C98E4B]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('crates')}
            className={`pb-3 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'crates'
                ? 'text-[#C98E4B]'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            3-Flush Crate Deliveries
            {activeTab === 'crates' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C98E4B]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`pb-3 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'certificate'
                ? 'text-[#C98E4B]'
                : 'text-[#9ba1ad] hover:text-[#f2eee9]'
            }`}
          >
            Brass Plaque &amp; Certificate
            {activeTab === 'certificate' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C98E4B]"></span>
            )}
          </button>
        </div>

        {/* TAB 1: PHENOLOGY & FIELD CHRONICLE */}
        {activeTab === 'chronicle' && (
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 5-Stage Phenology Timeline (7 cols) */}
            <div className="lg:col-span-7">
              <h3 className="font-garamond text-2xl text-[#f2eee9] mb-4">
                Phenology Lifecycle Stages
              </h3>
              <div className="space-y-4">
                {PHENOLOGY_TIMELINE.map((stage) => {
                  const isCurrent = stage.status === 'current';
                  const isCompleted = stage.status === 'completed';
                  return (
                    <div
                      key={stage.stageNumber}
                      className={`p-5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'border-[#C98E4B] bg-[#1b2026] shadow-lg shadow-[#C98E4B]/10'
                          : isCompleted
                          ? 'border-white/[0.08] bg-[#15181e]'
                          : 'border-white/[0.04] bg-[#0e1014] opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans-ui text-[11px] uppercase tracking-wider text-[#C98E4B] font-semibold">
                          Stage 0{stage.stageNumber} · {stage.timeline}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-[#9cd3b4]/10 text-[#9cd3b4] text-[10px] font-sans-ui font-medium border border-[#9cd3b4]/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9cd3b4] animate-ping"></span>
                            ACTIVE NOW
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[#9cd3b4] text-[11px] font-sans-ui flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                            Completed
                          </span>
                        )}
                      </div>

                      <h4 className="font-garamond text-xl text-[#f2eee9] mb-1">{stage.title}</h4>
                      <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light leading-relaxed mb-3">
                        {stage.description}
                      </p>

                      <div className="p-3 rounded-lg bg-[#0c0e11] border border-white/[0.05] text-[12px] font-sans-ui text-[#e2b378]">
                        <span className="text-[#666c77] font-medium mr-1.5">Agronomist Log:</span>
                        {stage.agronomistNote}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Field Updates & Photo Feed (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-garamond text-2xl text-[#f2eee9]">
                Recent Field Dispatches
              </h3>

              {FIELD_UPDATES.map((update) => (
                <div
                  key={update.id}
                  className="rounded-xl border border-white/[0.08] bg-[#15181e] overflow-hidden"
                >
                  <div className="h-44 relative overflow-hidden">
                    <img
                      alt={update.title}
                      className="w-full h-full object-cover filter contrast-[105%]"
                      src={update.image}
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0c0e11]/80 backdrop-blur-md text-[10px] font-sans-ui text-[#e2b378] uppercase tracking-wider font-semibold">
                      {update.date}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#9cd3b4] font-semibold block mb-1">
                      {update.stage}
                    </span>
                    <h4 className="font-garamond text-xl text-[#f2eee9] mb-2">{update.title}</h4>
                    <p className="font-sans-ui text-[12px] text-[#9ba1ad] leading-relaxed font-light mb-4">
                      {update.notes}
                    </p>
                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-sans-ui text-[#666c77]">
                      <span>{update.agronomistName}</span>
                      {update.sugarBrix && (
                        <span className="text-[#C98E4B] font-medium">{update.sugarBrix}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CRATES DELIVERIES */}
        {activeTab === 'crates' && (
          <div className="py-8 max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-xl bg-[#15181e] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#C98E4B] font-semibold block mb-1">
                  Delivery Destination
                </span>
                <div className="font-garamond text-xl text-[#f2eee9]">
                  {reservation ? reservation.address : '14B Seaface Apartments, Malabar Hill, Mumbai 400006'}
                </div>
                <span className="font-sans-ui text-[12px] text-[#9ba1ad] block mt-1">
                  Recipient: {patronName} · Insured Doorstep Air Dispatch
                </span>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-[#9cd3b4]/10 border border-[#9cd3b4]/30 text-[#9cd3b4] text-[12px] font-sans-ui self-start sm:self-auto font-medium">
                Total 50 KGs Confirmed
              </span>
            </div>

            <div className="space-y-4">
              {DELIVERY_FLUSHES.map((flush, idx) => (
                <div
                  key={flush.batchCode}
                  className="p-6 rounded-xl border border-white/[0.08] bg-[#15181e] flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1b2026] border border-white/[0.08] flex items-center justify-center text-[#C98E4B] shrink-0">
                      <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#C98E4B]/15 text-[#e2b378] text-[10px] font-sans-ui font-semibold">
                          {flush.batchNumber}
                        </span>
                        <span className="font-sans-ui text-[12px] text-[#9cd3b4] font-medium">
                          {flush.timeframe}
                        </span>
                      </div>
                      <h4 className="font-garamond text-2xl text-[#f2eee9] mb-1">
                        {flush.weightKgRange} · {flush.crateCount}
                      </h4>
                      <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light max-w-xl leading-relaxed">
                        {flush.flavorProfile}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.08]">
                    <span className="font-sans-ui text-[11px] text-[#666c77] uppercase tracking-wider block mb-1">
                      Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1b2026] text-[#e2b378] text-[12px] font-sans-ui font-medium border border-white/[0.08]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e2b378] animate-pulse"></span>
                      {idx === 0 ? 'Ripening on Tree' : 'Upcoming Flush'}
                    </span>
                    <span className="font-sans-ui text-[11px] text-[#666c77] mt-1">
                      {flush.quantityDozens}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BRASS PLAQUE & DIGITAL CERTIFICATE */}
        {activeTab === 'certificate' && (
          <div className="py-8 max-w-3xl mx-auto space-y-8">
            {/* Brass Plaque Showcase */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#c98e4b]/20 via-[#1b2026] to-[#080a0c] border-2 border-[#C98E4B]/60 shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-[#e2b378] border border-[#B87D3B]"></div>
              <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-[#e2b378] border border-[#B87D3B]"></div>
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-[#e2b378] border border-[#B87D3B]"></div>
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-[#e2b378] border border-[#B87D3B]"></div>

              <div className="text-center py-6">
                <span className="font-sans-ui text-[11px] uppercase tracking-[0.3em] text-[#e2b378] font-bold block mb-2">
                  AAPLA ZHAD · KESHAR HERITAGE RESERVE
                </span>
                <div className="w-28 h-0.5 bg-[#C98E4B]/40 mx-auto mb-4"></div>

                <h3 className="font-garamond text-3xl md:text-4xl font-semibold text-[#fbba72] uppercase tracking-wider mb-2">
                  {patronName}
                </h3>

                <p className="font-garamond italic text-[16px] md:text-[17px] text-[#f2eee9]/90 font-light mb-4 max-w-md mx-auto">
                  "{reservation?.plaque?.inscriptionMessage || 'Nurtured with devotion in the rich soil of Gothangaon Farm'}"
                </p>

                <div className="flex items-center justify-center gap-6 text-[12px] font-sans-ui text-[#e2b378]/80 uppercase tracking-widest pt-4 border-t border-[#C98E4B]/30 max-w-xs mx-auto">
                  <span>{plotNumber}</span>
                  <span>·</span>
                  <span>{treeCode}</span>
                  <span>·</span>
                  <span>SEASON 2025</span>
                </div>
              </div>
            </div>

            {/* Official Provenance Certificate */}
            <div className="rounded-xl border border-[#C98E4B]/40 bg-[#080a0c] p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 mb-6 gap-2">
                <div>
                  <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#C98E4B] font-semibold">
                    Official Registry Certificate
                  </span>
                  <h4 className="font-garamond text-2xl text-[#f2eee9]">
                    Keshar Certificate of Provenance · Manik Mangoes
                  </h4>
                </div>
                <span className="font-mono text-[12px] text-[#9cd3b4] px-3 py-1 rounded bg-[#9cd3b4]/10 border border-[#9cd3b4]/20 self-start sm:self-auto">
                  {certNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-[12px] font-sans-ui">
                <div>
                  <span className="text-[#666c77] block text-[10px] uppercase">Designated Patron</span>
                  <span className="text-[#f2eee9] font-medium">{patronName}</span>
                </div>
                <div>
                  <span className="text-[#666c77] block text-[10px] uppercase">Tree Age</span>
                  <span className="text-[#f2eee9] font-medium">38 Years Old</span>
                </div>
                <div>
                  <span className="text-[#666c77] block text-[10px] uppercase">Harvest Yield</span>
                  <span className="text-[#e2b378] font-semibold">50 KGs Guaranteed</span>
                </div>
                <div>
                  <span className="text-[#666c77] block text-[10px] uppercase">GI Registration</span>
                  <span className="text-[#9cd3b4] font-medium">GI Tag #124</span>
                </div>
              </div>

              <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light mb-6">
                This document certifies that tree {treeCode} at Gothangaon Farm is reserved under organic stewardship for Season 2025 by Manik Mangoes. All fruits are zero-chemical, ripened exclusively in open air with natural grass, and authenticated under GI Certificate #124.
              </p>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-[11px] font-sans-ui text-[#666c77]">
                <span>Aapla Zhad by Manik Mangoes · Gothangaon Farm</span>
                <span className="text-[#C98E4B]">Authenticated by Chief Agrologist Jayeshbhai Patel</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
