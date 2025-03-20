import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';
import ContactInfo from './components/ContactInfo';
import { mockContacts, mockConversations } from './data/mockData';
import { Contact, Conversation } from './types';

function App() {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    const conversation = mockConversations.find(conv => conv.contact.id === contact.id);
    setCurrentConversation(conversation);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4ADE80',
          borderRadius: 8,
        },
      }}
    >
      <div className="flex h-screen bg-gray-100">
        <div className="bg-[#128C7E] text-white py-2 px-4 fixed top-0 w-full z-10 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">DASHBOARD</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span>You (BOTS CHAMPION) are logged in this vendor admin account</span>
            <button className="text-white hover:text-gray-200">click here to go back to super admin section</button>
          </div>
        </div>
        <Sidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
        <ChatList
          contacts={mockContacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
        <ChatArea conversation={currentConversation} />
        <ContactInfo contact={selectedContact} />
      </div>
    </ConfigProvider>
  );
}

export default App;