// FILE: src/components/Header.jsx
import React, { useState } from 'react';
import { Mic, Bell, LogOut, Settings, ChevronDown, Home, X, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore'; // Import UI Store
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuthStore();
  const { showNotifications, toggleNotifications, closeNotifications } = useUiStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  // Mock Notifications
  const notifications = [
    { id: 1, text: "Salary Credited: ₹25,000", time: "2 hours ago", type: "success" },
    { id: 2, text: "Bill Payment Reminder: Jio Fiber", time: "5 hours ago", type: "alert" },
    { id: 3, text: "New Feature: Voice Commands updated", time: "1 day ago", type: "info" },
  ];

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
        
        <div className="flex items-center gap-4 relative">
            {/* ✅ NOTIFICATION BELL */}
            <button 
                onClick={toggleNotifications}
                className={`p-2 rounded-full relative transition ${showNotifications ? 'bg-brand-500/20 text-brand-500' : 'text-dark-muted hover:bg-dark-card'}`}
            >
               <Bell size={22} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full"></span>
            </button>

            {/* ✅ NOTIFICATION POP-UP */}
            {showNotifications && (
                <>
                    <div className="fixed inset-0 z-10" onClick={closeNotifications}></div>
                    <div className="absolute right-12 top-full mt-4 w-80 bg-dark-card rounded-2xl shadow-2xl border border-dark-border overflow-hidden z-20 animate-fade-in">
                        <div className="p-4 border-b border-dark-border flex justify-between items-center">
                            <h3 className="font-bold text-white">Notifications</h3>
                            <button onClick={closeNotifications}><X size={16} className="text-dark-muted hover:text-white"/></button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {notifications.map(notif => (
                                <div key={notif.id} className="p-4 border-b border-dark-border/50 hover:bg-white/5 transition cursor-pointer flex gap-3">
                                    <div className="mt-1">
                                        <CheckCircle size={16} className="text-brand-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-200 font-medium">{notif.text}</p>
                                        <p className="text-xs text-dark-muted mt-1">{notif.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 text-center bg-dark-bg/50">
                            <button className="text-xs font-bold text-brand-500 hover:text-brand-400">Mark all as read</button>
                        </div>
                    </div>
                </>
            )}

            {/* USER MENU */}
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
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
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
                    </>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}