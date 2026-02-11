import { useState } from 'react';
import { DungeonMaster, Event } from '@/types';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Separator } from '@/app/components/ui/separator';
import { ArrowLeft, MapPin, Star, DollarSign, Calendar, Clock, Globe, Home, Sparkles, Users, CalendarCheck } from 'lucide-react';
import { BookingModal } from './BookingModal';

interface DMProfilePageProps {
  dm: DungeonMaster;
  onBack: () => void;
  isPreview?: boolean;
}

// Helper function to check if DM has upcoming events
const hasUpcomingEvents = (dm: DungeonMaster): boolean => {
  if (!dm.events || dm.events.length === 0) return false;
  
  const now = new Date();
  return dm.events.some(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && event.status === 'open';
  });
};

export function DMProfilePage({ dm, onBack, isPreview = false }: DMProfilePageProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock events for this DM - in real app would come from dm.events
  const dmEvents: Event[] = dm.events || [
    {
      id: '1',
      dmId: dm.id,
      dmName: dm.name,
      dmAvatar: dm.avatar,
      title: 'The Lost Temple of Azura',
      description: 'Join us for an exciting one-shot adventure! Your party has discovered an ancient map leading to the Lost Temple of Azura.',
      system: 'D&D 5e',
      date: '2026-02-15',
      time: '7:00 PM - 11:00 PM',
      duration: '4 hours',
      location: 'Online (Foundry VTT)',
      locationType: 'online',
      maxPlayers: 5,
      currentPlayers: 3,
      price: 15,
      difficulty: 'All Levels',
      tags: ['One-Shot', 'Dungeon Crawl', 'Combat'],
      signedUpPlayers: [],
      status: 'open',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={dm.avatar} alt={dm.name} />
              <AvatarFallback className="text-4xl">{dm.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  {hasUpcomingEvents(dm) && (
                    <Badge variant="default" className="flex items-center gap-1.5 w-fit mb-3">
                      <CalendarCheck className="h-3.5 w-3.5" />
                      <span className="text-sm">Hosting Event</span>
                    </Badge>
                  )}
                  <h1 className="text-3xl mb-2">{dm.name}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl">{dm.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({dm.reviewCount} reviews)
                    </span>
                  </div>
                  {dm.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{dm.location}</span>
                    </div>
                  )}
                </div>

                {!isPreview && (
                  <Button size="lg" onClick={() => setIsBookingModalOpen(true)}>
                    Book a Session
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{dm.bio}</p>
              </CardContent>
            </Card>

            {/* Experience & Style */}
            <Card>
              <CardHeader>
                <CardTitle>Experience & Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{dm.experience}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Game Systems</h3>
                  <div className="flex flex-wrap gap-2">
                    {dm.gameSystems.map((system) => (
                      <Badge key={system} variant="secondary">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Campaign Style</h3>
                  <div className="flex flex-wrap gap-2">
                    {dm.campaignStyle.map((style) => (
                      <Badge key={style} variant="outline">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Session Types</h3>
                  <div className="flex gap-4">
                    {dm.sessionTypes.map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        {type === 'online' ? (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Home className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="capitalize">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            {hasUpcomingEvents(dm) && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Upcoming Events
                      </CardTitle>
                      <CardDescription>
                        Join {dm.name} for these special sessions
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dmEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{event.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${event.price}</div>
                          <div className="text-xs text-muted-foreground">per player</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{event.time.split(' - ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {event.currentPlayers}/{event.maxPlayers} players
                          </span>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {event.system}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {event.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        size="sm"
                        disabled={event.status === 'full'}
                      >
                        {event.status === 'full' ? 'Event Full' : 'Sign Up for Event'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  What players are saying about {dm.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {dm.reviews.map((review, index) => (
                  <div key={review.id}>
                    {index > 0 && <Separator className="mb-6" />}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{review.userName}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {review.sessionType}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                {dm.locations && dm.locations.length > 0 && (
                  <CardDescription>Varies by location</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {dm.locations && dm.locations.length > 0 ? (
                  // Show location-based pricing
                  dm.locations
                    .filter((loc) => loc.isActive && loc.pricing)
                    .map((location, index) => (
                      <div key={location.id}>
                        {index > 0 && <Separator className="my-4" />}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            {location.type === 'online' ? (
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Home className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h4 className="font-medium text-sm">{location.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{location.details}</p>
                          
                          {location.pricing && (
                            <div className="space-y-2 pl-6">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">One-Shot</span>
                                <span className="font-semibold">${location.pricing.oneShot}/session</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Campaign</span>
                                <span className="font-semibold">${location.pricing.campaign}/session</span>
                              </div>
                              
                              {location.pricing.bulkDiscounts?.enabled && (
                                <div className="mt-2 pt-2 border-t space-y-1">
                                  <p className="text-xs text-muted-foreground mb-1">Bulk Discounts:</p>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">5-9 sessions</span>
                                    <span className="text-green-600 font-medium">
                                      {location.pricing.bulkDiscounts.fiveToNine}% off
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">10+ sessions</span>
                                    <span className="text-green-600 font-medium">
                                      {location.pricing.bulkDiscounts.tenPlus}% off
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  // Fallback to basic pricing if no locations
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">One-Shot</span>
                      </div>
                      <span className="font-semibold">${dm.pricing.oneShot}/session</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Campaign</span>
                      </div>
                      <span className="font-semibold">${dm.pricing.campaign}/session</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Typical Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dm.availability.map((slot) => (
                    <div key={slot} className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{slot}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Check calendar for specific dates and times
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response time</span>
                  <span>Within 2 hours</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sessions run</span>
                  <span>500+</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active campaigns</span>
                  <span>3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal
        dm={dm}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}