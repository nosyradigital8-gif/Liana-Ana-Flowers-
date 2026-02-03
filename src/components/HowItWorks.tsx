import { motion } from 'framer-motion';
import { Search, Gift, Truck, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Browse & Select',
    description: 'Choose from our wide range of fresh flowers and gift packages tailored for every occasion.',
  },
  {
    number: 2,
    icon: Gift,
    title: 'Customize Your Gift',
    description: 'Add chocolates, teddy bears, champagne, or other special touches to make it unforgettable.',
  },
  {
    number: 3,
    icon: Truck,
    title: 'Fresh Delivery',
    description: 'We deliver your handcrafted arrangement fresh to their doorstep across Lagos.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const HowItWorks = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30 overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to get fresh flowers delivered to your loved ones
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-border">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full gradient-primary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative text-center"
              >
                {/* Number Circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative mx-auto w-24 h-24 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-soft"
                >
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className="font-serif font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="lg:hidden mt-6 text-primary"
                  >
                    ↓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            onClick={() => window.open('https://wa.me/2348027284020', '_blank')}
            className="h-14 px-8 bg-[#25D366] hover:bg-[#20BD5C] text-primary-foreground"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Your Order on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
