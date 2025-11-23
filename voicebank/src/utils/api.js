// FILE: src/utils/api.js
const BASE_URL = 'http://127.0.0.1:8000';

export const api = {
  init: () => console.log('API Connected'),

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login?email=${email}&password=${password}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return await res.json();
  },

  getBalance: async (userId) => {
    const res = await fetch(`${BASE_URL}/bank/balance?user_id=${userId}`);
    if (!res.ok) throw new Error('Failed to get balance');
    const data = await res.json();
    return data.balance;
  },

  getTransactions: async () => {
    return JSON.parse(localStorage.getItem('vb_transactions') || '[]');
  },

  initiateTransfer: async (userId, recipientId, amount) => {
    const res = await fetch(
      `${BASE_URL}/bank/transfer/initiate?user_id=${userId}&recipient_id=${recipientId}&amount=${amount}`,
      { method: 'POST' }
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Transfer failed');
    }
    return await res.json();
  },

  completeTransfer: async (userId, transferId, otp) => {
    const res = await fetch(
      `${BASE_URL}/bank/transfer/complete?user_id=${userId}&transfer_id=${transferId}&otp=${otp}`,
      { method: 'POST' }
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'OTP failed');
    }
    return await res.json();
  },

  processCommand: async (text, userId) => {
    const res = await fetch(
      `${BASE_URL}/command/?text=${encodeURIComponent(text)}&user_id=${userId}`,
      { method: 'POST' }
    );
    if (!res.ok) throw new Error('Command failed');
    return await res.json();
  },

  // NEW FEATURES ⬇️

  getAccountDetails: async (userId) => {
    const res = await fetch(`${BASE_URL}/bank/account-details?user_id=${userId}`);
    if (!res.ok) throw new Error('Failed to get account details');
    return await res.json();
  },

  getMiniStatement: async (userId) => {
    const res = await fetch(`${BASE_URL}/bank/mini-statement?user_id=${userId}`);
    if (!res.ok) throw new Error('Failed to get statement');
    return await res.json();
  },

  blockCard: async (userId) => {
    const res = await fetch(`${BASE_URL}/bank/block-card?user_id=${userId}`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to block card');
    return await res.json();
  },

  requestChequeBook: async (userId) => {
    const res = await fetch(`${BASE_URL}/bank/request-cheque?user_id=${userId}`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to request cheque book');
    return await res.json();
  },

  raiseComplaint: async (userId, issue) => {
    const res = await fetch(
      `${BASE_URL}/bank/complaint?user_id=${userId}&issue=${encodeURIComponent(issue)}`,
      { method: 'POST' }
    );
    if (!res.ok) throw new Error('Failed to raise complaint');
    return await res.json();
  },

  findNearestATM: async (userId) => {
    const res = await fetch(`${BASE_URL}/bank/nearest-atm?user_id=${userId}`);
    if (!res.ok) throw new Error('Failed to find ATM');
    return await res.json();
  },
};