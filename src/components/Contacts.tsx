import React, { useState } from 'react';
import { Modal, Button, Input, Table, Space, Popconfirm, message } from 'antd';

interface Contact {
  id: string;
  name: string;
  phone: string;
  lastContact: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'John Smith', phone: '+1 234-567-8900', lastContact: 'March 19, 2025' },
    { id: '2', name: 'Sarah Johnson', phone: '+1 345-678-9012', lastContact: 'March 18, 2025' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Contact>({
    id: '',
    name: '',
    phone: '',
    lastContact: '',
  });

  // Open the modal for adding or editing
  const openModal = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setNewContact(contact);
    } else {
      setEditingContact(null);
      setNewContact({ id: '', name: '', phone: '', lastContact: '' });
    }
    setIsModalOpen(true);
  };

  // Handle saving the contact
  const handleSaveContact = () => {
    if (editingContact) {
      // Update existing contact
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id ? { ...newContact, id: editingContact.id } : contact
        )
      );
      message.success('Contact updated successfully!');
    } else {
      // Add new contact
      setContacts((prev) => [
        ...prev,
        { ...newContact, id: Date.now().toString(), lastContact: 'Just now' },
      ]);
      message.success('Contact added successfully!');
    }
    setIsModalOpen(false);
  };

  // Handle deleting a contact
  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    message.success('Contact deleted successfully!');
  };

  // Columns for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Last Contact',
      dataIndex: 'lastContact',
      key: 'lastContact',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Contact) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDeleteContact(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>
      <p>Manage your WhatsApp contacts.</p>
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <div className="flex justify-between mb-4">
          <Input
            type="text"
            placeholder="Search contacts..."
            className="border rounded-lg px-3 py-2 w-64"
          />
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => openModal()}
          >
            Add New Contact
          </Button>
        </div>
        <Table dataSource={contacts} columns={columns} rowKey="id" />
      </div>

      {/* Modal for Adding/Editing Contact */}
      <Modal
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
        open={isModalOpen}
        onOk={handleSaveContact}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            placeholder="Enter phone number"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;