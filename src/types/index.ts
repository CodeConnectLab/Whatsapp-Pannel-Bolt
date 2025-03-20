export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  type: 'sent' | 'received';
  status: 'sent' | 'delivered' | 'read';
  sender: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  language?: string;
  avatar?: string;
  lastActive: Date;
  status: 'online' | 'offline';
  unreadCount: number;
  assignedTo?: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  messages: Message[];
  assignedTo?: string;
  tags: string[];
  status: 'open' | 'resolved';
}