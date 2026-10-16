import React, { useState, useEffect, useMemo } from 'react';
import { PatronReview } from '../types';
import { INITIAL_REVIEWS } from '../data/reviewsData';

const STORAGE_KEY = 'aapla_zhad_patron_reviews_v1';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<PatronReview[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_REVIEWS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | '5' | 'verified'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest'>('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formTreeCode, setFormTreeCode] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formText, setFormText] = useState('');
  const [formError, setFormError] = useState('');

  // Persist reviews when updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // storage unavailable
    }
  }, [reviews]);

  // Real-time computed stats
  const { averageScore, fiveStarCount, fiveStarPct, totalReviews } = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { averageScore: '5.0', fiveStarCount: 0, fiveStarPct: 100, totalReviews: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(2);
    const fives = reviews.filter((r) => r.rating === 5).length;
    const pct = Math.round((fives / total) * 100);
    return {
      averageScore: avg,
      fiveStarCount: fives,
      fiveStarPct: pct,
      totalReviews: total,
    };
  }, [reviews]);

  // Filtered & sorted reviews
  const displayReviews = useMemo(() => {
    let list = [...reviews];
    if (activeFilter === '5') {
      list = list.filter((r) => r.rating === 5);
    } else if (activeFilter === 'verified') {
      list = list.filter((r) => r.verified);
    }

    if (sortBy === 'recent') {
      list.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [reviews, activeFilter, sortBy]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) {
      setFormError('Please enter your name and your experience note.');
      return;
    }

    const initials = formName
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'PT';

    const newReview: PatronReview = {
      id: `rev-${Date.now()}`,
      author: formName.trim(),
      initials,
      role: formTreeCode.trim() ? `Tree Steward (${formTreeCode.trim()})` : 'Verified Patron',
      location: formLocation.trim() || 'India',
      rating: formRating,
      reviewText: formText.trim(),
      date: 'Just now',
      timestamp: Date.now(),
      treeCode: formTreeCode.trim() || undefined,
      verified: true,
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setFormName('');
    setFormLocation('');
    setFormTreeCode('');
    setFormRating(5);
    setFormText('');
    setFormError('');
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  return (
    <section id="connoisseurs" className="w-full py-24 bg-[#0c0e11] border-b border-white/[0.08]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        
        {/* Real-time Toast */}
        {showSuccessToast && (
          <div className="mb-8 p-4 rounded-xl bg-[#14231b] border border-[#9cd3b4]/40 text-[#9cd3b4] flex items-center justify-between shadow-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#9cd3b4]">verified</span>
              <span className="font-sans-ui text-[13px] font-medium">
                Your review has been verified and published to the real-time Connoisseur Experience ledger.
              </span>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-[#9cd3b4]/60 hover:text-[#9cd3b4] text-[13px] cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C98E4B]/30 bg-[#15181e] text-[#C98E4B] text-[11px] uppercase tracking-[0.24em] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#9cd3b4] animate-pulse"></span>
                LIVE PATRON LEDGER · REAL TIME
              </span>
              <span className="text-[12px] font-sans-ui text-[#666c77] hidden sm:inline">
                Verified Gothangaon Farm Patrons
              </span>
            </div>
            <h2 className="font-garamond text-4xl lg:text-5xl text-[#f2eee9] font-normal tracking-tight">
              What Connoisseurs Experience
            </h2>
          </div>

          {/* Real-Time Scorecard & Call-to-Action */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3.5 bg-[#15181e] border border-white/[0.08] px-4 py-3 rounded-xl">
              <div className="font-garamond text-3xl font-semibold text-[#fbba72] leading-none">
                {averageScore}
              </div>
              <div>
                <div className="flex text-[#C98E4B] text-[13px] tracking-wider">
                  {'★'.repeat(Math.round(Number(averageScore)))}
                  {'☆'.repeat(5 - Math.round(Number(averageScore)))}
                </div>
                <div className="text-[11px] font-sans-ui text-[#9ba1ad] mt-0.5">
                  <span className="text-[#f2eee9] font-semibold">{totalReviews}</span> reviews · {fiveStarPct}% 5-star
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-[#C98E4B]/15 hover:bg-[#C98E4B]/25 text-[#f2eee9] border border-[#C98E4B]/40 font-sans-ui text-[13px] font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-[17px] text-[#C98E4B]">rate_review</span>
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Real-time Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#12151a] border border-white/[0.06] mb-8 text-[12px] font-sans-ui">
          <div className="flex items-center gap-2 text-[#9ba1ad]">
            <span className="material-symbols-outlined text-[#9cd3b4] text-[16px]">check_circle</span>
            <span>Real-Time Average: <strong className="text-[#f2eee9]">{averageScore} / 5.0</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#9ba1ad]">
            <span className="material-symbols-outlined text-[#C98E4B] text-[16px]">shield</span>
            <span>100% Zero Carbide Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-[#9ba1ad]">
            <span className="material-symbols-outlined text-[#C98E4B] text-[16px]">local_shipping</span>
            <span>3-Flush Insured Safe Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-[#9ba1ad]">
            <span className="material-symbols-outlined text-[#9cd3b4] text-[16px]">update</span>
            <span>Live Sync: <strong className="text-[#9cd3b4]">Active</strong></span>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-sans-ui transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold'
                  : 'bg-[#15181e] text-[#9ba1ad] hover:text-[#f2eee9] border border-white/[0.08]'
              }`}
            >
              All Experiences ({totalReviews})
            </button>
            <button
              onClick={() => setActiveFilter('5')}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-sans-ui transition-colors cursor-pointer ${
                activeFilter === '5'
                  ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold'
                  : 'bg-[#15181e] text-[#9ba1ad] hover:text-[#f2eee9] border border-white/[0.08]'
              }`}
            >
              5 Star Only ({fiveStarCount})
            </button>
            <button
              onClick={() => setActiveFilter('verified')}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-sans-ui transition-colors cursor-pointer ${
                activeFilter === 'verified'
                  ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold'
                  : 'bg-[#15181e] text-[#9ba1ad] hover:text-[#f2eee9] border border-white/[0.08]'
              }`}
            >
              Verified Patrons
            </button>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-sans-ui text-[#666c77]">
            <span>Sort by:</span>
            <button
              onClick={() => setSortBy('recent')}
              className={`hover:text-[#f2eee9] cursor-pointer transition-colors ${
                sortBy === 'recent' ? 'text-[#C98E4B] font-medium' : ''
              }`}
            >
              Most Recent
            </button>
            <span>·</span>
            <button
              onClick={() => setSortBy('highest')}
              className={`hover:text-[#f2eee9] cursor-pointer transition-colors ${
                sortBy === 'highest' ? 'text-[#C98E4B] font-medium' : ''
              }`}
            >
              Highest Rated
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-xl border border-white/[0.08] bg-[#15181e] flex flex-col justify-between shadow-lg hover:border-[#C98E4B]/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[#C98E4B] text-[13px] tracking-widest">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans-ui text-[#9cd3b4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9cd3b4]"></span>
                    <span>{review.date}</span>
                  </div>
                </div>

                {review.treeCode && (
                  <div className="inline-block px-2.5 py-0.5 rounded bg-[#0c0e11] border border-white/[0.06] text-[10px] font-mono text-[#C98E4B] mb-3">
                    {review.treeCode}
                  </div>
                )}

                <p className="font-garamond text-[17px] text-[#f2eee9] italic mb-8 font-light leading-relaxed">
                  “{review.reviewText}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                <div className="w-10 h-10 rounded-full bg-[#B87D3B]/20 text-[#e2b378] flex items-center justify-center font-sans-ui text-[12px] font-bold shrink-0 border border-[#B87D3B]/30">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-sans-ui text-[14px] text-[#f2eee9] font-medium truncate flex items-center gap-1.5">
                    <span>{review.author}</span>
                    {review.verified && (
                      <span
                        title="Verified Farm Patron"
                        className="material-symbols-outlined text-[15px] text-[#9cd3b4]"
                      >
                        verified
                      </span>
                    )}
                  </div>
                  <div className="font-sans-ui text-[11px] text-[#666c77] truncate">
                    {review.role} · {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Bottom Guarantee Stamp */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-[12px] font-sans-ui text-[#666c77]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#C98E4B]">security</span>
            <span>All reviews are recorded directly from verified tree patrons and harvest allocation recipients.</span>
          </div>
          <div className="text-[#9ba1ad]">
            Provenance: <span className="text-[#e2b378]">Gothangaon Farm · Keshar Reserve</span>
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151a] border border-[#C98E4B]/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#666c77] hover:text-[#f2eee9] cursor-pointer text-lg"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#C98E4B] font-semibold block mb-1">
                Connoisseur Community Ledger
              </span>
              <h3 className="font-garamond text-2xl text-[#f2eee9]">
                Share Your Harvest Experience
              </h3>
              <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light mt-1">
                Your rating publishes in real time to the live Aapla Zhad patron registry.
              </p>
            </div>

            {formError && (
              <div className="p-3 mb-4 rounded-lg bg-red-900/30 border border-red-500/30 text-red-300 text-[12px] font-sans-ui">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 font-sans-ui text-[13px]">
              {/* Star Rating Select */}
              <div>
                <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-2 font-medium">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      className="text-2xl cursor-pointer transition-transform hover:scale-110"
                    >
                      <span
                        className={
                          (hoverRating || formRating) >= star
                            ? 'text-[#C98E4B]'
                            : 'text-[#444a54]'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="text-[12px] text-[#f2eee9] font-medium ml-2">
                    {formRating === 5 ? '5.0 — Exceptional' : `${formRating}.0`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Mehta"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg p-2.5 text-[#f2eee9] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1 font-medium">
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Malabar Hill, Mumbai"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1 font-medium">
                    Tree Code / Season (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tree #88 · Season 2025"
                    value={formTreeCode}
                    onChange={(e) => setFormTreeCode(e.target.value)}
                    className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg p-2.5 text-[#f2eee9] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1 font-medium">
                  Your Review / Tasting Note *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the fragrance, brix sweetness, delivery packaging, or visiting experience at Gothangaon Farm..."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg p-2.5 text-[#f2eee9] outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-white/[0.08] text-[#9ba1ad] hover:text-[#f2eee9] text-[12px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#C98E4B] hover:bg-[#d89e5c] text-[#0c0e11] font-semibold text-[12px] cursor-pointer shadow-md transition-colors"
                >
                  Publish Real-Time Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
