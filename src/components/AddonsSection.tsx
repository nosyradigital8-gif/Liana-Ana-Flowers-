import { motion } from 'framer-motion';
import { Plus, Check, Gift, Wine, Coffee, Cake, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const addons = [
  {
    id: 'plain-card',
    name: 'Plain Card',
    description: 'Simple elegant greeting card with envelope',
    price: 1000,
    icon: '💌',
    category: 'cards',
  },
  {
    id: 'birthday-card',
    name: 'Birthday Card',
    description: 'Colorful birthday card with custom message',
    price: 1500,
    icon: '🎂',
    category: 'cards',
  },
  {
    id: 'teddy-small',
    name: 'Teddy Bear (1ft)',
    description: 'Cute small teddy bear',
    price: 5000,
    icon: '🧸',
    category: 'gifts',
  },
  {
    id: 'teddy-large',
    name: 'Teddy Bear (2ft)',
    description: 'Large cuddly teddy bear',
    price: 8000,
    icon: '🧸',
    category: 'gifts',
  },
  {
    id: 'ferrero-rocher',
    name: 'Ferrero Rocher',
    description: 'Classic chocolate box',
    price: 3500,
    icon: '🍫',
    category: 'chocolates',
  },
  {
    id: 'luxury-chocolates',
    name: 'Luxury Chocolate Box',
    description: 'Premium chocolate assortment',
    price: 6000,
    icon: '🍫',
    category: 'chocolates',
  },
  {
    id: 'red-wine',
    name: 'Red Wine',
    description: 'Premium red wine bottle',
    price: 8000,
    icon: '🍷',
    category: 'drinks',
  },
  {
    id: 'champagne-moet',
    name: 'Champagne (Moët)',
    description: 'Moët & Chandon champagne',
    price: 15000,
    icon: '🍾',
    category: 'drinks',
  },
  {
    id: 'balloons',
    name: 'Balloon Bouquet',
    description: 'Colorful balloon arrangement',
    price: 3000,
    icon: '🎈',
    category: 'gifts',
  },
  {
    id: 'cake-small',
    name: 'Celebration Cake',
    description: 'Delicious small cake',
    price: 7000,
    icon: '🎂',
    category: 'food',
  },
  {
    id: 'scented-candles',
    name: 'Scented Candles',
    description: 'Aromatic candle set',
    price: 3500,
    icon: '🕯️',
    category: 'gifts',
  },
  {
    id: 'premium-tea',
    name: 'Premium Tea Set',
    description: 'Luxury tea collection',
    price: 4000,
    icon: '🍵',
    category: 'drinks',
  },
];

const combos = [
  {
    id: 'romantic-combo',
    name: 'Romantic Combo',
    items: ['ferrero-rocher', 'red-wine', 'scented-candles'],
    originalPrice: 15000,
    price: 13000,
    savings: 2000,
  },
  {
    id: 'birthday-bash',
    name: 'Birthday Bash',
    items: ['birthday-card', 'balloons', 'cake-small'],
    originalPrice: 11500,
    price: 10000,
    savings: 1500,
  },
  {
    id: 'ultimate-gift',
    name: 'Ultimate Gift',
    items: ['champagne-moet', 'luxury-chocolates', 'teddy-large'],
    originalPrice: 29000,
    price: 24000,
    savings: 5000,
  },
];

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
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const AddonsSection = () => {
  const { addItem, items } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const handleAddAddon = (addon: typeof addons[0]) => {
    addItem({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      image: '/placeholder.svg',
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

  const handleAddCombo = (combo: typeof combos[0]) => {
    combo.items.forEach((itemId) => {
      const addon = addons.find((a) => a.id === itemId);
      if (addon) {
        addItem({
          id: `${combo.id}-${addon.id}`,
          name: `${addon.name} (${combo.name})`,
          price: Math.round(addon.price * (combo.price / combo.originalPrice)),
          image: '/placeholder.svg',
          category: 'addon',
        });
      }
    });
  };

  const isInCart = (id: string) => items.some((item) => item.id === id);

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
            Make your gift unforgettable with chocolates, teddy bears, champagne, and more
          </p>
        </motion.div>

        {/* Popular Combos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="font-serif font-semibold text-xl mb-6 text-center">
            Popular Combos - Save More!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {combos.map((combo) => (
              <motion.div
                key={combo.id}
                whileHover={{ y: -4 }}
                className="relative p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20"
              >
                <Badge className="absolute -top-2 right-4 gradient-primary text-primary-foreground border-0">
                  Save {formatPrice(combo.savings)}
                </Badge>
                <h4 className="font-semibold text-lg mb-2">{combo.name}</h4>
                <div className="flex flex-wrap gap-1 mb-3">
                  {combo.items.map((itemId) => {
                    const addon = addons.find((a) => a.id === itemId);
                    return addon ? (
                      <span key={itemId} className="text-xl" title={addon.name}>
                        {addon.icon}
                      </span>
                    ) : null;
                  })}
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(combo.price)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(combo.originalPrice)}
                  </span>
                </div>
                <Button
                  onClick={() => handleAddCombo(combo)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Combo
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Individual Add-ons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {addons.map((addon) => (
            <motion.div
              key={addon.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative p-4 bg-card rounded-xl shadow-card text-center transition-all ${
                isInCart(addon.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="text-4xl mb-3">{addon.icon}</div>
              <h4 className="font-medium text-sm mb-1 line-clamp-1">{addon.name}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2 h-8">
                {addon.description}
              </p>
              <p className="text-primary font-bold mb-3">{formatPrice(addon.price)}</p>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AddonsSection;
