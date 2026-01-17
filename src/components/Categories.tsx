import { motion } from 'framer-motion';
import { Heart, Star, Crown, Wallet, Building2, Flower } from 'lucide-react';
import bouquet1 from '@/assets/bouquet-1.jpg';
import bouquet2 from '@/assets/bouquet-2.jpg';
import bouquet3 from '@/assets/bouquet-3.jpg';

const categories = [
  {
    id: 'roses',
    name: 'Roses',
    description: 'Classic elegance in every petal',
    icon: Heart,
    image: bouquet1,
    count: 24,
  },
  {
    id: 'luxury',
    name: 'Luxury Arrangements',
    description: 'Premium designer collections',
    icon: Crown,
    image: bouquet2,
    count: 12,
  },
  {
    id: 'budget',
    name: 'Budget Friendly',
    description: 'Beautiful blooms, great prices',
    icon: Wallet,
    image: bouquet3,
    count: 18,
  },
  {
    id: 'bestsellers',
    name: 'Bestsellers',
    description: 'Customer favorites',
    icon: Star,
    image: bouquet1,
    count: 15,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional arrangements',
    icon: Building2,
    image: bouquet2,
    count: 8,
  },
  {
    id: 'seasonal',
    name: 'Seasonal',
    description: 'Fresh seasonal selections',
    icon: Flower,
    image: bouquet3,
    count: 20,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const Categories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect arrangement for every occasion
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => (
            <motion.a
              key={category.id}
              href={`#${category.id}`}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer"
            >
              {/* Background Image */}
              <motion.img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mb-3"
                >
                  <category.icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <h3 className="font-serif font-semibold text-lg text-primary-foreground">
                  {category.name}
                </h3>
                <p className="text-xs text-primary-foreground/70 mt-1">
                  {category.count} products
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
