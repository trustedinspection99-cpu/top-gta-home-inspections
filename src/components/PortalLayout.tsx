import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  CheckSquare,
  LogOut,
  Home,
  Users,
  Briefcase,
  PlusCircle,
  Star,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" />, roles: ['homeowner'] },
  { label: 'Schedule', path: '/dashboard/schedule', icon: <Calendar className="h-4 w-4" />, roles: ['homeowner'] },
  { label: 'Checklist', path: '/dashboard/checklist', icon: <CheckSquare className="h-4 w-4" />, roles: ['homeowner'] },
  { label: 'Dashboard', path: '/realtor-dashboard', icon: <LayoutDashboard className="h-4 w-4" />, roles: ['realtor'] },
  { label: 'Schedule', path: '/dashboard/schedule', icon: <Calendar className="h-4 w-4" />, roles: ['realtor'] },
  { label: 'Checklist', path: '/dashboard/checklist', icon: <CheckSquare className="h-4 w-4" />, roles: ['realtor'] },
  { label: 'Trusted Realtors', path: '/trusted-realtors', icon: <Users className="h-4 w-4" />, roles: ['realtor'] },
  { label: 'Admin Dashboard', path: '/admin', icon: <LayoutDashboard className="h-4 w-4" />, roles: ['admin'] },
  { label: 'New Job', path: '/admin/jobs/new', icon: <PlusCircle className="h-4 w-4" />, roles: ['admin'] },
  { label: 'Realtors', path: '/admin/realtors', icon: <Users className="h-4 w-4" />, roles: ['admin'] },
];

export default function PortalLayout({ children }: { children: ReactNode }) {
  const { dbUser, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const visibleNav = role ? NAV_ITEMS.filter(item => item.roles.includes(role)) : [];

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-gray-900 text-sm">ASADS Home Inspection</span>
          </Link>
        </div>

        {/* User info */}
        {dbUser && (
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{dbUser.role}</p>
            <p className="font-medium text-gray-900 text-sm truncate">{dbUser.name}</p>
            <p className="text-xs text-gray-500 truncate">{dbUser.email}</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {visibleNav.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
