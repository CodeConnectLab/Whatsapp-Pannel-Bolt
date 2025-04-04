import { Contact, Conversation, Message, Tag, User, ChatSession } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Test Contact',
    phone: '918866451616',
    email: 'test@example.com',
    language: 'English',
    lastActive: new Date(),
    status: 'online',
    seen: true,
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Dr. Himanshu Kashyap',
    phone: '919140069609',
    lastActive: new Date(Date.now() - 3600000),
    status: 'offline',
    seen: true,
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Priya Sharma',
    phone: '917898765432',
    email: 'priya.sharma@example.com',
    language: 'Hindi',
    lastActive: new Date(Date.now() - 1800000),
    status: 'online',
    unreadCount: 3,
    seen: true,
    assignedTo: 'currentUser'
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    phone: '919876543210',
    email: 'rajesh.kumar@example.com',
    language: 'English',
    lastActive: new Date(Date.now() - 7200000),
    status: 'offline',
    seen: false,
    unreadCount: 1
  },
  {
    id: '5',
    name: 'Aditya Patel',
    phone: '918765432109',
    lastActive: new Date(Date.now() - 5400000),
    status: 'offline',
    unreadCount: 0,
    seen: false,
    assignedTo: 'currentUser'
  },
  // {
  //   id: '6',
  //   name: 'Ashish Sharma',
  //   phone: '8787676743',
  //   lastActive: new Date(Date.now() - 5400000),
  //   status: 'offline',
  //   unreadCount: 0,
  //   assignedTo: 'currentUser'
  // },
  // {
  //   id: '7',
  //   name: 'Siddharth Singh',
  //   phone: '9187654321',
  //   lastActive: new Date(Date.now() - 5400000),
  //   status: 'offline',
  //   unreadCount: 0,
  //   assignedTo: 'currentUser'
  // },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey Hi,\nHow Can I Help You Today.\nPlease Call Me On',
    timestamp: new Date(Date.now() - 7200000),
    type: 'sent',
    status: 'read',
    sender: 'agent'
  },
  {
    id: '2',
    content: '+918866451616',
    timestamp: new Date(Date.now() - 7100000),
    type: 'sent',
    status: 'read',
    sender: 'agent'
  },
  {
    id: '3',
    content: 'How Can I Help You ?',
    timestamp: new Date(Date.now() - 3600000),
    type: 'received',
    status: 'read',
    sender: 'customer'
  }
];

const priyaMessages: Message[] = [
  {
    id: 'p1',
    content: 'Hello, I need assistance with my recent order',
    timestamp: new Date(Date.now() - 5000000),
    type: 'received',
    status: 'read',
    sender: 'customer'
  },
  {
    id: 'p2',
    content: 'Hi Priya, I\'d be happy to help. Can you please provide your order number?',
    timestamp: new Date(Date.now() - 4800000),
    type: 'sent',
    status: 'read',
    sender: 'agent'
  },
  {
    id: 'p3',
    content: 'It\'s WH-20250318-001',
    timestamp: new Date(Date.now() - 4600000),
    type: 'received',
    status: 'read',
    sender: 'customer'
  }
];

const rajeshMessages: Message[] = [
  {
    id: 'r1',
    content: 'I want to know about your products',
    timestamp: new Date(Date.now() - 6000000),
    type: 'received',
    status: 'read',
    sender: 'customer'
  },
  {
    id: 'r2',
    content: 'Which specific products are you interested in?',
    timestamp: new Date(Date.now() - 5900000),
    type: 'sent',
    status: 'delivered',
    sender: 'agent'
  }
];

const adityaMessages: Message[] = [
  {
    id: 'a1',
    content: 'Is there any discount available on bulk orders?',
    timestamp: new Date(Date.now() - 8000000),
    type: 'received',
    status: 'read',
    sender: 'customer'
  },
  {
    id: 'a2',
    content: 'Yes, we offer 15% discount on orders above ₹10,000',
    timestamp: new Date(Date.now() - 7800000),
    type: 'sent',
    status: 'read',
    sender: 'agent'
  },
  {
    id: 'a3',
    content: 'Great! I\'ll place the order soon',
    timestamp: new Date(Date.now() - 7700000),
    type: 'received',
    status: 'read',
    sender: 'customer'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: mockContacts[0],
    messages: mockMessages,
    tags: ['new', 'priority'],
    status: 'open'
  },
  {
    id: '2',
    contact: mockContacts[1],
    messages: [],
    tags: ['returning'],
    status: 'open'
  },
  {
    id: '3',
    contact: mockContacts[2],
    messages: priyaMessages,
    tags: ['priority', 'order-issue'],
    status: 'open',
    assignedTo: 'currentUser'
  },
  {
    id: '4',
    contact: mockContacts[3],
    messages: rajeshMessages,
    tags: ['inquiry'],
    status: 'open'
  },
  {
    id: '5',
    contact: mockContacts[4],
    messages: adityaMessages,
    tags: ['sales-opportunity'],
    status: 'open',
    assignedTo: 'currentUser'
  }
];

export const mockTags: Tag[] = [
  { id: '1', name: 'Not Attempted', isActive: true, color: '#f59e0b' },
  { id: '2', name: 'Call Back', isActive: true, color: '#3b82f6' },
  { id: '3', name: 'Lost', isActive: true, color: '#ef4444' },
  { id: '4', name: 'Online Meeting', isActive: true, color: '#10b981' },
  { id: '5', name: 'Offline Meeting', isActive: true, color: '#8b5cf6' },
  { id: '6', name: 'Won', isActive: true, color: '#16a34a' },
  { id: '7', name: 'Fake Lead', isActive: false, color: '#6b7280' },
  { id: '8', name: 'In Future', isActive: true, color: '#6366f1' }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Shashank',
    email: 'Shashank@example.com',
    role: 'admin',
    isActive: true
  },
  {
    id: 'user-2',
    name: 'Abhilekh',
    email: 'Abhilekh@example.com',
    role: 'agent',
    isActive: true
  },
  {
    id: 'user-3',
    name: 'Himanshu',
    email: 'Himanshu@example.com',
    role: 'agent',
    isActive: false
  }
];

export const mockChatSessions: ChatSession[] = [
  {
    id: 'chat-1',
    user: {
      id: 'cust-1',
      name: 'John Smith',
      phone: '+1234567890'
    },
    assignedToId: 'user-2',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Hello, I need help with my order',
        timestamp: new Date('2023-06-15T10:30:00')
      },
      {
        id: 'msg-2',
        sender: 'agent',
        text: 'Hi John, I\'d be happy to help. Can you provide your order number?',
        timestamp: new Date('2023-06-15T10:32:00')
      }
    ],
    unread: 0,
    status: 'active'
  },
  {
    id: 'chat-2',
    user: {
      id: 'cust-2',
      name: 'Sarah Johnson',
      phone: '+9876543210'
    },
    assignedToId: null,
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Is my delivery coming today?',
        timestamp: new Date('2023-06-15T11:45:00')
      }
    ],
    unread: 1,
    status: 'active'
  }
];