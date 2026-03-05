'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold">Book-Lo</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
               <Button variant="ghost" asChild>
                <Link href="/products">All Products</Link>
              </Button>
               <Button variant="ghost" asChild>
                <Link href="/requests">Book Requests</Link>
              </Button>
               <Button variant="ghost" asChild>
                <Link href="/about">About Us</Link>
              </Button>
               <Button variant="ghost" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/admin">Admin Panel</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
