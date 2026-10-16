import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/orchardData';

interface FaqDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const FaqDrawer: React.FC<FaqDrawerProps> = ({ isOpen, onClose, onOpenReservation }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#121519] border-l border-[#C98E4B]/40 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#0c0e11]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#C98E4B] text-[22px]">help_outline</span>
            <div>
              <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#C98E4B] font-bold block">
                Patron Inquiries
              </span>
              <h3 className="font-garamond text-2xl text-[#f2eee9]">
                Estate FAQs &amp; Protocol Desk
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1b2026] text-[#9ba1ad] hover:text-[#f2eee9] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* FAQ Accordion */}
          <div>
            <span className="font-sans-ui text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-4 font-semibold">
              Frequently Clarified Protocol
            </span>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/[0.08] bg-[#15181e] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-garamond text-[17px] text-[#f2eee9] font-normal leading-snug">
                        {item.question}
                      </span>
                      <span className="material-symbols-outlined text-[#C98E4B] text-[18px] shrink-0 transition-transform duration-200">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-white/[0.05] text-[13px] font-sans-ui text-[#9ba1ad] leading-relaxed font-light">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Concierge Contact */}
          <div className="p-5 rounded-xl bg-[#1b2026] border border-white/[0.08] space-y-3">
            <h4 className="font-garamond text-xl text-[#f2eee9]">
              Direct Agrology Contact
            </h4>
            <p className="font-sans-ui text-[12px] text-[#9ba1ad] font-light">
              Our Chief Agrologist is available 10:00 – 18:00 IST for tree selection guidance, corporate orders, and visiting permits.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:+917965853333"
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#0c0e11] text-[#f2eee9] font-sans-ui text-[12px] border border-white/[0.08] hover:border-[#C98E4B]/40"
              >
                <span className="material-symbols-outlined text-[15px] text-[#C98E4B]">call</span>
                +91 79658 53333
              </a>
              <a
                href="https://wa.me/917965853333"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#0c0e11] text-[#9cd3b4] font-sans-ui text-[12px] border border-white/[0.08] hover:border-[#9cd3b4]/40"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                WhatsApp Concierge
              </a>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="p-5 rounded-xl bg-[#15181e] border border-white/[0.08]">
            <h4 className="font-garamond text-xl text-[#f2eee9] mb-1">
              Send an Estate Dispatch Request
            </h4>
            <p className="font-sans-ui text-[12px] text-[#9ba1ad] mb-4 font-light">
              Leave a note for specific corporate allocations or grove visit scheduling.
            </p>

            {isSubmitted ? (
              <div className="p-4 rounded-lg bg-[#9cd3b4]/10 border border-[#9cd3b4]/30 text-[#9cd3b4] text-[13px] font-sans-ui text-center">
                ✓ Thank you. Our Estate Protocol Officer will connect within 4 business hours.
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3 font-sans-ui text-[12px]">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] rounded p-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone or WhatsApp Number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] rounded p-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B]"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Your inquiry or special allocation request..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] rounded p-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#C98E4B] text-[#0c0e11] font-semibold hover:bg-[#e2b378] transition-colors cursor-pointer"
                >
                  Send to Estate Desk
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-white/[0.08] bg-[#0c0e11] flex items-center justify-between">
          <span className="font-sans-ui text-[12px] text-[#9ba1ad]">
            Season 2025: Strictly 150 Trees
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenReservation();
            }}
            className="px-5 py-2.5 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[12px] font-semibold hover:bg-[#e2b378] transition-colors cursor-pointer"
          >
            Reserve Tree (₹3,500)
          </button>
        </div>
      </div>
    </div>
  );
};
