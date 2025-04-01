import React, { useState, useEffect } from 'react';
import { Button, Collapse, Dropdown, Tag as AntTag, message, Select } from 'antd';
import { Contact, Tag, User } from '../types';
import { mockTags, mockUsers } from '../data/mockData';
import { Plus, UserCog } from 'lucide-react';

interface ContactInfoProps {
  contact?: Contact;
  onAssignChat?: (contactId: string, userId: string | null) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact, onAssignChat }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedToUserId, setAssignedToUserId] = useState<string | null>(null);

  useEffect(() => {
    // Load tags from mock data
    setTags(mockTags);
    
    // Load active users from mock data
    setUsers(mockUsers.filter(user => user.isActive));
    
    // Set selected tags and assignment from contact if available
    if (contact && contact.id) {
      setSelectedTags([]); // Reset for new contact
      setAssignedToUserId(contact.assignedTo || null);
      // In a real app, you would fetch the contact's tags here
    }
  }, [contact?.id]);

  if (!contact) return null;

  const activeTags = tags.filter(tag => tag.isActive);

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

  const handleAssignUser = (userId: string | null) => {
    setAssignedToUserId(userId);
    if (onAssignChat && contact) {
      onAssignChat(contact.id, userId);
    }
    message.success(userId ? `Chat assigned to ${users.find(u => u.id === userId)?.name}` : 'Chat unassigned');
  };

  const tagMenuItems = activeTags
    .filter(tag => !selectedTags.includes(tag.id))
    .map(tag => ({
      key: tag.id,
      label: tag.name,
      onClick: () => handleAddTag(tag.id),
    }));

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <div className="text-right mb-4">
        <Button type="text" size="small">
          Edit Contact
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1">{contact.name}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Phone</h3>
          <p className="mt-1">{contact.phone}</p>
        </div>

        {contact.email && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1">{contact.email}</p>
          </div>
        )}

        {contact.language && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Language</h3>
            <p className="mt-1">{contact.language}</p>
          </div>
        )}
        
        <div className='hidden'>
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <UserCog size={16} className="mr-2" /> Assign To
          </h3>
          <Select 
            className="w-full" 
            placeholder="Select an agent or admin"
            value={assignedToUserId || undefined}
            onChange={handleAssignUser}
            allowClear
            onClear={() => handleAssignUser(null)}
          >
            <Select.Option value={null}>Unassigned</Select.Option>
            {users.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </Select.Option>
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
    </div>
  );
};

export default ContactInfo;