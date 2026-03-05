import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold">Book-Lo</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for books and notebooks.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="/requests" className="text-muted-foreground hover:text-foreground">Book Requests</Link></li>
              <li><Link href="/#categories" className="text-muted-foreground hover:text-foreground">By School</Link></li>
              <li><Link href="/#categories" className="text-muted-foreground hover:text-foreground">By Class</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/tracking" className="text-muted-foreground hover:text-foreground">Order Tracking</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-foreground">Return Policy</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Book-Lo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
                                                                                                                     }
