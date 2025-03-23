import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  History, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Contact,
  Tags
} from 'lucide-react';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
  activeItem?: string;
  onSelectItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, onToggle, activeItem, onSelectItem }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: MessageSquare, label: 'Live Chat - Inbox', id: 'live-chat' },
    { icon: FileText, label: 'Template', id: 'template' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: Tags, label: 'Manage Tags', id: 'manage-tags' },
    { icon: History, label: 'History', id: 'history' },
    { icon: Contact, label: 'Contacts', id: 'contacts' }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col items-center py-4 transition-all duration-300 ${expanded ? 'w-48' : 'w-16'} relative`} style={{ marginTop: '48px' }}>
      <button
        onClick={onToggle}
        className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {navItems.map(({ icon: Icon, label, id }) => (
        <button
          key={id}
          className={`p-3 rounded-lg hover:bg-gray-100 transition-colors w-full flex items-center ${
            expanded ? 'justify-start' : 'justify-center'
          } ${
            activeItem === id 
              ? 'bg-green-50 text-green-600' 
              : 'text-gray-600 hover:text-green-500'
          }`}
          title={label}
          onClick={() => onSelectItem(id)}
        >
          <Icon size={24} />
          {expanded && <span className="ml-3">{label}</span>}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;