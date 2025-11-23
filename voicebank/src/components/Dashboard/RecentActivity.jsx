// FILE: src/components/Dashboard/RecentActivity.jsx
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
// import { api } from '../../utils/mockApi';
import { api } from '../../utils/api';
import { formatINR, formatDate } from '../../utils/format';

export default function RecentActivity() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.getTransactions().then(setTransactions);
  }, []);

  return (
    <div className="bg-dark-card p-6 rounded-3xl border border-dark-border h-full shadow-lg">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-lg font-bold text-white">Recent Activity</h3>
         <button className="text-xs text-brand-500 hover:text-brand-400">View All</button>
      </div>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-xl transition">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-orange/10 text-accent-orange'}`}>
                {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{tx.title}</p>
                <p className="text-xs text-dark-muted">{formatDate(tx.date)}</p>
              </div>
            </div>
            <span className={`font-bold text-sm ${tx.type === 'credit' ? 'text-accent-green' : 'text-white'}`}>
              {tx.type === 'credit' ? '+' : '-'}{formatINR(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}