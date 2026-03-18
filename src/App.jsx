import React from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Hero from "./pages/Hero.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1d2240,_#020617_55%)] text-white">
      <div className="pointer-events-none fixed inset-0 bg-radial-glow opacity-70" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border border-white/10 bg-slate-900/30 backdrop-blur-2xl shadow-2xl shadow-black/20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/70 shadow-2xl shadow-black/40 border border-white/10">
                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                  className="h-9 w-9"
                >
                  <rect width="64" height="64" rx="12" fill="#111827" />
                  <rect x="16" y="14" width="32" height="36" rx="4" fill="#ffffff" />
                  <rect x="20" y="22" width="18" height="3" rx="1.5" fill="#111827" />
                  <rect x="20" y="28" width="24" height="3" rx="1.5" fill="#111827" />
                  <rect x="20" y="34" width="20" height="3" rx="1.5" fill="#111827" />
                  <circle cx="44" cy="24" r="4" fill="#10b981" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-slate-100 via-blue-100 to-slate-300 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                Resume Analyzer
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-panel hidden items-center gap-3 text-xs text-slate-400 sm:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-pulse" />
              <span>Mock AI analysis</span>
            </motion.div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <Hero />
          <Dashboard />
        </main>
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            style: { 
              background: 'rgba(15, 23, 42, 0.95)', 
              color: '#f1f5f9', 
              backdropFilter: 'blur(10px)' 
            } 
          }} 
        />
      </div>
    </div>
  );
}

export default App;
