import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null, loading: true, isAdmin: false, isStaff: false, login: () => {}, logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState({ isAdmin: false, isStaff: false });

  useEffect(() => {
    // Check local storage for mock auth
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRoles({ isAdmin: true, isStaff: true });
    }
    setLoading(false);
  }, []);

  const login = () => {
    const mockUser = {
      uid: 'admin-001',
      email: 'TonyEarth0103@gmail.com',
      displayName: 'System Admin'
    };
    setUser(mockUser);
    setRoles({ isAdmin: true, isStaff: true });
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setRoles({ isAdmin: false, isStaff: false });
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, ...roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
