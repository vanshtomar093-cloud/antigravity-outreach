'use client';

import React from 'react';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Mail, href: "mailto:sarah@jenkinsgroup.com", name: "Email" },
];

const neighborhoods = [
  "Oakwood Estates", "Regatta Heights", "Summit Ridge", "The Palisades", "North Shore", "Golden Mile"
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal py-24 px-6 lg:px-12 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif text-brand-gold mb-6 tracking-tight">The Jenkins Group</h2>
            <p className="text-white/40 text-sm font-sans tracking-wide leading-relaxed max-w-sm mb-10">
              A high-end, conversion-focused residential real estate agency specializing in luxury estates and high-intent buyer target marketing.
            </p>
            <div className="flex gap-6 mt-10">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-white/40 hover:text-brand-gold transition-all hover:scale-110" aria-label={link.name}>
                  <link.icon size={22} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Areas of Expertise */}
          <div>
            <h3 className="text-xs uppercase tracking-[.4em] text-white font-bold mb-8">Areas of Expertise</h3>
            <ul className="grid grid-cols-1 gap-4">
              {neighborhoods.map((n, i) => (
                <li key={i} className="text-white/40 text-sm hover:text-brand-gold transition-colors cursor-pointer flex items-center gap-2 group">
                  <div className="w-0 h-[1px] bg-brand-gold/40 transition-all duration-300 group-hover:w-4" />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs uppercase tracking-[.4em] text-white font-bold mb-8">Direct Contact</h3>
            <div className="flex flex-col gap-6">
               <a href="tel:+15552345678" className="flex items-start gap-4 group cursor-pointer">
                  <div className="p-2 border border-brand-gold/20 rounded-full group-hover:bg-brand-gold transition-colors duration-500">
                     <Phone size={14} className="text-brand-gold group-hover:text-brand-charcoal" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Mobile</span>
                     <span className="text-white text-sm hover:text-brand-gold transition-colors">+1 (555) 234-5678</span>
                  </div>
               </a>

               <a href="mailto:sarah@jenkinsgroup.com" className="flex items-start gap-4 group cursor-pointer">
                  <div className="p-2 border border-brand-gold/20 rounded-full group-hover:bg-brand-gold transition-colors duration-500">
                     <Mail size={14} className="text-brand-gold group-hover:text-brand-charcoal" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Email</span>
                     <span className="text-white text-sm hover:text-brand-gold transition-colors">sarah@jenkinsgroup.com</span>
                  </div>
               </a>

               <div onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-start gap-4 group cursor-pointer">
                  <div className="p-2 border border-brand-gold/20 rounded-full group-hover:bg-brand-gold transition-colors duration-500">
                     <MapPin size={14} className="text-brand-gold group-hover:text-brand-charcoal" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Global HQ</span>
                     <span className="text-white text-sm hover:text-brand-gold transition-colors font-semibold">The Jenkins Estate, CA</span>
                  </div>
               </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 text-center md:text-left">
            © 2026 The Jenkins Group. All Rights Reserved. Built for Luxury Excellence.
          </div>
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] text-white/30">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
