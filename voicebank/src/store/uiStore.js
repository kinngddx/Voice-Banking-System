// FILE: src/store/uiStore.js
import { create } from 'zustand';

// ✅ NOTICE "export const" HERE:
export const useUiStore = create((set) => ({
  isListening: false,
  isChatOpen: false,
  interimTranscript: '',
  messages: [{ type: 'assistant', text: 'Namaste! How can I help you with your banking today?' }],
  
  setListening: (status) => set({ isListening: status }),
  setChatOpen: (status) => set({ isChatOpen: status }),
  setInterimTranscript: (text) => set({ interimTranscript: text }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));