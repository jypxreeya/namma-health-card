import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobile?: string;
  role: {
    name: string;
    code: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        Cookies.set('nhc_token', token, { expires: 7 }); // 7 days
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove('nhc_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: 'nhc-auth-storage',
    }
  )
);
