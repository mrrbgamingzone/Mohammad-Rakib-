
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { submitOrder } from '../services/api';

const CheckoutPage: React.FC = () => {
    const { items, subtotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    const shipping = 5.00;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            const response = await submitOrder(items);
            setOrderNumber(response.orderNumber);
            clearCart();
        } catch (error) {
            console.error("Failed to place order", error);
            alert("There was an error placing your order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderNumber) {
        return (
            <div className="text-center py-20 bg-white shadow-lg rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you for your order!</h1>
                <p className="text-gray-600">Your order number is <span className="font-semibold text-indigo-600">{orderNumber}</span>.</p>
                <p className="text-gray-600 mt-2">A confirmation email has been sent to {user?.email}.</p>
                <button onClick={() => navigate('/orders')} className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
                    View My Orders
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p className="mt-4 text-sm text-gray-500">This is a mock checkout. Shipping and payment details are not collected.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        {items.map(item => (
                            <div key={item.variantId} className="flex justify-between text-sm">
                                <span>{item.product.title} x {item.quantity}</span>
                                <span>${(item.priceSnapshot * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="space-y-2">
                        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors disabled:bg-gray-400"
                    >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
