import { useState, useEffect } from 'react';
import { ConfigProvider, Dropdown, message } from 'antd';
import { Bell, MessageCircleMore, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';
import ContactInfo from './components/ContactInfo';
import PageContent from './components/PageContent';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import LiveChat from './components/LiveChat'; // Import the LiveChat component
import { mockContacts, mockConversations } from './data/mockData';
import { Contact, Conversation } from './types';
import ManageUsers from './components/ManageUsers';

function App() {
  // Check localStorage for login state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [selectedChatSession, setSelectedChatSession] = useState<string | null>(null);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    const conversation = conversations.find((conv) => conv.contact.id === contact.id);
    setCurrentConversation(conversation);
  };

  const handleSelectNavItem = (itemId: string) => {
    setActivePage(itemId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login state to false
    localStorage.removeItem('user'); // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn'); // Clear login state from localStorage
    setActivePage('dashboard')
  };

  // Handle opening a message in LiveChat panel
  const handleOpenInLiveChat = (messageId: string, conversationId: string) => {
    // Store the selected chat session ID
    setSelectedChatSession(conversationId);
    
    // Navigate to the LiveChat page
    setActivePage('live-chat-panel');
    
    // Show a success message to indicate navigation
    message.success('Opening conversation in Live Chat panel');
  };

  // Handler for opening a chat from history in Live Chat panel
  const handleOpenChatInLivePanel = (chatId: string) => {
    console.log('Opening chat in Live Chat panel:1111111', activePage, chatId);
    // Store the selected chat session ID
    setSelectedChatSession(chatId);
    
    // Navigate to the LiveChat page
    setActivePage('live-chat-panel');
    
    // Show a success message to indicate navigation
    message.success('Opening conversation in Live Chat panel');
  };

  // Handle assigning a chat to a user
  const handleAssignChat = (contactId: string, userId: string | null) => {
    // Update contacts
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, assignedTo: userId } 
          : contact
      )
    );
    
    // Update conversations
    setConversations(prevConversations => 
      prevConversations.map(conversation => 
        conversation.contact.id === contactId 
          ? { 
              ...conversation, 
              assignedTo: userId,
              contact: { ...conversation.contact, assignedTo: userId }
            } 
          : conversation
      )
    );
    
    // Update selected contact if it's the one being assigned
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact({ ...selectedContact, assignedTo: userId });
    }
    
    // Update current conversation if it's the one being assigned
    if (currentConversation && currentConversation.contact.id === contactId) {
      setCurrentConversation({
        ...currentConversation,
        assignedTo: userId,
        contact: { ...currentConversation.contact, assignedTo: userId }
      });
    }
  };

  const shouldShowChatInterface = activePage === 'live-chat';
  const shouldShowLiveChatPanel = activePage === 'live-chat-panel';
  const shouldShowManageUser = activePage === 'manage-tags';

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
      onClick: handleLogout, // Call handleLogout when "Logout" is clicked
    },
  ];

  // Render the login page if the user is not logged in
  if (!isLoggedIn) {
    return (
      <LoginPage
        setIsLoggedIn={(value: boolean) => {
          setIsLoggedIn(value);
          localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage
        }}
      />
    );
  }

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

        {/* #/////////////this is header/////////// */}
        <div className="bg-[#128C7E] text-white py-2 px-4 fixed top-0 w-full z-10 flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircleMore className="mr-2" />
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
        {/* #/////////////this is header/////////// */}

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
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={handleSelectContact}
              />
              <ChatArea 
                conversation={currentConversation} 
                onOpenInLiveChat={handleOpenInLiveChat}
              />
              <ContactInfo 
                contact={selectedContact}
                onAssignChat={handleAssignChat}
              />
            </div>
          ) : shouldShowLiveChatPanel ? (
            <LiveChat selectedChatId={selectedChatSession} />
          )
           :(
            <PageContent 
              pageId={activePage} 
              onOpenChatInLivePanel={handleOpenChatInLivePanel}
            />
          )}
        </div>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;