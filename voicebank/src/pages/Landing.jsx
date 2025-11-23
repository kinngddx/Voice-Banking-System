// FILE: src/pages/Landing.jsx
import React from 'react';
import { Mic, Shield, Smartphone, Zap, IndianRupee, Languages } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Landing() {
  const { openLogin, openSignup } = useAuthStore();

  return (
    <div className="min-h-screen bg-dark-bg font-sans text-white selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2 text-brand-500 font-bold text-2xl">
          <Mic className="fill-current" />
          <span>VoiceBank</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={openLogin} className="text-dark-muted font-medium hover:text-white transition">Login</button>
          <button onClick={openSignup} className="bg-brand-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-500 transition shadow-lg shadow-brand-600/20 border border-transparent hover:border-brand-400">
            Open Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-4 lg:px-8 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Made for Digital India 🇮🇳
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Ab Banking Hogi <br/>
              Sirf <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-purple">Awaaz Se.</span>
            </h1>
            <p className="text-lg lg:text-xl text-dark-muted max-w-lg leading-relaxed">
              Transfer money via UPI, check balance, or pay bills just by speaking. Supports English, Hindi, and Hinglish commands.
            </p>
            
            <div className="bg-dark-card/50 border border-dark-border p-4 rounded-xl max-w-md backdrop-blur-sm">
                <p className="text-xs text-dark-muted uppercase tracking-wider mb-2">Try saying:</p>
                <div className="flex gap-3 flex-wrap">
                    <span className="bg-brand-500/20 text-brand-300 px-3 py-1 rounded-lg text-sm">"Send ₹500 to Rahul"</span>
                    <span className="bg-brand-500/20 text-brand-300 px-3 py-1 rounded-lg text-sm">"Mera balance kya hai?"</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={openSignup} className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-500 transition shadow-xl shadow-brand-600/20">
                Start Banking
              </button>
              <button className="border border-dark-border bg-dark-card text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-dark-border transition">
                View Demo
              </button>
            </div>
            
            <div className="flex gap-12 pt-8 border-t border-dark-border/50">
              <div><p className="text-3xl font-bold text-white">₹50Cr+</p><p className="text-dark-muted text-sm">Processed</p></div>
              <div><p className="text-3xl font-bold text-white">5 Lakh+</p><p className="text-dark-muted text-sm">Happy Users</p></div>
              <div><p className="text-3xl font-bold text-white">0%</p><p className="text-dark-muted text-sm">Fail Rate</p></div>
            </div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="relative hidden lg:block group perspective-1000">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-orange-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
             <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Indian Payment App" 
                className="relative rounded-3xl shadow-2xl transform rotate-y-12 rotate-z-3 border border-white/10 transition duration-500 group-hover:rotate-y-6 group-hover:rotate-z-1 object-cover h-[500px] w-full"
             />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-4 lg:px-8 relative bg-dark-bg">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
             <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why India Loves VoiceBank?</h2>
             <p className="text-dark-muted max-w-2xl mx-auto">Simplify your financial life with features designed for the modern Indian user.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                 { icon: Zap, title: "Instant UPI", desc: "Link any bank account via UPI and transfer money in seconds.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
                 { icon: Shield, title: "RBI Compliant", desc: "Your data is secured with 256-bit encryption & bank-grade protocols.", color: "text-green-400", bg: "bg-green-400/10" },
                 { icon: IndianRupee, title: "Zero Fees", desc: "No hidden charges on NEFT, IMPS, or UPI transfers.", color: "text-blue-400", bg: "bg-blue-400/10" },
                 { icon: Languages, title: "Multilingual", desc: "Our AI understands English, Hindi, and regional accents.", color: "text-brand-400", bg: "bg-brand-400/10" }
              ].map((feat, i) => (
                 <div key={i} className="bg-dark-card p-8 rounded-3xl shadow-lg hover:shadow-brand-500/10 border border-dark-border hover:border-brand-500/30 transition hover:-translate-y-1 group">
                    <div className={`w-14 h-14 ${feat.bg} rounded-2xl flex items-center justify-center ${feat.color} mb-6 group-hover:scale-110 transition`}>
                       <feat.icon size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">{feat.title}</h3>
                    <p className="text-dark-muted leading-relaxed">{feat.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Marquee Brands (Mock) */}
      <section className="py-10 border-y border-dark-border bg-black/20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <p className="text-sm font-bold text-dark-muted uppercase tracking-widest mb-8">Works seamlessly with</p>
             <div className="flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap">
                <span className="text-2xl font-bold text-white">HDFC Bank</span>
                <span className="text-2xl font-bold text-white">SBI</span>
                <span className="text-2xl font-bold text-white">ICICI Bank</span>
                <span className="text-2xl font-bold text-white">Axis Bank</span>
                <span className="text-2xl font-bold text-white">Paytm</span>
             </div>
          </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-black border-t border-dark-border py-24 px-4 text-center relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-900/20 blur-[100px] pointer-events-none"></div>
         
         <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to experience Voice Banking?</h2>
            <p className="text-dark-muted mb-10 max-w-xl mx-auto">Join millions of Indians who trust VoiceBank for their daily payments.</p>
            <button onClick={openSignup} className="bg-brand-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-500 transition shadow-lg shadow-brand-600/30">
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