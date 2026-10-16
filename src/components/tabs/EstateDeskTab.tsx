import React, { useState } from 'react';
import { ReserveCta } from '../ReserveCta';

interface EstateDeskTabProps {
  onOpenReservation: () => void;
}

export const EstateDeskTab: React.FC<EstateDeskTabProps> = ({ onOpenReservation }) => {
  const [inquiryType, setInquiryType] = useState<'visit' | 'corporate' | 'agrology'>('visit');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setDetails('');
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* Editorial Header Banner */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#121519] to-[#0c0e11] py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C98E4B]/30 bg-[#15181e] text-[#C98E4B] text-[11px] uppercase tracking-[0.2em] font-medium mb-5">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              GOTHANGAON FARM · HEADQUARTERS
            </div>
            <h1 className="font-garamond text-4xl md:text-5xl lg:text-6xl text-[#f2eee9] font-normal leading-tight mb-6">
              Estate Protocol Desk &amp; Concierge
            </h1>
            <p className="font-sans-ui text-[16px] text-[#9ba1ad] leading-relaxed font-light">
              Direct liaison with our Chief Agrologist, private farm visiting protocols at Gothangaon Farm, and bespoke corporate allocations for the 2025 Keshar harvest season.
            </p>
          </div>
        </div>
      </section>

      {/* Main Protocol Grid */}
      <section className="py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            {/* Direct Contact Cards (7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Agrology HQ Location */}
                <div className="p-6 rounded-xl bg-[#15181e] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-lg bg-[#C98E4B]/10 border border-[#C98E4B]/30 flex items-center justify-center text-[#C98E4B] mb-4">
                    <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                  </div>
                  <h3 className="font-garamond text-xl text-[#f2eee9] mb-2">
                    Gothangaon Farm
                  </h3>
                  <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light mb-4">
                    Aapla Zhad by Manik Mangoes<br />
                    Gothangaon Farm<br />
                    India
                  </p>
                  <div className="font-mono text-[11px] text-[#C98E4B]">
                    GOTHANGAON TERROIR
                  </div>
                </div>

                {/* Direct Concierge Line */}
                <div className="p-6 rounded-xl bg-[#15181e] border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-lg bg-[#9cd3b4]/10 border border-[#9cd3b4]/30 flex items-center justify-center text-[#9cd3b4] mb-4">
                    <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                  </div>
                  <h3 className="font-garamond text-xl text-[#f2eee9] mb-2">
                    Direct Agrology Line
                  </h3>
                  <p className="font-sans-ui text-[13px] text-[#9ba1ad] leading-relaxed font-light mb-4">
                    Operational hours:<br />
                    Mon – Sat · 10:00 – 18:00 IST<br />
                    Field inquiries &amp; tree selection
                  </p>
                  <a
                    href="tel:+917965853333"
                    className="inline-flex items-center gap-1.5 font-sans-ui text-[13px] text-[#f2eee9] hover:text-[#C98E4B] transition-colors"
                  >
                    +91 79658 53333
                  </a>
                </div>
              </div>

              {/* Protocol Pillars: Grove Visits & Corporate Allotments */}
              <div className="p-7 rounded-xl bg-[#121519] border border-white/[0.08] space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[#C98E4B] text-[11px] font-sans-ui uppercase tracking-widest font-semibold mb-2">
                    <span className="material-symbols-outlined text-[16px]">hiking</span>
                    PATRON VISITATION RIGHTS
                  </div>
                  <h3 className="font-garamond text-2xl text-[#f2eee9] mb-3">
                    Walking Under Your Tree at Gothangaon Farm
                  </h3>
                  <p className="font-sans-ui text-[14px] text-[#9ba1ad] font-light leading-relaxed mb-4">
                    As a verified tree patron, your family is entitled to visit the farm during the blooming season (January–February) or the harvest period (May). Walk through your designated plot, touch the engraved brass plaque, and observe the traditional open-air hay curing pavilion.
                  </p>
                  <div className="p-4 rounded-lg bg-[#0c0e11] border border-white/[0.05] text-[12px] font-sans-ui text-[#666c77] flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#C98E4B] text-[18px] shrink-0">info</span>
                    <span>Visiting requires 7 days prior registration with the Estate Protocol Desk to arrange agrologist escorts and organic fruit tastings.</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 text-[#C98E4B] text-[11px] font-sans-ui uppercase tracking-widest font-semibold mb-2">
                    <span className="material-symbols-outlined text-[16px]">domain</span>
                    CORPORATE ALLOCATIONS &amp; MULTI-TREE ENDOWMENTS
                  </div>
                  <h3 className="font-garamond text-2xl text-[#f2eee9] mb-3">
                    Gifting Harvest Rows to Valued Partners
                  </h3>
                  <p className="font-sans-ui text-[14px] text-[#9ba1ad] font-light leading-relaxed mb-4">
                    Companies and family trusts may reserve consecutive trees in Plot #09 or #14. We provide custom dual-engraved brass plaques bearing company emblems or heraldic initials, along with individualized white-glove crate dispatches across 6 major Indian metros.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-1">
                    <a
                      href="https://wa.me/917965853333?text=Hello%20Aapla%20Zhad,%20I%20would%20like%20to%20inquire%20about%20corporate%20multi-tree%20allocations."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#184E37]/30 border border-[#9cd3b4]/30 hover:border-[#9cd3b4]/60 text-[#9cd3b4] font-sans-ui text-[13px] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      Connect with Corporate Concierge
                    </a>
                  </div>
                </div>
              </div>

              {/* Real-time Field Telemetry Summary */}
              <div className="p-6 rounded-xl bg-[#15181e] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-sans-ui text-[10px] uppercase tracking-widest text-[#666c77] font-semibold">
                    Gothangaon Farm Microclimate Telemetry
                  </div>
                  <div className="font-garamond text-xl text-[#f2eee9] mt-0.5">
                    Live Soil &amp; Weather Sensors
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[13px] font-sans-ui">
                  <div>
                    <span className="text-[#666c77] text-[11px] block">Ambient</span>
                    <span className="text-[#f2eee9] font-medium">29°C · Sunlit</span>
                  </div>
                  <div>
                    <span className="text-[#666c77] text-[11px] block">Soil pH</span>
                    <span className="text-[#9cd3b4] font-medium">7.4 Basaltic</span>
                  </div>
                  <div>
                    <span className="text-[#666c77] text-[11px] block">Brix Index</span>
                    <span className="text-[#e2b378] font-medium">7.2° Pea Phase</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol Dispatch Submission (5 Columns) */}
            <div className="lg:col-span-5">
              <div className="p-7 rounded-xl bg-[#121519] border border-white/[0.08] sticky top-28">
                <div className="flex items-center gap-2 text-[#C98E4B] text-[11px] font-sans-ui uppercase tracking-widest font-semibold mb-2">
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  OFFICIAL DISPATCH
                </div>
                <h3 className="font-garamond text-2xl md:text-3xl text-[#f2eee9] mb-2">
                  Contact Estate Concierge
                </h3>
                <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light mb-6">
                  Submit your request directly to the Chief Agrologist and Estate Manager.
                </p>

                {/* Inquiry Type Toggles */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setInquiryType('visit')}
                    className={`py-2 px-2 text-center rounded text-[11px] font-sans-ui transition-all cursor-pointer ${
                      inquiryType === 'visit'
                        ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold'
                        : 'bg-[#1b2026] text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    Grove Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('corporate')}
                    className={`py-2 px-2 text-center rounded text-[11px] font-sans-ui transition-all cursor-pointer ${
                      inquiryType === 'corporate'
                        ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold'
                        : 'bg-[#1b2026] text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    Corporate
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('agrology')}
                    className={`py-2 px-2 text-center rounded text-[11px] font-sans-ui transition-all cursor-pointer ${
                      inquiryType === 'agrology'
                        ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold'
                        : 'bg-[#1b2026] text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    Agrology Qs
                  </button>
                </div>

                {isSubmitted ? (
                  <div className="p-6 rounded-lg bg-[#9cd3b4]/10 border border-[#9cd3b4]/30 text-[#9cd3b4] text-[13px] font-sans-ui text-center leading-relaxed">
                    <span className="material-symbols-outlined text-3xl block mb-2">mark_email_read</span>
                    Your dispatch has been registered with the Estate Protocol Desk. Our team will contact you within 4 business hours.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-sans-ui text-[13px]">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Singhania"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98200 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="patron@estate.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666c77] mb-1">
                        Dispatch Notes &amp; Specifics
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder={
                          inquiryType === 'visit'
                            ? 'Please provide preferred dates (March - May) and family member count...'
                            : inquiryType === 'corporate'
                            ? 'Number of trees or executive crates requested, and target delivery cities...'
                            : 'Specific questions regarding organic nutrition or soil chemistry...'
                        }
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] rounded px-3.5 py-2.5 text-[#f2eee9] outline-none focus:border-[#C98E4B] transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-[#C98E4B] text-[#0c0e11] font-semibold hover:bg-[#e2b378] transition-colors cursor-pointer"
                    >
                      Transmit to Protocol Officer
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
