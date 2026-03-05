import type { PlaceHolderImages } from "./placeholder-images";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: (typeof PlaceHolderImages)[number]['id'];
  stock: number;
  school?: string;
  class?: string;
  subject?: string;
  type: 'book' | 'notebook';
  isbn?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageId: (typeof PlaceHolderImages)[number]['id'];
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
};

export type SiteSettings = {
  shippingCost: number;
  gstRate: number;
  isGstEnabled: boolean;
};

export type BookRequest = {
  id: string;
  bookTitle: string;
  author: string;
  isbn?: string;
  customerName: string;
  customerContact: string;
  status: 'Pending' | 'Sourced' | 'Not Available';
  createdAt: string;
};
