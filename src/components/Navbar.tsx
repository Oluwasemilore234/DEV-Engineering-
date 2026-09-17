import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Terminal, ArrowRight, ShieldCheck, Cpu, Sun, Moon, Coins, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

interface NavbarProps {
  onOpenDiscovery: () => void;
  onOpenQuote: () => void;
  onOpenManifesto: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiscovery, onOpenQuote, onOpenManifesto }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme, isDark } = useTheme();
  const { currency, setCurrency, currencyConfig, supportedCurrencies } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-2.5'
          : 'bg-slate-950/40 backdrop-blur-sm border-b border-slate-900/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Operational Status */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-mono font-black text-base shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                &lt;/&gt;
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  Dev Engineering
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    Enterprise
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono tracking-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  99.99% Systems Operational
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-emerald-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions (Currency, Theme Toggle, Manifesto, CTA) */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Currency Selector Dropdown */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title={`Currency: ${currencyConfig.name} (${currencyConfig.code})`}
                aria-label="Select currency"
              >
                <span className="text-sm">{currencyConfig.flag}</span>
                <span className="font-bold text-emerald-400">{currencyConfig.code}</span>
                <span className="text-slate-400 text-[11px]">({currencyConfig.symbol})</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-fadeIn">
                  <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-800 flex items-center justify-between">
                    <span>Select Currency</span>
                    <span className="text-emerald-400">Live Rates</span>
                  </div>
                  <div className="py-1 max-h-64 overflow-y-auto space-y-0.5">
                    {supportedCurrencies.map((c) => {
                      const isSelected = c.code === currency;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCurrency(c.code as CurrencyCode);
                            setCurrencyDropdownOpen(false);
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{c.flag}</span>
                            <span className="font-semibold">{c.code}</span>
                            <span className="text-slate-400 text-[11px] font-normal">({c.symbol})</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            {c.code === 'USD' ? (
                              <span>Base</span>
                            ) : (
                              <span>≈{c.symbol}{c.rate.toLocaleString()}</span>
                            )}
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* High-Contrast Light vs Slate-950 Dark Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-all flex items-center justify-center cursor-pointer group shadow-sm"
              title={isDark ? "Switch to High-Contrast Light Theme" : "Switch to Slate-950 Dark Theme"}
              aria-label={isDark ? "Switch to High-Contrast Light Theme" : "Switch to Slate-950 Dark Theme"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            <button
              onClick={onOpenManifesto}
              className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 transition-colors hidden md:flex items-center gap-1.5"
              title="View Software Engineering Manifesto"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Manifesto
            </button>

            <button
              onClick={onOpenDiscovery}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
            >
              Book Discovery Call
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-200"
              title={isDark ? "Light mode" : "Dark mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-800 space-y-3 animate-fadeIn bg-slate-950/95 rounded-xl p-4 shadow-xl">
            {/* Mobile Currency Selector */}
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold mb-2 flex items-center justify-between">
                <span>Select Currency:</span>
                <span className="text-emerald-400 font-bold">{currencyConfig.code} ({currencyConfig.symbol})</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {supportedCurrencies.map((c) => {
                  const isSelected = c.code === currency;
                  return (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code as CurrencyCode)}
                      className={`p-1.5 rounded text-xs font-mono flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="text-xs">{c.flag}</span>
                      <span className="text-[10px]">{c.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Theme Toggle Row */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                <span className="text-xs font-mono text-slate-300">
                  Theme: <strong className="text-emerald-400">{isDark ? 'Slate-950 Dark' : 'High-Contrast Light'}</strong>
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
              >
                Switch to {isDark ? 'Light' : 'Dark'}
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenManifesto(); }}
                className="w-full px-3 py-2 text-xs font-mono text-left rounded-lg border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                Read Engineering Manifesto
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
                className="w-full px-3 py-2 text-xs text-left rounded-lg border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                Get Instant Quote
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDiscovery(); }}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

