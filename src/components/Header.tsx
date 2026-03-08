'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ValuationModal from './ValuationModal';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
       el.scrollIntoView({ behavior: 'smooth' });
       setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[80]">
        {/* Top Bar - Trusted By */}
        {!isMobileMenuOpen && (
          <div className="bg-brand-charcoal text-white py-2 px-4 text-center text-xs tracking-widest uppercase border-b border-white/10 overflow-hidden hidden md:block">
            <motion.div
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span>Trusted by 200+ families in the area. Average 12% above asking.</span>
            </motion.div>
          </div>
        )}

        {/* Main Nav */}
        <div className={cn(
          "transition-all duration-300 px-6 lg:px-12",
          isScrolled ? "bg-brand-charcoal/90 backdrop-blur-md py-4" : "bg-transparent py-8"
        )}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-xl lg:text-2xl font-serif text-brand-gold tracking-tight leading-none">The Jenkins Group</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1 font-sans font-bold">Sarah Jenkins | The Local Authority</span>
            </div>

            <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold">
              <button onClick={() => scrollTo('features')} className="hover:text-brand-gold transition-colors">Strategy</button>
              <button onClick={() => scrollTo('results')} className="hover:text-brand-gold transition-colors">Results</button>
              <button onClick={() => scrollTo('about')} className="hover:text-brand-gold transition-colors">About</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-brand-gold transition-colors">Contact</button>
            </nav>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "hidden sm:block bg-brand-gold text-brand-charcoal px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-[1px] hover:bg-brand-white transition-all shadow-[0_4px_20px_rgba(197,160,89,0.2)]",
                  isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                Get Valuated
              </button>

              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-brand-charcoal z-[90] flex flex-col pt-32 px-10 gap-8"
            >
              <button onClick={() => scrollTo('features')} className="text-3xl font-serif text-white hover:text-brand-gold text-left">The Strategy</button>
              <button onClick={() => scrollTo('results')} className="text-3xl font-serif text-white hover:text-brand-gold text-left">Proven Results</button>
              <button onClick={() => scrollTo('about')} className="text-3xl font-serif text-white hover:text-brand-gold text-left">About Sarah</button>
              <button onClick={() => scrollTo('contact')} className="text-3xl font-serif text-white hover:text-brand-gold text-left">Contact</button>
              
              <div className="mt-auto pb-10 flex flex-col gap-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-brand-gold text-brand-charcoal py-5 text-xs font-bold uppercase tracking-widest w-full"
                >
                  Get Valuated
                </button>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center">
                   © 2026 The Jenkins Group
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ValuationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

