'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ValuationModal from './ValuationModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 lg:px-12 bg-brand-charcoal overflow-hidden select-none">
        {/* Background Graphic/Overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center grayscale" 
          style={{ backgroundImage: `url('/luxury_estate_hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal via-brand-charcoal/80 to-brand-charcoal" />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 flex items-center justify-center gap-1 text-xs uppercase tracking-[0.5em] text-brand-gold font-bold"
          >
            <div className="h-[1px] w-8 bg-brand-gold/40 mr-2" />
            The Jenkins Group Presents
            <div className="h-[1px] w-8 bg-brand-gold/40 ml-2" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05]"
          >
            Your <span className="text-brand-gold italic">Home</span>, Your <span className="text-brand-gold italic">Legacy</span>,<br />
            Handled with Care.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-sans leading-relaxed tracking-wide"
          >
            A data-driven, human-first approach that averages sales 12% above neighborhood asking prices.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.9, duration: 1 }}
             className="mt-14 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative group overflow-hidden bg-brand-gold hover:bg-brand-white text-brand-charcoal px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-[2px] shadow-[0_4px_30px_rgba(197,160,89,0.3)] hover:shadow-[0_4px_50px_rgba(197,160,89,0.5)]"
            >
              <span className="relative z-10 transition-colors duration-500">Get My Home Valuation</span>
              <div className="absolute inset-0 bg-brand-white translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
            </button>
            
            <div className="flex flex-col items-center md:items-start text-xs text-white/40 uppercase tracking-[0.3em]">
              <div className="flex gap-0.5 mb-1.5 grayscale opacity-50">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span>Trusted in 200+ residential closings</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
        </motion.div>
      </section>

      <ValuationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

