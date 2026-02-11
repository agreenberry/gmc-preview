import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Scroll, Users, Target, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router';

export function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Scroll className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold medieval-heading mb-4">About Game Masters Collective</h1>
          <p className="text-xl text-muted-foreground">
            Connecting adventurers with legendary Game Masters since 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Game Masters Collective was born from a simple idea: tabletop gaming should be accessible to everyone. 
                Whether you're a veteran player looking for your next epic campaign or a curious newcomer 
                eager to roll your first d20, finding the right Game Master shouldn't be a quest in itself.
              </p>
              <p className="text-muted-foreground">
                We've built a platform that makes it easy to discover skilled DMs, book sessions that fit 
                your schedule, and embark on unforgettable adventures—all with the security and convenience 
                of modern technology.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Founded by a group of longtime TTRPG enthusiasts, Game Masters Collective emerged from countless 
                conversations about the challenges of organizing games. We knew there were amazing DMs 
                out there eager to share their craft, and players hungry for great content—they just 
                needed a way to find each other.
              </p>
              <p className="text-muted-foreground">
                What started as a small community project has grown into a thriving marketplace where 
                thousands of sessions are booked every month. From one-shot adventures to year-long 
                campaigns, Game Masters Collective has become the go-to platform for tabletop gaming connections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Community First</h3>
                  <p className="text-sm text-muted-foreground">
                    We prioritize the health and happiness of our community above all else. Every decision 
                    we make is guided by what's best for players and DMs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quality Gaming</h3>
                  <p className="text-sm text-muted-foreground">
                    We carefully vet our DMs to ensure every session meets our high standards for 
                    storytelling, inclusivity, and player satisfaction.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Safety & Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating a safe gaming environment is paramount. We have strict policies and support 
                    systems to protect all users.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    TTRPGs should be for everyone. We work to make our platform accessible and welcoming 
                    to players of all backgrounds and experience levels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                For Game Masters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Are you an experienced DM looking to share your passion? Game Masters Collective provides the tools 
                and platform to build your reputation, manage your schedule, and earn income doing what 
                you love. We handle payments, bookings, and logistics so you can focus on creating 
                amazing experiences.
              </p>
              <Button asChild>
                <Link to="/account">
                  Apply to Become a DM
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="bg-muted/50 border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Whether you're looking to play or run games, Game Masters Collective is your gateway to incredible 
              tabletop experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/browse">
                  Browse DMs
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p>
              Have questions about Game Masters Collective?{' '}
              <Link to="/help" className="text-primary hover:underline">
                Visit our Help Center
              </Link>
              {' '}or{' '}
              <Link to="/contact" className="text-primary hover:underline">
                get in touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
