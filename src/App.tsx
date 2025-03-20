import { useState } from 'react';
import { ConfigProvider, Dropdown } from 'antd';
import { Bell, MessageCircleMore, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';
import ContactInfo from './components/ContactInfo';
import PageContent from './components/PageContent';
import Footer from './components/Footer';
import { mockContacts, mockConversations } from './data/mockData';
import { Contact, Conversation } from './types';

// Create menu items for the dropdown
const menuItems = [
  {
    key: '1',
    label: 'Profile',
  },
  {
    key: '2',
    label: 'Settings',
  },
  {
    key: '3',
    label: 'Logout',
  },
];

function App() {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState<string>('live-chat');

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    const conversation = mockConversations.find(conv => conv.contact.id === contact.id);
    setCurrentConversation(conversation);
  };
  
  const handleSelectNavItem = (itemId: string) => {
    setActivePage(itemId);
  };

  // Only show ChatList, ChatArea, and ContactInfo when on live-chat page
  const shouldShowChatInterface = activePage === 'live-chat';

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
          <MessageCircleMore className='mr-2'/>
            <h1 className="text-xl font-semibold"> WhatsApp Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-white hover:text-gray-200 cursor-pointer" size={24} />
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <div className="flex items-center cursor-pointer">
                <span className="mr-2">Digi Coder Technology</span>
                <User className="text-white hover:text-gray-200" size={24} />
              </div>
            </Dropdown>
          </div>
        </div>
        
        <Sidebar 
          expanded={sidebarExpanded} 
          onToggle={() => setSidebarExpanded(!sidebarExpanded)} 
          activeItem={activePage}
          onSelectItem={handleSelectNavItem}
        />
        
        <div className="flex-1 flex flex-col" style={{ paddingBottom: '50px' }}>
          {shouldShowChatInterface ? (
            <div className="flex flex-1">
              <ChatList
                contacts={mockContacts}
                selectedContact={selectedContact}
                onSelectContact={handleSelectContact}
              />
              <ChatArea conversation={currentConversation} />
              <ContactInfo contact={selectedContact} />
            </div>
          ) : (
            <PageContent pageId={activePage} />
          )}
        </div>
        
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;