import React from 'react';

interface PageContentProps {
  pageId: string;
}

const PageContent: React.FC<PageContentProps> = ({ pageId }) => {
  // This is a simple component that renders different page content based on the active page ID
  
  const renderPageContent = () => {
    switch (pageId) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <p>Welcome to your WhatsApp dashboard!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg">Active Conversations</h3>
                <p className="text-3xl font-bold mt-2">24</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg">Messages Today</h3>
                <p className="text-3xl font-bold mt-2">156</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg">Response Rate</h3>
                <p className="text-3xl font-bold mt-2">98%</p>
              </div>
            </div>
          </div>
        );

      case 'template':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Message Templates</h1>
            <p>Manage your WhatsApp message templates here.</p>
            <div className="bg-white p-4 rounded-lg shadow mt-6">
              <h3 className="font-medium text-lg mb-4">Your Templates</h3>
              <div className="border rounded-lg p-4 mb-4">
                <h4 className="font-medium">Welcome Message</h4>
                <p className="text-gray-600 mt-2">Hello , welcome to our service! How can we help you today?</p>
              </div>
              <div className="border rounded-lg p-4 mb-4">
                <h4 className="font-medium">Order Confirmation</h4>
                <p className="text-gray-600 mt-2">Your order has been confirmed and will be shipped within 24 hours.</p>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <p>Manage system users and their permissions.</p>
            <div className="bg-white p-4 rounded-lg shadow mt-6">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Role</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-3">John Doe</td>
                    <td className="py-2 px-3">john@example.com</td>
                    <td className="py-2 px-3">Admin</td>
                    <td className="py-2 px-3 text-green-500">Active</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-3">Jane Smith</td>
                    <td className="py-2 px-3">jane@example.com</td>
                    <td className="py-2 px-3">Agent</td>
                    <td className="py-2 px-3 text-green-500">Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Chat History</h1>
            <p>View past conversations and interactions.</p>
            <div className="bg-white p-4 rounded-lg shadow mt-6">
              <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="border rounded-lg px-3 py-2 w-64"
                />
                <div>
                  <label className="mr-2">Date Range:</label>
                  <select className="border rounded-lg px-3 py-2">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Custom range</option>
                  </select>
                </div>
              </div>
              <div className="border-t py-3">
                <p className="font-medium">John Smith - +1 234-567-8900</p>
                <p className="text-gray-500 text-sm">Last message: Hello, I need help with my order.</p>
                <p className="text-gray-400 text-xs">March 19, 2025 - 10:23 AM</p>
              </div>
              <div className="border-t py-3">
                <p className="font-medium">Sarah Johnson - +1 345-678-9012</p>
                <p className="text-gray-500 text-sm">Last message: Thank you for your assistance!</p>
                <p className="text-gray-400 text-xs">March 18, 2025 - 4:45 PM</p>
              </div>
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Contacts</h1>
            <p>Manage your WhatsApp contacts.</p>
            <div className="bg-white p-4 rounded-lg shadow mt-6">
              <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="border rounded-lg px-3 py-2 w-64"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Add New Contact</button>
              </div>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Phone</th>
                    <th className="text-left py-2 px-3">Last Contact</th>
                    <th className="text-left py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-3">John Smith</td>
                    <td className="py-2 px-3">+1 234-567-8900</td>
                    <td className="py-2 px-3">March 19, 2025</td>
                    <td className="py-2 px-3">
                      <button className="text-blue-500 mr-2">Edit</button>
                      <button className="text-green-500">Message</button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-3">Sarah Johnson</td>
                    <td className="py-2 px-3">+1 345-678-9012</td>
                    <td className="py-2 px-3">March 18, 2025</td>
                    <td className="py-2 px-3">
                      <button className="text-blue-500 mr-2">Edit</button>
                      <button className="text-green-500">Message</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      // The live chat page will show the current chat interface
      case 'live-chat':
      default:
        return null; // This will be rendered by the existing ChatList and ChatArea components
    }
  };

  // Only render content for pages other than live-chat
  if (pageId !== 'live-chat') {
    return (
      <div className="flex-1 bg-gray-50" style={{ marginTop: '48px' }}>
        {renderPageContent()}
      </div>
    );
  }
  
  return null;
};

export default PageContent;