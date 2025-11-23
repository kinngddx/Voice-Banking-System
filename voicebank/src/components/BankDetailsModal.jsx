// FILE: src/components/BankDetailsModal.jsx
import React, { useState } from 'react';
import { Building2, CreditCard, Lock, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function BankDetailsModal() {
  // ✅ Imported closeBankSetup
  const { showBankModal, completeBankSetup, closeBankSetup } = useAuthStore();
  const [bankData, setBankData] = useState({ accountNo: '', ifsc: '', bankName: '' });

  if (!showBankModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    completeBankSetup(bankData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-dark-card rounded-3xl shadow-2xl border border-dark-border w-full max-w-md overflow-hidden relative">
        
        {/* ✅ CLOSE BUTTON */}
        <button 
          onClick={closeBankSetup}
          className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-brand-600 p-8 text-white text-center relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/20 blur-3xl rounded-full"></div>
          
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
            <Building2 size={32} />
          </div>
          <h2 className="text-2xl font-bold relative z-10">Connect Bank</h2>
          <p className="text-brand-100 text-sm relative z-10 mt-1">Enable voice payments securely.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Bank Name</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              placeholder="e.g. HDFC Bank"
              onChange={e => setBankData({...bankData, bankName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Account Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3.5 text-gray-500" size={20} />
              <input 
                type="text" required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none font-mono transition"
                placeholder="0000 0000 0000"
                onChange={e => setBankData({...bankData, accountNo: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">IFSC Code</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none uppercase transition"
              placeholder="HDFC0001234"
              onChange={e => setBankData({...bankData, ifsc: e.target.value})}
            />
          </div>

          <div className="bg-brand-500/10 border border-brand-500/20 p-3 rounded-xl flex gap-3 items-start">
            <Lock size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-brand-200/80 leading-relaxed">
              Your details are encrypted with 256-bit banking grade security. We never share your data.
            </p>
          </div>

          <button type="submit" className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-500 transition shadow-lg shadow-brand-600/20">
            Securely Connect
          </button>
        </form>
      </div>
    </div>
  );
}