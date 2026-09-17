import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, Terminal, Code2, Cpu, GitCommit, Database, Layers, ArrowUpRight, Sparkles } from 'lucide-react';
import { TECH_STACK, ENGINEERING_PRINCIPLES } from '../data/engineeringData';
import { TechCategory } from '../types';
import { TechLogo } from './TechLogos';
import { TechMarquee } from './TechMarquee';

export const TechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TechCategory>('all');
  const [selectedTech, setSelectedTech] = useState<string>(TECH_STACK[0].id);

  const filteredTech = activeTab === 'all'
    ? TECH_STACK
    : TECH_STACK.filter((item) => item.category === activeTab);

  const currentTechDetail = TECH_STACK.find((t) => t.id === selectedTech) || TECH_STACK[0];

  return (
    <section id="tech-stack" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            03 • Engineering Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tech Stack & Engineering Rigor
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            We operate strictly with production-hardened technologies. Every stack choice has been selected for type safety, concurrency, and enterprise longevity.
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl w-fit mb-8">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'frontend', label: 'Frontend (React, Next.js, TS)' },
            { id: 'backend', label: 'Backend (Node, Python, Java)' },
            { id: 'cloud-db', label: 'Database & Cloud (Postgres, Docker, AWS)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TechCategory)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech Grid + Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Tech Grid (8 Cols) */}
          <motion.div
            layout
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => {
                const isSelected = tech.id === selectedTech;
                return (
                  <motion.div
                    key={tech.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedTech(tech.id)}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center p-1.5">
                        <TechLogo type={tech.iconType} className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        {tech.experience}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {tech.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                        {tech.highlightTag}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-400/90 capitalize">{tech.category.replace('-', ' & ')}</span>
                      <span className="text-slate-500 hover:text-slate-300 flex items-center gap-0.5">
                        Inspect &rarr;
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Active Tech Inspector Panel (4 Cols) */}
          <motion.div
            layout
            className="lg:col-span-4 rounded-xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2">
                  <TechLogo type={currentTechDetail.iconType} className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {currentTechDetail.name}
                  </h4>
                  <span className="text-xs font-mono text-emerald-400">
                    Production Tenure: {currentTechDetail.experience}
                  </span>
                </div>
              </div>

              <div className="py-4 space-y-3">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                    Architectural Application
                  </span>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    {currentTechDetail.description}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2">
                    Primary Production Use Cases
                  </span>
                  <div className="space-y-1.5">
                    {currentTechDetail.useCases.map((uc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-2.5 py-1.5 rounded border border-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Standard: Strict Typing & Linting</span>
              <span className="text-emerald-400">Verified V8/JVM/Cloud</span>
            </div>
          </motion.div>
        </div>

        {/* Reverse Flowing Animated Logo Marquee */}
        <div className="mb-20">
          <TechMarquee reverse={true} />
        </div>

        {/* Engineering Principles Section */}
        <div className="pt-12 border-t border-slate-800/80">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our 4 Engineering Principles
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Unlike ad-hoc programming that writes quick code and ignores future maintenance, we enforce strict software lifecycle standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ENGINEERING_PRINCIPLES.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {principle.metric}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {principle.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {principle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/70 space-y-1.5">
                  {principle.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
