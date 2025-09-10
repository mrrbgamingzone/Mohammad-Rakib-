
import type { Product, Order, OrderStatus, Category } from '../types';

const mockCategories: Category[] = [
    { id: '1', name: 'Electronics', slug: 'electronics' },
    { id: '2', name: 'Books', slug: 'books' },
    { id: '3', name: 'Clothing', slug: 'clothing' },
    { id: '4', name: 'Home Goods', slug: 'home-goods' },
];

const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'GL-GHD-01',
    title: 'High-Performance Wireless Mouse',
    slug: 'high-performance-wireless-mouse',
    description: 'Experience precision and comfort with our ergonomic wireless mouse. Features a long-lasting battery, customizable buttons, and seamless connectivity for gaming and professional use.',
    price: 59.99,
    status: 'published',
    images: [{ id: 'img1', url: 'https://picsum.photos/seed/mouse/600/600', altText: 'Wireless Mouse' }],
    variants: [{ id: 'v1', sku: 'GL-GHD-01-BLK', price: 59.99, stock: 150 }],
    reviews: [
      { id: 'r1', userId: 'u1', rating: 5, title: 'Excellent!', body: 'Best mouse I have ever used.', createdAt: '2023-10-26T10:00:00Z', user: { name: 'Alice' } },
      { id: 'r2', userId: 'u2', rating: 4, title: 'Very good', body: 'Smooth and responsive.', createdAt: '2023-10-25T14:30:00Z', user: { name: 'Bob' } },
    ],
    category: mockCategories[0],
    avgRating: 4.5,
  },
  {
    id: '2',
    sku: 'BK-THG-42',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    slug: 'the-hitchhikers-guide-to-the-galaxy',
    description: 'A classic science fiction comedy series by Douglas Adams. Follow the misadventures of the last surviving human Arthur Dent.',
    price: 12.50,
    status: 'published',
    images: [{ id: 'img2', url: 'https://picsum.photos/seed/book/600/600', altText: 'Book Cover' }],
    variants: [{ id: 'v2', sku: 'BK-THG-42-PB', price: 12.50, stock: 300 }],
    reviews: [
        { id: 'r3', userId: 'u3', rating: 5, title: 'Hilarious and brilliant', body: 'A must-read for any sci-fi fan.', createdAt: '2023-10-20T11:00:00Z', user: { name: 'Charlie' } },
    ],
    category: mockCategories[1],
    avgRating: 5,
  },
  {
    id: '3',
    sku: 'CL-TSH-03',
    title: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    description: 'Soft, breathable, and eco-friendly. This t-shirt is made from 100% organic cotton and is perfect for everyday wear.',
    price: 25.00,
    status: 'published',
    images: [{ id: 'img3', url: 'https://picsum.photos/seed/shirt/600/600', altText: 'Cotton T-Shirt' }],
    variants: [{ id: 'v3', sku: 'CL-TSH-03-M', price: 25.00, stock: 200 }],
    reviews: [],
    category: mockCategories[2],
    avgRating: 0,
  },
  {
    id: '4',
    sku: 'HG-CM-01',
    title: 'Artisan Ceramic Mug',
    slug: 'artisan-ceramic-mug',
    description: 'Handcrafted ceramic mug with a unique glaze. Perfect for your morning coffee or tea. Holds 12oz.',
    price: 18.00,
    status: 'published',
    images: [{ id: 'img4', url: 'https://picsum.photos/seed/mug/600/600', altText: 'Ceramic Mug' }],
    variants: [{ id: 'v4', sku: 'HG-CM-01-BLU', price: 18.00, stock: 80 }],
    reviews: [
       { id: 'r4', userId: 'u1', rating: 5, title: 'Beautiful and sturdy', body: 'My new favorite mug!', createdAt: '2023-11-01T09:00:00Z', user: { name: 'Alice' } },
    ],
    category: mockCategories[3],
    avgRating: 5,
  }
];

const mockOrders: Order[] = [
    {
        id: 'ord1',
        orderNumber: 'GO-1001',
        status: 'DELIVERED' as OrderStatus.DELIVERED,
        subtotal: 59.99,
        shipping: 5.00,
        tax: 3.00,
        total: 67.99,
        placedAt: '2023-10-15T10:00:00Z',
        items: [
            { id: 'oi1', variantId: 'v1', quantity: 1, price: 59.99, productTitle: 'High-Performance Wireless Mouse', productImage: 'https://picsum.photos/seed/mouse/100/100' },
        ],
    },
    {
        id: 'ord2',
        orderNumber: 'GO-1002',
        status: 'SHIPPED' as OrderStatus.SHIPPED,
        subtotal: 43.00,
        shipping: 5.00,
        tax: 2.15,
        total: 50.15,
        placedAt: '2023-11-05T14:30:00Z',
        items: [
            { id: 'oi2', variantId: 'v2', quantity: 1, price: 12.50, productTitle: 'The Hitchhiker\'s Guide to the Galaxy', productImage: 'https://picsum.photos/seed/book/100/100' },
            { id: 'oi3', variantId: 'v3', quantity: 1, price: 25.00, productTitle: 'Organic Cotton T-Shirt', productImage: 'https://picsum.photos/seed/shirt/100/100' },
        ],
    },
];


const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

export const fetchProducts = async (): Promise<Product[]> => {
    return simulateDelay(mockProducts);
}

export const fetchProductBySlug = async (slug: string): Promise<Product | undefined> => {
    const product = mockProducts.find(p => p.slug === slug);
    return simulateDelay(product);
}

export const fetchCategories = async (): Promise<Category[]> => {
    return simulateDelay(mockCategories);
}

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
    console.log(`Fetching orders for user ${userId}...`); // In a real app, you'd use the userId
    return simulateDelay(mockOrders);
}

export const submitOrder = async (cartItems: any[]): Promise<{orderNumber: string}> => {
    console.log("Submitting order with items:", cartItems);
    const orderNumber = `GO-${Math.floor(1000 + Math.random() * 9000)}`;
    return simulateDelay({ orderNumber });
}
