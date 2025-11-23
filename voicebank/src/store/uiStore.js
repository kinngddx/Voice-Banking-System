// FILE: src/store/uiStore.js
import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isListening: false,
  isChatOpen: false,
  interimTranscript: '',
  messages: [{ type: 'assistant', text: 'Namaste! How can I help you with your banking today?' }],
  
  // Modal States
  showSuccess: false,
  successData: { message: '', amount: 0 },
  
  showOtp: false,
  otpData: { recipient: '', amount: 0, serverOtp: '' },

  showBalance: false,
  balanceAmount: 0,

  // New States
  showNotifications: false,
  showAddCard: false,
  
  // Default Card Data
  myCards: [
    {
      id: 1,
      type: 'VISA',
      number: '**** **** **** 4291',
      holder: 'UJJAWAL ANAND',
      expiry: '12/28',
      color: 'from-brand-600 to-purple-900'
    }
  ],

  setListening: (status) => set({ isListening: status }),
  setChatOpen: (status) => set({ isChatOpen: status }),
  setInterimTranscript: (text) => set({ interimTranscript: text }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  
  // Success Modal Actions
  triggerSuccess: (message, amount) => set({ showSuccess: true, successData: { message, amount } }),
  closeSuccess: () => set({ showSuccess: false }),

  // OTP Modal Actions
  triggerOtp: (recipient, amount, serverOtp) => set({ showOtp: true, otpData: { recipient, amount, serverOtp } }),
  closeOtp: () => set({ showOtp: false }),

  // Balance Modal Actions
  triggerBalance: (amount) => set({ showBalance: true, balanceAmount: amount }),
  closeBalance: () => set({ showBalance: false }),
  
  // Notification Actions
  toggleNotifications: () => set((state) => ({ showNotifications: !state.showNotifications })),
  closeNotifications: () => set({ showNotifications: false }),

  // Card Actions
  openAddCard: () => set({ showAddCard: true }),
  closeAddCard: () => set({ showAddCard: false }),
  addNewCard: (card) => set((state) => ({ 
    myCards: [...state.myCards, { 
        ...card, 
        id: Date.now(), 
        // Assign a random gradient for visual variety
        color: Math.random() > 0.5 ? 'from-blue-600 to-cyan-800' : 'from-orange-600 to-red-900' 
    }],
    showAddCard: false // Close modal on success
  })),
  
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));