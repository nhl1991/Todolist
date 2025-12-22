"use client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { SERVER_URL } from "@/lib/serverUrl";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface User {
  email: string;
  username: string;
  userId: number;
}

// useAuth.ts
export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser: User }) {
  const [user, setUser] = useState<User | null>(initialUser);
  // const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
