import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  //   login: (
  //     email: string,
  //     password: string
  //   ) => Promise<{ success: true } | { error: string }>;
  //   register: (
  //     email: string,
  //     password: string,
  //     user_name: string,
  //     profile_url: string
  //   ) => Promise<{ success: true } | { error: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //onAuthStateChange
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 3000);
  }, []);

  //   const login = async (email: string, password: string) => {
  //     try {
  //     } catch (error) {}
  //   };

  //   const register = async (
  //     email: string,
  //     password: string,
  //     user_name: string,
  //     profile_url: string
  //   ) => {
  //     try {
  //     } catch (error) {}
  //   };
  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout }}>
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
