// FILE: src/components/Header.jsx
import React, { useState } from 'react';
import { Mic, Bell, LogOut, Settings, ChevronDown, Home } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="h-20 bg-dark-bg border-b border-dark-border flex items-center justify-between px-4 lg:px-8 fixed w-full top-0 z-30">
      <div className="flex items-center gap-2 text-brand-500 font-bold text-2xl cursor-pointer" onClick={() => navigate('/dashboard')}>
        <Mic className="fill-current" size={28} />
        <span>VoiceBank</span>
      </div>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8">
           {['Dashboard', 'Settings'].map(item => (
               <button key={item} onClick={() => navigate(`/${item.toLowerCase()}`)}
                 className={`font-bold text-sm transition ${location.pathname === `/${item.toLowerCase()}` ? 'text-white' : 'text-dark-muted hover:text-white'}`}>
                 {item}
               </button>
           ))}
        </nav>
        
        <div className="flex items-center gap-4">
            <button className="p-2 text-dark-muted hover:bg-dark-card rounded-full relative transition">
               <Bell size={22} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full"></span>
            </button>

            <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-dark-card transition border border-transparent hover:border-dark-border">
                    <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold overflow-hidden">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden md:block text-left mr-1">
                        <p className="text-sm font-bold text-white leading-none">{user?.name?.split(' ')[0] || 'User'}</p>
                    </div>
                    <ChevronDown size={16} className="text-dark-muted" />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-dark-card rounded-2xl shadow-2xl border border-dark-border overflow-hidden z-20">
                        <div className="p-5 border-b border-dark-border flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold">{user?.name?.charAt(0)}</div>
                            <div><p className="font-bold text-white">{user?.name}</p><p className="text-xs text-dark-muted">{user?.email}</p></div>
                        </div>
                        <div className="p-2">
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-white/5 rounded-xl flex items-center gap-3 transition">
                            <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}