import React from 'react';
import ManageTags from './ManageTags';
import ManageUsers from './ManageUsers'; // Import the ManageUsers component
import Contacts from './Contacts';
import TemplateManager from './TemplateManager'; // Import the TemplateManager component
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
interface PageContentProps {
  pageId: string;
  onOpenChatInLivePanel?: (chatId: string) => void;
}

const PageContent: React.FC<PageContentProps> = ({ pageId, onOpenChatInLivePanel }) => {
  const chatsPerMonthData = [
    { month: 'Jan', chats: 120 },
    { month: 'Feb', chats: 200 },
    { month: 'Mar', chats: 150 },
    { month: 'Apr', chats: 180 },
    { month: 'May', chats: 220 },
    { month: 'Jun', chats: 300 },
  ];

  const messagesPerAgentData = [
    { agent: 'Shashank', messages: 400 },
    { agent: 'Abhilekh', messages: 300 },
    { agent: 'Himanshu', messages: 500 },
  ];

  const responseRateData = [
    { name: 'Responded', value: 85 },
    { name: 'Missed', value: 15 },
  ];

  const COLORS = ['#0088FE', '#FF8042'];
  // This is a simple component that renders different page content based on the active page ID
  
  const handleChatHistoryClick = (chatId: string) => {
    if (onOpenChatInLivePanel) {
      onOpenChatInLivePanel(chatId);
    }
  };
 

  
  const yourChatPanelHandler = (chatId: string, navigate: ReturnType<typeof useNavigate>) => {
    console.log('Opening chat in Live Chat panel:', pageId, chatId);
    if (onOpenChatInLivePanel) {
      onOpenChatInLivePanel(chatId); // Notify the parent to update the pageId and handle the chat
    }
    navigate('/live-chat-panel'); // Navigate to the live chat panel
  };

  const renderPageContent = () => {
    switch (pageId) {
       case 'dashboard':
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to your WhatsApp dashboard!</p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Active Conversations */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg">Active Conversations</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>

        {/* Messages Today */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg">Messages Today</h3>
          <p className="text-3xl font-bold mt-2">156</p>
        </div>

        {/* Response Rate */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg">Response Rate</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold mt-2">98%</p>
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg">Total Users</h3>
          <p className="text-3xl font-bold mt-2">1,245</p>
        </div>

        {/* New Users Today */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg">New Users Today</h3>
          <p className="text-3xl font-bold mt-2">32</p>
        </div>

        {/* Average Response Time */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg">Avg. Response Time</h3>
          <p className="text-3xl font-bold mt-2">2m 45s</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Chats Per Month Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg mb-4">Chats Per Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chatsPerMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="chats"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Messages Per Agent Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg mb-4">Messages Per Agent</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={messagesPerAgentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agent" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="messages" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Rate Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-lg mb-4">Response Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={responseRateData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {responseRateData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

      case 'template':
       return (<TemplateManager />); // Use the TemplateManager component

      case 'users':
        return <ManageUsers  pageId={pageId} onOpenChatInLivePanel={yourChatPanelHandler}  />; // Use the ManageUsers component

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
              <div 
                className="border-t py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleChatHistoryClick('chat-1')}
                title="Click to open in Live Chat panel"
              >
                <p className="font-medium">John Smith - +1 234-567-8900</p>
                <p className="text-gray-500 text-sm">Last message: Hello, I need help with my order.</p>
                <p className="text-gray-400 text-xs">March 19, 2025 - 10:23 AM</p>
              </div>
              <div 
                className="border-t py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleChatHistoryClick('chat-2')}
                title="Click to open in Live Chat panel"
              >
                <p className="font-medium">Sarah Johnson - +1 345-678-9012</p>
                <p className="text-gray-500 text-sm">Last message: Thank you for your assistance!</p>
                <p className="text-gray-400 text-xs">March 18, 2025 - 4:45 PM</p>
              </div>
            </div>
          </div>
        );

      case 'contacts':
        return <Contacts />; // Use the Contacts component

      case 'manage-tags':
        return <ManageTags />;

      // The live chat page will show the current chat interface  live-chat
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