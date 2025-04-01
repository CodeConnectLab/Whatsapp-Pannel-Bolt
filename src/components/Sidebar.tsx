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

  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;
  const role = userData ? userData.role : null; // Get the role from localStorage

  // Define navigation items
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },  //live-chat
    { icon: MessageSquare, label: 'Live Chat - Inbox', id: 'live-chat', showFor: ['agent'] }, // Only show for 'agent'
    { icon: FileText, label: 'Template', id: 'template' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: Tags, label: 'Manage Tags', id: 'manage-tags' },
    { icon: History, label: 'History', id: 'history' },
    { icon: Contact, label: 'Contacts', id: 'contacts' },
  ];

  // Filter navigation items based on role
  const filteredNavItems = navItems.filter((item) => {
    if (item?.showFor) {
      return item?.showFor.includes(role); // Only include items allowed for the user's role
    }
    return true; // Include items without a `showFor` restriction
  });

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col items-center py-4 transition-all duration-300 ${expanded ? 'w-48' : 'w-16'} relative`} style={{ marginTop: '48px' }}>
      <button
        onClick={onToggle}
        className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {filteredNavItems.map(({ icon: Icon, label, id }) => (
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