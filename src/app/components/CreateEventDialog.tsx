import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';
import { toast } from 'sonner';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

interface CreateEventDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateEventDialog({ open, onClose }: CreateEventDialogProps) {
  const [locationType, setLocationType] = useState<'online' | 'in-person'>('online');
  const [selectedTags, setSelectedTags] = useState<string[]>(['One-Shot']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Event created successfully!');
    onClose();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const availableTags = [
    'One-Shot',
    'Roleplay-Heavy',
    'Combat-Focused',
    'Dungeon Crawl',
    'Mystery',
    'Horror',
    'Investigation',
    'Puzzles',
    'Exploration',
    'Tactical',
    'Beginner Friendly',
    'Tutorial',
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl medieval-heading">Create New Event</DialogTitle>
          <DialogDescription>
            Host a one-shot or special session and let players sign up
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., The Lost Temple of Azura"
              required
            />
            <p className="text-xs text-muted-foreground">
              Make it exciting and descriptive!
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your adventure, what players can expect, and what makes it special..."
              className="min-h-[120px]"
              required
            />
            <p className="text-xs text-muted-foreground">
              Help players understand what kind of adventure they're signing up for
            </p>
          </div>

          {/* Game System */}
          <div className="space-y-2">
            <Label htmlFor="system">Game System *</Label>
            <Select defaultValue="D&D 5e" required>
              <SelectTrigger id="system">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="D&D 5e">D&D 5e</SelectItem>
                <SelectItem value="Pathfinder 2e">Pathfinder 2e</SelectItem>
                <SelectItem value="Call of Cthulhu">Call of Cthulhu</SelectItem>
                <SelectItem value="Vampire: The Masquerade">Vampire: The Masquerade</SelectItem>
                <SelectItem value="Starfinder">Starfinder</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">
                <Calendar className="inline h-3 w-3 mr-1" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Select defaultValue="4">
              <SelectTrigger id="duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="5">5 hours</SelectItem>
                <SelectItem value="6">6 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Type */}
          <div className="space-y-3">
            <Label>
              <MapPin className="inline h-3 w-3 mr-1" />
              Location Type *
            </Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="online"
                  checked={locationType === 'online'}
                  onCheckedChange={() => setLocationType('online')}
                />
                <Label htmlFor="online" className="font-normal cursor-pointer">
                  Online
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-person"
                  checked={locationType === 'in-person'}
                  onCheckedChange={() => setLocationType('in-person')}
                />
                <Label htmlFor="in-person" className="font-normal cursor-pointer">
                  In-Person
                </Label>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-2">
            <Label htmlFor="location">
              {locationType === 'online' ? 'Platform / Link' : 'Venue Address'} *
            </Label>
            <Input
              id="location"
              placeholder={
                locationType === 'online'
                  ? 'e.g., Online (Foundry VTT)'
                  : 'e.g., The Dragon\'s Lair Game Shop, 123 Main St'
              }
              required
            />
            {locationType === 'online' && (
              <p className="text-xs text-muted-foreground">
                Specify the platform (Roll20, Foundry, Discord, etc.)
              </p>
            )}
          </div>

          {/* Max Players */}
          <div className="space-y-2">
            <Label htmlFor="maxPlayers">
              <Users className="inline h-3 w-3 mr-1" />
              Maximum Players *
            </Label>
            <Select defaultValue="4">
              <SelectTrigger id="maxPlayers">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 players</SelectItem>
                <SelectItem value="3">3 players</SelectItem>
                <SelectItem value="4">4 players</SelectItem>
                <SelectItem value="5">5 players</SelectItem>
                <SelectItem value="6">6 players</SelectItem>
                <SelectItem value="7">7 players</SelectItem>
                <SelectItem value="8">8 players</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              <DollarSign className="inline h-3 w-3 mr-1" />
              Price per Player *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="price"
                type="number"
                className="pl-7"
                defaultValue="15"
                min="0"
                step="5"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Typical one-shot pricing ranges from $10-$25 per player
            </p>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level *</Label>
            <Select defaultValue="All Levels">
              <SelectTrigger id="difficulty">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner Friendly">Beginner Friendly</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="All Levels">All Levels</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags</Label>
            <p className="text-xs text-muted-foreground">
              Select tags that describe your event (at least one required)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label
                    htmlFor={`tag-${tag}`}
                    className="font-normal cursor-pointer text-sm"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> Once players sign up for your event, you'll be able to
              communicate with them through the platform. Make sure to provide clear
              instructions for joining the session closer to the event date.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
