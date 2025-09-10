
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'seller' | 'admin';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  user: { name: string };
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  status: 'published' | 'draft' | 'archived';
  images: ProductImage[];
  variants: ProductVariant[];
  reviews: Review[];
  category: Category;
  avgRating: number;
}

export interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
  priceSnapshot: number;
  product: Pick<Product, 'id' | 'title' | 'slug' | 'price'> & { image: string };
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface OrderItem {
  id: string;
  variantId: string;
  quantity: number;
  price: number;
  productTitle: string;
  productImage: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  placedAt: string;
  items: OrderItem[];
}
