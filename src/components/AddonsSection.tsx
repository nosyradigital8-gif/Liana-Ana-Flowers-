import { motion } from 'framer-motion';
import { Plus, Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { products } from '@/data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const AddonsSection = () => {
  const { addItem, items } = useCart();
  const [addedItems, setAddedItems] = useState(new Set());

  // Get extras from product data
  const extras = products.filter(p => p.category === 'extras');

  const formatPrice = (price) => `₦${parseInt(price).toLocaleString()}`;

  const handleAddAddon = (addon) => {
    addItem({
      id: addon.id,
      name: addon.name,
      price: parseInt(addon.price),
      image: addon.image,
      category: 'addon',
    });
    setAddedItems((prev) => new Set(prev).add(addon.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(addon.id);
        return newSet;
      });
    }, 2000);
  };

  const isInCart = (id) => items.some((item) => item.id === id);

  return (
    <section id="addons" className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Complete Your Gift
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Add Special Touches
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Make your gift unforgettable with chocolates, wine, champagne, and delicious treats
          </p>
        </motion.div>

        {/* Add-ons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {extras.map((addon) => (
            <motion.div
              key={addon.id}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative bg-card rounded-xl shadow-card overflow-hidden transition-all ${
                isInCart(addon.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={addon.image}
                  alt={addon.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-medium text-sm mb-1 line-clamp-2 h-10">{addon.name}</h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2 h-8">
                  {addon.description}
                </p>
                
                {/* Price with note if available */}
                <div className="mb-3">
                  <p className="text-primary font-bold">
                    {formatPrice(addon.price)}
                    {addon.note && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        {addon.note}
                      </span>
                    )}
                  </p>
                </div>

                {/* Add Button */}
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleAddAddon(addon)}
                    size="sm"
                    variant={addedItems.has(addon.id) ? 'default' : 'outline'}
                    className={`w-full ${
                      addedItems.has(addon.id)
                        ? 'gradient-primary text-primary-foreground'
                        : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {addedItems.has(addon.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </>
                    )}
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

export default AddonsSection;