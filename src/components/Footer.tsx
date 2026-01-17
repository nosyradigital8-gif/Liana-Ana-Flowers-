import { motion } from "framer-motion";
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
import logoImage from "@/assets/logo.jpg";

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/2347031677165", "_blank");
  };

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
            <img
              src={logoImage}
              alt="Lian-Ana Flowers"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm mb-4">
              Handcrafted floral arrangements delivered fresh across Lagos. Making
              moments special since our founding.
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
              {[
                "Shop Flowers",
                "Valentine's Collection",
                "Add-ons",
                "About Us",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
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
                <span className="text-primary-foreground/70">
                  +234 703 167 7165
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-primary-foreground/70">
                  info@liananaflowers.com.ng
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-primary-foreground/70">
                  Lagos, Nigeria
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
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
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
            Lagos
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
