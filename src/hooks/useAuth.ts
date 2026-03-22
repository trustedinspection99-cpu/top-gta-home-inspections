import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, DbUser, UserRole } from '@/lib/supabase';

interface AuthContextValue {
  user: User | null;
  dbUser: DbUser | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  dbLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string, role: UserRole, phone?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_DEFAULTS: AuthContextValue = {
  user: null,
  dbUser: null,
  session: null,
  role: null,
  loading: false,
  dbLoading: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  return ctx ?? AUTH_DEFAULTS;
}

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbLoading, setDbLoading] = useState(false);

  async function fetchDbUser(userId: string) {
    setDbLoading(true);
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setDbUser(data as DbUser);
    setDbLoading(false);
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role, phone: phone ?? null },
      },
    });
    return { error: error as Error | null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setDbUser(null);
  }

  // Role: prefer DB row (authoritative), fall back to JWT metadata (instant, no DB needed)
  const metaRole = (user?.user_metadata?.role ?? null) as UserRole | null;

  return {
    user,
    dbUser,
    session,
    role: dbUser?.role ?? metaRole,
    loading,
    dbLoading,
    signIn,
    signUp,
    signOut,
  };
}
