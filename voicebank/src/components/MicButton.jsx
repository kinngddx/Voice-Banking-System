// FILE: src/components/MicButton.jsx
import React, { useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import { useUiStore } from '../store/uiStore';
import { processVoiceCommand } from '../utils/assistant';

export default function MicButton() {
  const { isListening, setListening, setInterimTranscript, addMessage, setChatOpen } = useUiStore();
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onstart = () => setListening(true);
      recognitionRef.current.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) handleFinalResult(event.results[i][0].transcript);
          else { interim += event.results[i][0].transcript; setInterimTranscript(interim); }
        }
      };
      recognitionRef.current.onend = () => { setListening(false); setInterimTranscript(''); };
    }
  }, []);

  const handleFinalResult = async (text) => {
    setChatOpen(true);
    addMessage({ type: 'user', text });
    addMessage({ type: 'typing' }); 
    setTimeout(async () => {
        const response = await processVoiceCommand(text);
        useUiStore.getState().messages.pop(); 
        addMessage(response);
    }, 1000);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
        alert("Speech API not supported. Using Mock.");
        handleFinalResult("Show me my last 3 transactions");
        return;
    }
    if (isListening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  return (
    <div className={`relative z-50 flex flex-col items-center justify-center transition-all duration-500 ${isListening ? 'scale-110' : 'scale-100'}`}>
       {/* Neon Rings */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full bg-brand-500/40 animate-mic-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-mic-pulse delay-75"></div>
        </>
      )}
      
      <button
        onClick={toggleMic}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(108,93,211,0.4)] transition-colors duration-300 focus:outline-none ${
          isListening ? 'bg-brand-600 text-white' : 'bg-brand-500 text-white hover:bg-brand-600'
        }`}
      >
        <Mic size={48} className={isListening ? "animate-pulse" : ""} />
      </button>
      
      <p className="mt-8 text-dark-muted font-medium text-sm animate-fade-in">
        {isListening ? "Listening..." : "Tap to Start"}
      </p>
    </div>
  );
}