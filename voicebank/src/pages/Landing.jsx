// FILE: src/pages/Landing.jsx
import React from 'react';
import { Mic, Shield, Globe, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

// IMPORT IMAGE
import HeroImage from '../assets/hero1.jpg';

export default function Landing() {
  const { openLogin, openSignup } = useAuthStore();

  return (
    <div className="min-h-screen bg-dark-bg font-sans text-white selection:bg-brand-500 selection:text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="w-full px-6 lg:px-12 h-20 flex items-center justify-between relative z-20 border-b border-white/5 bg-dark-bg/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 text-brand-500 font-bold text-2xl">
          <Mic className="fill-current" />
          <span>VoiceBank</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={openLogin} className="text-dark-muted font-medium hover:text-white transition text-sm lg:text-base">Login</button>
          <button 
            onClick={openSignup} 
            className="bg-brand-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-brand-500 transition shadow-lg shadow-brand-600/20 border border-transparent hover:border-brand-400 text-sm lg:text-base"
          >
            Open Account
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 lg:px-8 w-full">

        {/* Background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[500px] bg-brand-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[70%] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Two Column Layout */}
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

          {/* TEXT SIDE */}
          <div className="space-y-8 text-center lg:text-left px-6 lg:px-0">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs lg:text-sm font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Made for Digital India 🇮🇳
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
              Hands free banking <br />starts here
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-purple"> Awaaz Se.</span>
            </h1>

            <p className="text-base lg:text-lg text-dark-muted leading-relaxed">
              Transfer money via UPI, check balance, or pay bills just by speaking.<br/> Supports English, Hindi, and Hinglish commands.
            </p>

            {/* Try saying */}
            <div className="bg-dark-card/50 border border-dark-border p-4 rounded-xl backdrop-blur-sm text-left">
              <p className="text-[10px] lg:text-xs text-dark-muted uppercase tracking-wider mb-3 pl-1">Try saying:</p>
              <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
                <span className="bg-brand-500/20 text-brand-300 px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium">"Send ₹500 to Rahul"</span>
                <span className="bg-brand-500/20 text-brand-300 px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium">"Mera balance kya hai?"</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button 
                onClick={openSignup} 
                className="bg-brand-600 text-white px-8 py-3.5 rounded-full font-bold text-base lg:text-lg hover:bg-brand-500 transition shadow-xl shadow-brand-600/20 w-full sm:w-auto"
              >
                Start Banking
              </button>
              <button className="border border-dark-border bg-dark-card text-white px-8 py-3.5 rounded-full font-bold text-base lg:text-lg hover:bg-dark-border transition w-full sm:w-auto">
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 lg:gap-12 pt-8 border-t border-dark-border/50">
              <div className="text-center lg:text-left py-4">
                <p className="text-2xl lg:text-3xl font-bold text-white">₹50Cr+</p>
                <p className="text-dark-muted text-xs lg:text-sm">Processed</p>
              </div>
              <div className="text-center lg:text-left py-4">
                <p className="text-2xl lg:text-3xl font-bold text-white">5 Lakh+</p>
                <p className="text-dark-muted text-xs lg:text-sm">Happy Users</p>
              </div>
              <div className="text-center lg:text-left py-4">
                <p className="text-2xl lg:text-3xl font-bold text-white">0%</p>
                <p className="text-dark-muted text-xs lg:text-sm">Fail Rate</p>
              </div>
            </div>
          </div>

          {/* IMAGE SIDE (CLEAN — NO OVERLAY) */}
          <div className="relative lg:h-[640px] flex justify-center items-center mt-8 lg:mt-0 px-6 lg:px-0">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-orange-600 rounded-3xl blur-3xl opacity-20 transition duration-700"></div>

            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition duration-700 hover:scale-[1.02] hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>

              <img 
                src={HeroImage}
                alt="Indian Payment App"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why India Loves VoiceBank?</h2>
            <p className="text-dark-muted max-w-2xl mx-auto text-base lg:text-lg">
              Simplify your financial life with features designed for the modern Indian user.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Instant UPI", desc: "Link any bank account via UPI and transfer money in seconds.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
              { icon: Shield, title: "RBI Compliant", desc: "Your data is secured with bank-grade protocols.", color: "text-green-400", bg: "bg-green-400/10" },
              { icon: Globe, title: "Zero Fees", desc: "No hidden charges on NEFT, IMPS, or UPI transfers.", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: Mic, title: "Multilingual", desc: "Understands English, Hindi, and regional accents.", color: "text-brand-400", bg: "bg-brand-400/10" }
            ].map((feat, i) => (
              <div 
                key={i} 
                className="bg-dark-card p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-brand-500/10 border border-dark-border hover:border-brand-500/30 transition hover:-translate-y-1 group h-full"
              >
                <div className={`w-12 h-12 ${feat.bg} rounded-2xl flex items-center justify-center ${feat.color} mb-6`}>
                  <feat.icon size={24} />
                </div>
                <h3 className="font-bold text-lg lg:text-xl mb-3 text-white">{feat.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-dark-border py-20 px-6 text-center relative overflow-hidden w-full">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-900/20 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">Ready to experience Voice Banking?</h2>
          <p className="text-dark-muted mb-10 text-base lg:text-lg">Join millions of Indians using VoiceBank every day.</p>

          <button 
            onClick={openSignup} 
            className="bg-brand-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-500 transition shadow-lg shadow-brand-600/30 transform hover:scale-105"
          >
            Create Free Account
          </button>

          <div className="mt-16 text-dark-muted text-sm flex flex-col gap-2">
            <p>Made with ❤️ in India 🇮🇳</p>
            <p>© 2025 VoiceBank India. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
