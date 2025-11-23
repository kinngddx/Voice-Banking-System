// FILE: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MicButton from '../components/MicButton';
import ChatPanel from '../components/Chat/ChatPanel';
import RecentActivity from '../components/Dashboard/RecentActivity';
import ProfileCard from '../components/Dashboard/ProfileCard';
import { useUiStore } from '../store/uiStore';
import { api } from '../utils/api';
import { processVoiceCommand } from '../utils/assistant';

export default function Dashboard() {
  const { isListening, setChatOpen, addMessage } = useUiStore();
  const [user, setUser] = useState({ name: 'User', balance: 0 });

  useEffect(() => {
    api.init();
    
    // Get logged in user
    const storedUser = JSON.parse(localStorage.getItem('vb_user'));
    if (storedUser) {
      setUser(storedUser);
      // Fetch real balance
      api.getBalance(storedUser.id).then(balance => {
        setUser(prev => ({ ...prev, balance }));
      });
    }

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        document.querySelector('button[aria-label="Start Listening"]')?.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle quick option click
  const handleQuickOption = async (text) => {
    setChatOpen(true);
    addMessage({ type: 'user', text });
    addMessage({ type: 'typing' });
    
    const response = await processVoiceCommand(text);
    useUiStore.getState().messages.pop();
    addMessage(response);
  };

  // Format balance
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen w-full bg-dark-bg flex flex-col font-sans text-dark-text">
      <Header />
      
      <main className="flex-1 w-full px-4 lg:px-8 pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Recent Activity */}
          <div className={`lg:col-span-3 flex flex-col transition-opacity duration-300 ${isListening ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
            <RecentActivity />
          </div>

          {/* CENTER: Mic */}
          <div className="lg:col-span-6 min-h-[60vh] flex flex-col items-center justify-start pt-8 relative">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Hello, <span className="text-brand-500">{user.name?.split(' ')[0] || 'User'}!</span> 👋
              </h1>
              <p className="text-dark-muted text-lg">What would you like to do today?</p>
            </div>
            
            <MicButton />
            
            {/* Quick Options */}
            <div className={`mt-16 flex flex-wrap justify-center gap-3 transition-opacity duration-500 ${isListening ? 'opacity-0' : 'opacity-100'}`}>
              {["Check balance", "Send ₹500", "Show transactions"].map(hint => (
                <button 
                  key={hint} 
                  onClick={() => handleQuickOption(hint)}
                  className="px-5 py-2.5 bg-dark-card border border-dark-border rounded-full text-sm font-medium text-dark-muted hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-all cursor-pointer"
                >
                  "{hint}"
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Profile & Cards */}
          <div className={`lg:col-span-3 flex flex-col gap-6 transition-opacity duration-300 ${isListening ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
            <ProfileCard />

            <div className="bg-dark-card p-6 rounded-3xl border border-dark-border relative flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">My Cards</h3>
                <button className="text-dark-muted hover:text-white text-sm">+</button>
              </div>
              
              {/* Card - Dynamic User Info */}
              <div className="w-full bg-gradient-to-br from-brand-600 to-purple-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-2xl transform hover:scale-105 transition-transform cursor-pointer mb-4">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-blue blur-3xl opacity-40"></div>

                <div className="relative z-10 flex flex-col h-full min-h-[150px] justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-2xl italic font-bold tracking-wider">VISA</span>
                    <div className="text-right">
                      <p className="text-[10px] text-white/70 font-bold uppercase">Current Balance</p>
                      <p className="text-lg font-bold">{formatBalance(user.balance)}</p>
                    </div>
                  </div>

                  <div className="mt-4 mb-2">
                    <div className="flex gap-3 font-mono text-lg tracking-widest text-white/90">
                      <span>••••</span> <span>••••</span> <span>••••</span> <span>4291</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] text-white/70 uppercase tracking-wider font-bold">
                    <span>{user.name || 'User'}</span>
                    <span>12/28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <ChatPanel />
      
      {isListening && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-10 transition-all duration-500 pointer-events-none"></div>
      )}
    </div>
  );
}