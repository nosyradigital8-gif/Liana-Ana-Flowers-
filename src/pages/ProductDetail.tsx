import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md mx-auto">
              <div className="text-6xl mb-6">🌸</div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Product Not Found</h1>
              <p className="text-gray-600 mb-8">
                The product you're looking for doesn't exist.
              </p>
              <Button
                onClick={() => navigate("/shop")}
                className="bg-rose-600 hover:bg-rose-700"
              >
                Back to Shop
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return `₦${parseInt(price).toLocaleString()}`;
  };

  const handleAddToCart = () => {
    // Add product to cart without quantity (it's added automatically by context)
    addItem({
      id: product.id,
      name: product.name,
      price: parseInt(product.price),
      category: product.category,
      image: product.image
    });
    
    // Open cart drawer
    setIsCartOpen(true);
    
    // Show success toast
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Lian-Ana Flowers`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
              Product Details
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
              {product.name}
            </h1>
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
      <div className="container mx-auto px-4 py-16">
        <Link to="/shop">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" className="mb-8 hover:bg-rose-50 hover:text-rose-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </motion.div>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
              {product.sale && (
                <Badge className="absolute top-4 right-4 bg-red-600 text-lg px-4 py-2 shadow-lg">
                  Sale!
                </Badge>
              )}
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-rose-600 text-lg px-4 py-2 shadow-lg">
                  Featured
                </Badge>
              )}
            </div>

            {/* Action buttons below image */}
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                onClick={handleAddToWishlist}
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-8">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(127 reviews)</span>
              </div>

              <h1 className="text-4xl font-serif font-bold mb-6 text-gray-900">
                {product.name}
              </h1>

              <div className="mb-8 bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
                <div className="flex items-baseline gap-3 mb-2">
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-2xl">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-rose-600 font-bold text-5xl">
                    {formatPrice(product.price)}
                  </span>
                </div>
                {product.note && (
                  <span className="text-gray-600 text-sm">
                    {product.note}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">What's Included:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-rose-600 mr-2">✓</span>
                    Premium fresh flowers
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-600 mr-2">✓</span>
                    Professional arrangement
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-600 mr-2">✓</span>
                    Complimentary greeting card
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-600 mr-2">✓</span>
                    Same-day delivery in Lagos
                  </li>
                </ul>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <p className="text-center text-gray-500 text-sm mt-4">
                🚚 Free delivery on orders above ₦50,000
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="border-t border-gray-200 pt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                  You May Also Like
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore more beautiful arrangements from our collection
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;