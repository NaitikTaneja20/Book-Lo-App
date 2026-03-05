import PublicLayout from '@/components/public-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">About Book-Lo</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Your one-stop shop for educational resources, committed to making learning accessible and affordable for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Founded by a group of educators and parents, Book-Lo was created to solve a simple problem: the hassle of finding the right school books and supplies each year. We aim to provide a seamless and stress-free shopping experience.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
               <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Our mission is to support students on their educational journey by providing easy access to a comprehensive range of books and notebooks. We believe in the power of education to transform lives.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
               <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              We are a passionate team of book lovers, tech enthusiasts, and customer service experts dedicated to providing you with the best possible experience. We're always here to help you find what you need.
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
      }
