import React, { useState } from 'react';
import { Modal, Button, Input, Select, Table, Space, Popconfirm, message } from 'antd';

interface Template {
  id: string;
  name: string;
  type: 'Utility Templates' | 'Marketing Templates' | 'Authentication Templates';
  content: string;
}

const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Welcome Message',
      type: 'Utility Templates',
      content: 'Used for transactional updates like order confirmations, shipping updates, and appointment reminders.',
    },
    {
      id: '2',
      name: 'Order Confirmation',
      type: 'Marketing Templates',
      content: 'Used for promotional messages, offers, discounts, and customer engagement.',
    },
    {
        id: '3',
        name: 'OTP Verification',
        type: 'Authentication Templates',
        content: 'Used for one-time passwords (OTP), account verification, and login confirmations.',
      },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<Template>({
    id: '',
    name: '',
    type: 'Utility Templates',
    content: '',
  });

  // Open the modal for adding or editing
  const openModal = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setNewTemplate(template);
    } else {
      setEditingTemplate(null);
      setNewTemplate({ id: '', name: '', type: 'Utility Templates', content: '' });
    }
    setIsModalOpen(true);
  };

  // Handle saving the template
  const handleSaveTemplate = () => {
    if (editingTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === editingTemplate.id ? { ...newTemplate, id: editingTemplate.id } : template
        )
      );
      message.success('Template updated successfully!');
    } else {
      // Add new template
    //   if (templates.length >= 3) {
    //     message.error('You can only create up to 3 templates.');
    //     return;
    //   }
      setTemplates((prev) => [
        ...prev,
        { ...newTemplate, id: Date.now().toString() },
      ]);
      message.success('Template added successfully!');
    }
    setIsModalOpen(false);
  };

  // Handle deleting a template
  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id));
    message.success('Template deleted successfully!');
  };

  // Columns for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (content: string) => (
        <span className="truncate" title={content}>
          {content.length > 50 ? `${content.slice(0, 50)}...` : content}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Template) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this template?"
            onConfirm={() => handleDeleteTemplate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Message Templates</h1>
      <p>Manage your WhatsApp message templates here.</p>
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <div className="flex justify-between mb-4">
          <Input
            type="text"
            placeholder="Search templates..."
            className="border rounded-lg px-3 py-2 w-64"
          />
          <Button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => openModal()}
          >
            Add New Template
          </Button>
        </div>
        <Table dataSource={templates} columns={columns} rowKey="id" />
      </div>

      {/* Modal for Adding/Editing Template */}
      <Modal
        title={editingTemplate ? 'Edit Template' : 'Add New Template'}
        open={isModalOpen}
        onOk={handleSaveTemplate}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={newTemplate.name}
            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            placeholder="Enter template name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Type</label>
          <Select
            value={newTemplate.type}
            onChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
            className="w-full"
          >
            <Select.Option value="Utility Templates">Utility Templates</Select.Option>
            <Select.Option value="Marketing Templates">Marketing Templates</Select.Option>
            <Select.Option value="Authentication Templates">Authentication Templates</Select.Option>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <Input.TextArea
            value={newTemplate.content}
            onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
            placeholder="Enter template content"
            rows={4}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TemplateManager;