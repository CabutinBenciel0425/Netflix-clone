import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isSigningOut: false,
  isSigningIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/sign-up", credentials);
      set({ user: response.data.data, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.error(`Error in authStore signup: `, error.message);
      toast.error(error.response.data.message || "An error occured");
      set({ user: null, isSigningUp: false });
    }
  },
  signin: async (credentials) => {
    set({ isSigningIn: true });
    try {
      const response = await axios.post("/api/v1/auth/sign-in", credentials);
      set({ user: response.data.data, isSigningIn: false });
      toast.success("Successfully signed in");
    } catch (error) {
      console.error(`Error in authStore signin: `, error.message);
      toast.error(error.response.data.message || "An error occured");
      set({ user: null, isSigningIn: false });
    }
  },
  signout: async () => {
    set({ isSigningOut: true });

    try {
      await axios.post("/api/v1/auth/sign-out");
      set({ user: null, isSigningOut: false });
      toast.success("You have been signed out");
    } catch (error) {
      console.error(`Error in authStore signout: `, error.message);
      set({ isSigningOut: false });
      toast.error(
        error.response.data.message || "An error occured while logging out",
      );
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error(`Error in authStore authCheck: `, error.message);
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
