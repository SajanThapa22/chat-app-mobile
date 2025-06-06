import { onAuthStateChanged, User, UserProfile } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "@/services/authService";
import { auth } from "@/services/firebaseConfig";
import databaseService from "@/services/databaseService";
import { UserProfileData } from "@/types/user";

interface AuthContextType {
  user: User | null;
  userProfileData: UserProfileData | null;
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
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: string) => {
    const userData = await databaseService.getUserData(userId);
    if (userData) {
      setUserProfileData({
        user_id: userData.user_id,
        user_name: userData.user_name,
        profile_url: userData.profile_url,
      });
    }
  };

  const register = async (
    email: string,
    password: string,
    user_name: string,
    profile_url: string
  ) => {
    return authService.register(email, password, user_name, profile_url);
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
      value={{
        user,
        userProfileData,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
      }}
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
