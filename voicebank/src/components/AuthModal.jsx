// FILE: src/components/AuthModal.jsx
import React, { useState } from 'react';
import { X, Mic } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, authMode, login, signup } = useAuthStore();
  const [isLogin, setIsLogin] = useState(authMode === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!showAuthModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      signup(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-dark-card rounded-3xl shadow-2xl border border-dark-border w-full max-w-md overflow-hidden relative">
        
        {/* ✅ CLOSE BUTTON */}
        <button 
          onClick={closeAuthModal} 
          className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition z-20"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-8 pb-0 text-center">
            <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500 mx-auto mb-4 border border-brand-500/30">
                <Mic size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-dark-muted text-sm mt-2">
                {isLogin ? 'Enter your details to access your wallet' : 'Start your voice banking journey today'}
            </p>
        </div>

        {/* Toggle */}
        <div className="p-6 pb-0">
            <div className="flex p-1 bg-dark-bg rounded-xl border border-dark-border">
            <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${isLogin ? 'bg-dark-card shadow text-white' : 'text-dark-muted hover:text-white'}`}
            >
                Login
            </button>
            <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${!isLogin ? 'bg-dark-card shadow text-white' : 'text-dark-muted hover:text-white'}`}
            >
                Sign Up
            </button>
            </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Full Name</label>
              <input 
                type="text" required={!isLogin}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Email Address</label>
            <input 
              type="email" required
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              placeholder="you@example.com"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Password</label>
            <input 
              type="password" required
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-500 transition mt-2 shadow-lg shadow-brand-600/20">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}