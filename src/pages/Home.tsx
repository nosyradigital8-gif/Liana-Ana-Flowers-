import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import AddonsSection from "@/components/AddonsSection";
import HowItWorks from "@/components/HowItWorks";
import DeliveryInfo from "@/components/DeliveryInfo";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <AddonsSection />
      <DeliveryInfo />
    </>
  );
};

export default Home;