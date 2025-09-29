/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import dummyUsers from '../data/dummyUsers.json';

/** Roles supported by the app */
export enum Role {
  Student = 'student',
  Institution = 'institution',
  Department = 'department', 
  Organizer = 'organizer',
  Recruiter = 'recruiter',
}

/** Shape of the user object your app uses */
export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  isComplete: boolean;
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

function toAppUser(dummyUser: any): AppUser {
  return {
    id: dummyUser.id,
    email: dummyUser.email,
    name: dummyUser.name,
    role: dummyUser.role,
    isComplete: dummyUser.isComplete,
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
  const [user, setUser] = useState<AppUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<SignInResult> => {
    setLoading(true); // Set loading to true when sign-in starts
    const dummyUser = dummyUsers.users.find(
      (user) => user.email === email && user.password === password
    );
    if (dummyUser) {
      const appUser = toAppUser(dummyUser);
      setUser(appUser); // Update the user state
      localStorage.setItem('user', JSON.stringify(appUser)); // Persist user in localStorage
      setLoading(false); // Set loading to false after user is set
      return { success: true, user: appUser };
    }
    setLoading(false); // Set loading to false if sign-in fails
    return { success: false, error: 'Invalid email or password' };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user from localStorage
    return { success: true };
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp: async () => ({ success: false, error: 'Sign-up is not implemented in this prototype.' }), // Updated to include `error`
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
