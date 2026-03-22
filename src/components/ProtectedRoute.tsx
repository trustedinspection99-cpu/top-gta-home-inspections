import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/lib/supabase';

interface Props {
  children: ReactNode;
  role?: UserRole | UserRole[];
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, dbUser, loading, dbLoading } = useAuth();

  // Wait for auth check AND dbUser fetch to complete
  if (loading || dbLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && dbUser) {
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(dbUser.role)) {
      if (dbUser.role === 'admin') return <Navigate to="/admin" replace />;
      if (dbUser.role === 'realtor') return <Navigate to="/realtor-dashboard" replace />;
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
