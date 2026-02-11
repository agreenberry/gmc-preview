import { useState } from 'react';
import { User, BookingRequest } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Calendar, Star, MessageSquare, Flag, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface CompletedSessionsPageProps {
  user: User;
  bookings: BookingRequest[];
}

interface CompletedSession extends BookingRequest {
  completedDate: string;
  hasReview: boolean;
  hasReport: boolean;
}

// Mock completed sessions
const mockCompletedSessions: CompletedSession[] = [
  {
    id: '1',
    dmId: 'dm1',
    dmName: 'Sarah the Storyteller',
    userId: 'user1',
    userName: 'John Player',
    date: '2026-01-15',
    time: '7:00 PM',
    sessionType: 'campaign',
    playerCount: 4,
    message: 'Great session!',
    status: 'confirmed',
    completedDate: '2026-01-15',
    hasReview: false,
    hasReport: false,
  },
  {
    id: '2',
    dmId: 'dm2',
    dmName: 'Marcus the Mighty',
    userId: 'user1',
    userName: 'John Player',
    date: '2026-01-28',
    time: '6:00 PM',
    sessionType: 'one-shot',
    playerCount: 5,
    message: '',
    status: 'confirmed',
    completedDate: '2026-01-28',
    hasReview: true,
    hasReport: false,
  },
];

export function CompletedSessionsPage({ user }: CompletedSessionsPageProps) {
  const [sessions] = useState<CompletedSession[]>(mockCompletedSessions);
  const [selectedSession, setSelectedSession] = useState<CompletedSession | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const handleLeaveReview = (session: CompletedSession) => {
    setSelectedSession(session);
    setShowReviewDialog(true);
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    toast.success('Review submitted successfully!');
    setShowReviewDialog(false);
    setReviewText('');
    setRating(5);
  };

  const handleReportSession = (session: CompletedSession) => {
    setSelectedSession(session);
    setShowReportDialog(true);
  };

  const handleSubmitReport = () => {
    if (!reportReason || !reportDetails.trim()) {
      toast.error('Please select a reason and provide details');
      return;
    }

    toast.success('Report submitted. Our team will review it within 24 hours.');
    setShowReportDialog(false);
    setReportReason('');
    setReportDetails('');
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 medieval-heading">Completed Sessions</h1>
        <p className="text-muted-foreground">
          Review your past sessions and leave feedback
        </p>
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No completed sessions yet</p>
            <p className="text-sm mt-1">
              Sessions will appear here after they're finished
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>
                      Session with {user.type === 'dm' ? session.userName : session.dmName}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {session.sessionType === 'one-shot' ? 'One-Shot' : 'Campaign'} Session
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                    <CheckCircle2 className="mr-1 h-3 w-3 text-green-600 dark:text-green-400" />
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed on {format(new Date(session.completedDate), 'MMMM d, yyyy')}</span>
                  <span>at {session.time}</span>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-3">
                  {!session.hasReview && user.type === 'player' && (
                    <Button
                      onClick={() => handleLeaveReview(session)}
                      variant="default"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Leave Review
                    </Button>
                  )}

                  {session.hasReview && user.type === 'player' && (
                    <Button variant="outline" disabled>
                      <Star className="mr-2 h-4 w-4 fill-current text-yellow-500" />
                      Review Submitted
                    </Button>
                  )}

                  {user.type === 'dm' && (
                    <Button
                      onClick={() => handleLeaveReview(session)}
                      variant={session.hasReview ? 'outline' : 'default'}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {session.hasReview ? 'Feedback Submitted' : 'Leave Feedback'}
                    </Button>
                  )}

                  {!session.hasReport && (
                    <Button
                      onClick={() => handleReportSession(session)}
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Report Issue
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {user.type === 'player' ? 'Leave a Review' : 'Leave Feedback'}
            </DialogTitle>
            <DialogDescription>
              {user.type === 'player' 
                ? `Share your experience with ${selectedSession?.dmName}`
                : `Share your feedback about the session with ${selectedSession?.userName}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {user.type === 'player' && (
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="review-text">
                {user.type === 'player' ? 'Your Review' : 'Your Feedback'}
              </Label>
              <Textarea
                id="review-text"
                placeholder={
                  user.type === 'player'
                    ? 'What did you think of the session? How was the DM?'
                    : 'How was the session? Any notes about the player?'
                }
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowReviewDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitReview}>
              Submit {user.type === 'player' ? 'Review' : 'Feedback'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              Help us maintain a safe and positive community
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-reason">Reason</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger id="report-reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-show">No-show / Cancellation without notice</SelectItem>
                  <SelectItem value="inappropriate">Inappropriate behavior</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="safety">Safety concern</SelectItem>
                  <SelectItem value="payment">Payment issue</SelectItem>
                  <SelectItem value="quality">Quality concern</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-details">Details</Label>
              <Textarea
                id="report-details"
                placeholder="Please provide details about the issue..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={6}
              />
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                All reports are reviewed by our team. False or malicious reports may result in account suspension.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowReportDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitReport} variant="destructive">
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
