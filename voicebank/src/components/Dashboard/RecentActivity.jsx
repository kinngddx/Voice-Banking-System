// FILE: src/components/Dashboard/RecentActivity.jsx
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { api } from '../../utils/mockApi';
import { formatINR, formatDate } from '../../utils/format';

export default function RecentActivity() {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false); // ✅ State to toggle view

  useEffect(() => {
    // Fetch transactions regularly or on mount to ensure it stays updated with chat
    api.getTransactions().then(setTransactions);
    
    // Optional: Set up a listener or polling if you want real-time updates from chat
    // For now, it will update whenever the component re-renders or dashboard loads
    const interval = setInterval(() => {
        api.getTransactions().then(setTransactions);
    }, 2000); // Poll every 2 seconds to catch new chat payments

    return () => clearInterval(interval);
  }, []);

  // ✅ Logic to slice data based on showAll state
  // If showAll is true, show everything. If false, show only first 2.
  const displayedTransactions = showAll ? transactions : transactions.slice(0, 2);

  return (
    <div className={`bg-dark-card p-6 rounded-3xl border border-dark-border shadow-lg flex flex-col transition-all duration-500 ease-in-out ${showAll ? 'h-auto min-h-full' : 'h-full'}`}>
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-lg font-bold text-white">Recent Activity</h3>
         <button 
            onClick={() => setShowAll(!showAll)} // ✅ Toggle function
            className="text-xs font-medium text-brand-500 hover:text-brand-400 transition cursor-pointer"
         >
            {showAll ? "Show Less" : "View All"}
         </button>
      </div>
      
      <div className="space-y-4 flex-1">
        {transactions.length === 0 ? (
            <p className="text-dark-muted text-center py-10">No recent transactions.</p>
        ) : (
            displayedTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition border border-transparent hover:border-white/5 animate-fade-in">
                <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-orange/10 text-accent-orange'}`}>
                    {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                    <p className="font-bold text-white text-sm">{tx.title}</p>
                    <p className="text-xs text-dark-muted mt-0.5">{formatDate(tx.date)}</p>
                </div>
                </div>
                <span className={`font-bold text-sm ${tx.type === 'credit' ? 'text-accent-green' : 'text-white'}`}>
                {tx.type === 'credit' ? '+' : '-'}{formatINR(tx.amount)}
                </span>
            </div>
            ))
        )}
      </div>
    </div>
  );
}