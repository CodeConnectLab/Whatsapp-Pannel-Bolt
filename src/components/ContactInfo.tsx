import React from 'react';
import { Button, Collapse } from 'antd';
import { Contact } from '../types';

interface ContactInfoProps {
  contact?: Contact;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  if (!contact) return null;

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
          <div className="flex flex-wrap gap-2">
            <Button size="small">New</Button>
            <Button size="small">Priority</Button>
            <Button size="small">+ Add Tag</Button>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default ContactInfo;