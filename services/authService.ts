import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import databaseService from "@/services/databaseService";
import { auth } from "./firebaseConfig";

const register = async (
  email: string,
  password: string,
  user_name: string,
  profile_url: string
): Promise<
  { success: true; data: User } | { success: false; message: string }
> => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await databaseService.set("users", response?.user?.uid, {
      user_name,
      profile_url,
      user_id: response.user.uid,
    });
    return { success: true, data: response.user };
  } catch (error) {
    if (error instanceof Error) {
      let message = error.message;
      if (message.includes("(auth/invalid-email)")) message = "Invalid email";
      return { success: false, message };
    }
    return { success: false, message: "Unknown error occurred" };
  }
};

const login = async (
  email: string,
  password: string
): Promise<
  { success: true; data: User } | { success: false; message: string }
> => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, data: response.user };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error occurred" };
  }
};

const logout = async (): Promise<void> => {
  await signOut(auth);
};

export default {
  register,
  login,
  logout,
};
