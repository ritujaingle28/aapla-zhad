import React, { useState } from 'react';
import { HERITAGE_TREES } from '../data/orchardData';
import { HeritageTree, PatronReservation, PlaqueDetails } from '../types';
import {
  getRegisteredUsers,
  saveRegisteredUsers,
  cleanPhone,
  findUserByIdentifier,
} from '../data/userData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'self' | 'gift';
  onSuccess: (reservation: PatronReservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'self',
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTree, setSelectedTree] = useState<HeritageTree>(HERITAGE_TREES[0]);
  const [isGift, setIsGift] = useState<boolean>(initialMode === 'gift');
  const [plaque, setPlaque] = useState<PlaqueDetails>({
    patronName: 'The Mehta Family',
    inscriptionMessage: 'Nurtured with devotion in the rich soil of Gothangaon Farm',
    year: 'SEASON 2025',
    isGift: initialMode === 'gift',
    giftRecipientName: initialMode === 'gift' ? 'Sunita & Arvind Mehta' : '',
    giftNote: initialMode === 'gift' ? 'With warmest wishes for a sweet summer' : '',
  });

  // Patron delivery details
  const [patronName, setPatronName] = useState('Siddharth Mehta');
  const [email, setEmail] = useState('siddharth.mehta@connoisseur.in');
  const [phone, setPhone] = useState('+91 98200 45210');
  const [city, setCity] = useState('Mumbai');
  const [address, setAddress] = useState('14B Seaface Apartments, Malabar Hill');
  const [pincode, setPincode] = useState('400006');
  const [specialInstructions, setSpecialInstructions] = useState('Please ring bell twice. Inform watchman for wooden crate delivery.');

  const [completedReservation, setCompletedReservation] = useState<PatronReservation | null>(null);

  if (!isOpen) return null;

  const handleCompleteDeposit = () => {
    const certNumber = `AZ-2025-${selectedTree.treeCode.replace(/[^a-zA-Z0-9]/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const newReservation: PatronReservation = {
      id: 'res-' + Date.now(),
      treeId: selectedTree.id,
      treeCode: selectedTree.treeCode,
      plotNumber: selectedTree.plotNumber,
      patronName: isGift && plaque.giftRecipientName ? plaque.giftRecipientName : patronName,
      email,
      phone,
      city,
      address,
      pincode,
      specialInstructions,
      plaque: {
        ...plaque,
        isGift,
      },
      reservationDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      depositPaid: 3500,
      balanceDue: 7000,
      certificateNumber: certNumber,
    };

    setCompletedReservation(newReservation);
    setCurrentStep(4);

    // Ensure this patron is recorded in registered accounts for subsequent verification sign in
    try {
      const users = getRegisteredUsers();
      const existing = findUserByIdentifier(email) || findUserByIdentifier(phone);
      if (existing) {
        existing.treeAllocated = selectedTree.treeCode;
        existing.plotNumber = selectedTree.plotNumber;
        existing.certificateNumber = certNumber;
        saveRegisteredUsers(users);
      } else {
        const newUserAccount = {
          id: `usr-${Date.now()}`,
          name: patronName,
          email: email.trim().toLowerCase(),
          phone: cleanPhone(phone),
          password: 'password123',
          city,
          role: 'patron' as const,
          treeAllocated: selectedTree.treeCode,
          plotNumber: selectedTree.plotNumber,
          certificateNumber: certNumber,
          joinedDate: 'Season 2025',
        };
        saveRegisteredUsers([newUserAccount, ...users]);
      }
    } catch {
      // ignore
    }

    onSuccess(newReservation);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#121519] border border-[#C98E4B]/40 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0c0e11]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1b2026] border border-[#C98E4B]/30 flex items-center justify-center text-[#C98E4B]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <span className="font-sans-ui text-[10px] uppercase tracking-[0.2em] text-[#C98E4B] font-bold block">
                The 4-Step Stewardship Journey
              </span>
              <h3 className="font-garamond text-xl sm:text-2xl text-[#f2eee9] font-normal">
                Heritage Keshar Tree Allocation
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1b2026] hover:bg-[#232830] text-[#9ba1ad] hover:text-[#f2eee9] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 border-b border-white/[0.08] bg-[#0c0e11]/50 text-center font-sans-ui text-[12px]">
          <div
            className={`py-3 px-2 border-r border-white/[0.08] transition-colors ${
              currentStep === 1
                ? 'bg-[#c98e4b]/15 text-[#e2b378] font-semibold'
                : currentStep > 1
                ? 'text-[#9cd3b4]'
                : 'text-[#666c77]'
            }`}
          >
            <span className="hidden sm:inline">1. </span>Select Tree
          </div>
          <div
            className={`py-3 px-2 border-r border-white/[0.08] transition-colors ${
              currentStep === 2
                ? 'bg-[#c98e4b]/15 text-[#e2b378] font-semibold'
                : currentStep > 2
                ? 'text-[#9cd3b4]'
                : 'text-[#666c77]'
            }`}
          >
            <span className="hidden sm:inline">2. </span>Brass Plaque
          </div>
          <div
            className={`py-3 px-2 border-r border-white/[0.08] transition-colors ${
              currentStep === 3
                ? 'bg-[#c98e4b]/15 text-[#e2b378] font-semibold'
                : currentStep > 3
                ? 'text-[#9cd3b4]'
                : 'text-[#666c77]'
            }`}
          >
            <span className="hidden sm:inline">3. </span>Logistics
          </div>
          <div
            className={`py-3 px-2 transition-colors ${
              currentStep === 4
                ? 'bg-[#c98e4b]/15 text-[#e2b378] font-semibold'
                : 'text-[#666c77]'
            }`}
          >
            <span className="hidden sm:inline">4. </span>Confirmation
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto">
          {/* STEP 1: SELECT TREE */}
          {currentStep === 1 && (
            <div>
              <div className="mb-6">
                <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#C98E4B] font-semibold block mb-1">
                  Gothangaon Farm Living Reserve
                </span>
                <h4 className="font-garamond text-2xl text-[#f2eee9]">
                  Select Your Registered Heritage Keshar Tree
                </h4>
                <p className="font-sans-ui text-[13px] text-[#9ba1ad] mt-1 font-light">
                  Each tree is numbered, cataloged, and hand-cultivated in authentic basaltic mineral soil.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HERITAGE_TREES.map((tree) => {
                  const isSelected = selectedTree.id === tree.id;
                  return (
                    <div
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`p-5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#C98E4B] bg-[#1b2026] shadow-lg shadow-[#C98E4B]/10 ring-1 ring-[#C98E4B]'
                          : 'border-white/[0.08] bg-[#15181e] hover:border-[#C98E4B]/30 hover:bg-[#1b2026]/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#C98E4B]/10 text-[#e2b378] text-[10px] font-sans-ui font-semibold uppercase tracking-wider">
                          {tree.plotNumber}
                        </div>
                        <span className="text-[11px] font-sans-ui text-[#9cd3b4] font-medium">
                          {tree.ageYears} YRS OLD
                        </span>
                      </div>

                      <h5 className="font-garamond text-xl text-[#f2eee9] mb-1">{tree.treeCode}</h5>
                      <p className="font-sans-ui text-[12px] text-[#9ba1ad] mb-4 font-light line-clamp-2">
                        {tree.story}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.08] text-[11px] font-sans-ui">
                        <div>
                          <span className="text-[#666c77] block text-[10px] uppercase">Terroir</span>
                          <span className="text-[#f2eee9]">{tree.soilPh}</span>
                        </div>
                        <div>
                          <span className="text-[#666c77] block text-[10px] uppercase">Avg Brix</span>
                          <span className="text-[#e2b378] font-semibold">{tree.avgBrixRating}°</span>
                        </div>
                        <div>
                          <span className="text-[#666c77] block text-[10px] uppercase">Allocation</span>
                          <span className="text-[#f2eee9]">50 KGs</span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-3 right-3 text-[#C98E4B]">
                          <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold tracking-wide hover:bg-[#e2b378] transition-colors cursor-pointer"
                >
                  <span>Proceed to Brass Plaque Inscription</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BRASS PLAQUE STUDIO */}
          {currentStep === 2 && (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#C98E4B] font-semibold block mb-1">
                    Authentic Provenance
                  </span>
                  <h4 className="font-garamond text-2xl text-[#f2eee9]">
                    Engrave Your Vintage Brass Plaque
                  </h4>
                  <p className="font-sans-ui text-[13px] text-[#9ba1ad] mt-1 font-light">
                    This solid brass plaque will be permanently affixed to tree trunk {selectedTree.treeCode}.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#1b2026] p-1.5 rounded-lg border border-white/[0.08]">
                  <button
                    onClick={() => {
                      setIsGift(false);
                      setPlaque({ ...plaque, isGift: false });
                    }}
                    className={`px-3 py-1 text-[12px] font-sans-ui rounded transition-colors ${
                      !isGift
                        ? 'bg-[#c98e4b] text-[#0c0e11] font-medium'
                        : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    Family Plaque
                  </button>
                  <button
                    onClick={() => {
                      setIsGift(true);
                      setPlaque({ ...plaque, isGift: true });
                    }}
                    className={`px-3 py-1 text-[12px] font-sans-ui rounded transition-colors ${
                      isGift
                        ? 'bg-[#c98e4b] text-[#0c0e11] font-medium'
                        : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    Gift Dedication
                  </button>
                </div>
              </div>

              {/* Real-time Metallic Brass Plaque Preview */}
              <div className="mb-8 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#c98e4b]/20 via-[#1b2026] to-[#080a0c] border-2 border-[#C98E4B]/60 shadow-2xl relative overflow-hidden">
                {/* Brass Screws at Corners */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#e2b378] border border-[#B87D3B] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-0.5 bg-[#4b2b00] rotate-45"></div>
                </div>
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#e2b378] border border-[#B87D3B] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-0.5 bg-[#4b2b00] -rotate-45"></div>
                </div>
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#e2b378] border border-[#B87D3B] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-0.5 bg-[#4b2b00] rotate-12"></div>
                </div>
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#e2b378] border border-[#B87D3B] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-0.5 bg-[#4b2b00] -rotate-12"></div>
                </div>

                <div className="text-center max-w-lg mx-auto py-3">
                  <span className="font-sans-ui text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#e2b378] font-bold block mb-1">
                    AAPLA ZHAD · KESHAR HERITAGE RESERVE
                  </span>
                  <div className="w-24 h-0.5 bg-[#C98E4B]/40 mx-auto mb-3"></div>

                  <h5 className="font-garamond text-2xl sm:text-3xl font-semibold text-[#fbba72] uppercase tracking-wider mb-1">
                    {isGift && plaque.giftRecipientName ? plaque.giftRecipientName : plaque.patronName || 'Your Name / Family Name'}
                  </h5>

                  <p className="font-garamond italic text-[14px] sm:text-[15px] text-[#f2eee9]/90 font-light mb-3">
                    "{isGift && plaque.giftNote ? plaque.giftNote : plaque.inscriptionMessage || 'Dedicated to sweet summers and heritage roots'}"
                  </p>

                  <div className="flex items-center justify-center gap-4 text-[10px] sm:text-[11px] font-sans-ui text-[#e2b378]/80 uppercase tracking-widest pt-2 border-t border-[#C98E4B]/30">
                    <span>{selectedTree.plotNumber}</span>
                    <span>·</span>
                    <span>{selectedTree.treeCode}</span>
                    <span>·</span>
                    <span>{plaque.year}</span>
                  </div>
                </div>
              </div>

              {/* Form Inputs for Plaque */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-sans-ui text-[13px]">
                {isGift ? (
                  <>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                        Gift Recipient Name / Family
                      </label>
                      <input
                        type="text"
                        value={plaque.giftRecipientName}
                        onChange={(e) =>
                          setPlaque({ ...plaque, giftRecipientName: e.target.value })
                        }
                        placeholder="e.g. Sunita & Arvind Mehta"
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                        Your Name (Gift Giver)
                      </label>
                      <input
                        type="text"
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g. Siddharth Mehta"
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                        Gift Dedication Message (Engraved on Plaque)
                      </label>
                      <input
                        type="text"
                        value={plaque.giftNote}
                        onChange={(e) => setPlaque({ ...plaque, giftNote: e.target.value })}
                        placeholder="e.g. In celebration of 50 years together · Rooted in sweetness"
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                        Family Name / Patron Title (Engraved on Plaque)
                      </label>
                      <input
                        type="text"
                        value={plaque.patronName}
                        onChange={(e) => setPlaque({ ...plaque, patronName: e.target.value })}
                        placeholder="e.g. The Mehta Family or Dr. Ananya Roy"
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                        Inscription Message or Family Motto
                      </label>
                      <input
                        type="text"
                        value={plaque.inscriptionMessage}
                        onChange={(e) =>
                          setPlaque({ ...plaque, inscriptionMessage: e.target.value })
                        }
                        placeholder="e.g. Nurtured with devotion in the rich soil of Gothangaon Farm"
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded border border-white/[0.08] text-[#9ba1ad] hover:text-[#f2eee9] text-[13px] font-sans-ui cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold tracking-wide hover:bg-[#e2b378] transition-colors cursor-pointer"
                >
                  <span>Proceed to Delivery Logistics</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LOGISTICS */}
          {currentStep === 3 && (
            <div>
              <div className="mb-6">
                <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#C98E4B] font-semibold block mb-1">
                  Staggered Doorstep Dispatch
                </span>
                <h4 className="font-garamond text-2xl text-[#f2eee9]">
                  3-Flush Harvest Delivery Details
                </h4>
                <p className="font-sans-ui text-[13px] text-[#9ba1ad] mt-1 font-light">
                  Free insured air delivery across Mumbai, Delhi NCR, Bangalore, Pune, Ahmedabad &amp; Hyderabad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-sans-ui text-[13px]">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    WhatsApp Phone (For Video Chronicle)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    Metro Destination City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  >
                    <option value="Mumbai">Mumbai (Direct Doorstep)</option>
                    <option value="Delhi NCR">Delhi NCR (Direct Doorstep)</option>
                    <option value="Bengaluru">Bengaluru (Direct Doorstep)</option>
                    <option value="Pune">Pune (Direct Doorstep)</option>
                    <option value="Ahmedabad">Ahmedabad (Direct Doorstep)</option>
                    <option value="Hyderabad">Hyderabad (Direct Doorstep)</option>
                    <option value="Other Metro">Other Pan-India Metro</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    Delivery Address for 3 Wooden Crates
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#9ba1ad] block mb-1">
                    Special Crate Delivery Notes
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Leave with watchman / call on arrival"
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-[#1b2026] border border-white/[0.08] flex items-center justify-between text-[12px] font-sans-ui text-[#9ba1ad]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9cd3b4] text-[18px]">inventory_2</span>
                  <span>Batch 01 (Early May) · Batch 02 (Mid May) · Batch 03 (Early June)</span>
                </div>
                <span className="text-[#9cd3b4] font-medium">100% Insured</span>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded border border-white/[0.08] text-[#9ba1ad] hover:text-[#f2eee9] text-[13px] font-sans-ui cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteDeposit}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold tracking-wide hover:bg-[#e2b378] transition-colors cursor-pointer"
                >
                  <span>Confirm Allocation &amp; Deposit (₹3,500)</span>
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & CERTIFICATE OF PROVENANCE */}
          {currentStep === 4 && completedReservation && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#9cd3b4]/15 border border-[#9cd3b4]/30 text-[#9cd3b4] flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>

              <span className="font-sans-ui text-[11px] uppercase tracking-[0.24em] text-[#C98E4B] font-bold block mb-1">
                Allocation Confirmed · Season 2025
              </span>
              <h4 className="font-garamond text-3xl text-[#f2eee9] mb-2">
                You Are Now the Steward of {selectedTree.treeCode}
              </h4>
              <p className="font-sans-ui text-[14px] text-[#9ba1ad] max-w-lg mx-auto font-light mb-8">
                Your ₹3,500 reservation deposit has been recorded. Your brass plaque is queued for artisan engraving at our Gothangaon Farm forge.
              </p>

              {/* Certificate Card */}
              <div className="max-w-2xl mx-auto rounded-xl border border-[#C98E4B]/50 bg-[#080a0c] p-6 sm:p-8 text-left shadow-2xl relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 mb-4 gap-2">
                  <div>
                    <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#C98E4B] font-semibold">
                      Digital Certificate of Provenance
                    </span>
                    <h5 className="font-garamond text-xl text-[#f2eee9]">
                      Aapla Zhad Keshar Reserve · Gothangaon Farm
                    </h5>
                  </div>
                  <span className="font-sans-ui text-[11px] text-[#9cd3b4] font-mono px-2 py-0.5 rounded bg-[#9cd3b4]/10 border border-[#9cd3b4]/20 self-start sm:self-auto">
                    {completedReservation.certificateNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-[12px] font-sans-ui">
                  <div>
                    <span className="text-[#666c77] block text-[10px] uppercase">Patron</span>
                    <span className="text-[#f2eee9] font-medium">{completedReservation.patronName}</span>
                  </div>
                  <div>
                    <span className="text-[#666c77] block text-[10px] uppercase">Tree Age</span>
                    <span className="text-[#f2eee9] font-medium">{selectedTree.ageYears} Years Old</span>
                  </div>
                  <div>
                    <span className="text-[#666c77] block text-[10px] uppercase">Harvest Yield</span>
                    <span className="text-[#e2b378] font-semibold">50 KGs Guaranteed</span>
                  </div>
                  <div>
                    <span className="text-[#666c77] block text-[10px] uppercase">GI Registry</span>
                    <span className="text-[#9cd3b4] font-medium">GI Cert #124</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#15181e] border border-white/[0.08] mb-4 text-[12px] font-sans-ui">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[#9ba1ad]">Deposit Received:</span>
                    <span className="text-[#9cd3b4] font-medium">₹3,500 (Confirmed)</span>
                  </div>
                  <div className="flex justify-between text-[#666c77]">
                    <span>Balance upon First May Flush:</span>
                    <span className="text-[#f2eee9]">₹7,000</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/[0.08] text-[11px] font-sans-ui text-[#666c77]">
                  <span>Gothangaon Farm</span>
                  <span className="text-[#e2b378]">Authorized by Chief Agrologist</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded bg-[#c98e4b] text-[#0c0e11] font-sans-ui text-[13px] font-semibold hover:bg-[#e2b378] transition-colors cursor-pointer"
                >
                  View My Tree in Patron Portal
                </button>
                <a
                  href="https://wa.me/917965853333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/[0.08] text-[#f2eee9] font-sans-ui text-[13px] hover:bg-[#1b2026] transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#9cd3b4]">chat</span>
                  <span>Connect with Agronomist on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
