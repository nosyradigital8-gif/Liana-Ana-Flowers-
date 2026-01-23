import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Gift, 
  ClipboardList, 
  CreditCard, 
  MessageCircle,
  Check,
  Copy,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const deliveryAreas = [
  { area: 'Lekki Phase 1', fee: 2000 },
  { area: 'Lekki Phase 2', fee: 2500 },
  { area: 'Victoria Island', fee: 2000 },
  { area: 'Ikoyi', fee: 2000 },
  { area: 'Ajah', fee: 3000 },
  { area: 'Ikeja', fee: 2500 },
  { area: 'Maryland', fee: 2500 },
  { area: 'Yaba', fee: 2500 },
  { area: 'Surulere', fee: 2500 },
];

const timeSlots = [
  { id: 'morning', label: 'Morning (9 AM - 12 PM)', value: '9:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)', value: '12:00 PM - 4:00 PM' },
  { id: 'evening', label: 'Evening (4 PM - 7 PM)', value: '4:00 PM - 7:00 PM' },
];

const deliverySchema = z.object({
  recipientName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  recipientPhone: z.string().regex(/^(\+234|0)[789][01]\d{8}$/, 'Enter a valid Nigerian phone number'),
  recipientEmail: z.string().email('Enter a valid email').optional().or(z.literal('')),
  deliveryAddress: z.string().trim().min(10, 'Please provide a complete address').max(300, 'Address too long'),
  deliveryArea: z.string().min(1, 'Please select a delivery area'),
  deliveryDate: z.string().min(1, 'Please select a delivery date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  isGift: z.boolean(),
  giftMessage: z.string().max(500, 'Message too long').optional(),
  senderName: z.string().max(100, 'Name too long').optional(),
  specialInstructions: z.string().max(500, 'Instructions too long').optional(),
});

type DeliveryFormData = z.infer<typeof deliverySchema>;

const steps = [
  { id: 1, title: 'Delivery Details', icon: MapPin },
  { id: 2, title: 'Review Order', icon: ClipboardList },
  { id: 3, title: 'Payment', icon: CreditCard },
  { id: 4, title: 'Confirm', icon: MessageCircle },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<DeliveryFormData>({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    deliveryAddress: '',
    deliveryArea: '',
    deliveryDate: '',
    timeSlot: '',
    isGift: true,
    giftMessage: '',
    senderName: '',
    specialInstructions: '',
  });

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const selectedAreaFee = deliveryAreas.find((a) => a.area === formData.deliveryArea)?.fee || 0;
  const subtotal = totalPrice;
  const deliveryFee = selectedAreaFee;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (field: keyof DeliveryFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      try {
        deliverySchema.parse(formData);
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              newErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(newErrors);
        }
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast({
        title: 'Please fill in all required fields',
        description: 'Check the form for errors and try again.',
        variant: 'destructive',
      });
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('1024612778');
    setAccountCopied(true);
    setTimeout(() => setAccountCopied(false), 2000);
    toast({ title: 'Account number copied!' });
  };

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LA${timestamp}${random}`;
  };

  const handleWhatsAppCheckout = () => {
    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleString('en-NG');
    
    const productsText = items
      .map((item) => `- ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = `Hi Lian-Ana Flowers! 🌹

━━━━━━━━━━━━━━━━━━━━
📦 ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━

Order ID: #${orderId}
Order Date: ${orderDate}

🌹 PRODUCTS:
${productsText}

━━━━━━━━━━━━━━━━━━━━
🚚 DELIVERY INFORMATION
━━━━━━━━━━━━━━━━━━━━

Recipient: ${formData.recipientName}
Phone: ${formData.recipientPhone}
Address: ${formData.deliveryAddress}
Area: ${formData.deliveryArea}
Delivery Date: ${formData.deliveryDate}
Time Slot: ${formData.timeSlot}
${formData.isGift ? `\n🎁 This is a GIFT\nFrom: ${formData.senderName || 'Anonymous'}\n💌 Gift Message: "${formData.giftMessage || 'No message'}"` : ''}
${formData.specialInstructions ? `\n📝 Special Instructions: ${formData.specialInstructions}` : ''}

━━━━━━━━━━━━━━━━━━━━
💳 PAYMENT SUMMARY
━━━━━━━━━━━━━━━━━━━━

Subtotal: ${formatPrice(subtotal)}
Delivery Fee (${formData.deliveryArea}): ${formatPrice(deliveryFee)}
━━━━━━━━━━━━━━━
TOTAL PAID: ${formatPrice(grandTotal)}

✅ Payment Made to:
Bank: UBA
Account Name: Floral and Creations
Account Number: 1024612778

I'll send my payment receipt now for confirmation.

Thank you! 💐`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2347031677165?text=${encodedMessage}`, '_blank');
    clearCart();
    navigate('/');
    toast({
      title: 'Order placed successfully! 🎉',
      description: 'Complete your order on WhatsApp.',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md"
        >
          <div className="text-6xl mb-6">🌸</div>
          <h1 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some beautiful flowers to get started</p>
          <Button onClick={() => navigate('/shop')} className="bg-rose-600 hover:bg-rose-700">
            Browse Flowers
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header Hero */}
      <div className="relative h-[30vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Floating flowers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              initial={{ 
                y: '100%', 
                x: `${Math.random() * 100}%`,
                opacity: 0.3,
                rotate: 0
              }}
              animate={{
                y: '-20%',
                rotate: 360,
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              🌸
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Secure Checkout
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Just a few steps away from delivering happiness
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-secondary/30 py-16">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/shop')}
              className="hover:bg-rose-50 hover:text-rose-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-x-auto"
          >
            <div className="flex items-center justify-between min-w-[400px]">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: currentStep === step.id ? 1.1 : 1,
                        backgroundColor: currentStep >= step.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        currentStep >= step.id ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Delivery Details */}
              {currentStep === 1 && (
                <div className="bg-card rounded-xl shadow-card p-6 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-serif font-semibold">Delivery Information</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName" className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Recipient Name *
                      </Label>
                      <Input
                        id="recipientName"
                        value={formData.recipientName}
                        onChange={(e) => handleInputChange('recipientName', e.target.value)}
                        placeholder="Full name of recipient"
                        className={errors.recipientName ? 'border-destructive' : ''}
                      />
                      {errors.recipientName && (
                        <p className="text-xs text-destructive">{errors.recipientName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientPhone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Recipient Phone *
                      </Label>
                      <Input
                        id="recipientPhone"
                        value={formData.recipientPhone}
                        onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                        placeholder="+234 xxx xxx xxxx"
                        className={errors.recipientPhone ? 'border-destructive' : ''}
                      />
                      {errors.recipientPhone && (
                        <p className="text-xs text-destructive">{errors.recipientPhone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email (Optional)
                    </Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      value={formData.recipientEmail}
                      onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      placeholder="email@example.com"
                      className={errors.recipientEmail ? 'border-destructive' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress" className="flex items-center gap-2">
                      <Home className="w-4 h-4" /> Delivery Address *
                    </Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      placeholder="Enter complete delivery address including landmarks"
                      className={errors.deliveryAddress ? 'border-destructive' : ''}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-xs text-destructive">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Delivery Area *
                      </Label>
                      <Select
                        value={formData.deliveryArea}
                        onValueChange={(value) => handleInputChange('deliveryArea', value)}
                      >
                        <SelectTrigger className={errors.deliveryArea ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          {deliveryAreas.map((area) => (
                            <SelectItem key={area.area} value={area.area}>
                              {area.area} ({formatPrice(area.fee)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.deliveryArea && (
                        <p className="text-xs text-destructive">{errors.deliveryArea}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Delivery Date *
                      </Label>
                      <Input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={errors.deliveryDate ? 'border-destructive' : ''}
                      />
                      {errors.deliveryDate && (
                        <p className="text-xs text-destructive">{errors.deliveryDate}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Time Slot *
                      </Label>
                      <Select
                        value={formData.timeSlot}
                        onValueChange={(value) => handleInputChange('timeSlot', value)}
                      >
                        <SelectTrigger className={errors.timeSlot ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.timeSlot && (
                        <p className="text-xs text-destructive">{errors.timeSlot}</p>
                      )}
                    </div>
                  </div>

                  {/* Gift Options */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="isGift"
                        checked={formData.isGift}
                        onCheckedChange={(checked) => handleInputChange('isGift', !!checked)}
                      />
                      <Label htmlFor="isGift" className="flex items-center gap-2 cursor-pointer">
                        <Gift className="w-4 h-4 text-primary" />
                        This is a gift (include gift message)
                      </Label>
                    </div>

                    {formData.isGift && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pl-6"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="senderName">Your Name (for gift card)</Label>
                          <Input
                            id="senderName"
                            value={formData.senderName}
                            onChange={(e) => handleInputChange('senderName', e.target.value)}
                            placeholder="From: Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="giftMessage" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Gift Message
                          </Label>
                          <Textarea
                            id="giftMessage"
                            value={formData.giftMessage}
                            onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                            placeholder="Write a heartfelt message for your loved one..."
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      placeholder="Any special delivery instructions, gate codes, landmarks, etc."
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Order Review */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-xl shadow-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ClipboardList className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-serif font-semibold">Order Summary</h2>
                    </div>

                    {/* Products */}
                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery ({formData.deliveryArea})</span>
                        <span>{formatPrice(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(grandTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Details Summary */}
                  <div className="bg-card rounded-xl shadow-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Delivery Details
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                        Edit
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Recipient</p>
                        <p className="font-medium">{formData.recipientName}</p>
                        <p>{formData.recipientPhone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Delivery Address</p>
                        <p className="font-medium">{formData.deliveryAddress}</p>
                        <p>{formData.deliveryArea}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Delivery Schedule</p>
                        <p className="font-medium">{formData.deliveryDate}</p>
                        <p>{formData.timeSlot}</p>
                      </div>
                      {formData.isGift && formData.giftMessage && (
                        <div>
                          <p className="text-muted-foreground">Gift Message</p>
                          <p className="font-medium italic">"{formData.giftMessage}"</p>
                          {formData.senderName && <p>From: {formData.senderName}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-xl shadow-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-serif font-semibold">Complete Your Payment</h2>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-secondary/50Continue9:06 AMrounded-lg p-4 mb-6">
<h3 className="font-semibold mb-3">Payment Steps:</h3>
<ol className="space-y-2 text-sm">
<li className="flex items-start gap-2">
<span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">1</span>
Transfer the total amount to the account below
</li>
<li className="flex items-start gap-2">
<span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">2</span>
Take a screenshot or save your payment receipt
</li>
<li className="flex items-start gap-2">
<span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">3</span>
Confirm payment made and click "Complete Order"
</li>
<li className="flex items-start gap-2">
<span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">4</span>
Send order details and receipt on WhatsApp
</li>
</ol>
</div>
                {/* Bank Details */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-semibold text-lg mb-4 text-center">Bank Transfer Details</h3>
                  <div className="space-y-3 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Bank Name</p>
                      <p className="font-semibold text-lg">UBA</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Name</p>
                      <p className="font-semibold text-lg">Floral and Creations</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="font-mono font-bold text-2xl text-primary">1024612778</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyAccountNumber}
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          {accountCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary/20">
                      <p className="text-sm text-muted-foreground">Amount to Pay</p>
                      <p className="font-bold text-3xl text-primary">{formatPrice(grandTotal)}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Confirmation */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="paymentConfirmed"
                      checked={paymentConfirmed}
                      onCheckedChange={(checked) => setPaymentConfirmed(!!checked)}
                    />
                    <Label htmlFor="paymentConfirmed" className="text-sm cursor-pointer leading-relaxed">
                      I confirm that I have made payment of <strong>{formatPrice(grandTotal)}</strong> to the account above.
                      I understand my order will be confirmed within 5-10 minutes during business hours.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="termsAccepted"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm cursor-pointer leading-relaxed">
                      I agree to the terms and conditions. I understand that delivery times are estimates
                      and I consent to receive order updates via WhatsApp.
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm on WhatsApp */}
          {currentStep === 4 && (
            <div className="bg-card rounded-xl shadow-card p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-serif font-bold mb-2">Almost There!</h2>
              <p className="text-muted-foreground mb-8">
                Click the button below to send your order details and payment receipt to our WhatsApp.
                Our team will confirm your order within 5-10 minutes.
              </p>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleWhatsAppCheckout}
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 bg-[#25D366] hover:bg-[#20BD5C] text-white text-lg"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Complete Order on WhatsApp
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground mt-6">
                You'll be redirected to WhatsApp with your order details pre-filled.
                Just send the message and attach your payment receipt.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between mt-8"
      >
        {currentStep > 1 && currentStep < 4 && (
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        {currentStep < 3 && (
          <Button onClick={nextStep} className="ml-auto bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white">
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {currentStep === 3 && (
          <Button
            onClick={nextStep}
            disabled={!paymentConfirmed || !termsAccepted}
            className="ml-auto bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white disabled:opacity-50"
          >
            Proceed to Confirm
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </motion.div>
    </div>
  </div>
</div>
);
};
export default Checkout;