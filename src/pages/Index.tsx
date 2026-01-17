import PromoBanner from '@/components/PromoBanner';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import HowItWorks from '@/components/HowItWorks';
import DeliveryInfo from '@/components/DeliveryInfo';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <HowItWorks />
        <DeliveryInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
