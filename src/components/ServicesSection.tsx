import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Cloud, Server, RefreshCw, CheckCircle2, ArrowRight, ChevronDown, Cpu, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/engineeringData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForDiscovery: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForDiscovery }) => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(SERVICES[0].id);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-emerald-400" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-cyan-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-teal-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-emerald-400" />;
      default:
        return <Cpu className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-900 border-t border-b border-slate-800/80 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            02 • Technical Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Engineering Services Breakdown
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            We provide disciplined, full life-cycle software engineering designed to remove technical debt, guarantee SLA uptime, and scale computational throughput.
          </p>
        </motion.div>

        {/* 4-Grid Overview with Stagger Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => {
            const isExpanded = activeServiceId === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl border transition-all duration-200 bg-slate-950/60 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group ${
                  isExpanded
                    ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Subtle hover accent light */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      Production Ready
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Performance Metric Badge */}
                  <div className="mb-6 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{service.metrics}</span>
                  </div>

                  {/* Technical Deliverables */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold">
                      Key Deliverables & Standards:
                    </div>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2 pb-6 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveServiceId(isExpanded ? null : service.id)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {isExpanded ? 'Collapse Architecture' : 'View Architecture'}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    onClick={() => onSelectServiceForDiscovery(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                  >
                    Consult on this service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Expanded Architectural Deep Dive with AnimatePresence */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl space-y-2">
                        <span className="font-mono text-emerald-400 font-semibold uppercase text-[10px] tracking-wider block">
                          Engineering Blueprint Details
                        </span>
                        <p className="leading-relaxed">
                          {service.fullDesc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
