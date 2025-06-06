import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import databaseService from "@/services/databaseService";
import { auth } from "./firebaseConfig";

interface ErrorResponse {
  error: string;
}

const authService = {
  //Register user
  async register(
    email: string,
    password: string,
    user_name: string,
    profile_url: string
  ): Promise<
    { success: true; data: User } | { success: false; message: string }
  > {
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
        if (message.includes("(auth/email-already-in-use)"))
          message = "This email is already in use";
        return { success: false, message };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  },

  //Login user
  async login(
    email: string,
    password: string
  ): Promise<
    { success: true; data: User } | { success: false; message: string }
  > {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response.user };
    } catch (error) {
      if (error instanceof Error) {
        let message = error.message;
        if (message.includes("(auth/invalid-credential)"))
          message = "Invalid email or password";
        return { success: false, message };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  },

  //Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  //Logout user
  async logout(): Promise<void | ErrorResponse> {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message || "Failed to logout. Please try again",
        };
      }
    }
  },
};

export default authService;
