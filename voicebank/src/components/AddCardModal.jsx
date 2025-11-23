// FILE: src/components/AddCardModal.jsx
import React, { useState } from 'react';
import { X, CreditCard, Calendar, User } from 'lucide-react';

export default function AddCardModal({ isOpen, onClose, onAddCard }) {
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    type: 'VISA' // Default
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard(cardData);
    onClose();
    setCardData({ number: '', holder: '', expiry: '', type: 'VISA' }); // Reset
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-dark-card border border-dark-border p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-dark-muted hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition"
        >
            <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500">
                <CreditCard size={20} />
            </div>
            Add New Card
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Card Number</label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 text-gray-500" size={20} />
                    <input 
                        type="text" 
                        required
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition font-mono"
                        value={cardData.number}
                        onChange={(e) => {
                            // Format card number with spaces
                            let v = e.target.value.replace(/\D/g, '').substring(0,16);
                            v = v != '' ? v.match(/.{1,4}/g).join(' ') : '';
                            setCardData({...cardData, number: v});
                        }}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Card Holder Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
                    <input 
                        type="text" 
                        required
                        placeholder="JOHN DOE"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition uppercase"
                        value={cardData.holder}
                        onChange={(e) => setCardData({...cardData, holder: e.target.value.toUpperCase()})}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Expiry Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 text-gray-500" size={20} />
                        <input 
                            type="text" 
                            required
                            maxLength={5}
                            placeholder="MM/YY"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition text-center"
                            value={cardData.expiry}
                            onChange={(e) => {
                                // Format Expiry Date MM/YY
                                let v = e.target.value.replace(/\D/g, '').substring(0,4);
                                if(v.length >= 3) v = v.substring(0,2) + '/' + v.substring(2,4);
                                setCardData({...cardData, expiry: v});
                            }}
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-1.5">Card Type</label>
                    <select 
                        className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                        value={cardData.type}
                        onChange={(e) => setCardData({...cardData, type: e.target.value})}
                    >
                        <option value="VISA">VISA</option>
                        <option value="MASTERCARD">MasterCard</option>
                    </select>
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-500 transition shadow-lg shadow-brand-600/20 mt-4"
            >
                Add Card
            </button>
        </form>
      </div>
    </div>
  );
}