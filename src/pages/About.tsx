import { motion } from 'framer-motion';
import { Heart, Award, Truck, Star, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Page Header Hero */}
      <div className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Floating flowers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                y: '100%', 
                x: `${Math.random() * 100}%`,
                opacity: 0.3,
                rotate: 0
              }}
              animate={{
                y: '-20%',
                rotate: 360,
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              🌸
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              About Lian-Ana Flowers
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Lagos's premier destination for exquisite floral arrangements and heartfelt gifting
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 md:p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-900">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                Welcome to Lian-Ana Flowers, where passion meets petals. Founded with a love for 
                bringing joy through beautiful blooms, we have become Lagos's trusted choice for 
                premium flower arrangements and thoughtful gifts.
              </p>
              <p>
                With years of experience in the floral industry, we pride ourselves on sourcing 
                only the freshest flowers and creating stunning arrangements that speak from the 
                heart. Whether you're celebrating a birthday, anniversary, wedding, or simply 
                want to brighten someone's day, we have the perfect arrangement for you.
              </p>
              <p>
                Our team of skilled florists brings creativity and care to every bouquet, ensuring 
                that each arrangement is a masterpiece. We believe that flowers are more than just 
                decorations – they're a language of love, appreciation, and celebration.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering excellence in every bouquet
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Fresh Flowers',
                description: 'Only the freshest, highest-quality blooms sourced daily from trusted suppliers',
                color: 'rose'
              },
              {
                icon: Truck,
                title: 'Same Day Delivery',
                description: 'Fast and reliable delivery throughout Lagos with care and precision',
                color: 'pink'
              },
              {
                icon: Award,
                title: 'Expert Florists',
                description: 'Professional florists with years of experience in creating stunning arrangements',
                color: 'rose'
              },
              {
                icon: Star,
                title: '100% Satisfaction',
                description: 'Customer satisfaction guaranteed with every order we deliver',
                color: 'pink'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-10 h-10 text-${item.color}-600`} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Promise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Our Promise to You</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-4">
                  {[
                    'Fresh, premium-quality flowers',
                    'Same-day delivery in Lagos',
                    'Professional florist arrangements'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start text-base md:text-lg"
                    >
                      <span className="mr-3 text-2xl flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {[
                    'Competitive, transparent pricing',
                    'Exceptional customer service',
                    'Satisfaction guaranteed'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index + 3) * 0.1 }}
                      className="flex items-start text-base md:text-lg"
                    >
                      <span className="mr-3 text-2xl flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;