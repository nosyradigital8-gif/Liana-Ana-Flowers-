import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

// 🔁 Auto logo versions
import logoLight from '@/assets/logo-light.png'; // white logo
import logoDark from '@/assets/logo-dark.png';   // pink logo

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Shop Flowers', href: '#products' },
  { label: 'Add-ons', href: '#addons' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2347031677165', '_blank');
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container py-4">
          <nav className="flex items-center justify-between">

            {/* ===== LOGO (AUTO LIGHT / DARK + BIGGER) ===== */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="flex items-center"
            >
              <motion.img
                key={isScrolled ? 'logo-dark' : 'logo-light'}
                src={isScrolled ? logoDark : logoLight}
                alt="Lian-Ana Flowers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`h-16 md:h-20 w-auto object-contain transition-all ${
                  !isScrolled
                    ? 'drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)]'
                    : ''
                }`}
              />
            </motion.a>

            {/* ===== DESKTOP NAV ===== */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  className={`relative font-medium transition-colors ${
                    isScrolled
                      ? 'text-foreground/80 hover:text-primary'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex items-center gap-3">

              {/* WhatsApp */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleWhatsAppClick}
                className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white hidden sm:flex"
              >
                <MessageCircle className="w-5 h-5" />
              </Button>

              {/* ===== CART (AUTO COLOR) ===== */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className={`relative transition-colors ${
                  isScrolled
                    ? 'border-primary text-primary '
                    : 'border-white text-white '
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* ===== HAMBURGER ===== */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                <Menu className="w-7 h-7" />
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU (SOLID) ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <img
                src={logoDark}
                alt="Logo"
                className="h-14 w-auto object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col p-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-lg font-semibold border-b border-border text-foreground hover:text-primary"
                >
                  {item.label}
                </motion.a>
              ))}

              <Button
                onClick={handleWhatsAppClick}
                className="mt-8 bg-[#25D366] hover:bg-[#20BD5C] text-white"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
};

export default Header;
