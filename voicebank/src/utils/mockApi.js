// FILE: src/utils/mockApi.js

const DELAY = 800;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Seed Data
const seedData = () => {
  if (!localStorage.getItem('vb_transactions')) {
    const txs = [
      { id: 'tx1', type: 'debit', amount: 450, title: 'Starbucks Indiranagar', date: new Date().toISOString(), category: 'Food' },
      { id: 'tx2', type: 'credit', amount: 25000, title: 'Salary Credit', date: new Date(Date.now() - 86400000).toISOString(), category: 'Salary' },
      { id: 'tx3', type: 'debit', amount: 1200, title: 'Jio Fiber Bill', date: new Date(Date.now() - 172800000).toISOString(), category: 'Utilities' },
    ];
    localStorage.setItem('vb_transactions', JSON.stringify(txs));
  }
  if (!localStorage.getItem('vb_balance')) {
    localStorage.setItem('vb_balance', '124500');
  }
};

// WE USE 'export const api' HERE.
// THIS MEANS YOU MUST USE { api } WHEN IMPORTING.
export const api = {
  init: () => seedData(),

  // GET /api/user/balance
  getBalance: async () => {
    await sleep(DELAY);
    return parseInt(localStorage.getItem('vb_balance') || '0');
  },

  // GET /api/transactions
  getTransactions: async () => {
    await sleep(DELAY);
    return JSON.parse(localStorage.getItem('vb_transactions') || '[]');
  },

  // POST /api/transfer
  transferMoney: async ({ to, amount }) => {
    await sleep(DELAY + 500);
    const currentBal = parseInt(localStorage.getItem('vb_balance') || '0');
    
    if (currentBal < amount) throw new Error("Insufficient Funds");

    const newBal = currentBal - amount;
    localStorage.setItem('vb_balance', newBal.toString());

    const newTx = {
      id: `tx_${Date.now()}`,
      type: 'debit',
      amount: amount,
      title: `Transfer to ${to}`,
      date: new Date().toISOString(),
      category: 'Transfer'
    };

    const txs = JSON.parse(localStorage.getItem('vb_transactions') || '[]');
    localStorage.setItem('vb_transactions', JSON.stringify([newTx, ...txs]));

    return { status: 'success', transactionId: newTx.id, newBalance: newBal };
  }
};