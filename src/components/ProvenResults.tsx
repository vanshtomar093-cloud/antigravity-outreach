'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const results = [
  {
    address: "422 Oakwood Drive",
    neighborhood: "Oakwood Estates",
    stat: "108% of Asking Price",
    daysOnMarket: "48 Hours",
    price: "$1.2M",
    img: "/property_card_1.jpg",
  },
  {
    address: "89 Shoreline Blvd",
    neighborhood: "Regatta Heights",
    stat: "112% of Asking",
    daysOnMarket: "3 Days",
    price: "$2.4M",
    img: "/property_card_2.jpg",
  },
  {
    address: "15 Golden Way",
    neighborhood: "Summit Ridge",
    stat: "Sold Under Contract",
    daysOnMarket: "24 Hours",
    price: "$1.85M",
    img: "/property_card_3.jpg",
  }
];


export default function ProvenResults() {
  return (
    <section id="results" className="relative py-24 px-6 lg:px-12 bg-brand-charcoal overflow-hidden select-none">
      {/* Subtle Map Overlay */}
      <div className="absolute inset-0 opacity-[0.03] scale-125 z-0 grayscale invert pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <path d="M10,10 L30,15 L50,10 L70,20 L90,10 L95,40 L75,35 L60,50 L40,45 L20,60 L5,50 Z" fill="none" stroke="white" strokeWidth="0.1" />
           <circle cx="20" cy="20" r="1.5" fill="white" />
           <circle cx="50" cy="40" r="1.5" fill="white" />
           <circle cx="80" cy="60" r="1.5" fill="white" />
           <path d="M0,50 L100,50 M50,0 L50,100" stroke="white" strokeWidth="0.05" opacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm uppercase tracking-[0.5em] text-brand-gold font-bold mb-4"
          >
            Proven Results
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-4xl md:text-5xl font-serif text-white tracking-tight"
          >
            Proof of Performance
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group relative h-[450px] overflow-hidden rounded-sm"
            >
              <img 
                src={result.img} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                alt={result.address}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent" />
              
              <div className="absolute top-6 left-6 z-20">
                 <div className="bg-brand-charcoal/80 backdrop-blur-md px-4 py-1.5 border border-brand-gold/40">
                    <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">SOLD</span>
                 </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 z-20 transition-transform duration-700 group-hover:-translate-y-2">
                 <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest mb-3">
                    <MapPin size={12} className="text-brand-gold" />
                    <span>{result.neighborhood}</span>
                 </div>
                 <h4 className="text-xl font-serif text-white mb-2 leading-tight">{result.address}</h4>
                 <div className="h-[2px] w-8 bg-brand-gold/60 mb-4 group-hover:w-24 transition-all duration-700" />
                 
                 <div className="flex flex-col gap-1">
                    <span className="text-brand-gold font-bold text-lg uppercase tracking-wider">{result.stat}</span>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">{result.daysOnMarket} on Market | {result.price}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
