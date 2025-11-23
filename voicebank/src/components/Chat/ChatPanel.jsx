// FILE: src/components/Chat/ChatPanel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Mic } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { formatINR } from '../../utils/format';
import { processVoiceCommand } from '../../utils/assistant';

export default function ChatPanel() {
  const { isChatOpen, messages, setChatOpen, interimTranscript, addMessage } = useUiStore();
  const scrollRef = useRef(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, interimTranscript]);

  // Handle send message (text input)
  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const text = inputText.trim();
    setInputText('');
    
    addMessage({ type: 'user', text });
    addMessage({ type: 'typing' });
    
    const response = await processVoiceCommand(text);
    useUiStore.getState().messages.pop();
    addMessage(response);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-dark-card shadow-2xl z-50 flex flex-col border-l border-dark-border transform transition-transform duration-300 ease-in-out animate-fade-in">
      
      {/* Header */}
      <div className="h-16 border-b border-dark-border flex items-center justify-between px-4 bg-dark-card relative z-10">
        <div className="flex items-center gap-2 text-white font-bold">
          <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500">
            <Mic size={18} />
          </div>
          Voice Assistant
        </div>
        
        <button 
          onClick={() => setChatOpen(false)} 
          className="p-2 text-dark-muted hover:text-white hover:bg-white/10 rounded-full transition"
        >
          <X size={22} />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-bg">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'typing' ? (
              <div className="bg-dark-card p-4 rounded-2xl rounded-tl-none shadow-sm border border-dark-border">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            ) : (
              <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.type === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : 'bg-dark-card text-gray-200 border border-dark-border rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                
                {/* Transactions Card */}
                {msg.payload?.type === 'transactions' && (
                  <div className="mt-3 space-y-2">
                    {msg.payload.data.map(tx => (
                      <div key={tx.id} className="flex justify-between items-center bg-dark-bg p-2.5 rounded-lg border border-dark-border">
                        <span className="text-xs font-medium text-gray-300">{tx.title}</span>
                        <span className="text-xs font-bold text-red-400">-{formatINR(tx.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* OTP Required Card */}
                {msg.payload?.type === 'otp_required' && (
                  <div className="mt-3 p-2 bg-dark-bg rounded-lg border border-brand-500/50">
                    <p className="text-xs text-brand-300">💡 Type the OTP above or say "verify OTP {msg.payload.otp}"</p>
                  </div>
                )}

                {/* Transfer Intent Card */}
                {msg.payload?.type === 'transfer_intent' && (
                  <button className="mt-3 w-full bg-white text-brand-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition">
                    Confirm Transfer ₹{msg.payload.amount}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        
        {/* Live Transcript */}
        {interimTranscript && (
          <div className="flex justify-end opacity-80">
            <div className="bg-dark-card border border-brand-500/50 text-brand-300 p-3 rounded-2xl rounded-tr-none text-sm italic">
              {interimTranscript}...
            </div>
          </div>
        )}
      </div>

      {/* Input Area - FIXED */}
      <div className="p-4 border-t border-dark-border bg-dark-card">
        <div className="relative">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message or OTP..." 
            className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-dark-bg border border-dark-border text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-sm transition"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 p-1.5 text-brand-500 hover:bg-brand-500/10 rounded-lg transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}