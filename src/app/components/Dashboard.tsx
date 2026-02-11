import { User, BookingRequest } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Calendar, Clock, Users, Sword, TrendingUp, MapPin, Globe, DollarSign, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Link } from 'react-router';

interface DashboardProps {
  user: User;
  onNavigate: (view: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const isDM = user.type === 'dm';
  
  // Calculate stats
  const upcomingBookings = user.bookings.filter(b => new Date(b.date) >= new Date());
  const pendingBookings = user.bookings.filter(b => b.status === 'pending');
  const confirmedBookings = user.bookings.filter(b => b.status === 'confirmed');

  return (
    <div className="container py-8">
      {/* Welcome Header */}
      <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-primary/5 via-accent/5 to-transparent border relative overflow-hidden">
        <div className="absolute inset-0 dice-pattern opacity-20" />
        <div className="relative z-10">
          <h1 className="text-3xl mb-2 medieval-heading">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {isDM 
              ? "Manage your sessions, availability, and player bookings" 
              : "Find amazing Game Masters and book your next adventure"
            }
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isDM ? 'Total Requests' : 'Total Bookings'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingBookings.length} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting {isDM ? 'your response' : 'confirmation'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to play
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              asChild
            >
              <Link to="/browse">
                <Sword className="mr-2 h-4 w-4" />
                Find Game Masters
              </Link>
            </Button>
            
            <Button 
              className="w-full justify-start" 
              variant="outline"
              asChild
            >
              <Link to="/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                View All Bookings
              </Link>
            </Button>

            <Button 
              className="w-full justify-start" 
              variant="outline"
              asChild
            >
              <Link to="/sessions/completed">
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed Sessions
              </Link>
            </Button>

            <Button 
              className="w-full justify-start" 
              variant="outline"
              asChild
            >
              <Link to="/payments">
                <DollarSign className="mr-2 h-4 w-4" />
                Payment History
              </Link>
            </Button>

            {isDM && (
              <>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  asChild
                >
                  <Link to="/availability">
                    <Clock className="mr-2 h-4 w-4" />
                    Manage Availability
                  </Link>
                </Button>
                
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  asChild
                >
                  <Link to="/dm-dashboard">
                    <Users className="mr-2 h-4 w-4" />
                    DM Dashboard
                  </Link>
                </Button>
              </>
            )}

            <Button 
              className="w-full justify-start" 
              variant="outline"
              asChild
            >
              <Link to="/account">
                <TrendingUp className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              {isDM ? 'Latest booking requests' : 'Your recent bookings'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-4">No bookings yet</p>
                <Button asChild>
                  <Link to="/browse">Find a Game Master</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {user.bookings.slice(0, 3).map((booking) => (
                  <BookingActivityItem 
                    key={booking.id} 
                    booking={booking} 
                    isDM={isDM}
                  />
                ))}
                {user.bookings.length > 3 && (
                  <Button 
                    variant="link" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/bookings">View all bookings</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      {upcomingBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>
              Your next scheduled adventures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((booking) => (
                  <UpcomingSessionItem 
                    key={booking.id} 
                    booking={booking} 
                    isDM={isDM}
                  />
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started Guide for new users */}
      {user.bookings.length === 0 && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              {isDM 
                ? "Welcome to Game Masters Collective! Here's how to get started as a Game Master" 
                : "Welcome to Game Masters Collective! Here's how to find your perfect DM"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isDM ? (
                <>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Set up your locations</h4>
                      <p className="text-sm text-muted-foreground">
                        Add the venues or online platforms where you run sessions
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Configure your availability</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up your recurring weekly schedule for each location
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Complete your profile</h4>
                      <p className="text-sm text-muted-foreground">
                        Add your experience, game systems, and campaign style preferences
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button asChild>
                      <Link to="/availability">Set Up Availability</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Browse Game Masters</h4>
                      <p className="text-sm text-muted-foreground">
                        Search by location, game system, or campaign style
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Check availability</h4>
                      <p className="text-sm text-muted-foreground">
                        View DM profiles and their available time slots
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Book a session</h4>
                      <p className="text-sm text-muted-foreground">
                        Request a time slot and wait for confirmation
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button asChild>
                      <Link to="/browse">Find Game Masters</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Booking Activity Item Component
function BookingActivityItem({ booking, isDM }: { booking: BookingRequest; isDM: boolean }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b last:border-0">
      <Avatar className="h-10 w-10">
        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isDM ? booking.userName : booking.dmName}`} />
        <AvatarFallback>{isDM ? booking.userName.charAt(0) : booking.dmName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            {isDM ? booking.userName : booking.dmName}
          </p>
          <Badge 
            variant={
              booking.status === 'confirmed' ? 'default' : 
              booking.status === 'pending' ? 'secondary' : 
              'destructive'
            }
          >
            {booking.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {booking.sessionType === 'campaign' ? 'Campaign' : 'One-Shot'} · {booking.date} at {booking.time}
        </p>
      </div>
    </div>
  );
}

// Upcoming Session Item Component
function UpcomingSessionItem({ booking, isDM }: { booking: BookingRequest; isDM: boolean }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-3 min-w-[60px]">
        <div className="text-2xl font-bold">
          {new Date(booking.date).getDate()}
        </div>
        <div className="text-xs text-muted-foreground uppercase">
          {new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium">
            {isDM ? `Session with ${booking.userName}` : `Session with ${booking.dmName}`}
          </h4>
          <Badge variant={booking.sessionType === 'campaign' ? 'default' : 'secondary'}>
            {booking.sessionType === 'campaign' ? 'Campaign' : 'One-Shot'}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {booking.time}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {booking.playerCount} players
          </span>
        </div>
        {booking.message && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {booking.message}
          </p>
        )}
      </div>

      {booking.status === 'confirmed' && (
        <Badge className="bg-green-500">Confirmed</Badge>
      )}
    </div>
  );
}