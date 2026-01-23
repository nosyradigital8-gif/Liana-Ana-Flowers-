import { Heart, Award, Truck, Star } from 'lucide-react';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">About Liana Ana Flowers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Lagos's premier destination for exquisite floral arrangements and heartfelt gifting
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Welcome to Liana Ana Flowers, where passion meets petals. Founded with a love for 
              bringing joy through beautiful blooms, we have become Lagos's trusted choice for 
              premium flower arrangements and thoughtful gifts.
            </p>
            <p>
              With years of experience in the floral industry, we pride ourselves on sourcing 
              only the freshest flowers and creating stunning arrangements that speak from the 
              heart. Whether you're celebrating a birthday, anniversary, wedding, or simply 
              want to brighten someone's day, we have the perfect arrangement for you.
            </p>
            <p>
              Our team of skilled florists brings creativity and care to every bouquet, ensuring 
              that each arrangement is a masterpiece. We believe that flowers are more than just 
              decorations – they're a language of love, appreciation, and celebration.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-rose-600" />
            </div>
            <h3 className="font-bold text-xl mb-2">Fresh Flowers</h3>
            <p className="text-gray-600">
              Only the freshest, highest-quality blooms sourced daily from trusted suppliers
            </p>
          </div>

          <div className="text-center">
            <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-rose-600" />
            </div>
            <h3 className="font-bold text-xl mb-2">Same Day Delivery</h3>
            <p className="text-gray-600">
              Fast and reliable delivery throughout Lagos with care and precision
            </p>
          </div>

          <div className="text-center">
            <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-rose-600" />
            </div>
            <h3 className="font-bold text-xl mb-2">Expert Florists</h3>
            <p className="text-gray-600">
              Professional florists with years of experience in creating stunning arrangements
            </p>
          </div>

          <div className="text-center">
            <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-rose-600" />
            </div>
            <h3 className="font-bold text-xl mb-2">100% Satisfaction</h3>
            <p className="text-gray-600">
              Customer satisfaction guaranteed with every order we deliver
            </p>
          </div>
        </div>
      </div>

      {/* Promise Section */}
      <div className="max-w-4xl mx-auto bg-rose-600 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Our Promise to You</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Fresh, premium-quality flowers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Same-day delivery in Lagos</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Professional florist arrangements</span>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Competitive, transparent pricing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Exceptional customer service</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Satisfaction guaranteed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};