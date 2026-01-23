import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: string) => {
    return `₦${parseInt(price).toLocaleString()}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.sale && (
            <Badge className="absolute top-2 right-2 bg-red-600">
              Sale!
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-rose-600">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-rose-600 transition">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-rose-600 font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          {product.note && (
            <span className="text-gray-500 text-sm">{product.note}</span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button className="w-full bg-rose-600 hover:bg-rose-700">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};