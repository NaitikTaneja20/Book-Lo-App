'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import PublicLayout from '@/components/public-layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { getProductById } from '@/lib/data';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const fetchedProduct = await getProductById(id as string);
          if(fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            console.error("Product not found");
          }
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-12 w-48 mt-4" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!product) {
    return (
      <PublicLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground mt-2">The product you are looking for does not exist.</p>
        </div>
      </PublicLayout>
    );
  }

  const image = PlaceHolderImages.find(p => p.id === product.imageId);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageId: product.imageId,
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <PublicLayout>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square rounded-lg overflow-hidden border">
          {image && (
            <Image
              src={image.imageUrl}
              alt={product.name}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold mt-2">₹{product.price.toFixed(2)}</p>
          </div>
          <Separator />
          <div className="space-y-4 text-muted-foreground">
            <p>{product.description || "No description available."}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {product.class && <div><span className="font-semibold text-foreground">Class:</span> {product.class}</div>}
              {product.subject && <div><span className="font-semibold text-foreground">Subject:</span> {product.subject}</div>}
              {product.school && <div><span className="font-semibold text-foreground">School:</span> {product.school}</div>}
            </div>
            {product.isbn && <div className="pt-2"><span className="font-semibold text-foreground">ISBN:</span> {product.isbn}</div>}
             <div className="pt-2"><span className="font-semibold text-foreground">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</div>
          </div>
          <Button size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
            {product.stock > 0 ? <><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</> : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
