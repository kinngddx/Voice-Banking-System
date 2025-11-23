// FILE: src/pages/Settings.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import { Check, CreditCard, Smartphone, Mail, Building2, Shield, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Settings() {
  const { user, openBankSetup } = useAuthStore();
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [mobileAdded, setMobileAdded] = useState(!!user?.phone);
  const [cardAdded, setCardAdded] = useState(!!user?.card);

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, phone: mobileNumber };
    localStorage.setItem('vb_user', JSON.stringify(updatedUser));
    setMobileAdded(true);
    setShowMobileModal(false);
    alert('✅ Mobile number added successfully!');
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, card: cardData };
    localStorage.setItem('vb_user', JSON.stringify(updatedUser));
    setCardAdded(true);
    setShowCardModal(false);
    alert('✅ Card added successfully!');
  };

  const handleSaveProfile = () => {
    const name = document.getElementById('fullName').value;
    const updatedUser = { ...user, name };
    localStorage.setItem('vb_user', JSON.stringify(updatedUser));
    alert('✅ Profile saved successfully!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full bg-dark-bg flex flex-col font-sans text-white">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 lg:p-8 pt-28 mt-4 pb-20">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-dark-muted mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Complete Profile Section */}
        <div className="bg-dark-card rounded-3xl p-6 shadow-lg border border-dark-border mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Complete Your Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Mobile */}
            <div 
              onClick={() => !mobileAdded && setShowMobileModal(true)}
              className={`rounded-2xl p-5 flex flex-col items-center text-center transition cursor-pointer group
                ${mobileAdded 
                  ? 'bg-green-500/5 border border-green-500/30' 
                  : 'bg-dark-bg border border-dark-border hover:border-brand-500/50'}`}
            >
              {mobileAdded && <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-0.5"><Check size={10} /></div>}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${mobileAdded ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'}`}>
                <Smartphone size={22} />
              </div>
              <p className={`text-sm font-bold ${mobileAdded ? 'text-white' : 'text-dark-muted group-hover:text-white'}`}>
                {mobileAdded ? 'Mobile Added' : 'Add Mobile'}
              </p>
              {mobileAdded && <p className="text-xs text-green-500 font-bold mt-1">✓ Completed</p>}
            </div>

            {/* Email (Always Completed) */}
            <div className="bg-green-500/5 border border-green-500/30 rounded-2xl p-5 flex flex-col items-center text-center relative">
              <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-0.5"><Check size={10} /></div>
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-3">
                <Mail size={22} />
              </div>
              <p className="text-sm font-bold text-white">Email Added</p>
              <p className="text-xs text-green-500 font-bold mt-1">✓ Completed</p>
            </div>

            {/* Add Card */}
            <div 
              onClick={() => !cardAdded && setShowCardModal(true)}
              className={`rounded-2xl p-5 flex flex-col items-center text-center transition cursor-pointer group
                ${cardAdded 
                  ? 'bg-green-500/5 border border-green-500/30' 
                  : 'bg-dark-bg border border-dark-border hover:border-brand-500/50'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${cardAdded ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'}`}>
                <CreditCard size={22} />
              </div>
              <p className={`text-sm font-bold ${cardAdded ? 'text-white' : 'text-dark-muted group-hover:text-white'}`}>
                {cardAdded ? 'Card Added' : 'Add Card'}
              </p>
              {cardAdded && <p className="text-xs text-green-500 font-bold mt-1">✓ Completed</p>}
            </div>

            {/* Bank Account */}
            <div 
              onClick={() => !user?.bankDetails && openBankSetup()}
              className={`rounded-2xl p-5 flex flex-col items-center text-center transition cursor-pointer group
                ${user?.bankDetails 
                  ? 'bg-green-500/5 border border-green-500/30' 
                  : 'bg-dark-bg border border-dark-border hover:border-brand-500/50'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${user?.bankDetails ? 'bg-green-500/10 text-green-500' : 'bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20'}`}>
                <Building2 size={22} />
              </div>
              <p className={`text-sm font-bold ${user?.bankDetails ? 'text-white' : 'text-dark-muted group-hover:text-white'}`}>
                {user?.bankDetails ? 'Bank Connected' : 'Add Bank Account'}
              </p>
              {user?.bankDetails && <p className="text-xs text-green-500 font-bold mt-1">✓ Completed</p>}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-dark-card rounded-3xl p-6 lg:p-8 shadow-lg border border-dark-border">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-dark-border pb-4">Profile Information</h2>
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <div className="flex flex-col items-center gap-4 min-w-[200px]">
              <div className="w-32 h-32 rounded-full bg-brand-500/10 border-4 border-dark-border shadow-lg overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white">{user?.name || 'User'}</h3>
                <p className="text-sm text-dark-muted">{user?.email}</p>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-bold text-dark-muted mb-1.5">Full Name</label>
                <input id="fullName" type="text" defaultValue={user?.name || ""} 
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-muted mb-1.5">Email Address</label>
                <input type="email" defaultValue={user?.email || ""} disabled
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg/50 border border-dark-border text-gray-500 cursor-not-allowed" />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-brand-500" /> Change Password
                </h3>
                <div className="space-y-4">
                  <input type="password" placeholder="Current Password" 
                    className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none placeholder-gray-600" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="New Password" 
                      className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none placeholder-gray-600" />
                    <input type="password" placeholder="Confirm New Password" 
                      className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none placeholder-gray-600" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-dark-border mt-6">
                <button onClick={handleSaveProfile} className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-500 transition shadow-lg shadow-brand-600/20">
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE MODAL */}
      {showMobileModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-dark-card rounded-3xl shadow-2xl border border-dark-border w-full max-w-md p-6 relative">
            <button onClick={() => setShowMobileModal(false)} className="absolute top-4 right-4 text-white/60 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">📱 Add Mobile Number</h2>
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <input type="tel" required placeholder="Enter 10-digit mobile number" value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none" />
              <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-500 transition">
                Add Mobile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CARD MODAL */}
      {showCardModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-dark-card rounded-3xl shadow-2xl border border-dark-border w-full max-w-md p-6 relative">
            <button onClick={() => setShowCardModal(false)} className="absolute top-4 right-4 text-white/60 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">💳 Add Card</h2>
            <form onSubmit={handleCardSubmit} className="space-y-4">
              <input type="text" required placeholder="Card Number" 
                onChange={(e) => setCardData({...cardData, number: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none" />
              <input type="text" required placeholder="Cardholder Name" 
                onChange={(e) => setCardData({...cardData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="MM/YY" 
                  onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none" />
                <input type="text" required placeholder="CVV" 
                  onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-500 transition">
                Add Card
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}