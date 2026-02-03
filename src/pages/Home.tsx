import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import AddonsSection from "@/components/AddonsSection";
import HowItWorks from "@/components/HowItWorks";
import DeliveryInfo from "@/components/DeliveryInfo";

const WHATSAPP_NUMBER = "2348027284020";

const Home = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Lian-Ana Flowers, I'd like to chat!");
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`,
      "_blank"
    );
  };

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <AddonsSection />
      <DeliveryInfo />

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        aria-label="Chat us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl rounded-full px-4 py-3 transition-all duration-300 group"
      >
        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M20.447 4.938C18.274 2.751 15.373 1.5 12.266 1.5c-6.425 0-11.653 5.228-11.653 11.654 0 2.054.536 4.058 1.554 5.822L.5 22.5l5.528-1.448c1.702.927 3.626 1.416 5.572 1.416h.007c6.424 0 11.652-5.228 11.652-11.654 0-3.106-1.247-6.007-3.41-8.176zM12.27 19.652c-1.737 0-3.44-.467-4.933-1.351l-.354-.21-3.779.991.99-3.727-.229-.371C3.04 13.805 2.534 12.12 2.534 10.384c0-5.046 4.104-9.15 9.15-9.15 2.443 0 4.742.949 6.454 2.672 1.712 1.724 2.654 4.011 2.654 6.445 0 5.05-4.107 9.151-9.152 9.151h-.01zM16.9 13.68c-.261-.133-1.548-.762-1.789-.85-.24-.087-.413-.133-.587.133-.174.266-.674.85-.826 1.022-.152.174-.306.195-.568.066-1.609-.715-2.667-1.785-3.049-3.171-.237-.798.178-1.233.488-1.571.265-.28.59-.722.59-1.007 0-.414-.15-.826-.37-1.027-.22-.2-.575-.516-.877-.516-.303 0-.59.304-.818.48-1.034.8-1.707 2.094-1.46 3.72.138.943.626 2.023 1.395 2.799.769.776 2.038 1.396 3.213 1.744.596.175 1.13.226 1.601.158.578-.088 1.131-.404 1.33-.79.199-.385.199-.709.14-.776z" />
        </svg>

        {/* Label — visible on hover (desktop) */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs text-sm font-medium">
          Chat Us
        </span>
      </button>
    </>
  );
};

export default Home;
