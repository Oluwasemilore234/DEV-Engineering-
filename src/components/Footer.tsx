import React from 'react';
import { Terminal, ShieldCheck, Github, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';
import { MANIFESTO_TEXT, CERTIFICATIONS } from '../data/engineeringData';

interface FooterProps {
  onOpenManifesto: () => void;
  onOpenDiscovery: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManifesto, onOpenDiscovery }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Manifesto snippet (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-mono font-black flex items-center justify-center text-sm shadow-md shadow-emerald-500/20">
                &lt;/&gt;
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Dev Engineering
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Disciplined, systematic software engineering built for scale, reliability, and security over the entire product life cycle.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenManifesto}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 text-xs font-mono transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                Read Full Engineering Manifesto
              </button>
            </div>
          </div>

          {/* Navigation Links (1 col) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Core Services</a></li>
              <li><a href="#tech-stack" className="hover:text-emerald-400 transition-colors">Tech Stack</a></li>
              <li><a href="#case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</a></li>
              <li><a href="#process" className="hover:text-emerald-400 transition-colors">Delivery Timeline</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing & Retainers</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Engineering</a></li>
            </ul>
          </div>

          {/* Engineering Offerings (1 col) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Practices
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-slate-200">High-Throughput APIs</span></li>
              <li><span className="hover:text-slate-200">Cloud & Terraform DevOps</span></li>
              <li><span className="hover:text-slate-200">React & Next.js Platforms</span></li>
              <li><span className="hover:text-slate-200">PostgreSQL Tuning & Sharding</span></li>
              <li><span className="hover:text-slate-200">OWASP Security Remediation</span></li>
              <li><span className="hover:text-slate-200">Microservices Architecture</span></li>
            </ul>
          </div>

          {/* Accreditations & Trust (1 col) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Accreditations
            </h4>
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.code} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-slate-400">
              © {new Date().getFullYear()} Dev Engineering Inc. All systems production verified.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenDiscovery}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              Book Discovery Call
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
              title="Scroll to top"
            >
              Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
