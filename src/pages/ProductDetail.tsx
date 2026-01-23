import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/shop')} className="bg-rose-600 hover:bg-rose-700">
          Back to Shop
        </Button>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return `₦${parseInt(price).toLocaleString()}`;
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/shop">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>
      </Link>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          {product.sale && (
            <Badge className="absolute top-4 right-4 bg-red-600 text-lg px-4 py-2">
              Sale!
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-4 left-4 bg-rose-600 text-lg px-4 py-2">
              Featured
            </Badge>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="mb-6">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-2xl mr-3">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-rose-600 font-bold text-4xl">
              {formatPrice(product.price)}
            </span>
            {product.note && (
              <span className="text-gray-500 ml-2 text-lg">{product.note}</span>
            )}
          </div>

          <div className="mb-6">
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-lg py-6">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Delivery Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Same-day delivery in Lagos</li>
                <li>✓ Fresh flowers guaranteed</li>
                <li>✓ Free delivery on orders above ₦200,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};