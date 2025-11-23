// FILE: src/components/SuccessModal.jsx
import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react'; // Added X icon

export default function SuccessModal({ isOpen, onClose, message, amount }) {
  // Keeping the auto-close for convenience, but user can now manually close too
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-dark-card border border-dark-border p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full transform transition-all scale-100 relative">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-dark-muted hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition"
        >
            <X size={20} />
        </button>

        {/* Animated Tick Circle */}
        <div className="w-20 h-20 bg-accent-green rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-bounce">
          <Check size={40} className="text-white" strokeWidth={4} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-dark-muted mb-6 text-sm">{message}</p>
        
        <div className="bg-dark-bg/50 px-6 py-3 rounded-xl border border-dark-border w-full">
          <p className="text-xs text-dark-muted uppercase tracking-wider font-bold">Amount Paid</p>
          <p className="text-3xl font-bold text-white mt-1">₹{amount}</p>
        </div>
      </div>
    </div>
  );
}