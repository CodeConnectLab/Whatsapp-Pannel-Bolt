import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Switch, 
  Popconfirm, 
  message,
  Tabs,
  Badge,
  Space
} from 'antd';
import { PlusCircle, Edit2, Trash2, Tag as TagIcon } from 'lucide-react';
import { Tag } from '../types';
import { mockTags } from '../data/mockData';

const ManageTags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // Initialize with mock data
    setTags(mockTags);
  }, []);

  const filteredTags = tags.filter(tag => {
    if (activeTab === 'active') return tag.isActive;
    if (activeTab === 'inactive') return !tag.isActive;
    return true; // 'all' tab
  });

  const showModal = (tag?: Tag) => {
    setEditingTag(tag || null);
    form.setFieldsValue(tag || { name: '', isActive: true, color: '#1890ff' });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingTag) {
        // Update existing tag
        setTags(prevTags => 
          prevTags.map(tag => 
            tag.id === editingTag.id 
              ? { ...tag, ...values } 
              : tag
          )
        );
        message.success('Tag updated successfully');
      } else {
        // Add new tag
        const newTag: Tag = {
          id: `tag-${Date.now()}`,
          name: values.name,
          isActive: values.isActive,
          color: values.color
        };
        setTags([...tags, newTag]);
        message.success('Tag created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    message.success('Tag deleted successfully');
  };

  const toggleStatus = (tag: Tag) => {
    setTags(tags.map(t => 
      t.id === tag.id ? { ...t, isActive: !t.isActive } : t
    ));
    message.success(`Tag ${tag.isActive ? 'deactivated' : 'activated'} successfully`);
  };

  const columns = [
    {
      title: 'Tag Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Tag) => (
        <div className="flex items-center">
          <span 
            className="w-4 h-4 rounded-full mr-2" 
            style={{ backgroundColor: record.color }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        isActive ? 
          <Badge status="success" text="Active" /> : 
          <Badge status="default" text="Inactive" />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Tag) => (
        <Space>
          <Switch 
            checked={record.isActive} 
            onChange={() => toggleStatus(record)} 
            checkedChildren="Active" 
            unCheckedChildren="Inactive"
          />
          <Button 
            type="text" 
            icon={<Edit2 size={16} />} 
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Delete this tag?"
            description="Are you sure you want to delete this tag?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<Trash2 size={16} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TagIcon size={24} className="mr-2 text-green-500" />
          <h1 className="text-2xl font-bold">Manage Tags</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusCircle size={16} />}
          onClick={() => showModal()}
        >
          Add New Tag
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { 
              key: 'all', 
              label: (
                <span>All Tags <Badge count={tags.length} style={{ marginLeft: 8 }} />
                </span>
              ) 
            },
            { 
              key: 'active', 
              label: (
                <span>Active <Badge count={tags.filter(t => t.isActive).length} style={{ marginLeft: 8, backgroundColor: '#52c41a' }} />
                </span>
              ) 
            },
            { 
              key: 'inactive', 
              label: (
                <span>Inactive <Badge count={tags.filter(t => !t.isActive).length} style={{ marginLeft: 8 }} />
                </span>
              ) 
            },
          ]}
        />

        <Table 
          dataSource={filteredTags} 
          columns={columns} 
          rowKey="id" 
          pagination={false}
          className="mt-4"
        />
      </div>

      <Modal
        title={editingTag ? "Edit Tag" : "Create New Tag"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingTag ? "Update" : "Create"}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Tag Name"
            rules={[{ required: true, message: 'Please enter a tag name' }]}
          >
            <Input placeholder="Enter tag name" />
          </Form.Item>
          
          <Form.Item
            name="color"
            label="Tag Color"
          >
            <Input type="color" className="w-full h-10" />
          </Form.Item>
          
          <Form.Item
            name="isActive"
            label="Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTags;