import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Skull, Home, Search, Scroll } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-destructive/50">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Skull className="h-24 w-24 text-destructive animate-pulse" />
                <Scroll className="h-12 w-12 text-muted-foreground absolute -bottom-2 -right-2 rotate-12" />
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-4 medieval-heading text-destructive">404</h1>
            <h2 className="text-3xl font-bold mb-4 medieval-heading">Quest Not Found</h2>
            
            <div className="space-y-4 mb-8 text-muted-foreground">
              <p className="text-lg">
                Alas, brave adventurer! The path you seek has been consumed by the void.
              </p>
              <p>
                This page has been claimed by a wandering Mimic, or perhaps it never existed at all...
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Scroll className="h-4 w-4" />
                Possible Reasons for This Encounter:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• The page URL was typed incorrectly</li>
                <li>• The page has been moved or deleted</li>
                <li>• You don't have permission to access this area</li>
                <li>• A wild Beholder ate the content</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Town Square
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/browse">
                  <Search className="mr-2 h-4 w-4" />
                  Browse DMs
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Need assistance? Contact our guild masters at{' '}
                <Link to="/contact" className="text-primary hover:underline">
                  the Help Desk
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
