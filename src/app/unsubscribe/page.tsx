'use client';

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UnsubscribePage() {
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call your unsubscribe API endpoint
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsUnsubscribed(true);
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        {!isUnsubscribed ? (
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-brand-charcoal mb-6 leading-tight">
              Manage Your <span className="text-brand-gold">Preferences</span>
            </h1>
            <p className="text-lg text-brand-charcoal/70 font-sans mb-12 max-w-lg mx-auto">
              We understand if you'd prefer not to receive communications from The Jenkins Group. We respect your choice and will remove you from our mailing list.
            </p>

            <form onSubmit={handleUnsubscribe} className="space-y-8 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-brand-charcoal/20 py-4 focus:border-brand-gold text-brand-charcoal outline-none transition-all placeholder:text-brand-charcoal/20 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-gold text-brand-charcoal py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-charcoal hover:text-brand-gold border border-brand-gold transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Unsubscribe'}
              </button>
            </form>

            <p className="text-xs text-brand-charcoal/50 mt-12">
              You can always resubscribe by contacting us directly at{' '}
              <a
                href="mailto:sarah@jenkinsgroup.com"
                className="text-brand-gold font-semibold hover:underline"
              >
                sarah@jenkinsgroup.com
              </a>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="p-8 bg-brand-gold/10 rounded-full">
                <CheckCircle size={80} className="text-brand-gold" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-6">
              You've Been <span className="text-brand-gold">Unsubscribed</span>
            </h2>
            <p className="text-lg text-brand-charcoal/70 font-sans mb-8 max-w-lg mx-auto">
              We've removed you from our mailing list. You won't receive further communications from The Jenkins Group.
            </p>

            <div className="pt-8 border-t border-brand-charcoal/10">
              <p className="text-sm text-brand-charcoal/50 mb-6">
                Questions? Feel free to reach out:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a
                  href="mailto:sarah@jenkinsgroup.com"
                  className="text-brand-gold font-semibold hover:text-brand-charcoal transition-colors"
                >
                  sarah@jenkinsgroup.com
                </a>
                <span className="hidden sm:block text-brand-charcoal/20">•</span>
                <a
                  href="/"
                  className="text-brand-charcoal border-b-2 border-brand-gold hover:text-brand-gold transition-colors font-semibold"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
