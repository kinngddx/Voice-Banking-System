// FILE: src/components/Dashboard/ProfileCard.jsx
import React from 'react';
import { CheckCircle, AlertCircle, ChevronRight, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function ProfileCard() {
  const { user, openBankSetup } = useAuthStore();
  const hasBank = !!user?.bankDetails;

  return (
    <div className="bg-dark-card p-6 rounded-3xl border border-dark-border flex flex-col gap-5 shadow-lg">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-500/30">
          {user?.name ? user.name.charAt(0) : 'U'}
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">{user?.name || 'Guest'}</h3>
          <p className="text-xs text-dark-muted">{user?.email || 'Complete setup'}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-dark-muted uppercase tracking-wider">Setup Progress</h4>
        
        {/* Step 1: Signup (Done) */}
        <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl border border-dark-border">
          <div className="flex items-center gap-3">
            <div className="bg-accent-green/20 p-1.5 rounded-full">
                <CheckCircle size={16} className="text-accent-green" />
            </div>
            <span className="text-sm font-medium text-dark-muted">Account Created</span>
          </div>
        </div>

        {/* Step 2: Bank Details (Clickable!) */}
        <div 
          onClick={!hasBank ? openBankSetup : undefined}
          className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer
            ${hasBank 
              ? 'bg-dark-bg/50 border-dark-border' 
              : 'bg-brand-500/10 border-brand-500/30 hover:bg-brand-500/20'
            }`}
        >
          <div className="flex items-center gap-3">
             <div className={`${hasBank ? 'bg-accent-green/20' : 'bg-brand-500/20'} p-1.5 rounded-full`}>
                {hasBank ? <CheckCircle size={16} className="text-accent-green"/> : <AlertCircle size={16} className="text-brand-500"/>}
             </div>
            <div>
              <p className={`text-sm font-medium ${hasBank ? 'text-dark-muted' : 'text-white'}`}>
                {hasBank ? 'Bank Connected' : 'Add Bank Details'}
              </p>
              {!hasBank && <p className="text-[10px] text-brand-500">Required for transfers</p>}
            </div>
          </div>
          {!hasBank && <ChevronRight size={16} className="text-brand-500" />}
        </div>
      </div>
    </div>
  );
}