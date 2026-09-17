import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, Layers, Coins } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'discovery' | 'quote';
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose, defaultMode = 'discovery' }) => {
  const { formatPrice, currencyConfig } = useCurrency();
  const [mode, setMode] = useState<'discovery' | 'quote'>(defaultMode);
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectScope: 'web-application',
    teamModel: 'dedicated',
    timeline: 'immediate',
    estimatedBudget: `${formatPrice(25000)} - ${formatPrice(50000)}`,
    selectedDate: '2026-09-22',
    selectedTime: '10:00 AM PST',
    notes: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const calculateQuickEstimate = () => {
    let base = 25000;
    if (formData.projectScope === 'cloud-architecture') base = 35000;
    if (formData.projectScope === 'api-modernization') base = 30000;
    if (formData.projectScope === 'full-ecosystem') base = 60000;

    if (formData.teamModel === 'dedicated') base *= 1.25;
    if (formData.timeline === 'immediate') base *= 1.1;

    return formatPrice(base);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-semibold">
              DEV
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {mode === 'discovery' ? 'Book Technical Discovery Call' : 'Instant Engineering Project Quote'}
              </h3>
              <p className="text-xs text-slate-400">
                Direct 30-min strategy session with a Principal Systems Architect
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => { setMode('discovery'); setStep(1); setSubmitted(false); }}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              mode === 'discovery'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Discovery Calendar
          </button>
          <button
            type="button"
            onClick={() => { setMode('quote'); setStep(1); setSubmitted(false); }}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              mode === 'quote'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Cost & Scope Estimator
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {mode === 'discovery' ? 'Discovery Session Confirmed!' : 'Technical Estimate Dispatched'}
              </h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{formData.name || 'Partner'}</span>. We have assigned a Principal Solutions Architect to review your project brief for <span className="text-emerald-400 font-mono">{formData.company || 'your team'}</span>.
              </p>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheduled Time:</span>
                  <span className="text-white font-medium">{formData.selectedDate} at {formData.selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confirmation Sent:</span>
                  <span className="text-white font-medium">{formData.email || 'your email'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Preparation:</span>
                  <span className="text-emerald-400 font-medium">Architecture outline provided prior</span>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : mode === 'discovery' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Tech Labs"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Target Project Focus
                  </label>
                  <select
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="web-application">Custom Web / Mobile Platform</option>
                    <option value="cloud-architecture">Cloud Architecture & DevOps</option>
                    <option value="api-modernization">Backend & High-Throughput APIs</option>
                    <option value="legacy-modernization">Legacy Codebase Modernization</option>
                  </select>
                </div>
              </div>

              {/* Time Slot Picker */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Select Preferred Discovery Window
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM PST', '01:30 PM PST', '04:00 PM PST'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, selectedTime: slot })}
                      className={`px-3 py-2 text-xs rounded-lg border font-mono transition-all ${
                        formData.selectedTime === slot
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  System Context / Technical Goals
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your active bottleneck, target scale, or planned release..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NDA protected • Guaranteed zero-sales-fluff technical consultation</span>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  Confirm Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Instant Quote Estimator */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400">Estimated Project Investment</span>
                  <div className="text-2xl font-mono font-bold text-emerald-400 flex items-baseline gap-1 mt-0.5">
                    {calculateQuickEstimate()}
                    <span className="text-xs text-slate-400 font-sans font-normal">est. delivery package ({currencyConfig.code})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Target Velocity</span>
                  <p className="text-sm font-semibold text-white">4–10 Weeks Delivery</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Scope Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'web-application', label: 'Web Platform (MVP)' },
                      { id: 'cloud-architecture', label: 'Cloud Infrastructure' },
                      { id: 'api-modernization', label: 'API / Microservices' },
                      { id: 'full-ecosystem', label: 'Full Enterprise System' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectScope: item.id })}
                        className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                          formData.projectScope === item.id
                            ? 'border-emerald-400 bg-emerald-500/15 text-white font-semibold'
                            : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Engagement Model
                    </label>
                    <select
                      value={formData.teamModel}
                      onChange={(e) => setFormData({ ...formData, teamModel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="fixed">Fixed-Price Milestone</option>
                      <option value="dedicated">Dedicated Engineering Pod</option>
                      <option value="staff">Staff Augmentation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Target Launch Window
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="immediate">Urgent (&lt; 30 Days)</option>
                      <option value="standard">Standard (60-90 Days)</option>
                      <option value="exploratory">Exploratory / Planning</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Turner"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@startup.io"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  Generate Formal Specification
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
