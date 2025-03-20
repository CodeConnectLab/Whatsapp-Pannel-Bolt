import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Conversation } from '../types';
import { format } from 'date-fns';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface ChatAreaProps {
  conversation?: Conversation;
}

const ChatArea: React.FC<ChatAreaProps> = ({ conversation }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50" style={{ marginTop: '48px' }}>
      <div className="bg-[#128C7E] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
              {conversation.contact.name.charAt(0)}
            </div>
            <div className="ml-3">
              <h2 className="font-medium text-white">{conversation.contact.name} - {conversation.contact.phone}</h2>
              <p className="text-sm text-gray-100">Reply within open for 11 hours and 28 minutes from now</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button type="primary" ghost>Transfer</Button>
            <Button type="primary" ghost>Resolve</Button>
            <Button type="text" icon={<MoreVertical size={20} className="text-white" />} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.type === 'sent'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              <div className="text-xs mt-1 flex justify-end">
                {format(message.timestamp, 'HH:mm')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Button
            type="text"
            icon={<Paperclip size={20} className="text-gray-500" />}
          />
          <div className="relative">
            <Button
              type="text"
              icon={<Smile size={20} className="text-gray-500" />}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-10">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="light"
                />
              </div>
            )}
          </div>
          <Input.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="flex-1"
          />
          <Button
            type="primary"
            icon={<Send size={20} />}
            className="bg-green-500"
            onClick={() => {
              if (message.trim()) {
                // Handle message sending here
                setMessage('');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;