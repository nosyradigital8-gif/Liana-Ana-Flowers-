import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Clock, Gift, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import bouquet1 from '@/assets/bouquet-1.jpg';
import bouquet2 from '@/assets/bouquet-2.jpg';

const slides = [
  {
    id: 1,
    badge: "Valentine's Collection 2026",
    badgeIcon: Heart,
    badgeColor: 'bg-red-500',
    title: 'Express Your Love with Timeless Roses',
    subtitle: "Handcrafted arrangements delivered fresh to your loved one's doorstep in Lagos",
    image: heroBg,
    primaryCta: { text: "Shop Valentine's Flowers", action: '#products' },
    secondaryCta: { text: 'View All Collections', action: '#products' },
  },
  {
    id: 2,
    badge: 'Same-Day Delivery',
    badgeIcon: Clock,
    badgeColor: 'bg-primary',
    title: 'Fresh Blooms Delivered Today',
    subtitle: 'Order before 2 PM for same-day delivery across Lagos - Lekki, Victoria Island, Ikoyi and more',
    image: bouquet1,
    primaryCta: { text: 'Order Now on WhatsApp', action: 'whatsapp', isWhatsApp: true },
    secondaryCta: { text: 'Browse Flowers', action: '#products' },
  },
  {
    id: 3,
    badge: 'Premium Packages',
    badgeIcon: Gift,
    badgeColor: 'bg-amber-500',
    title: 'Complete Gift Experiences',
    subtitle: 'Flowers plus chocolates, teddy bears, champagne and more - Perfect gifts for any occasion',
    image: bouquet2,
    primaryCta: { text: 'Explore Gift Sets', action: '#products' },
    secondaryCta: { text: 'Build Your Own', action: '#addons' },
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const handleCtaClick = (action: string, isWhatsApp?: boolean) => {
    if (isWhatsApp) {
      window.open('https://wa.me/2347031677165', '_blank');
    } else {
      window.location.href = action;
    }
  };

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[currentSlide].image}
            alt=""
            className="w-full h-full object-cover"
            animate={{ scale: 1.05 }}
            transition={{ duration: 8, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10 h-full flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary-foreground text-sm font-medium mb-6 ${slides[currentSlide].badgeColor}`}
              >
                {(() => {
                  const IconComponent = slides[currentSlide].badgeIcon;
                  return <IconComponent className="w-4 h-4" />;
                })()}
                {slides[currentSlide].badge}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-lg"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  onClick={() =>
                    handleCtaClick(
                      slides[currentSlide].primaryCta.action,
                      slides[currentSlide].primaryCta.isWhatsApp
                    )
                  }
                  className={`h-14 px-8 text-base font-semibold ${
                    slides[currentSlide].primaryCta.isWhatsApp
                      ? 'bg-[#25D366] hover:bg-[#20BD5C] text-primary-foreground'
                      : 'gradient-primary text-primary-foreground hover:opacity-90'
                  }`}
                >
                  {slides[currentSlide].primaryCta.isWhatsApp && (
                    <MessageCircle className="w-5 h-5 mr-2" />
                  )}
                  {slides[currentSlide].primaryCta.text}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleCtaClick(slides[currentSlide].secondaryCta.action)}
                  className="h-14 px-8 text-base font-semibold border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 bg-primary-foreground/5"
                >
                  {slides[currentSlide].secondaryCta.text}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>



      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-primary-foreground'
                : 'w-2 bg-primary-foreground/50'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
