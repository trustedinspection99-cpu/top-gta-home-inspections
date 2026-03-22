import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, DbUser, UserRole } from '@/lib/supabase';

interface AuthContextValue {
  user: User | null;
  dbUser: DbUser | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string, role: UserRole, phone?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchDbUser(userId: string) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setDbUser(data as DbUser);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchDbUser(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchDbUser(session.user.id);
      } else {
        setDbUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  }

  async function signUp(email: string, password: string, name: string, role: UserRole, phone?: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return { error: error as Error | null };

    // Insert into users table
    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id,
      email,
      role,
      name,
      phone: phone ?? null,
    });

    return { error: insertError as Error | null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setDbUser(null);
  }

  return {
    user,
    dbUser,
    session,
    role: dbUser?.role ?? null,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
