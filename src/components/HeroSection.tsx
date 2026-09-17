import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Terminal, CheckCircle2, ChevronRight, Activity, Zap, Play, Sparkles } from 'lucide-react';
import { TRUST_METRICS, CERTIFICATIONS, CLIENT_LOGOS } from '../data/engineeringData';
import { InteractiveSystemVideo } from './InteractiveSystemVideo';
import { TechMarquee } from './TechMarquee';
import { MatrixRain } from './MatrixRain';

interface HeroSectionProps {
  onOpenDiscovery: () => void;
  onOpenQuote: () => void;
  onOpenManifesto: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDiscovery, onOpenQuote, onOpenManifesto }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-38 md:pb-24 overflow-hidden bg-slate-950 text-slate-100">
      {/* Raining Matrix Code Effect Canvas Background */}
      <MatrixRain opacity={0.32} speedMultiplier={1.0} isBackground={true} />

      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Subtle radial glow accents with slow pulse animation */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content & Copy Container */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Trust & Credentials Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-slate-300">
              ISO/IEC 27001 Certified • AWS Advanced Partner
            </span>
            <button
              onClick={onOpenManifesto}
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 ml-1 transition-colors"
            >
              Verify SOP <ChevronRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Headline with Stagger Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Custom Software Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Built for Scale.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            We design, build, and maintain high-performance web applications and resilient cloud infrastructure for growing tech companies.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={onOpenDiscovery}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              Book a Discovery Call
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-base border border-slate-700/80 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              Get an Instant Quote
            </button>
          </motion.div>

          {/* Secondary Subtitle Link CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-6 pt-1 text-sm font-medium text-slate-400"
          >
            <a
              href="#case-studies"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 underline decoration-slate-700 underline-offset-4 hover:decoration-emerald-400"
            >
              View Our Work
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="#tech-stack"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 underline decoration-slate-700 underline-offset-4 hover:decoration-emerald-400"
            >
              Explore Tech Stack
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Interactive Animated Video Showcase (Live System Architecture Execution) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 sm:mt-16 max-w-5xl mx-auto"
        >
          {/* Video Section Header Badge */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE ORCHESTRATION DEMO STREAM</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Interactive Video Mode
            </span>
          </div>

          <InteractiveSystemVideo />
        </motion.div>

        {/* Live Engineering Metrics Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-16 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_METRICS.map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left hover:border-slate-700 transition-colors group"
              >
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400 group-hover:scale-105 transition-transform origin-left">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Infinite Animated Marquee Ribbon */}
        <div className="pt-10 max-w-6xl mx-auto">
          <div className="text-center text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">
            Hardened Production Tech Stack Running 24/7
          </div>
          <TechMarquee />
        </div>

        {/* Trust Badges & Certifications Bar */}
        <div className="pt-8 space-y-4 max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-mono font-medium">
            Enterprise Trust Badges & Verified Certifications
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                onClick={onOpenManifesto}
                className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all text-left"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {cert.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {cert.code}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Client partner badge strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-75">
            <span className="text-xs text-slate-400 font-mono">TRUSTED BY TECH LEADERS AT:</span>
            {CLIENT_LOGOS.map((client) => (
              <div key={client.name} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="font-bold text-xs sm:text-sm tracking-wider uppercase">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
