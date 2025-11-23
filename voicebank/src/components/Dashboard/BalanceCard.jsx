// FILE: src/components/Dashboard/BalanceCard.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../../utils/mockApi';
import { formatINR } from '../../utils/format';
import { CreditCard, Plus } from 'lucide-react';

// 👇 THIS WAS LIKELY MISSING "default"
export default function BalanceCard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.getBalance().then(setBalance);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gradient-to-br from-brand-600 to-brand-500 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-brand-100 text-sm font-medium mb-1">Total Balance</p>
        <h2 className="text-3xl font-bold mb-6">{formatINR(balance)}</h2>
        <div className="flex gap-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur py-2 rounded-lg text-sm font-semibold transition">
            Add Money
          </button>
          <button className="flex-1 bg-white text-brand-600 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition">
            Send
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">My Cards</h3>
          <button className="text-brand-600 hover:bg-brand-50 p-1 rounded"><Plus size={18}/></button>
        </div>
        <div className="bg-gray-900 text-white p-4 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <CreditCard className="text-gray-400" />
              <span className="font-mono text-lg tracking-widest">VISA</span>
            </div>
            <p className="font-mono text-gray-300 tracking-wider mb-1">**** **** **** 4291</p>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Ujjawal A.</span>
              <span>12/28</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}