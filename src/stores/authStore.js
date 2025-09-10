import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isDropdownOpen: false,

      // Login action
      login: (token, userData) => {
        set({ token, user: userData });
      },

      // Logout action
      logout: () => {
        set({ token: null, user: null, isDropdownOpen: false });
      },

      // Update user data
      updateUser: (userData) => {
        set((state) => ({ user: { ...state.user, ...userData } }));
      },

      // Toggle dropdown
      toggleDropdown: () => {
        set((state) => ({ isDropdownOpen: !state.isDropdownOpen }));
      },

      // Close dropdown
      closeDropdown: () => {
        set({ isDropdownOpen: false });
      },

      // Open dropdown
      openDropdown: () => {
        set({ isDropdownOpen: true });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
