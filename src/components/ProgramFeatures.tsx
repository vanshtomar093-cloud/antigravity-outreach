'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, TrendingUp, Sparkles } from 'lucide-react';

const features = [
  {
    title: "72-Hour Launch Sequence",
    description: "A proprietary pre-market blitz including professional HDR photography, 4K drone cinematography, and targeted social ads BEFORE the MLS hit.",
    icon: Camera,
    color: "bg-brand-gold/10",
  },
  {
    title: "The 12% Alpha Strategy",
    description: "Using AI-driven market analytics (Nexus-Xai powered) to price homes exactly at the bidding war threshold, historically netting 12% above asking.",
    icon: TrendingUp,
    color: "bg-brand-gold/20",
  },
  {
    title: "Concierge Staging & Prep",
    description: "Zero upfront cost staging and minor repairs to ensure the home is 'vogue-ready' for high-intent buyers. Professional designers on speed dial.",
    icon: Sparkles,
    color: "bg-brand-gold/10",
  }
];

export default function ProgramFeatures() {
  return (
    <section id="features" className="py-24 px-6 lg:px-12 bg-brand-white selection:bg-brand-gold/20 selection:text-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm uppercase tracking-[0.5em] text-brand-gold font-bold mb-4"
          >
            Why Choose The Jenkins Group
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal tracking-tight leading-tight max-w-3xl"
          >
            A Proprietary Service-Based <span className="italic">Agency</span> Model
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.4, duration: 1 }}
              className="group flex flex-col items-start p-10 bg-brand-charcoal hover:bg-white border border-white/5 hover:border-brand-gold/20 transition-all duration-700 shadow-xl hover:shadow-2xl"
            >
              <div className={`p-4 rounded-full mb-8 transition-colors duration-700 ${feature.color} group-hover:bg-brand-gold`}>
                <feature.icon className="text-brand-gold group-hover:text-white transition-colors duration-700" size={32} strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-serif text-white group-hover:text-brand-charcoal transition-colors duration-700 mb-6 font-semibold">
                {feature.title}
              </h4>
              <p className="text-white/50 group-hover:text-brand-charcoal/70 transition-colors duration-700 text-sm leading-relaxed tracking-wide mb-8">
                {feature.description}
              </p>
              <div className="w-10 h-[2px] bg-brand-gold group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
