
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import RatingStars from './RatingStars';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link to={`/products/${product.slug}`}>
        <div className="overflow-hidden">
            <img 
                src={product.images[0]?.url} 
                alt={product.images[0]?.altText} 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.category.name}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              {product.avgRating > 0 && <RatingStars rating={product.avgRating} />}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
