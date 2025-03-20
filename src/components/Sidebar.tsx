import React from 'react';
import { MessageSquare, Users, History, Settings, BarChart2, ChevronRight, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, onToggle }) => {
  const navItems = [
    { icon: MessageSquare, label: 'Chats' },
    { icon: Users, label: 'Contacts' },
    { icon: History, label: 'History' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col items-center py-4 transition-all duration-300 ${expanded ? 'w-48' : 'w-16'} relative`} style={{ marginTop: '48px' }}>
      <button
        onClick={onToggle}
        className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {navItems.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className={`p-3 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-green-500 transition-colors w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'}`}
          title={label}
        >
          <Icon size={24} />
          {expanded && <span className="ml-3">{label}</span>}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;