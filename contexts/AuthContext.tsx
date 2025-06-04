import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "@/services/authService";
import { auth } from "@/services/firebaseConfig";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (
    email: string,
    password: string,
    user_name: string,
    profile_url: string
  ) => Promise<
    { success: true; data: User } | { success: false; message: string }
  >;
  login: (
    email: string,
    password: string
  ) => Promise<
    { success: true; data: User } | { success: false; message: string }
  >;
  logout: () => Promise<void>;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const register = async (
    email: string,
    password: string,
    user_name: string,
    profile_url: string
  ) => {
    return await authService.register(email, password, user_name, profile_url);
  };

  const login = async (email: string, password: string) => {
    return await authService.login(email, password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
