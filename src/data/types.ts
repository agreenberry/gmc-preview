export interface User {}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'player' | 'dm';
  bookings: BookingRequest[];
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
export interface DungeonMaster {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'dm';
  bookings: BookingRequest[];
}
 export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  status: 'read' | 'unread';
} 