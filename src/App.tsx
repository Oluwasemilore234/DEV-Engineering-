import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { TechStackSection } from './components/TechStackSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { Footer } from './components/Footer';
import { DiscoveryModal } from './components/DiscoveryModal';
import { ManifestoModal } from './components/ManifestoModal';
import { MatrixRain } from './components/MatrixRain';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';

function AppContent() {
  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false);
  const [discoveryModalMode, setDiscoveryModalMode] = useState<'discovery' | 'quote'>('discovery');
  const [manifestoModalOpen, setManifestoModalOpen] = useState(false);
  const [matrixModalOpen, setMatrixModalOpen] = useState(false);
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string | undefined>(undefined);
  const { isDark } = useTheme();

  const handleOpenDiscovery = () => {
    setDiscoveryModalMode('discovery');
    setDiscoveryModalOpen(true);
  };

  const handleOpenQuote = () => {
    setDiscoveryModalMode('quote');
    setDiscoveryModalOpen(true);
  };

  const handleOpenManifesto = () => {
    setManifestoModalOpen(true);
  };

  const handleSelectServiceForDiscovery = (serviceTitle: string) => {
    setDiscoveryModalMode('discovery');
    setDiscoveryModalOpen(true);
  };

  const handleSelectPlan = (planTitle: string) => {
    setSelectedPlanForContact(planTitle);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-200 relative ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Continuous Global Matrix Rain Canvas across entire application */}
      <MatrixRain
        opacity={isDark ? 0.12 : 0.05}
        isBackground={true}
        speedMultiplier={0.85}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Navigation Header */}
      <Navbar
        onOpenDiscovery={handleOpenDiscovery}
        onOpenQuote={handleOpenQuote}
        onOpenManifesto={handleOpenManifesto}
        onOpenMatrix={() => setMatrixModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenDiscovery={handleOpenDiscovery}
          onOpenQuote={handleOpenQuote}
          onOpenManifesto={handleOpenManifesto}
        />

        {/* 2. Core Services Breakdown */}
        <ServicesSection
          onSelectServiceForDiscovery={handleSelectServiceForDiscovery}
        />

        {/* 3. Tech Stack & Engineering Standards */}
        <TechStackSection />

        {/* 4. Case Studies / Featured Projects */}
        <CaseStudiesSection />

        {/* 5. Process & Delivery Timeline */}
        <ProcessSection />

        {/* 6. Social Proof & Testimonials */}
        <TestimonialsSection />

        {/* 7. Pricing / Engagement Models */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
          onOpenQuote={handleOpenQuote}
        />

        {/* 8. Lead Capture & Conversion Form */}
        <LeadCaptureSection
          onOpenDiscovery={handleOpenDiscovery}
          preselectedPlan={selectedPlanForContact}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenManifesto={handleOpenManifesto}
        onOpenDiscovery={handleOpenDiscovery}
      />

      {/* Modals */}
      <DiscoveryModal
        isOpen={discoveryModalOpen}
        onClose={() => setDiscoveryModalOpen(false)}
        defaultMode={discoveryModalMode}
      />

      <ManifestoModal
        isOpen={manifestoModalOpen}
        onClose={() => setManifestoModalOpen(false)}
      />

      {/* Raining Matrix Code Fullscreen Simulator */}
      {matrixModalOpen && (
        <MatrixRain
          forceFullscreen={true}
          isBackground={false}
          interactive={true}
          onClose={() => setMatrixModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

