import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, GitMerge, ShieldCheck, LifeBuoy, CheckCircle2, ArrowRight, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { PROCESS_STEPS } from '../data/engineeringData';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-6 h-6 text-emerald-400" />;
      case 1:
        return <GitMerge className="w-6 h-6 text-cyan-400" />;
      case 2:
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
      case 3:
        return <LifeBuoy className="w-6 h-6 text-emerald-400" />;
      default:
        return <Compass className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            05 • Delivery Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Predictable 4-Step Engineering Workflow
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            Eliminating client hesitation through radical transparency, milestone commitments, and automated preview environments on every sprint.
          </p>
        </motion.div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, index) => {
            const isSelected = activeStep === index;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/80 shadow-xl shadow-emerald-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Active glow corner */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                )}

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-2xl font-black transition-colors ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {step.stepNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-medium">
                      <Clock className="w-3 h-3" />
                      {step.timeline}
                    </span>
                  </div>

                  <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800 mb-4 group-hover:border-emerald-500/30 transition-colors">
                    {getStepIcon(index)}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
                      Deliverables:
                    </div>
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Phase 0{index + 1} of 04</span>
                  <span className={`text-emerald-400 flex items-center gap-1 ${isSelected ? 'font-bold' : ''}`}>
                    {isSelected ? 'Active Phase' : 'Inspect'} &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Milestone Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Dev Engineering Zero-Risk Delivery SLA
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              If an architecture milestone doesn't satisfy the mutually agreed Acceptance Criteria, we remediate it at zero additional cost prior to final sign-off.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors border border-slate-700"
          >
            Review Sample SLA Document
          </a>
        </motion.div>

      </div>
    </section>
  );
};
