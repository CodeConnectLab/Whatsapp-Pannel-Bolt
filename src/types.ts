// Existing Tag type
export interface Tag {
  id: string;
  name: string;
  isActive: boolean;
  color: string;
}

// New User type 
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  isActive: boolean;
}

// Chat related types
export interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
  assignedToId: string | null;
  messages: Message[];
  unread: number;
  lastMessage?: Message;
  status: 'active' | 'closed';
}
