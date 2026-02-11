export interface DungeonMaster {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  experience: string;
  gameSystems: string[];
  sessionTypes: ('online' | 'in-person')[];
  campaignStyle: string[];
  pricing: {
    oneShot: number;
    campaign: number;
  };
  rating: number;
  reviewCount: number;
  location?: string;
  availability: string[];
  reviews: Review[];
  events?: Event[]; // Upcoming hosted events
  locations?: Location[]; // Available locations with pricing
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  sessionType: string;
}

export interface BookingRequest {
  id: string;
  dmId: string;
  dmName: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  sessionType: 'one-shot' | 'campaign';
  playerCount: number;
  message: string;
  status: 'pending' | 'confirmed' | 'declined';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'player' | 'dm';
  bookings: BookingRequest[];
  username?: string; // Optional: for new account setup
  displayName?: string; // Optional: for new account setup
  needsSetup?: boolean; // Flag to indicate if user needs to complete setup
}

export interface Location {
  id: string;
  name: string;
  type: 'physical' | 'online';
  details: string; // Address for physical, platform name for online
  isActive: boolean;
  pricing?: LocationPricing; // Optional pricing settings per location
}

export interface LocationPricing {
  oneShot: number; // Per session
  campaign: number; // Per session
  perPlayer?: number; // Charge per player/head
  perHour?: number; // Charge per hour
  bulkDiscounts?: {
    enabled: boolean;
    fiveToNine: number; // Percentage discount for 5-9 sessions
    tenPlus: number; // Percentage discount for 10+ sessions
  };
}

export interface TimeSlot {
  startTime: string; // Format: "HH:MM"
  endTime: string;   // Format: "HH:MM"
}

export interface RecurringSchedule {
  id: string;
  locationId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday
  timeSlots: TimeSlot[];
}

export interface DateOverride {
  id: string;
  date: string; // ISO date string
  type: 'blocked' | 'available';
  locationId?: string; // For one-off availability
  timeSlots?: TimeSlot[]; // For one-off availability
  reason?: string; // For blocked dates
}

export interface DMAvailability {
  locations: Location[];
  recurringSchedules: RecurringSchedule[];
  dateOverrides: DateOverride[];
}

export interface Event {
  id: string;
  dmId: string;
  dmName: string;
  dmAvatar: string;
  title: string;
  description: string;
  system: string; // e.g., "D&D 5e", "Pathfinder 2e"
  date: string; // ISO date string
  time: string; // e.g., "7:00 PM - 11:00 PM"
  duration: string; // e.g., "4 hours"
  location: string; // Physical address or "Online (Roll20)" etc.
  locationType: 'online' | 'in-person';
  maxPlayers: number;
  currentPlayers: number;
  price: number; // Per player
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'All Levels';
  tags: string[]; // e.g., ["One-Shot", "Roleplay-Heavy", "Combat"]
  signedUpPlayers: {
    id: string;
    name: string;
    avatar: string;
  }[];
  status: 'open' | 'full' | 'cancelled' | 'completed';
}