import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const valentinesDay = new Date('2026-02-14T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = valentinesDay.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden gradient-valentine text-primary-foreground"
      >
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ y: '100%', x: `${i * 12 + 5}%`, opacity: 0.3 }}
              animate={{
                y: '-100%',
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          ))}
        </div>

        <div className="container py-2.5 flex items-center justify-center gap-4 text-sm relative z-10">
          {/* Marquee text for mobile */}
          <div className="flex items-center gap-3 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            
            <span className="font-medium whitespace-nowrap">
              Valentine's Day Special
            </span>
            
            <span className="hidden sm:inline text-primary-foreground/90">•</span>
            
            <span className="hidden sm:inline text-primary-foreground/90">
              Up to 20% OFF selected bouquets
            </span>

            <span className="hidden md:inline text-primary-foreground/90">•</span>
            
            <span className="hidden md:flex items-center gap-2">
              <span className="font-semibold bg-primary-foreground/20 px-2 py-0.5 rounded">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </span>
              <span className="text-primary-foreground/90">until Valentine's Day</span>
            </span>
          </div>

          <motion.button
            onClick={() => setIsVisible(false)}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoBanner;
