import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuthData: ({ token, user }) => set(() => ({ token, user })),
      clearAuthData: () => set(() => ({ token: null, user: null })),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

export default useAuthStore;
