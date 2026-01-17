import { motion } from 'framer-motion';
import { Star, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import bouquet1 from '@/assets/bouquet-1.jpg';
import bouquet2 from '@/assets/bouquet-2.jpg';
import bouquet3 from '@/assets/bouquet-3.jpg';

const featuredProducts = [
  {
    id: 'ultimate-romance',
    name: 'Ultimate Romance Package',
    description: '100 premium red roses plus Moet champagne, Ferrero Rocher chocolates and 2ft teddy bear',
    price: 45000,
    originalPrice: 55000,
    badge: 'Best Value',
    badgeVariant: 'default' as const,
    rating: 5,
    reviews: 48,
    stock: 5,
    image: bouquet3,
    deliveryDate: 'Feb 13',
  },
  {
    id: 'classic-love',
    name: 'Classic Love Package',
    description: '50 long-stem red roses with premium birthday card and chocolate box',
    price: 25000,
    originalPrice: 30000,
    badge: 'Most Popular',
    badgeVariant: 'secondary' as const,
    rating: 4.5,
    reviews: 127,
    stock: 8,
    image: bouquet1,
    deliveryDate: 'Feb 13',
  },
  {
    id: 'sweet-surprise',
    name: 'Sweet Surprise Package',
    description: '24 mixed color roses with cute teddy bear and plain greeting card',
    price: 18000,
    originalPrice: 22000,
    badge: 'Budget Pick',
    badgeVariant: 'outline' as const,
    rating: 4.8,
    reviews: 89,
    stock: 12,
    image: bouquet2,
    deliveryDate: 'Feb 13',
  },
  {
    id: 'elegant-expression',
    name: 'Elegant Expression Package',
    description: 'Designer arrangement with premium red wine and luxury greeting card',
    price: 35000,
    originalPrice: 42000,
    badge: 'Premium',
    badgeVariant: 'default' as const,
    rating: 5,
    reviews: 36,
    stock: 3,
    image: bouquet1,
    deliveryDate: 'Feb 13',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const FeaturedProducts = () => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-amber-400 text-amber-400'
            : i < rating
            ? 'fill-amber-400/50 text-amber-400'
            : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  return (
    <section id="products" className="py-20 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Valentine's Day 2026 - Love is in Bloom ❤️
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Featured Valentine's Specials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Limited time offers - Order now for guaranteed February 14th delivery
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-card rounded-xl overflow-hidden shadow-card group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={product.badgeVariant}
                    className={
                      product.badgeVariant === 'default'
                        ? 'gradient-primary text-primary-foreground border-0'
                        : ''
                    }
                  >
                    {product.badge}
                  </Badge>
                </div>
                {product.stock <= 5 && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <motion.div
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-foreground/80 text-primary-foreground text-xs px-3 py-1.5 rounded-full text-center font-medium"
                    >
                      Only {product.stock} left in stock
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  Delivers by {product.deliveryDate}
                </div>

                {/* Add to Cart */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image,
                      })
                    }
                    className="w-full gradient-primary text-primary-foreground hover:opacity-90"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
