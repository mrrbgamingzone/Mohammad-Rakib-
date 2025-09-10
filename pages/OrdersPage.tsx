
import React, { useState, useEffect } from 'react';
import { fetchUserOrders } from '../services/api';
import type { Order, OrderStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const getStatusClass = (status: OrderStatus) => {
    switch(status) {
        case 'DELIVERED': return 'bg-green-100 text-green-800';
        case 'SHIPPED': return 'bg-blue-100 text-blue-800';
        case 'PAID': return 'bg-yellow-100 text-yellow-800';
        case 'PENDING': return 'bg-gray-100 text-gray-800';
        case 'CANCELLED': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const getOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const data = await fetchUserOrders(user.id);
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.orderNumber}</h2>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.placedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusClass(order.status)}`}>{order.status}</p>
                    <p className="text-lg font-bold mt-1">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div>
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 py-2 border-t">
                    <img src={item.productImage} alt={item.productTitle} className="w-16 h-16 object-cover rounded"/>
                    <div>
                        <p className="font-semibold">{item.productTitle}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity} - ${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
