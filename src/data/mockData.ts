import { Contact, Conversation, Message } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Test Contact',
    phone: '918866451616',
    email: 'test@example.com',
    language: 'English',
    lastActive: new Date(),
    status: 'online',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Dr. Himanshu Kashyap',
    phone: '919140069609',
    lastActive: new Date(Date.now() - 3600000),
    status: 'offline',
    unreadCount: 0
  }
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

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: mockContacts[0],
    messages: mockMessages,
    tags: ['new', 'priority'],
    status: 'open'
  }
];