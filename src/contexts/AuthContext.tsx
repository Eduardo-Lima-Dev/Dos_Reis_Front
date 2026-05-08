import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { decodeJwt, isTokenExpired } from '../lib/jwt';
import type { JwtPayload } from '../types/api';

interface AuthContextValue {
  token: string | null;
  profile: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'access_token';

function loadToken(): string | null {
  const t = localStorage.getItem(TOKEN_KEY);
  if (!t || isTokenExpired(t)) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
  return t;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(loadToken);
  const profile = token ? decodeJwt(token) : null;

  const login = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, profile, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
