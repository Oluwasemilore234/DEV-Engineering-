import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, X, Cpu, Server, Activity, ShieldCheck, Layers } from 'lucide-react';
import { CASE_STUDIES } from '../data/engineeringData';
import { CaseStudy } from '../types';
import { FadeInSection } from './FadeInSection';

export const CaseStudiesSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-24 bg-slate-900 border-t border-b border-slate-800/80 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInSection direction="up" delay={0} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                04 • Featured Outcomes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Case Studies & Proof of Execution
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
                Real engineering solutions deployed to production. Every project is measured by quantifiable system performance, uptime reliability, and operational cost reduction.
              </p>
            </div>
            <div className="font-mono text-xs text-slate-400">
              * All data verified by client telemetry audits
            </div>
          </div>
        </FadeInSection>

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((project, index) => (
            <FadeInSection
              key={project.id}
              direction="up"
              delay={index * 130}
              duration={650}
              className="h-full"
            >
              <div
                className="rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg h-full"
              >
                <div className="p-6 sm:p-7">
                  {/* Meta header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                      {project.industry}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {project.timeline}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>

                  {/* Core Metrics Banner */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-6 space-y-3">
                    <div>
                      <div className="text-3xl font-extrabold font-mono text-emerald-400">
                        {project.metrics.primary}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5">
                        {project.metrics.primaryLabel}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-400 block">{project.metrics.secondaryLabel}</span>
                        <span className="text-white font-bold">{project.metrics.secondary}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">{project.metrics.tertiaryLabel}</span>
                        <span className="text-white font-bold">{project.metrics.tertiary}</span>
                      </div>
                    </div>
                  </div>

                  {/* The Problem */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-xs uppercase font-mono font-semibold tracking-wider text-rose-400">
                      The Problem
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-xs uppercase font-mono font-semibold tracking-wider text-emerald-400">
                      The Solution
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  {/* Tech Chips */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 text-slate-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCase(project)}
                    className="w-full py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Inspect Architecture Breakdown
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Detailed Modal for Project Breakdown */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <div 
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                    {selectedCase.industry} • {selectedCase.timeline}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedCase.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm">
                {/* Metrics Highlight */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">{selectedCase.metrics.primary}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{selectedCase.metrics.primaryLabel}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">{selectedCase.metrics.secondary}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{selectedCase.metrics.secondaryLabel}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-400">{selectedCase.metrics.tertiary}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{selectedCase.metrics.tertiaryLabel}</div>
                  </div>
                </div>

                {/* Problem & Solution Detailed */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-1">
                    The Bottleneck & Constraints
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/80">
                    {selectedCase.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                    Architectural Solution
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/80">
                    {selectedCase.solution}
                  </p>
                </div>

                {/* Key Architecture Execution Details */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Key System Engineering Highlights
                  </h4>
                  <div className="space-y-2">
                    {selectedCase.architectureDetails.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Stack Chips */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Complete Infrastructure & Software Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs font-mono rounded bg-slate-950 border border-slate-800 text-emerald-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
