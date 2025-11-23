// FILE: src/utils/mockApi.js
const API_URL = 'http://localhost:8000';

// Helper for HTTP requests
const request = async (endpoint, method = 'GET', body = null) => {
  // For this specific request, we are keeping the Mock logic for transactions
  // because we want to instantly see the update on the frontend without waiting for backend implementation
  return null; 
};

export const api = {
  init: () => {
    if (!localStorage.getItem('vb_transactions')) {
        const txs = [
          { id: 'tx1', type: 'debit', amount: 450, title: 'Starbucks', date: new Date().toISOString() },
          { id: 'tx2', type: 'credit', amount: 25000, title: 'Salary', date: new Date(Date.now() - 86400000).toISOString() },
        ];
        localStorage.setItem('vb_transactions', JSON.stringify(txs));
    }
  },

  // GET Transactions (Mocked for immediate UI updates)
  getTransactions: async () => {
    return JSON.parse(localStorage.getItem('vb_transactions') || '[]');
  },

  // ✅ NEW: Add Transaction locally
  addTransaction: async (txData) => {
    const newTx = {
        id: `tx_${Date.now()}`,
        type: 'debit',
        amount: txData.amount,
        title: `Transfer to ${txData.recipient}`,
        date: new Date().toISOString(),
        category: 'Transfer'
    };
    
    const current = JSON.parse(localStorage.getItem('vb_transactions') || '[]');
    localStorage.setItem('vb_transactions', JSON.stringify([newTx, ...current]));
    return newTx;
  },

  // Keeping auth mocked for smooth demo
  login: async (email, password) => ({ user_id: 1, name: 'Ujjawal', token: 'demo' }),
  signup: async (data) => ({ user_id: 1, name: data.name, token: 'demo' }),
  
  getBalance: async () => 124500,
};