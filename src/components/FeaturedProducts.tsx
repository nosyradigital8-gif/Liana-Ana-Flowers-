import { motion } from 'framer-motion';
import { Star, ShoppingBag, Clock, Sparkles, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

// Import actual product data
import { products } from '@/data/products';

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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const FeaturedProducts = () => {
  const { addItem } = useCart();

  // Get featured products from data
  const featuredProducts = products.filter(p => p.featured);

  const formatPrice = (price: string) => `₦${parseInt(price).toLocaleString()}`;

  const renderStars = (rating: number = 5) => {
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
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.featured && (
                    <Badge className="gradient-primary text-primary-foreground border-0">
                      Featured
                    </Badge>
                  )}
                  {product.sale && (
                    <Badge variant="destructive">
                      <Tag className="w-3 h-3 mr-1" />
                      Sale
                    </Badge>
                  )}
                </div>
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
                  <div className="flex">{renderStars(5)}</div>
                  <span className="text-xs text-muted-foreground">
                    (4.9)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        Save {formatPrice((parseInt(product.originalPrice) - parseInt(product.price)).toString())}
                      </span>
                    </>
                  )}
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  Same-day delivery available
                </div>

                {/* Add to Cart */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: parseInt(product.price),
                        originalPrice: product.originalPrice ? parseInt(product.originalPrice) : undefined,
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