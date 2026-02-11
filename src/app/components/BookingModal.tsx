import { useState } from 'react';
import { DungeonMaster } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Calendar } from '@/app/components/ui/calendar';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { MapPin, Lock, Minus, Plus } from 'lucide-react';

interface BookingModalProps {
  dm: DungeonMaster;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ dm, isOpen, onClose }: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sessionType, setSessionType] = useState<'one-shot' | 'campaign'>('campaign');
  const [playerCount, setPlayerCount] = useState('4');
  const [message, setMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfSessions, setNumberOfSessions] = useState(1);
  const [meetingAddress, setMeetingAddress] = useState('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  // Calculate discount if DM offers bulk session discounts
  const calculatePrice = () => {
    const basePrice = sessionType === 'one-shot' ? dm.pricing.oneShot : dm.pricing.campaign;
    let totalPrice = basePrice * numberOfSessions;
    let discount = 0;
    
    // Mock discount logic - in production, this would come from DM settings
    if (numberOfSessions >= 10) {
      discount = 20; // 20% off
    } else if (numberOfSessions >= 5) {
      discount = 10; // 10% off
    }
    
    if (discount > 0) {
      totalPrice = totalPrice * (1 - discount / 100);
    }
    
    return { totalPrice, discount, basePrice };
  };

  const { totalPrice, discount, basePrice } = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    if (!meetingAddress.trim()) {
      toast.error('Please provide a meeting address or location');
      return;
    }

    // In a real app, this would send the booking request to the backend
    toast.success('Booking request sent! The DM will review and respond within 24 hours.');
    onClose();
    
    // Reset form
    setDate(undefined);
    setSessionType('campaign');
    setPlayerCount('4');
    setMessage('');
    setSelectedTime('');
    setNumberOfSessions(1);
    setMeetingAddress('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Session with {dm.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a session. The DM will review your request and confirm availability.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Type */}
          <div className="space-y-3">
            <Label>Session Type</Label>
            <RadioGroup value={sessionType} onValueChange={(value: any) => setSessionType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-shot" id="one-shot" />
                <Label htmlFor="one-shot" className="font-normal cursor-pointer">
                  One-Shot (${dm.pricing.oneShot}/session)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="campaign" id="campaign" />
                <Label htmlFor="campaign" className="font-normal cursor-pointer">
                  Campaign (${dm.pricing.campaign}/session)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Number of Sessions */}
          {sessionType === 'campaign' && (
            <div className="space-y-3">
              <Label htmlFor="numberOfSessions">Number of Sessions</Label>
              <p className="text-sm text-muted-foreground">
                Book multiple sessions at once to secure your spot in an ongoing campaign
              </p>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setNumberOfSessions(Math.max(1, numberOfSessions - 1))}
                  disabled={numberOfSessions <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="numberOfSessions"
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfSessions}
                  onChange={(e) => setNumberOfSessions(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setNumberOfSessions(Math.min(20, numberOfSessions + 1))}
                  disabled={numberOfSessions >= 20}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">sessions</span>
              </div>
              
              {/* Price Display with Discount */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base price per session:</span>
                  <span>${basePrice}</span>
                </div>
                {discount > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({numberOfSessions} sessions):</span>
                      <span className="line-through">${basePrice * numberOfSessions}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span className="font-medium">Bulk discount ({discount}% off):</span>
                      <span>-${(basePrice * numberOfSessions * discount / 100).toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-lg">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Date Selection */}
          <div className="space-y-3">
            <Label>Select First Session Date</Label>
            <div className="border rounded-md p-3 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md"
              />
            </div>
            {date && (
              <p className="text-sm text-muted-foreground">
                Selected: {format(date, 'MMMM d, yyyy')}
                {sessionType === 'campaign' && numberOfSessions > 1 && (
                  <span className="block mt-1">
                    Additional sessions will be scheduled with the DM after confirmation
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <Label>Select Time</Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(time)}
                  className="w-full"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Meeting Address */}
          <div className="space-y-3">
            <Label htmlFor="meetingAddress">
              <MapPin className="inline h-4 w-4 mr-1" />
              Meeting Location *
            </Label>
            <Input
              id="meetingAddress"
              placeholder="e.g., 123 Main St, Apt 4B, San Francisco, CA or Discord Server Link"
              value={meetingAddress}
              onChange={(e) => setMeetingAddress(e.target.value)}
              required
            />
            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
              <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-900 dark:text-blue-100">
                <strong>Privacy Notice:</strong> Your meeting location will only be shared with {dm.name} after they accept your session request. It will not be visible to other users.
              </p>
            </div>
          </div>

          {/* Player Count */}
          <div className="space-y-3">
            <Label htmlFor="playerCount">Number of Players</Label>
            <Input
              id="playerCount"
              type="number"
              min="1"
              max="8"
              value={playerCount}
              onChange={(e) => setPlayerCount(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="space-y-3">
            <Label htmlFor="message">Message to DM (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Tell the DM about your group, experience level, or any special requests..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Send Booking Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}