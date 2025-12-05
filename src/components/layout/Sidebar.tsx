import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Map, Plus, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  onAddTask: () => void;
}

const Sidebar = ({ onAddTask }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Map, label: 'Roadmap', path: '/board' },
    { icon: LayoutDashboard, label: 'Board', path: '/board', active: true },
    { icon: Plus, label: 'Add Item', action: onAddTask },
    { icon: Settings, label: 'Project settings', path: '/board' },
  ];

  return (
    <aside className="w-56 min-h-screen bg-sidebar flex flex-col">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Design Team</h2>
      </div>
      
      <nav className="flex-1 px-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action || (() => {})}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors
              ${item.active 
                ? 'bg-sidebar-hover text-sidebar-foreground' 
                : 'text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground'
              }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="px-2 py-4 border-t border-sidebar-hover">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
