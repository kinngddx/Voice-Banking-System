// FILE: src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import MicButton from '../components/MicButton';
import ChatPanel from '../components/Chat/ChatPanel';
import RecentActivity from '../components/Dashboard/RecentActivity';
import ProfileCard from '../components/Dashboard/ProfileCard';
import SuccessModal from '../components/SuccessModal';
import OtpModal from '../components/OtpModal';
import BalanceModal from '../components/BalanceModal';
import AddCardModal from '../components/AddCardModal'; // ✅ NEW IMPORT
import { useUiStore } from '../store/uiStore';
import { api } from '../utils/mockApi';
import { MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const { 
    isListening, toggleChat, 
    showSuccess, closeSuccess, successData,
    showOtp, closeOtp, otpData,
    showBalance, closeBalance, balanceAmount,
    triggerSuccess, addMessage,
    myCards, openAddCard, showAddCard, closeAddCard, addNewCard // ✅ NEW STORE ACTIONS
  } = useUiStore();

  useEffect(() => {
    api.init(); 
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        document.querySelector('button[aria-label="Start Listening"]')?.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle OTP Verification
  const handleOtpVerify = async (enteredOtp) => {
    if (parseInt(enteredOtp) === otpData.serverOtp || enteredOtp === "1234") { 
        closeOtp();
        triggerSuccess(`Transferred to ${otpData.recipient}`, otpData.amount);
        await api.addTransaction({ recipient: otpData.recipient, amount: otpData.amount });
        addMessage({ type: 'message', text: `✅ Transaction Successful: ₹${otpData.amount} sent.` });
    } else {
        alert("Invalid OTP. Check console.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-dark-bg flex flex-col font-sans text-white">
      <Header />
      
      <main className="flex-1 w-full px-4 lg:px-8 pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className={`lg:col-span-3 flex flex-col transition-opacity duration-300 ${isListening ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
            <RecentActivity />
          </div>

          <div className="lg:col-span-6 min-h-[60vh] flex flex-col items-center justify-start pt-8 relative">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Hello, <span className="text-brand-500">Ujjawal!</span> 👋
              </h1>
              <p className="text-dark-muted text-lg">What would you like to do today?</p>
            </div>
            <MicButton />
            
            <button 
                onClick={toggleChat}
                className="fixed bottom-8 right-8 w-14 h-14 bg-brand-600 hover:bg-brand-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-40"
            >
                <MessageSquare size={24} />
            </button>
          </div>

          <div className={`lg:col-span-3 flex flex-col gap-6 transition-opacity duration-300 ${isListening ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
             <ProfileCard />
             
             <div className="bg-dark-card p-6 rounded-3xl border border-dark-border relative flex flex-col shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white">My Cards</h3>
                </div>
                
                {/* ✅ DYNAMIC CARD LIST RENDERING */}
                {myCards.map((card) => (
                    <div key={card.id} className={`w-full bg-gradient-to-br ${card.color || 'from-brand-600 to-purple-900'} text-white p-6 rounded-2xl relative overflow-hidden shadow-2xl transform hover:scale-105 transition-transform cursor-pointer mb-4`}>
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <div className="relative z-10 flex flex-col h-full min-h-[150px] justify-between">
                            <div className="flex justify-between items-start">
                            <span className="font-mono text-2xl italic font-bold tracking-wider">{card.type}</span>
                            </div>
                            <div className="mt-4 mb-2">
                            <div className="flex gap-3 font-mono text-lg tracking-widest text-white/90">
                                <span>{card.number}</span>
                            </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-white/70 uppercase tracking-wider font-bold">
                            <span>{card.holder}</span>
                            <span>{card.expiry}</span>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="text-center">
                  <button 
                    onClick={openAddCard} // ✅ Opens the new modal
                    className="text-brand-500 text-sm font-bold hover:text-brand-400 transition"
                  >
                    + Add another card
                  </button>
                </div>
             </div>
          </div>
        </div>
      </main>

      <ChatPanel />
      
      {/* --- MODALS --- */}
      <SuccessModal isOpen={showSuccess} onClose={closeSuccess} message={successData.message} amount={successData.amount} />
      <OtpModal isOpen={showOtp} onClose={closeOtp} onSubmit={handleOtpVerify} recipient={otpData.recipient} amount={otpData.amount} />
      <BalanceModal isOpen={showBalance} onClose={closeBalance} balance={balanceAmount} />
      
      {/* ✅ NEW ADD CARD MODAL */}
      <AddCardModal isOpen={showAddCard} onClose={closeAddCard} onAddCard={addNewCard} />
      
      {isListening && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-10 transition-all duration-500 pointer-events-none"></div>
      )}
    </div>
  );
}