// FILE: src/store/authStore.js
import { create } from 'zustand';
import { api } from '../utils/mockApi';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('vb_user')) || null,
  isAuthenticated: !!localStorage.getItem('vb_user'),
  showAuthModal: false,
  authMode: 'login',
  showBankModal: false,

  // Actions
  openLogin: () => set({ showAuthModal: true, authMode: 'login' }),
  openSignup: () => set({ showAuthModal: true, authMode: 'signup' }),
  closeAuthModal: () => set({ showAuthModal: false }),
  
  openBankSetup: () => set({ showBankModal: true }),
  closeBankSetup: () => set({ showBankModal: false }),

  login: async (email, password) => {
    try {
        const data = await api.login(email, password); 
        const user = { ...data, email }; 
        
        localStorage.setItem('vb_user', JSON.stringify(user));
        set({ user, isAuthenticated: true, showAuthModal: false });
    } catch (error) {
        console.error("Login failed", error);
        // Throw the error so the component can catch it and show the message
        throw error; 
    }
  },

  signup: async (name, email, password) => {
    try {
        const data = await api.signup({ name, email, password });
        const user = { ...data, email, isNew: true };
        
        localStorage.setItem('vb_user', JSON.stringify(user));
        
        set({ 
            user, 
            isAuthenticated: true, 
            showAuthModal: false,
            showBankModal: true 
        });
    } catch (error) {
        console.error("Signup failed", error);
        throw error;
    }
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