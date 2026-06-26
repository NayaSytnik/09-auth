import { create } from 'zustand';

interface User {
  email: string;
  username: string;
  avatar: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));