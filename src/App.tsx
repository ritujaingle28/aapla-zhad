/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementTicker } from './components/AnnouncementTicker';
import { Header } from './components/Header';
import { HomeTab } from './components/tabs/HomeTab';
import { HowItWorksTab } from './components/tabs/HowItWorksTab';
import { HarvestCycleTab } from './components/tabs/HarvestCycleTab';
import { PricingTab } from './components/tabs/PricingTab';
import { FaqsTab } from './components/tabs/FaqsTab';
import { EstateDeskTab } from './components/tabs/EstateDeskTab';
import { PatronPortal } from './components/PatronPortal';
import { SignInTab } from './components/tabs/SignInTab';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { FaqDrawer } from './components/FaqDrawer';
import { ActiveTab, PatronReservation, AuthUser } from './types';

const AUTH_STORAGE_KEY = 'aapla_zhad_auth_user';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationMode, setReservationMode] = useState<'self' | 'gift'>('self');
  const [isFaqDrawerOpen, setIsFaqDrawerOpen] = useState(false);
  const [activeReservation, setActiveReservation] = useState<PatronReservation | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // storage unavailable
    }
    return null;
  });

  const handleSignInSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore storage error
    }
    setActiveTab('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReservation = (mode: 'self' | 'gift' = 'self') => {
    setReservationMode(mode);
    setIsReservationOpen(true);
  };

  const handleReservationSuccess = (reservation: PatronReservation) => {
    setActiveReservation(reservation);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0e11] text-[#f2eee9] font-sans-ui selection:bg-[#c98e4b]/30 selection:text-[#fbba72] flex flex-col justify-between">
      <div>
        {/* Top Protocol Announcement Bar */}
        <AnnouncementTicker />

        {/* Editorial Sticky Header with Active Specific Tab Highlights */}
        <Header
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenReservation={handleOpenReservation}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />

        {/* Specific Tab Views */}
        <main>
          {activeTab === 'home' && (
            <HomeTab
              onOpenReservation={handleOpenReservation}
              onOpenPatronPortal={() => handleTabChange('portal')}
              onNavigateTab={handleTabChange}
            />
          )}

          {activeTab === 'how-it-works' && (
            <HowItWorksTab
              onOpenReservation={handleOpenReservation}
              onOpenPatronPortal={() => handleTabChange('portal')}
              onNavigateToPricing={() => handleTabChange('pricing')}
            />
          )}

          {activeTab === 'harvest-cycle' && (
            <HarvestCycleTab onOpenReservation={handleOpenReservation} />
          )}

          {activeTab === 'pricing' && (
            <PricingTab onOpenReservation={handleOpenReservation} />
          )}

          {activeTab === 'faqs' && (
            <FaqsTab onOpenReservation={handleOpenReservation} />
          )}

          {activeTab === 'estate-desk' && (
            <EstateDeskTab onOpenReservation={handleOpenReservation} />
          )}

          {activeTab === 'signin' && (
            <SignInTab
              onSignInSuccess={handleSignInSuccess}
              onNavigateHome={() => handleTabChange('home')}
              onNavigateToPricing={() => handleTabChange('pricing')}
            />
          )}

          {activeTab === 'portal' && (
            <PatronPortal
              reservation={activeReservation}
              currentUser={currentUser}
              onBackToHome={() => handleTabChange('home')}
              onOpenReservation={() => handleOpenReservation('self')}
              onNavigateToSignIn={() => handleTabChange('signin')}
            />
          )}
        </main>
      </div>

      {/* Architectural Estate Footer */}
      <Footer
        onTabChange={handleTabChange}
        onOpenReservation={() => handleOpenReservation('self')}
        onOpenFaqDrawer={() => setIsFaqDrawerOpen(true)}
      />

      {/* Interactive 4-Step Reservation & Brass Plaque Studio */}
      <ReservationModal
        isOpen={isReservationOpen}
        initialMode={reservationMode}
        onClose={() => setIsReservationOpen(false)}
        onSuccess={handleReservationSuccess}
      />

      {/* Quick Protocol Drawer (if triggered) */}
      <FaqDrawer
        isOpen={isFaqDrawerOpen}
        onClose={() => setIsFaqDrawerOpen(false)}
        onOpenReservation={() => handleOpenReservation('self')}
      />
    </div>
  );
}

