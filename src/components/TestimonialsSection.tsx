import React from 'react';
import { Quote, CheckCircle2, Star, ShieldCheck, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/engineeringData';
import { FadeInSection } from './FadeInSection';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 border-t border-b border-slate-800/80 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInSection direction="up" delay={0} duration={600}>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              06 • Social Proof & Peer Trust
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Direct Endorsements from Tech Leaders
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              What CTOs, Founders, and Engineering Vice Presidents say about our disciplined software lifecycle and architectural execution.
            </p>
          </div>
        </FadeInSection>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <FadeInSection
              key={t.id}
              direction="up"
              delay={index * 130}
              duration={650}
              className="h-full"
            >
              <div
                className="p-7 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg relative group h-full"
              >
                <div>
                  {/* Top Badge: Verified & Metric */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {t.metricsResult}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-8 relative">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center gap-3.5">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-sm truncate">
                        {t.name}
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {t.role}
                    </p>
                    <p className="text-xs font-semibold text-slate-300 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

      </div>
    </section>
  );
};

