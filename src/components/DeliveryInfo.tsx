import { motion } from 'framer-motion';
import { MapPin, Clock, Truck, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const deliveryZones = [
  { area: 'Maitama', fee: 4500 },
  { area: 'Wuse 2', fee: 4500 },
  { area: 'Jahi', fee: 3000 },
  { area: 'Kado', fee: 3500 },
  { area: 'Utako', fee: 4000 },
  { area: 'Jabi', fee: 4500 },
  { area: 'Garki', fee: 5500 },
  { area: 'CBD', fee: 4500 },
  { area: 'Asokoro', fee: 6000 },
  { area: 'Guzape', fee: 6000 },
  { area: 'Mabushi', fee: 3500 },
  { area: 'Gwarimpa', fee: 4000 },
  { area: 'Karsana', fee: 5500 },
  { area: 'Kubwa', fee: 6000 },
  { area: 'Bwari', fee: 12000 },
  { area: 'Gwagwalada', fee: 15000 },
  { area: 'Karu', fee: 7000 },
  { area: 'Jukwoyi', fee: 9000 },
  { area: 'Lugbe', fee: 9000 },
  { area: 'Katampe', fee: 4000 },
  { area: 'Katampe Ext.', fee: 4500 },
  { area: 'Dawaki', fee: 4000 },
  { area: 'Mararaba', fee: 15000 },
];

const deliveryOptions = [
  {
    icon: Clock,
    title: 'Same-Day Delivery',
    description: 'Order before 2 PM for same-day delivery in Abuja',
    extra: 'Available',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'We deliver to all states across Nigeria',
    extra: 'Contact Us',
  },
  {
    icon: Zap,
    title: 'Express Delivery',
    description: 'Faster delivery in select Abuja areas',
    extra: 'Available',
  },
];

const faqs = [
  {
    question: 'What time slots are available for delivery?',
    answer: 'We offer three delivery slots: Morning (9 AM - 12 PM), Afternoon (12 PM - 4 PM), and Evening (4 PM - 7 PM). Select your preferred slot at checkout.',
  },
  {
    question: 'Can I schedule delivery in advance?',
    answer: 'Yes! You can pre-schedule deliveries up to 30 days in advance. Perfect for birthdays, anniversaries, and special occasions.',
  },
  {
    question: 'Do you deliver outside Abuja?',
    answer: 'Yes! We deliver nationwide across Nigeria. Contact us on WhatsApp for delivery fees and timelines to your location.',
  },
  {
    question: 'What if the recipient is not available?',
    answer: 'Our delivery team will contact the recipient before delivery. If unavailable, we can leave with security or reschedule at no extra cost.',
  },
  {
    question: 'Is there free delivery?',
    answer: 'Yes, we offer free delivery on orders above ₦50,000 within central Abuja areas.',
  },
];

const DeliveryInfo = () => {
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
            Delivery Information
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fresh flowers delivered across Abuja and nationwide with care and precision
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Delivery Zones */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif font-semibold text-xl mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Abuja Delivery Areas
            </h3>
            
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {deliveryZones.map((zone, index) => (
                  <motion.div
                    key={zone.area}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }}
                    className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg"
                  >
                    <span className="text-sm font-medium">{zone.area}</span>
                    <span className="text-sm text-primary font-semibold">
                      ₦{zone.fee.toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Free delivery on orders above ₦50,000
              </p>
            </div>

            {/* Delivery Options */}
            <div className="mt-8 space-y-4">
              {deliveryOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-card"
                >
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{option.extra}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif font-semibold text-xl mb-6">
              Frequently Asked Questions
            </h3>
            
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg shadow-card border-none px-4"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-secondary/50 rounded-xl"
            >
              <h4 className="font-serif font-semibold text-lg mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">9:30 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">1:00 PM - 5:00 PM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;