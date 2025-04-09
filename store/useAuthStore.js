import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuthData: ({ token, user }) => {
        const currentState = get();
        set({
          token: token ?? currentState.token,
          user: user ? { ...currentState.user, ...user } : currentState.user,
        });
      },
      clearAuthData: () => set(() => ({ token: null, user: null })),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

export default useAuthStore;
