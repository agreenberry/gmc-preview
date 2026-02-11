import { useState } from 'react';
import { BookingRequest, Event } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Calendar, Clock, Users, CheckCircle, XCircle, Hourglass, Plus, Sparkles, MapPin, DollarSign, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CreateEventDialog } from './CreateEventDialog';

interface DMDashboardProps {
  bookings: BookingRequest[];
}

export function DMDashboard({ bookings }: DMDashboardProps) {
  const [localBookings, setLocalBookings] = useState(bookings);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Calculate earnings summary
  const completedBookings = localBookings.filter(b => b.status === 'completed');
  const upcomingBookings = localBookings.filter(b => b.status === 'confirmed');
  
  const totalEarnings = completedBookings.reduce((sum, booking) => {
    const price = booking.type === 'one-shot' 
      ? 50 // Default one-shot price 
      : booking.sessionCount && booking.sessionCount > 0 
        ? 40 * booking.sessionCount // Default campaign price * sessions
        : 40;
    return sum + price;
  }, 0);

  const pendingEarnings = upcomingBookings.reduce((sum, booking) => {
    const price = booking.type === 'one-shot' 
      ? 50 
      : booking.sessionCount && booking.sessionCount > 0 
        ? 40 * booking.sessionCount
        : 40;
    return sum + price;
  }, 0);

  const monthlyEarnings = completedBookings
    .filter(b => {
      const bookingDate = new Date(b.date);
      const now = new Date();
      return bookingDate.getMonth() === now.getMonth() && 
             bookingDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, booking) => {
      const price = booking.type === 'one-shot' ? 50 : 40;
      return sum + price;
    }, 0);

  // Mock events data - in real app would come from props/API
  const mockEvents: Event[] = [
    {
      id: '1',
      dmId: '1',
      dmName: 'Sarah Chen',
      dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      title: 'The Lost Temple of Azura',
      description: 'Join us for an exciting one-shot adventure! Your party has discovered an ancient map...',
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
      tags: ['One-Shot', 'Dungeon Crawl', 'Combat', 'Puzzles'],
      signedUpPlayers: [
        { id: '1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: '2', name: 'Maria Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
        { id: '3', name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
      ],
      status: 'open',
    },
    {
      id: '4',
      dmId: '1',
      dmName: 'Sarah Chen',
      dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      title: 'Horror One-Shot: The Haunting of Hillcrest',
      description: 'A spine-chilling horror adventure set in a cursed mansion...',
      system: 'Call of Cthulhu',
      date: '2026-02-22',
      time: '8:00 PM - 12:00 AM',
      duration: '4 hours',
      location: 'Online (Discord + Roll20)',
      locationType: 'online',
      maxPlayers: 4,
      currentPlayers: 1,
      price: 18,
      difficulty: 'Intermediate',
      tags: ['One-Shot', 'Horror', 'Roleplay-Heavy', 'Investigation'],
      signedUpPlayers: [
        { id: '10', name: 'Kevin Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin' },
      ],
      status: 'open',
    },
  ];

  const handleConfirm = (bookingId: string) => {
    setLocalBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'confirmed' as const }
          : booking
      )
    );
    toast.success('Booking confirmed! The player has been notified.');
  };

  const handleDecline = (bookingId: string) => {
    setLocalBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'declined' as const }
          : booking
      )
    );
    toast.success('Booking declined.');
  };

  const handleCancelEvent = (eventId: string) => {
    toast.success('Event cancelled. Signed up players have been notified.');
  };

  const pendingBookings = localBookings.filter(b => b.status === 'pending');
  const confirmedBookings = localBookings.filter(b => b.status === 'confirmed');
  const declinedBookings = localBookings.filter(b => b.status === 'declined');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 medieval-heading">DM Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your bookings, events, and availability
        </p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {completedBookings.length} completed session{completedBookings.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              February 2026 earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Payouts</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From {upcomingBookings.length} confirmed session{upcomingBookings.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Requests</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{pendingBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting your response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Confirmed Sessions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{confirmedBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Upcoming sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Events</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockEvents.filter(e => e.status === 'open').length}</div>
            <p className="text-xs text-muted-foreground">
              Accepting sign-ups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{confirmedBookings.length + mockEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              Total sessions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">
            Booking Requests
          </TabsTrigger>
          <TabsTrigger value="events">
            My Events ({mockEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({pendingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confirmed ({confirmedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="declined">
                Declined ({declinedBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No pending booking requests
                  </CardContent>
                </Card>
              ) : (
                pendingBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onConfirm={() => handleConfirm(booking.id)}
                    onDecline={() => handleDecline(booking.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="confirmed" className="space-y-4">
              {confirmedBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No confirmed sessions yet
                  </CardContent>
                </Card>
              ) : (
                confirmedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="declined" className="space-y-4">
              {declinedBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No declined bookings
                  </CardContent>
                </Card>
              ) : (
                declinedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Your Hosted Events</h3>
              <p className="text-sm text-muted-foreground">
                Manage your one-shots and special sessions
              </p>
            </div>
            <Button onClick={() => setIsCreateEventOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          {mockEvents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first event to start attracting players
                </p>
                <Button onClick={() => setIsCreateEventOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <EventManagementCard
                  key={event.id}
                  event={event}
                  onCancel={() => handleCancelEvent(event.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateEventDialog
        open={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
      />
    </div>
  );
}

interface BookingCardProps {
  booking: BookingRequest;
  onConfirm?: () => void;
  onDecline?: () => void;
}

function BookingCard({ booking, onConfirm, onDecline }: BookingCardProps) {
  const isPending = booking.status === 'pending';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{booking.userName}</CardTitle>
            <CardDescription className="mt-1">
              {booking.sessionType === 'one-shot' ? 'One-Shot' : 'Campaign'} Session
            </CardDescription>
          </div>
          <Badge
            variant={
              booking.status === 'confirmed'
                ? 'default'
                : booking.status === 'pending'
                ? 'secondary'
                : 'outline'
            }
          >
            {booking.status === 'confirmed' && <CheckCircle className="mr-1 h-3 w-3" />}
            {booking.status === 'pending' && <Hourglass className="mr-1 h-3 w-3" />}
            {booking.status === 'declined' && <XCircle className="mr-1 h-3 w-3" />}
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(booking.date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{booking.playerCount} players</span>
          </div>
        </div>

        {booking.message && (
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm text-muted-foreground italic">
              "{booking.message}"
            </p>
          </div>
        )}

        {isPending && (
          <div className="flex gap-2 pt-2">
            <Button onClick={onConfirm} className="flex-1">
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>
            <Button onClick={onDecline} variant="outline" className="flex-1">
              <XCircle className="mr-2 h-4 w-4" />
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EventManagementCardProps {
  event: Event;
  onCancel: () => void;
}

function EventManagementCard({ event, onCancel }: EventManagementCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription className="mt-1">
              {event.system} - {event.duration}
            </CardDescription>
          </div>
          <Badge
            variant={
              event.status === 'open'
                ? 'default'
                : 'outline'
            }
          >
            {event.status === 'open' && <Sparkles className="mr-1 h-3 w-3" />}
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.currentPlayers}/{event.maxPlayers} players</span>
          </div>
        </div>

        {event.description && (
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm text-muted-foreground italic">
              "{event.description}"
            </p>
          </div>
        )}

        {event.status === 'open' && (
          <div className="flex gap-2 pt-2">
            <Button onClick={onCancel} variant="outline" className="flex-1">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Event
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}