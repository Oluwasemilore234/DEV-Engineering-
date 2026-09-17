import React, { useState } from 'react';
import { Mail, Calendar, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Send, Clock, Phone, Terminal } from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';
import { FadeInSection } from './FadeInSection';
import { useCurrency } from '../context/CurrencyContext';

interface LeadCaptureSectionProps {
  onOpenDiscovery: () => void;
  preselectedPlan?: string;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({ onOpenDiscovery, preselectedPlan }) => {
  const { formatPrice, currencyConfig } = useCurrency();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: preselectedPlan || `${formatPrice(25000)} - ${formatPrice(50000)}`,
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 border-t border-slate-800 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInSection direction="up" delay={0} duration={600}>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              08 • Direct Architecture Consultation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Initiate Your Engineering Project
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Submit your system constraints, product roadmap, or active technical bottleneck. You'll receive a preliminary architectural roadmap within 24 hours.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            <FadeInSection direction="up" delay={50} duration={650}>
              <div className="bg-slate-950/80 border border-slate-800 p-8 rounded-2xl shadow-xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Technical Project Brief Received
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your brief for <span className="font-semibold text-white">{formData.company || 'your platform'}</span> has been routed directly to our Principal Systems Architect.
                </p>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-left text-xs font-mono max-w-md mx-auto text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Response Window:</span>
                    <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deliverable:</span>
                    <span className="text-white">Preliminary Architecture Review & Scope</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confirmation Sent To:</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', company: '', budget: '$25,000 - $50,000', details: '' }); }}
                    className="px-5 py-2 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="David Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@company.io"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Fintech Labs"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Project Scope / Budget *
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value={`${formatPrice(15000)} - ${formatPrice(25000)}`}>
                        &lt; {formatPrice(25000)} (Targeted Architecture / MVP)
                      </option>
                      <option value={`${formatPrice(25000)} - ${formatPrice(50000)}`}>
                        {formatPrice(25000)} - {formatPrice(50000)} (Custom Web/API System)
                      </option>
                      <option value={`${formatPrice(50000)} - ${formatPrice(100000)}`}>
                        {formatPrice(50000)} - {formatPrice(100000)} (Full Cloud Platform)
                      </option>
                      <option value={`${formatPrice(100000)}+`}>
                        {formatPrice(100000)}+ (Enterprise Ecosystem)
                      </option>
                      <option value="monthly-retainer">Ongoing Engineering Retainer ({currencyConfig.code})</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Project Details & Technical Constraints *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your current system, target scale, tech stack preferences, or planned deployment milestone..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  />
                </div>

                {/* Reassurance Copy */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">NDA Protected Guarantee:</span> We maintain strict confidentiality. We respond within 24 hours with an actionable, preliminary architecture review—never high-pressure sales calls.
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Analyzing Architecture Scope...
                    </>
                  ) : (
                    <>
                      Request Preliminary Architecture Review
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
              </div>
            </FadeInSection>
          </div>

          {/* Alternative Direct Channels (5 Cols) */}
          <div className="lg:col-span-5">
            <FadeInSection direction="up" delay={150} duration={650} className="h-full">
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Direct Technical Channels
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Prefer direct communication with an engineering lead? Connect with us through any of these dedicated channels.
                </p>

                <div className="space-y-3 pt-2">
                  {/* Direct Email */}
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">Direct Engineering Inbox</span>
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {CONTACT_INFO.email}
                      </span>
                    </div>
                  </a>

                  {/* Calendar Quick Booking */}
                  <button
                    onClick={onOpenDiscovery}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-left group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">Instant Video Slot</span>
                      <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        Book 30-min Architecture Call
                      </span>
                    </div>
                  </button>

                  {/* Office HQ */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-left">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">Engineering Headquarters</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {CONTACT_INFO.hq}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service SLA Commitment */}
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>24-Hour Review Turnaround Guaranteed</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Every request submitted receives a preliminary breakdown highlighting recommended database engines, cloud topology, concurrency constraints, and estimated milestone sprints.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Status: Direct Lead Architect Active</span>
              <span className="text-emerald-400 font-bold">PST Timezone</span>
            </div>
              </div>
            </FadeInSection>
          </div>

        </div>

      </div>
    </section>
  );
};
