
import { create } from 'zustand';
import { api } from '../utils/api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('vb_user')) || null,
  isAuthenticated: !!localStorage.getItem('vb_user'),
  showAuthModal: false,
  authMode: 'login',
  showBankModal: false,

  openLogin: () => set({ showAuthModal: true, authMode: 'login' }),
  openSignup: () => set({ showAuthModal: true, authMode: 'signup' }),
  closeAuthModal: () => set({ showAuthModal: false }),
  openBankSetup: () => set({ showBankModal: true }),
  closeBankSetup: () => set({ showBankModal: false }),

  // REAL LOGIN - Connects to Backend
  login: async (username, password) => {
    try {
      const response = await api.login(username, password);
      const user = {
        id: response.user_id,
        name: response.name,
        token: response.token,
        username: username
      };
      localStorage.setItem('vb_user', JSON.stringify(user));
      set({ user, isAuthenticated: true, showAuthModal: false });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signup: (name, email, password) => {
    const fakeUser = { name, email, id: 2, isNew: true, bankDetails: null };
    localStorage.setItem('vb_user', JSON.stringify(fakeUser));
    set({ 
      user: fakeUser, 
      isAuthenticated: true, 
      showAuthModal: false,
      showBankModal: true 
    });
  },

  completeBankSetup: (details) => {
    const currentUser = JSON.parse(localStorage.getItem('vb_user'));
    const updatedUser = { ...currentUser, bankDetails: details, isNew: false };
    localStorage.setItem('vb_user', JSON.stringify(updatedUser));
    set({ user: updatedUser, showBankModal: false });
  },

  logout: () => {
    localStorage.removeItem('vb_user');
    set({ user: null, isAuthenticated: false });
  }
}));