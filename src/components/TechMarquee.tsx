import React from 'react';
import { TechLogo } from './TechLogos';
import { TECH_STACK } from '../data/engineeringData';

interface TechMarqueeProps {
  reverse?: boolean;
  speed?: 'normal' | 'slow';
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ reverse = false }) => {
  // Duplicate array for seamless infinite looping
  const duplicatedTech = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <div className="w-full overflow-hidden py-4 relative group select-none">
      {/* Left and Right Fade Masks for smooth edge blending */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className={reverse ? "animate-marquee-reverse" : "animate-marquee"}>
        {duplicatedTech.map((tech, index) => (
          <div
            key={`${tech.id}-${index}`}
            className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group/item shrink-0 shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center p-1 border border-slate-800 group-hover/item:scale-110 transition-transform">
              <TechLogo type={tech.iconType} className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200 group-hover/item:text-emerald-300 transition-colors whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                {tech.highlightTag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
