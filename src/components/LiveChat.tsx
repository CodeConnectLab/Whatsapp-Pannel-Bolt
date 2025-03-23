import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  List, 
  Avatar, 
  Input, 
  Button, 
  Typography, 
  Badge, 
  Space,
  Dropdown,
  Menu,
  Select,
  message
} from 'antd';
import { SendOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { User, Assignment } from 'lucide-react';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

// Chat types
interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface ChatSession {
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

// Mock data for agents (would normally come from your user management)
interface Agent {
  id: string;
  name: string;
  isActive: boolean;
}

const mockAgents: Agent[] = [
  { id: 'user-1', name: 'Admin User', isActive: true },
  { id: 'user-2', name: 'Agent One', isActive: true },
  { id: 'user-3', name: 'Agent Two', isActive: false }
];

// Mock data for chat sessions
const mockChatSessions: ChatSession[] = [
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

const LiveChat: React.FC = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(mockChatSessions);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // In a real app, you would fetch chat sessions and agents from an API
    setChatSessions(mockChatSessions);
    setAgents(mockAgents);
  }, []);

  // Find the last message of each chat
  useEffect(() => {
    setChatSessions(prevSessions => 
      prevSessions.map(session => ({
        ...session,
        lastMessage: session.messages[session.messages.length - 1]
      }))
    );
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: newMessage,
      timestamp: new Date()
    };

    setChatSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedChat.id
          ? { 
              ...session, 
              messages: [...session.messages, message],
              lastMessage: message
            }
          : session
      )
    );
    setNewMessage('');
  };

  const handleAssignAgent = (chatId: string, agentId: string | null) => {
    setChatSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === chatId
          ? { ...session, assignedToId: agentId }
          : session
      )
    );
    
    message.success(
      agentId 
        ? `Chat assigned to ${agents.find(a => a.id === agentId)?.name}` 
        : 'Chat unassigned'
    );
  };

  const handleChatSelect = (chat: ChatSession) => {
    setSelectedChat(chat);
    // Mark messages as read
    setChatSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === chat.id
          ? { ...session, unread: 0 }
          : session
      )
    );
  };

  // Get the name of the assigned agent for a chat
  const getAssignedAgentName = (assignedToId: string | null) => {
    if (!assignedToId) return 'Unassigned';
    const agent = agents.find(a => a.id === assignedToId);
    return agent ? agent.name : 'Unknown';
  };

  return (
    <Layout className="h-screen">
      <Sider width={300} className="bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageOutlined style={{ fontSize: '20px' }} />
              <Text strong className="ml-2 text-lg">Live Chats</Text>
            </div>
          </div>
        </div>
        <List
          className="overflow-y-auto"
          style={{ height: 'calc(100vh - 64px)' }}
          dataSource={chatSessions}
          renderItem={chat => (
            <List.Item 
              className={`cursor-pointer hover:bg-gray-100 ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleChatSelect(chat)}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <div className="flex justify-between">
                    <span>{chat.user.name}</span>
                    {chat.unread > 0 && (
                      <Badge count={chat.unread} />
                    )}
                  </div>
                }
                description={
                  <div className="flex flex-col">
                    <small className="text-gray-500">
                      {chat.lastMessage?.text?.substring(0, 30)}
                      {chat.lastMessage?.text?.length > 30 ? '...' : ''}
                    </small>
                    <div className="flex justify-between mt-1">
                      <small className="text-xs text-gray-400">
                        {chat.lastMessage?.timestamp?.toLocaleTimeString()}
                      </small>
                      <div 
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                        title={`Assigned to: ${getAssignedAgentName(chat.assignedToId)}`}
                      >
                        {getAssignedAgentName(chat.assignedToId)}
                      </div>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Sider>
      
      <Layout>
        {selectedChat ? (
          <>
            <Header className="bg-white p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <Avatar icon={<UserOutlined />} />
                <div className="ml-3">
                  <Text strong>{selectedChat.user.name}</Text>
                  <div>
                    <Text type="secondary" className="text-sm">{selectedChat.user.phone}</Text>
                  </div>
                </div>
              </div>
              
              <Space>
                <div className="flex items-center">
                  <Assignment size={16} className="mr-1" />
                  <span className="mr-2">Assign:</span>
                  <Select
                    value={selectedChat.assignedToId || 'unassigned'}
                    style={{ width: 150 }}
                    onChange={(value) => handleAssignAgent(selectedChat.id, value === 'unassigned' ? null : value)}
                  >
                    <Option value="unassigned">Unassigned</Option>
                    {agents
                      .filter(agent => agent.isActive)
                      .map(agent => (
                        <Option key={agent.id} value={agent.id}>{agent.name}</Option>
                      ))
                    }
                  </Select>
                </div>
              </Space>
            </Header>
            
            <Content className="p-4 bg-gray-50" style={{ height: 'calc(100vh - 128px)', overflowY: 'auto' }}>
              <div className="flex flex-col space-y-4">
                {selectedChat.messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                        message.sender === 'agent' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border'
                      }`}
                    >
                      <div>{message.text}</div>
                      <div className="text-xs mt-1 text-right opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Content>
            
            <div className="p-4 border-t bg-white">
              <div className="flex">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  className="mr-2"
                />
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <User size={48} className="mx-auto text-gray-400 mb-4" />
              <Text className="text-gray-500 text-lg">Select a chat to start messaging</Text>
            </div>
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default LiveChat;
