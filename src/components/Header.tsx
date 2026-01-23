import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

// 🔁 Auto logo versions
import logoLight from '@/assets/logo-light.png'; // white logo
import logoDark from '@/assets/logo-dark.png';   // pink logo

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop Flowers', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

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

  // Check if current route is active
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
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
            <motion.div whileHover={{ scale: 1.04 }} className="flex items-center">
              <Link to="/">
                <motion.img
                  key={isScrolled ? 'logo-dark' : 'logo-light'}
                  src={isScrolled ? logoDark : logoLight}
                  alt="Lian-Ana Flowers"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`h-28 md:h-20 w-auto object-contain transition-all ${
                    !isScrolled
                      ? 'drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)]'
                      : ''
                  }`}
                />
              </Link>
            </motion.div>

            {/* ===== DESKTOP NAV ===== */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.div key={item.label} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={item.href}
                    className={`relative font-medium transition-colors ${
                      isActive(item.href)
                        ? isScrolled
                          ? 'text-primary'
                          : 'text-white font-semibold'
                        : isScrolled
                        ? 'text-foreground/80 hover:text-primary'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="activeLink"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          isScrolled ? 'bg-primary' : 'bg-white'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
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
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2 bg-transparent border-none outline-none
                           hover:bg-transparent focus:bg-transparent active:bg-transparent"
              >
                <ShoppingBag
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                />

                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground
                                 text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src={logoDark}
                  alt="Logo"
                  className="h-14 w-auto object-contain"
                />
              </Link>
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
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-4 text-lg font-semibold border-b border-border transition-colors ${
                      isActive(item.href)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
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