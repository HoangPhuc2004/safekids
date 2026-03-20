import * as React from "react"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router"

export type UserRole = "teacher" | "student" | null;

interface User {
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("safekids_auth_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("safekids_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("safekids_auth_user");
    }
  }, [user]);

  const login = (username: string, password: string) => {
    if (username === "giaovien1" && password === "1") {
      setUser({ username, role: "teacher", name: "Cô Phương Dung" });
      return true;
    }
    if (username === "hocsinh1" && password === "1") {
      setUser({ username, role: "student", name: "Bé An Nhiên" });
      return true;
    }
    if (username === "hocsinha@gmail.com" && password === "1") {
      setUser({ username, role: "student", name: "Phạm Huỳnh Gia Quân" });
      return true;
    }
    if (username === "hocsinhb@gmail.com" && password === "1") {
      setUser({ username, role: "student", name: "Đặng Nguyễn Mai Thu" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
