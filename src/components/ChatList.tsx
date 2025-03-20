import React, { useState } from 'react';
import { Input, Tabs } from 'antd';
import { Search } from 'lucide-react';
import { Contact } from '../types';
import { format } from 'date-fns';

interface ChatListProps {
  contacts: Contact[];
  selectedContact?: Contact;
  onSelectContact: (contact: Contact) => void;
}

const ChatList: React.FC<ChatListProps> = ({ contacts, selectedContact, onSelectContact }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    switch (activeTab) {
      case 'mine':
        return contact.assignedTo === 'currentUser';
      case 'unassigned':
        return !contact.assignedTo;
      default:
        return true;
    }
  });

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col" style={{ marginTop: '48px' }}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">WhatsApp Chat</h2>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: 'all', label: <div className="flex items-center">All <span className="ml-1 bg-green-500 text-white rounded-full px-2 text-xs">{contacts.length}</span></div> },
            { key: 'mine', label: 'Mine' },
            { key: 'unassigned', label: <div className="flex items-center">Unassigned <span className="ml-1 bg-yellow-500 text-white rounded-full px-2 text-xs">1</span></div> }
          ]}
        />
        <Input
          prefix={<Search className="text-gray-400" size={18} />}
          placeholder="Search contacts..."
          className="rounded-lg mt-4"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedContact?.id === contact.id ? 'bg-gray-50' : ''
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                {contact.name.charAt(0)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <span className="text-xs text-gray-500">
                    {format(contact.lastActive, 'HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;