import React from 'react';
import { X, ShieldCheck, CheckCircle2, Award, Terminal, Cpu, Database, GitBranch } from 'lucide-react';
import { MANIFESTO_TEXT, CERTIFICATIONS } from '../data/engineeringData';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Engineering Credentials & Manifesto</h3>
              <p className="text-xs text-slate-400">Dev Engineering Standard Operating Procedure</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Engineering Definition Callout */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30 relative">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-wider">
              <Terminal className="w-3 h-3" /> Core Doctrine
            </div>
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold mb-2">
              Engineering Definition
            </h4>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-sans">
              "{MANIFESTO_TEXT}"
            </p>
          </div>

          {/* Pillars of Disciplined Engineering */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold mb-3">
              The 4 Pillars of Disciplined Engineering vs. Ad-Hoc Scripting
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-white">1. Scalability by Architecture</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Stateless compute tiers, horizontal replica sets, non-blocking I/O event loops, and caching topologies designed to scale seamlessly under 100x traffic loads.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-white">2. Deterministic Reliability</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Circuit breakers, exponential backoff retries, health probes, and automated failovers guaranteeing high-availability 99.99% service SLAs.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-3">
                <GitBranch className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-white">3. Strict Maintainability</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Modular code boundaries, explicit TypeScript contracts, dependency injection, and clean documentation to ensure friction-free handoffs.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-3">
                <Database className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-white">4. Life Cycle Security</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Automated SAST/DAST audits, zero-trust IAM segregation, cryptographic secrets rotation, and full OWASP Top 10 mitigation at every layer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Certifications */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold mb-3">
              Verified Certifications & Accreditations
            </h4>
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.code} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-white">{cert.name}</span>
                      <span className="text-slate-500 ml-2">({cert.org})</span>
                    </div>
                  </div>
                  <span className="font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                    {cert.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
