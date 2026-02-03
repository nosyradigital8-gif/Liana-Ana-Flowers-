import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-light.png";

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/2348027284020", "_blank");
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Shop Flowers", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <img
                src={logoImage}
                alt="Lian-Ana Flowers"
                className="h-32 w-auto mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Handcrafted floral arrangements delivered fresh across Nigeria from Abuja. Making moments special with every bloom.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20BD5C] text-primary-foreground"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Us
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-serif font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-serif font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <a 
                  href="tel:+2347031677165"
                  className="text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  +2348027284020
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <a 
                  href="mailto:info@liananaflowers.com.ng"
                  className="text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  info@liananaflowers.com.ng
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-primary-foreground/70">
                  Abuja, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-primary-foreground/70">
                  Mon–Sat: 9AM – 7PM
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-serif font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-primary-foreground/50">
            © 2026 Lian-Ana Flowers. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in
            Abuja
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
