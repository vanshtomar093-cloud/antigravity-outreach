'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProgramFeatures from "@/components/ProgramFeatures";
import ProvenResults from "@/components/ProvenResults";
import TestimonialSlider from "@/components/TestimonialSlider";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-brand-charcoal text-white relative flex flex-col items-stretch overflow-x-hidden selection:bg-brand-gold/20 selection:text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 md:top-[48px] left-0 right-0 h-[2px] bg-brand-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />
      
      <div className="flex flex-col gap-0">
        <Hero />
        <ProgramFeatures />
        <ProvenResults />
        <TestimonialSlider />
        <ContactSection />
        <Footer />
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-brand-gold/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-white/5 blur-[120px] rounded-full opacity-50" />
      </div>
    </main>
  );
}

