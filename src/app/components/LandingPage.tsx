import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Search, Star, MapPin, Calendar, Shield, Users, Zap, Scroll } from 'lucide-react';
import { Link } from 'react-router';
import { DungeonMaster } from '@/types';

interface LandingPageProps {
  dms?: DungeonMaster[];
}

export function LandingPage({ dms = [] }: LandingPageProps) {
  // Show top 6 DMs for the landing page
  const featuredDMs = dms.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 via-background to-background border-b">
        <div className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-4">
              <Scroll className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">The Premier D&D Matching Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold medieval-heading leading-tight">
              Find Your Perfect
              <br />
              <span className="text-primary">Game Master</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with experienced DMs, book epic campaigns, and embark on unforgettable adventures.
              Game Masters Collective makes finding your next game as easy as rolling a natural 20.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg ">
                <Link to="/browse">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Game Masters
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg ">
                <Link to="/events">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Events
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>2,500+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>500+ Verified DMs</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>10,000+ Sessions Run</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured DMs Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold medieval-heading mb-4">Featured Game Masters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our top-rated DMs and find the perfect match for your next adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredDMs.map((dm) => (
              <Link key={dm.id} to={`/dm/${dm.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={dm.avatar} alt={dm.name} />
                        <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1 truncate">{dm.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{dm.rating}</span>
                          </div>
                          <span className="text-muted-foreground">({dm.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{dm.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {dm.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dm.gameSystems.slice(0, 2).map((system) => (
                        <Badge key={system} variant="secondary" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                      {dm.gameSystems.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{dm.gameSystems.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">From</span>
                      <span className="font-semibold">${dm.pricing.oneShot}/session</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/browse">
                View All Game Masters
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold medieval-heading mb-4">How Game Masters Collective Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with your next campaign is as easy as 1-2-3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-8 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Find Your DM</h3>
                <p className="text-muted-foreground">
                  Browse profiles, read reviews, and find a DM who matches your play style and schedule
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Book Sessions</h3>
                <p className="text-muted-foreground">
                  Choose one-shots or multi-session campaigns. Check availability and secure your spot
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Play & Enjoy</h3>
                <p className="text-muted-foreground">
                  Show up, roll dice, and embark on epic adventures with your party
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold medieval-heading mb-4">Safe & Secure</h2>
              <p className="text-lg text-muted-foreground">
                Your safety and satisfaction are our top priorities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Verified DMs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All DMs are vetted and verified. We check backgrounds and reviews to ensure quality experiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Secure Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Payments are held in escrow and only released after successful session completion.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Review System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real reviews from real players help you make informed decisions about your next game.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    24/7 Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our support team is always available to help resolve any issues or answer questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-primary/20 via-background to-background border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold medieval-heading">
              Ready to Roll Initiative?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of players and DMs creating unforgettable adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg ">
                <Link to="/browse">
                  Start Your Quest
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg ">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}