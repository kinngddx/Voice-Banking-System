// FILE: src/components/BalanceModal.jsx
import React from 'react';
import { X, Wallet } from 'lucide-react';
import { formatINR } from '../utils/format';

export default function BalanceModal({ isOpen, onClose, balance }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-dark-card border border-dark-border p-8 rounded-3xl shadow-2xl w-full max-w-sm relative text-center">
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-dark-muted hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition"
        >
            <X size={20} />
        </button>

        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-4 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Wallet size={32} />
        </div>

        <h2 className="text-lg font-bold text-dark-muted uppercase tracking-widest mb-2">Available Balance</h2>
        <p className="text-4xl font-bold text-white mb-6">{formatINR(balance)}</p>
        
        <button 
            onClick={onClose}
            className="w-full bg-dark-bg border border-dark-border text-white py-3 rounded-xl font-medium hover:bg-white/5 transition"
        >
            Done
        </button>
      </div>
    </div>
  );
}