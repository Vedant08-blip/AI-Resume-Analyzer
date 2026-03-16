import React from "react";
import { motion } from "framer-motion";
import Hero from "./pages/Hero.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1d2240,_#020617_55%)] text-white">
      <div className="pointer-events-none fixed inset-0 bg-radial-glow opacity-70" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-white/5 bg-bg-dark/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-blue shadow-lg shadow-accent-purple/40" />
              <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
                AI Resume Analyzer
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hidden items-center gap-3 text-xs text-slate-400 sm:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
              <span>Mock AI analysis · Frontend only</span>
            </motion.div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <Hero />
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;

