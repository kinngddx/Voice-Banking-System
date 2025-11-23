// FILE: src/utils/assistant.js
import { api } from './mockApi';
import { useUiStore } from '../store/uiStore';

export const processVoiceCommand = async (text) => {
  const lower = text.toLowerCase();
  const { triggerBalance, triggerOtp, addMessage } = useUiStore.getState();

  // 1. Check Balance
  if (lower.includes('balance')) {
    const bal = await api.getBalance();
    triggerBalance(bal); // Open Balance Modal
    return {
      type: 'message',
      text: `I've displayed your current balance.`,
    };
  }

  // 2. Transfer Request -> Open OTP Modal
  if (lower.includes('send') || lower.includes('transfer') || lower.includes('pay')) {
    const amountMatch = text.match(/(\d+)/);
    const amount = amountMatch ? parseInt(amountMatch[0]) : 500; 
    
    const nameMatch = text.match(/to\s+(\w+)/i);
    const recipient = nameMatch ? nameMatch[1] : "Recipient";

    const mockOTP = Math.floor(1000 + Math.random() * 9000);
    console.log(`%c [VoiceBank Security] YOUR OTP IS: ${mockOTP} `, 'background: #222; color: #bada55; font-size: 16px; padding: 8px;');

    // Trigger the OTP Modal Center Screen
    triggerOtp(recipient, amount, mockOTP);

    return {
      type: 'message', // Just a text confirmation in chat
      text: `Initiating transfer of ₹${amount} to ${recipient}. Please verify OTP.`,
    };
  }

  // Fallback
  return {
    type: 'message',
    text: "I can help you check balance or transfer money. Try saying 'Send 500 to Rahul'."
  };
};