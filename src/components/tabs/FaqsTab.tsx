import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/orchardData';
import { ReserveCta } from '../ReserveCta';

interface FaqsTabProps {
  onOpenReservation: () => void;
}

export const FaqsTab: React.FC<FaqsTabProps> = ({ onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ['All', 'Provenance', 'Harvest & Delivery', 'Purity Guarantee', 'Farm Visits'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* Editorial Header Banner */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#121519] to-[#0c0e11] py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C98E4B]/30 bg-[#15181e] text-[#C98E4B] text-[11px] uppercase tracking-[0.2em] font-medium mb-5">
              <span className="material-symbols-outlined text-[15px]">help_center</span>
              PATRON CLARIFICATIONS · PROTOCOL MANUAL
            </div>
            <h1 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#f2eee9] font-normal leading-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-sans-ui text-[16px] text-[#9ba1ad] leading-relaxed font-light">
              Clear answers regarding tree allocation rights, zero-chemical certification, the 3-flush harvest calendar, vintage brass plaque engraving, and visiting your designated tree at Gothangaon Farm.
            </p>
          </div>
        </div>
      </section>

      {/* Main FAQ Content Area */}
      <section className="py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-4 border-b border-white/[0.08]">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full font-sans-ui text-[13px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-md shadow-[#C98E4B]/20'
                      : 'bg-[#15181e] text-[#9ba1ad] hover:text-[#f2eee9] border border-white/[0.08]'
                  }`}
                >
                  {category === 'All' ? 'All Questions' : category}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Interactive FAQ Accordion (7 Columns) */}
            <div className="lg:col-span-7 space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-[#C98E4B]/40 bg-[#15181e]'
                        : 'border-white/[0.08] bg-[#121519] hover:border-white/[0.15]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="font-sans-ui text-[10px] uppercase tracking-wider text-[#C98E4B] font-semibold block">
                          {faq.category}
                        </span>
                        <h3 className="font-garamond text-xl md:text-2xl text-[#f2eee9] font-normal leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'border-[#C98E4B] bg-[#C98E4B]/10 text-[#C98E4B]'
                          : 'border-white/[0.1] bg-[#1b2026] text-[#9ba1ad]'
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">
                          {isOpen ? 'remove' : 'add'}
                        </span>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-[14px] font-sans-ui text-[#9ba1ad] leading-relaxed font-light border-t border-white/[0.05]">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Direct Assistance & Inquiry Desk (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Agrology Desk Box */}
              <div className="p-6 rounded-xl bg-[#15181e] border border-white/[0.08] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C98E4B]/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C98E4B]/10 border border-[#C98E4B]/30 flex items-center justify-center text-[#C98E4B]">
                    <span className="material-symbols-outlined text-[22px]">support_agent</span>
                  </div>
                  <div>
                    <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#C98E4B] font-semibold block">
                      Direct Concierge
                    </span>
                    <h3 className="font-garamond text-2xl text-[#f2eee9]">
                      Chief Agrologist Desk
                    </h3>
                  </div>
                </div>
                <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light leading-relaxed mb-6">
                  Have a specific question about your plot's soil chemistry, crate delivery timings, or special wedding gifting folios? Speak directly with our estate stewards.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+917965853333"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-[#1b2026] border border-white/[0.08] hover:border-[#C98E4B]/40 text-[#f2eee9] font-sans-ui text-[13px] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#C98E4B]">call</span>
                    +91 79658 53333
                  </a>
                  <a
                    href="https://wa.me/917965853333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-[#184E37]/30 border border-[#9cd3b4]/30 hover:border-[#9cd3b4]/60 text-[#9cd3b4] font-sans-ui text-[13px] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    WhatsApp Concierge
                  </a>
                </div>
              </div>

              {/* Instant Inquiry Submission */}
              <div className="p-6 rounded-xl bg-[#121519] border border-white/[0.08]">
                <h3 className="font-garamond text-2xl text-[#f2eee9] mb-1">
                  Send a Protocol Inquiry
                </h3>
                <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light mb-5">
                  Leave your details and our Estate Protocol Officer will respond within 4 business hours.
                </p>

                {isSubmitted ? (
                  <div className="p-5 rounded-lg bg-[#9cd3b4]/10 border border-[#9cd3b4]/30 text-[#9cd3b4] text-[13px] font-sans-ui text-center leading-relaxed">
                    <span className="material-symbols-outlined text-2xl block mb-1">check_circle</span>
                    Your dispatch request has been recorded. Our Protocol Officer will connect shortly via WhatsApp or call.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitInquiry} className="space-y-3.5 font-sans-ui text-[13px]">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Mahindra"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                        Phone or WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 00000"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                        Inquiry Details
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us what you would like to clarify regarding your tree allocation..."
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-[#C98E4B] text-[#0c0e11] font-semibold hover:bg-[#e2b378] transition-colors cursor-pointer"
                    >
                      Dispatch Inquiry to Protocol Desk
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve CTA */}
      <ReserveCta
        onOpenReservation={onOpenReservation}
        onOpenFaq={() => {}}
      />
    </div>
  );
};
