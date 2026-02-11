import { Event } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Calendar, Clock, MapPin, Users, Search, Sword, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Mock event data
const mockEvents: Event[] = [
  {
    id: '1',
    dmId: '1',
    dmName: 'Sarah Chen',
    dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    title: 'The Lost Temple of Azura',
    description: 'Join us for an exciting one-shot adventure! Your party has discovered an ancient map leading to the Lost Temple of Azura, rumored to contain powerful artifacts. Navigate deadly traps, solve ancient puzzles, and face the temple\'s guardians in this action-packed session.',
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
    id: '2',
    dmId: '2',
    dmName: 'Marcus Reed',
    dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    title: 'Mystery at Ravencrest Manor',
    description: 'A roleplay-heavy murder mystery! The wealthy Lord Ravencrest has been found dead, and everyone in the manor is a suspect. Use your investigation skills, gather clues, and unmask the killer before they strike again. Perfect for players who love intrigue and social encounters.',
    system: 'D&D 5e',
    date: '2026-02-16',
    time: '2:00 PM - 6:00 PM',
    duration: '4 hours',
    location: 'Online (Roll20)',
    locationType: 'online',
    maxPlayers: 4,
    currentPlayers: 4,
    price: 20,
    difficulty: 'Intermediate',
    tags: ['One-Shot', 'Mystery', 'Roleplay-Heavy', 'Investigation'],
    signedUpPlayers: [
      { id: '4', name: 'Emily Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
      { id: '5', name: 'David Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
      { id: '6', name: 'Sophie Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie' },
      { id: '7', name: 'Ryan Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan' },
    ],
    status: 'full',
  },
  {
    id: '3',
    dmId: '3',
    dmName: 'Elena Rodriguez',
    dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    title: 'Beginner\'s Quest: The Goblin Caves',
    description: 'Perfect for new players! Learn the basics of D&D in a fun, low-pressure environment. I\'ll guide you through character creation, basic rules, and your first adventure. All materials provided, no experience necessary!',
    system: 'D&D 5e',
    date: '2026-02-20',
    time: '6:00 PM - 9:00 PM',
    duration: '3 hours',
    location: 'The Dragon\'s Lair Game Shop, 123 Main St, San Francisco',
    locationType: 'in-person',
    maxPlayers: 6,
    currentPlayers: 2,
    price: 10,
    difficulty: 'Beginner Friendly',
    tags: ['One-Shot', 'Beginner Friendly', 'Tutorial', 'Combat'],
    signedUpPlayers: [
      { id: '8', name: 'Chris Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' },
      { id: '9', name: 'Anna White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
    ],
    status: 'open',
  },
  {
    id: '4',
    dmId: '1',
    dmName: 'Sarah Chen',
    dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    title: 'Horror One-Shot: The Haunting of Hillcrest',
    description: 'A spine-chilling horror adventure set in a cursed mansion. Can your investigators survive the night and uncover the dark secrets of Hillcrest? Atmospheric music, detailed descriptions, and genuine scares await. Not for the faint of heart!',
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
  {
    id: '5',
    dmId: '4',
    dmName: 'David Kim',
    dmAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK',
    title: 'Pathfinder 2e: The Emerald Enclave',
    description: 'Explore the mysteries of the Emerald Enclave! A druid circle has gone silent, and strange creatures are emerging from the forest. This Pathfinder 2e adventure features tactical combat, environmental puzzles, and nature-based challenges.',
    system: 'Pathfinder 2e',
    date: '2026-02-28',
    time: '1:00 PM - 5:00 PM',
    duration: '4 hours',
    location: 'Online (Foundry VTT)',
    locationType: 'online',
    maxPlayers: 5,
    currentPlayers: 0,
    price: 16,
    difficulty: 'Advanced',
    tags: ['One-Shot', 'Combat', 'Exploration', 'Tactical'],
    signedUpPlayers: [],
    status: 'open',
  },
];

export function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemFilter, setSystemFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.dmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSystem = systemFilter === 'all' || event.system === systemFilter;
    const matchesLocation = locationFilter === 'all' || event.locationType === locationFilter;
    const matchesDifficulty = difficultyFilter === 'all' || event.difficulty === difficultyFilter;

    return matchesSearch && matchesSystem && matchesLocation && matchesDifficulty;
  });

  const handleSignUp = (event: Event) => {
    if (event.status === 'full') {
      toast.error('This event is full');
      return;
    }
    toast.success(`You've signed up for ${event.title}!`);
    setSelectedEvent(null);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2 medieval-heading flex items-center gap-2">
          <Sparkles className="h-8 w-8" />
          Upcoming Events
        </h1>
        <p className="text-muted-foreground text-lg">
          Join one-shot adventures and special sessions hosted by experienced DMs
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* System Filter */}
            <Select value={systemFilter} onValueChange={setSystemFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Game System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                <SelectItem value="D&D 5e">D&D 5e</SelectItem>
                <SelectItem value="Pathfinder 2e">Pathfinder 2e</SelectItem>
                <SelectItem value="Call of Cthulhu">Call of Cthulhu</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="online">Online Only</SelectItem>
                <SelectItem value="in-person">In-Person Only</SelectItem>
              </SelectContent>
            </Select>

            {/* Difficulty Filter - full row on mobile */}
            <div className="md:col-span-2 lg:col-span-4">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner Friendly">Beginner Friendly</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="All Levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewDetails={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Sword className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later for new events
            </p>
          </CardContent>
        </Card>
      )}

      {/* Event Details Dialog */}
      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSignUp={() => handleSignUp(selectedEvent)}
        />
      )}
    </div>
  );
}

