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
  Space,
  Select
} from 'antd';
import { PlusCircle, Edit2, Trash2, Users } from 'lucide-react';

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  isActive: boolean;
}

// Mock data for initial users
const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    isActive: true
  },
  {
    id: 'user-2',
    name: 'Agent One',
    email: 'agent1@example.com',
    role: 'agent',
    isActive: true
  },
  {
    id: 'user-3',
    name: 'Agent Two',
    email: 'agent2@example.com',
    role: 'agent',
    isActive: false
  }
];

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // Initialize with mock data
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    if (activeTab === 'admin') return user.role === 'admin';
    if (activeTab === 'agent') return user.role === 'agent';
    if (activeTab === 'active') return user.isActive;
    if (activeTab === 'inactive') return !user.isActive;
    return true; // 'all' tab
  });

  const showModal = (user?: User) => {
    setEditingUser(user || null);
    form.setFieldsValue(user || { name: '', email: '', role: 'agent', isActive: true });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      // Check if we're trying to change the role of the last admin
      if (
        editingUser?.role === 'admin' && 
        values.role === 'agent' && 
        users.filter(user => user.role === 'admin').length === 1
      ) {
        message.error('System must have at least one admin');
        return;
      }
      
      if (editingUser) {
        // Update existing user
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === editingUser.id 
              ? { ...user, ...values } 
              : user
          )
        );
        message.success('User updated successfully');
      } else {
        // Add new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: values.name,
          email: values.email,
          role: values.role,
          isActive: values.isActive
        };
        setUsers([...users, newUser]);
        message.success('User created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (userId: string) => {
    // Check if this is the last admin
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete?.role === 'admin' && users.filter(user => user.role === 'admin').length === 1) {
      message.error('Cannot delete the only admin user');
      return;
    }
    
    setUsers(users.filter(user => user.id !== userId));
    message.success('User deleted successfully');
  };

  const toggleStatus = (user: User) => {
    // Check if this is the last active admin
    if (
      user.role === 'admin' && 
      user.isActive && 
      users.filter(u => u.role === 'admin' && u.isActive).length === 1
    ) {
      message.error('System must have at least one active admin');
      return;
    }
    
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isActive: !u.isActive } : u
    ));
    message.success(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        role === 'admin' ? 
          <Badge status="success" text="Admin" /> : 
          <Badge status="processing" text="Agent" />
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
      render: (_, record: User) => (
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
            title="Delete this user?"
            description="Are you sure you want to delete this user?"
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
          <Users size={24} className="mr-2 text-blue-500" />
          <h1 className="text-2xl font-bold">Manage Users</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusCircle size={16} />}
          onClick={() => showModal()}
        >
          Add New User
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
                <span>All Users <Badge count={users.length} style={{ marginLeft: 8 }} />
                </span>
              ) 
            },
            { 
              key: 'admin', 
              label: (
                <span>Admins <Badge count={users.filter(u => u.role === 'admin').length} style={{ marginLeft: 8, backgroundColor: '#52c41a' }} />
                </span>
              ) 
            },
            { 
              key: 'agent', 
              label: (
                <span>Agents <Badge count={users.filter(u => u.role === 'agent').length} style={{ marginLeft: 8, backgroundColor: '#1890ff' }} />
                </span>
              ) 
            },
            { 
              key: 'active', 
              label: (
                <span>Active <Badge count={users.filter(u => u.isActive).length} style={{ marginLeft: 8, backgroundColor: '#52c41a' }} />
                </span>
              ) 
            },
            { 
              key: 'inactive', 
              label: (
                <span>Inactive <Badge count={users.filter(u => !u.isActive).length} style={{ marginLeft: 8 }} />
                </span>
              ) 
            },
          ]}
        />

        <Table 
          dataSource={filteredUsers} 
          columns={columns} 
          rowKey="id" 
          pagination={false}
          className="mt-4"
        />
      </div>

      <Modal
        title={editingUser ? "Edit User" : "Create New User"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingUser ? "Update" : "Create"}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="agent">Agent</Select.Option>
            </Select>
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

export default ManageUsers;
