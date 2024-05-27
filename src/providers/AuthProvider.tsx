import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider(props: any) {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    const token: string = localStorage.getItem('token');
    if (token) setToken(token);
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}