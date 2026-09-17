import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Calculator, Users, Sparkles, Coins } from 'lucide-react';
import { PRICING_MODELS } from '../data/engineeringData';
import { FadeInSection } from './FadeInSection';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

interface PricingSectionProps {
  onSelectPlan: (planTitle: string) => void;
  onOpenQuote: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan, onOpenQuote }) => {
  const [teamSize, setTeamSize] = useState<number>(2);
  const [commitmentMonths, setCommitmentMonths] = useState<number>(3);
  const {
    currency,
    setCurrency,
    currencyConfig,
    formatRange,
    formatMonthly,
    formatHourly,
    formatPrice,
    supportedCurrencies,
  } = useCurrency();

  // Dynamic estimate for calculator in USD, converted by CurrencyContext
  const baseMonthlyUsd = teamSize * 6500;
  const baseTotalUsd = baseMonthlyUsd * commitmentMonths;

  const getPlanPrice = (planId: string) => {
    switch (planId) {
      case 'fixed-price':
        return formatRange(15000, 45000);
      case 'dedicated-team':
        return formatMonthly(12500);
      case 'staff-aug':
        return formatHourly(85, 130);
      default:
        return '';
    }
  };

  return (
    <section id="pricing" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInSection direction="up" delay={0} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                07 • Pricing & Engagement
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Transparent Engagement Models
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
                Choose the model that matches your risk profile and delivery cadence. Real-time multi-currency conversion backed by current international exchange rates.
              </p>
            </div>

            {/* Currency Quick-Switcher Pill Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-lg shrink-0">
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  Select Currency:
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {currency === 'USD' ? 'Base: 1 USD = $1.00' : `1 USD ≈ ${currencyConfig.symbol}${currencyConfig.rate.toLocaleString()}`}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {supportedCurrencies.map((c) => {
                  const isSelected = c.code === currency;
                  return (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code as CurrencyCode)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20 scale-105'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                      title={`${c.name} (${c.code}) - 1 USD = ${c.rate} ${c.code}`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.code}</span>
                      <span className={isSelected ? 'text-slate-900' : 'text-slate-400'}>({c.symbol})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 3 Pricing Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PRICING_MODELS.map((model, index) => (
            <FadeInSection
              key={model.id}
              direction="up"
              delay={index * 130}
              duration={650}
              className="h-full"
            >
              <div
                className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative h-full ${
                  model.popular
                    ? 'bg-slate-900 border-emerald-500/80 shadow-2xl shadow-emerald-500/10 -translate-y-2'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                {model.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                    Most Popular for Scaling Startups
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {model.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      {model.tagline}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="py-4 border-t border-b border-slate-800/80 my-5">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                      {getPlanPrice(model.id)}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-1.5">
                      <span>{model.billingType}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {currencyConfig.code}
                      </span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-6 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                    <span className="font-semibold text-emerald-400 font-mono block mb-1">
                      BEST SUITED FOR:
                    </span>
                    {model.bestFor}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
                      Included Capabilities:
                    </div>
                    {model.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onSelectPlan(model.title)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      model.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    Choose {model.title}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Interactive Scope & Retainer Calculator */}
        <FadeInSection direction="up" delay={200} duration={650}>
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Interactive Capacity Estimator</h4>
                <p className="text-xs text-slate-400">Estimate dedicated engineering retainer dynamically in {currencyConfig.name} ({currencyConfig.code})</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Control 1: Engineers */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Dedicated Senior Engineers:</span>
                  <span className="text-emerald-400 font-bold">{teamSize} Engineers</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>1 Dev (Solo Pod)</span>
                  <span>4 Devs</span>
                  <span>8 Devs (Full Pod)</span>
                </div>
              </div>

              {/* Control 2: Months */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Engagement Duration:</span>
                  <span className="text-emerald-400 font-bold">{commitmentMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={commitmentMonths}
                  onChange={(e) => setCommitmentMonths(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>1 Month</span>
                  <span>6 Months</span>
                  <span>12 Months</span>
                </div>
              </div>

              {/* Result Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Estimated Retainer ({currencyConfig.code})
                  </span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {formatPrice(baseMonthlyUsd)}{' '}
                    <span className="text-xs text-slate-400 font-sans font-normal">/ mo</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Total est: {formatPrice(baseTotalUsd)} ({commitmentMonths} mos)
                  </span>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  Lock In Estimate
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
};

