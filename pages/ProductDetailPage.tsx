
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../services/api';
import type { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import RatingStars from '../components/RatingStars';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await fetchProductBySlug(slug);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, product.variants[0].id, quantity);
      alert(`${quantity} x ${product.title} added to cart!`);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.images[0]?.url} alt={product.images[0]?.altText} className="w-full rounded-lg object-cover" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
             {product.avgRating > 0 && <RatingStars rating={product.avgRating}/>}
             <span className="text-gray-600 ml-2">({product.reviews.length} reviews)</span>
          </div>
          <p className="text-3xl font-light text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              className="w-20 p-2 border border-gray-300 rounded-md text-center"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review: Review) => (
              <div key={review.id} className="border-t pt-4">
                 <div className="flex items-center mb-1">
                    <RatingStars rating={review.rating} />
                    <p className="ml-2 font-semibold">{review.title}</p>
                 </div>
                 <p className="text-gray-600 mb-1">{review.body}</p>
                 <p className="text-sm text-gray-500">by {review.user.name} on {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