// Event Card Component
interface EventCardProps {
  event: Event;
  onViewDetails: () => void;
}

function EventCard({ event, onViewDetails }: EventCardProps) {
  const spotsLeft = event.maxPlayers - event.currentPlayers;
  const isFull = event.status === 'full';

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDetails}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={event.dmAvatar} alt={event.dmName} />
                <AvatarFallback>{event.dmName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">Hosted by {event.dmName}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${event.price}</div>
            <div className="text-xs text-muted-foreground">per player</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{event.system}</Badge>
          <Badge variant={event.locationType === 'online' ? 'outline' : 'default'}>
            {event.locationType === 'online' ? 'Online' : 'In-Person'}
          </Badge>
          <Badge variant={isFull ? 'destructive' : 'default'}>
            {isFull ? 'Full' : `${spotsLeft} ${spotsLeft === 1 ? 'spot' : 'spots'} left`}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time.split(' - ')[0]}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.currentPlayers}/{event.maxPlayers} players</span>
          </div>
          <div>
            <Badge variant="outline" className="text-xs">
              {event.difficulty}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full" disabled={isFull}>
          {isFull ? 'Event Full' : 'View Details & Sign Up'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Event Details Dialog Component
interface EventDetailsDialogProps {
  event: Event;
  open: boolean;
  onClose: () => void;
  onSignUp: () => void;
}

function EventDetailsDialog({ event, open, onClose, onSignUp }: EventDetailsDialogProps) {
  const spotsLeft = event.maxPlayers - event.currentPlayers;
  const isFull = event.status === 'full';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl medieval-heading">{event.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.dmAvatar} alt={event.dmName} />
                <AvatarFallback>{event.dmName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>Hosted by <strong>{event.dmName}</strong></span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
            </div>
            <div className="space-y-1 col-span-2">
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Game System</div>
              <Badge variant="secondary">{event.system}</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Difficulty</div>
              <Badge variant="outline">{event.difficulty}</Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2">About This Event</h4>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-semibold mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Players */}
          <div>
            <h4 className="font-semibold mb-2">
              Players ({event.currentPlayers}/{event.maxPlayers})
            </h4>
            {event.signedUpPlayers.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {event.signedUpPlayers.map((player) => (
                  <div key={player.id} className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{player.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Be the first to sign up!</p>
            )}
            {!isFull && spotsLeft > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} remaining
              </p>
            )}
          </div>

          {/* Price */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Price per Player</div>
                <div className="text-sm text-muted-foreground">Duration: {event.duration}</div>
              </div>
              <div className="text-3xl font-bold">${event.price}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onSignUp} disabled={isFull} className="flex-1">
              {isFull ? 'Event Full' : 'Sign Up for Event'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
