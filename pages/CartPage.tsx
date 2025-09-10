
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

const CartPage: React.FC = () => {
  const { items, subtotal, itemCount, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const shipping = 5.00;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
      navigate('/checkout');
  }

  if (itemCount === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div key={item.variantId} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <Link to={`/products/${item.product.slug}`} className="font-semibold hover:text-indigo-600">{item.product.title}</Link>
                    <p className="text-sm text-gray-500">${item.priceSnapshot.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.variantId, parseInt(e.target.value, 10))}
                    className="w-16 p-1 border rounded-md text-center"
                  />
                  <p className="font-semibold w-20 text-right">${(item.priceSnapshot * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.variantId)} className="text-gray-500 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <button onClick={handleCheckout} className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
