// FILE: src/components/OtpModal.jsx
import React, { useState } from 'react';
import { X, ArrowRight, Lock } from 'lucide-react';

export default function OtpModal({ isOpen, onClose, onSubmit, recipient, amount }) {
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
    setOtp('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-dark-card border border-dark-border p-8 rounded-3xl shadow-2xl w-full max-w-sm relative">
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-dark-muted hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition"
        >
            <X size={20} />
        </button>

        <div className="text-center mb-6">
            <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500 mx-auto mb-4 border border-brand-500/30">
                <Lock size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Verify Payment</h2>
            <p className="text-dark-muted text-sm mt-2">Sending <span className="text-white font-bold">₹{amount}</span> to <span className="text-white font-bold">{recipient}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <input 
                    type="text" 
                    autoFocus
                    maxLength={4}
                    placeholder="Enter 4-digit OTP" 
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-4 text-white text-center text-2xl tracking-[0.5em] font-mono focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition placeholder:tracking-normal placeholder:text-base"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                />
                <p className="text-[10px] text-center text-dark-muted mt-3">
                    OTP sent to console (F12) for demo
                </p>
            </div>

            <button 
                type="submit" 
                className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-500 transition flex items-center justify-center gap-2"
            >
                Verify & Pay <ArrowRight size={18} />
            </button>
        </form>
      </div>
    </div>
  );
}