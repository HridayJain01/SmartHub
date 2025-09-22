/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

/** Roles supported by the app */
export enum Role {
  Student = 'student',
  Institution = 'institution',
  Organizer = 'organizer',
  Recruiter = 'recruiter',
}

/** Shape of the user object your app uses */
export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

/** Auth context API */
export interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signUp: (email: string, password: string, role: Role, name: string, additionalData?: any) => Promise<SignUpResult>;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<{ success: boolean }>;
}

/** Discriminated results (prevents “possibly undefined”) */
export type SignUpResult =
  | { success: true }
  | { success: false; error: string };

export type SignInResult =
  | { success: true; user: AppUser }
  | { success: false; error: string };

/* ------------------------- helpers (type-safe) ------------------------- */

interface Metadata {
  name?: string;
  role?: Role;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseMetadata(meta: unknown): Metadata {
  if (!isRecord(meta)) return {};
  const name = typeof meta.name === 'string' ? meta.name : undefined;
  const roleStr = typeof meta.role === 'string' ? meta.role : undefined;

  const validRole = roleStr && (Object.values(Role) as string[]).includes(roleStr)
    ? (roleStr as Role)
    : undefined;

  return { name, role: validRole };
}

function toAppUser(u: SupabaseUser): AppUser {
  const { name, role } = parseMetadata(u.user_metadata);
  return {
    id: u.id,
    email: u.email ?? '',
    name: name ?? 'User',
    role: role ?? Role.Student,
  };
}

/* ------------------------------ context ------------------------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Hook */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

/** Provider */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      const session: Session | null = data.session ?? null;
      if (session?.user) setUser(toAppUser(session.user));
      setLoading(false);
    });

    // Auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(toAppUser(session.user));
      else setUser(null);
      setLoading(false);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, role: Role, name: string, additionalData?: any): Promise<SignUpResult> => {
    try {
      const userData = { name, role, ...additionalData };
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signIn = async (email: string, password: string): Promise<SignInResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      if (!data.user) return { success: false, error: 'Login failed' };
      return { success: true, user: toAppUser(data.user) };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { success: false };
      setUser(null);
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  const value: AuthContextType = { user, loading, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
