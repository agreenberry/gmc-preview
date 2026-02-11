import { useState } from 'react';
import { BookingRequest } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { Calendar, Clock, Users, CheckCircle, XCircle, Hourglass, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface UserBookingsPageProps {
  bookings: BookingRequest[];
  userName: string;
}

export function UserBookingsPage({ bookings, userName }: UserBookingsPageProps) {
  const upcomingBookings = bookings.filter(
    b => b.status === 'confirmed' && new Date(b.date) >= new Date()
  );
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const pastBookings = bookings.filter(
    b => b.status === 'confirmed' && new Date(b.date) < new Date()
  );

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your D&D sessions
        </p>
      </div>

      <div className="space-y-8">
        {/* Upcoming Sessions */}
        <section>
          <h2 className="text-xl mb-4">Upcoming Sessions</h2>
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No upcoming sessions. Browse DMs to book your next adventure!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </section>

        {/* Pending Requests */}
        {pendingBookings.length > 0 && (
          <section>
            <h2 className="text-xl mb-4">Pending Requests</h2>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}

        {/* Past Sessions */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="text-xl mb-4">Past Sessions</h2>
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

interface BookingCardProps {
  booking: BookingRequest;
}

function BookingCard({ booking }: BookingCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  const handleCancelBooking = () => {
    if (!cancellationReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    // In real app, would send to backend
    toast.success('Cancellation request sent to DM. You will receive a confirmation email.');
    setShowCancelDialog(false);
    setCancellationReason('');
  };

  const isPastSession = new Date(booking.date) < new Date();
  const canCancel = (booking.status === 'confirmed' || booking.status === 'pending') && !isPastSession;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Session with {booking.dmName}</CardTitle>
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
        <CardContent>
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
            <div className="bg-muted/50 p-3 rounded-md mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Your message: </span>
                {booking.message}
              </p>
            </div>
          )}

          {booking.status === 'pending' && (
            <p className="text-sm text-muted-foreground mt-4">
              Waiting for DM to confirm availability...
            </p>
          )}

          {canCancel && (
            <>
              <Separator className="my-4" />
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCancelDialog(true)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="mr-2 h-4 w-4" />
                  Request Cancellation
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Cancellation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a cancellation request to {booking.dmName}. 
              Please provide a reason for cancellation.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2 py-4">
            <Label htmlFor="cancel-reason">Reason for Cancellation</Label>
            <Textarea
              id="cancel-reason"
              placeholder="e.g., Schedule conflict, emergency, etc."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Note: Cancellation policies may vary. Check with your DM about refund policies.
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelBooking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Send Cancellation Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
