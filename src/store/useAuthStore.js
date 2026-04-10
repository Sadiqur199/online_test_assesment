import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  login: (data, role) => set({ user: data, role }),
  logout: () => set({ user: null, role: null }),
}));