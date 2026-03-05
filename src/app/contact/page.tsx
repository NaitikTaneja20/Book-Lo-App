import Image from 'next/image';
import PublicLayout from '@/components/public-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We'd love to hear from you! Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold">Our Address</h3>
                                <p className="text-muted-foreground">
                                    123 Book-Lo Lane, Knowledge City, Mumbai, Maharashtra 400001, India
                                </p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold">Email Us</h3>
                                <p className="text-muted-foreground">
                                    support@book-lo.example.com
                                </p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold">Call Us</h3>
                                <p className="text-muted-foreground">
                                    +91 98765 43210
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="relative h-96 w-full rounded-lg bg-muted overflow-hidden">
                {/* In a real app, this would be an interactive map component */}
                <Image
                    src="https://picsum.photos/seed/map/1200/800" 
                    alt="Map showing office location" 
                    fill
                    className="object-cover"
                    data-ai-hint="map office"
                />
            </div>
        </div>
      </div>
    </PublicLayout>
  );
              }
