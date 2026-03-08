'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "We were skeptical about the '12% Alpha Strategy' at first, but Sarah's pre-market blitz was unlike anything we’ve seen. We had 4 offers before the open house even started. She didn't just sell our home; she managed the entire transition with grace.",
    author: "The Miller Family",
    neighborhood: "Oakwood Estates",
    role: "Luxury Seller",
    rating: 5,
  },
  {
    quote: "The 72-Hour Launch Sequence is real. Sarah’s team had professional staging and drone footage done in two days. Our home looked like a magazine feature. We sold for $45k over our neighbor's house which had been sitting for a month.",
    author: "David K.",
    neighborhood: "Tech Executive",
    role: "Fast-Mover",
    rating: 5,
  },
  {
    quote: "Sarah knows these streets better than anyone. As a 'Local Authority,' she knew exactly which buyer profile would fall in love with our mid-century remodel. She handled the negotiations like a pro. Absolute peace of mind.",
    author: "Elena R.",
    neighborhood: "Long-time Resident",
    role: "Local Native",
    rating: 5,
  }
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="about" className="py-24 px-6 lg:px-12 bg-white relative overflow-hidden">
      {/* Decorative Brand Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 -rotate-90 select-none pointer-events-none">
        <span className="text-8xl md:text-[180px] font-serif text-brand-charcoal/[0.03] uppercase tracking-tighter whitespace-nowrap">The Local Authority</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="flex justify-center mb-10"
        >
          <Quote className="text-brand-gold/40" size={60} strokeWidth={1} />
        </motion.div>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-brand-charcoal tracking-tight italic leading-snug mb-10">
                "{testimonials[current].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                 <span className="text-lg md:text-2xl font-serif text-brand-charcoal font-semibold mb-1">{testimonials[current].author}</span>
                 <span className="text-xs uppercase tracking-[0.3em] text-brand-charcoal/40">{testimonials[current].role} | {testimonials[current].neighborhood}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-10">
          <button onClick={prev} className="p-3 border border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all text-brand-charcoal group">
             <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-2">
             {testimonials.map((_, i) => (
                <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-8 bg-brand-gold' : 'w-2 bg-brand-charcoal/10'}`} />
             ))}
          </div>

          <button onClick={next} className="p-3 border border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all text-brand-charcoal group">
             <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
