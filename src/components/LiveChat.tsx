import React, { useState, useEffect } from 'react';
import { 
  Badge,
  Button, 
  Input, 
  Avatar,
  Typography, 
  List,
  Dropdown,
  Select,
  message
} from 'antd';
import { SendOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { User, Assignment, Search, MoreVertical, Smile, Paperclip, File, Image, Video } from 'lucide-react';
import { mockChatSessions, mockConversations, mockContacts, mockUsers, mockTags } from '../data/mockData';
import { format } from 'date-fns';
import { Collapse, Tag as AntTag } from 'antd';
import { Plus, UserCog } from 'lucide-react';

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

// Mock data for agents
interface Agent {
  id: string;
  name: string;
  isActive: boolean;
}

interface LiveChatProps {
  selectedChatId?: string | null;
}

const LiveChat: React.FC<LiveChatProps> = ({ selectedChatId }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(mockChatSessions);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tags, setTags] = useState(mockTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch chat sessions and agents from an API
    setChatSessions(mockChatSessions);
    
    // Format agents from mock users
    const formattedAgents = mockUsers.map(user => ({
      id: user.id,
      name: user.name,
      isActive: user.isActive
    }));
    setAgents(formattedAgents);
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

  // Auto-select the chat based on selectedChatId prop
  useEffect(() => {
    if (selectedChatId) {
      const chatToSelect = chatSessions.find(chat => chat.id === selectedChatId);
      if (chatToSelect) {
        setSelectedChat(chatToSelect);
        // Mark messages as read
        setChatSessions(prevSessions =>
          prevSessions.map(session =>
            session.id === chatToSelect.id
              ? { ...session, unread: 0 }
              : session
          )
        );
      } else {
        message.error('Chat session not found');
      }
    }
  }, [selectedChatId, chatSessions]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachment = (_type: string) => {
    setShowAttachmentOptions(false);
    // Here you would handle file selection based on type
  };

  // Get the name of the assigned agent for a chat
  const getAssignedAgentName = (assignedToId: string | null) => {
    if (!assignedToId) return 'Unassigned';
    const agent = agents.find(a => a.id === assignedToId);
    return agent ? agent.name : 'Unknown';
  };

  const handleAddTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId]);
      message.success('Tag added successfully');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
    message.success('Tag removed successfully');
  };

  const tagMenuItems = tags
    .filter(tag => tag.isActive && !selectedTags.includes(tag.id))
    .map(tag => ({
      key: tag.id,
      label: tag.name,
      onClick: () => handleAddTag(tag.id),
    }));

  const attachmentItems = [
    {
      key: 'image',
      label: (
        <div className="flex items-center">
          <Image size={16} className="mr-2" />
          <span>Image</span>
        </div>
      ),
      onClick: () => handleAttachment('image')
    },
    {
      key: 'video',
      label: (
        <div className="flex items-center">
          <Video size={16} className="mr-2" />
          <span>Video</span>
        </div>
      ),
      onClick: () => handleAttachment('video')
    },
    {
      key: 'document',
      label: (
        <div className="flex items-center">
          <File size={16} className="mr-2" />
          <span>Document</span>
        </div>
      ),
      onClick: () => handleAttachment('document')
    }
  ];

  const filteredSessions = chatSessions.filter(chat => {
    switch (activeTab) {
      case 'mine':
        return chat.assignedToId === 'user-1'; // Assuming current user is user-1
      case 'unassigned':
        return !chat.assignedToId;
      default:
        return true;
    }
  });

  return (
    <div className="flex flex-1" style={{ marginTop: '48px' }}>
      {/* Chat List - Left Panel */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Live Chats</h2>
          <div className="mb-4">
            <Select
              value={activeTab}
              onChange={setActiveTab}
              style={{ width: '100%' }}
            >
              <Option value="all">All Chats ({chatSessions.length})</Option>
              <Option value="mine">My Chats</Option>
              <Option value="unassigned">Unassigned</Option>
            </Select>
          </div>
          <Input
            prefix={<Search className="text-gray-400" size={18} />}
            placeholder="Search chats..."
            className="rounded-lg"
          />
        </div>
      
        <List
          className="overflow-y-auto"
          style={{ height: 'calc(100vh - 180px)' }}
          dataSource={filteredSessions}
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
      </div>
      
      {/* Chat Area - Middle Panel */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedChat ? (
          <>
            <div className="bg-[#128C7E] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar icon={<UserOutlined />} className="bg-green-600" />
                  <div className="ml-3">
                    <Text strong className="text-white">{selectedChat.user.name}</Text>
                    <div>
                      <Text className="text-gray-100 text-sm">{selectedChat.user.phone}</Text>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button type="text" icon={<MoreVertical size={20} className="text-white" />} />
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                      message.sender === 'agent' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-900'
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
            
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Dropdown 
                  menu={{ items: attachmentItems }} 
                  open={showAttachmentOptions}
                  onOpenChange={setShowAttachmentOptions}
                  trigger={['click']}
                >
                  <Button
                    type="text"
                    icon={<Paperclip size={20} className="text-gray-500" />}
                  />
                </Dropdown>
                <Button
                  type="text"
                  icon={<Smile size={20} className="text-gray-500" />}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                <Input.TextArea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  className="flex-1"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  className="bg-green-500"
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <User size={48} className="mx-auto text-gray-400 mb-4" />
              <Text className="text-gray-500 text-lg">Select a chat to start messaging</Text>
            </div>
          </div>
        )}
      </div>

      {/* Contact Info - Right Panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        {selectedChat ? (
          <>
            <div className="text-right mb-4">
              <Button type="text" size="small">
                Edit Contact
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1">{selectedChat.user.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1">{selectedChat.user.phone}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <UserCog size={16} className="mr-2" /> Assign To
                </h3>
                <Select 
                  className="w-full" 
                  placeholder="Select an agent or admin"
                  value={selectedChat.assignedToId || undefined}
                  onChange={(value) => handleAssignAgent(selectedChat.id, value === 'unassigned' ? null : value)}
                  allowClear
                  onClear={() => handleAssignAgent(selectedChat.id, null)}
                >
                  <Option value="unassigned">Unassigned</Option>
                  {agents
                    .filter(agent => agent.isActive)
                    .map(agent => (
                      <Option key={agent.id} value={agent.id}>
                        {agent.name}
                      </Option>
                    ))}
                </Select>
              </div>
            </div>

            <Collapse className="mt-6" ghost>
              <Collapse.Panel header="Template Messages" key="1">
                <div className="space-y-2">
                  <Button block>Welcome Message</Button>
                  <Button block>Follow Up</Button>
                  <Button block>Thank You</Button>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Customer Journey" key="2">
                <div className="text-sm text-gray-500">
                  <p>First Contact: 2 days ago</p>
                  <p>Total Conversations: 3</p>
                  <p>Status: Active</p>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Tags" key="3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTags.length > 0 ? (
                    selectedTags.map(tagId => {
                      const tag = tags.find(t => t.id === tagId);
                      if (!tag) return null;
                      return (
                        <AntTag
                          key={tag.id}
                          color={tag.color}
                          closable
                          onClose={() => handleRemoveTag(tag.id)}
                        >
                          {tag.name}
                        </AntTag>
                      );
                    })
                  ) : (
                    <p className="text-gray-400 text-sm">No tags applied</p>
                  )}
                </div>
                <Dropdown 
                  menu={{ items: tagMenuItems }} 
                  disabled={tagMenuItems.length === 0}
                  trigger={['click']}
                >
                  <Button size="small" icon={<Plus size={14} />}>
                    {tagMenuItems.length > 0 ? 'Add Tag' : 'No more tags available'}
                  </Button>
                </Dropdown>
              </Collapse.Panel>
            </Collapse>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Text className="text-gray-400">Select a chat to view contact details</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
