import React from "react";
import { motion } from "framer-motion";
import Hero from "./pages/Hero.jsx";\n        import Dashboard from "./pages/Dashboard.jsx";\n        import Footer from "./components/Footer.jsx";

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
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue shadow-2xl shadow-accent-blue/50" />
                <span className="absolute inset-1 flex items-center justify-center rounded-xl bg-slate-900/90 border border-white/20 text-xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent shadow-inner">
                  AI
                </span>
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
              <span>Mock AI analysis · Frontend only</span>
            </motion.div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pt-8 sm:px-6 lg:px-8">\n          <Hero />\n          <Dashboard />\n        </main>\n        <Footer />
      </div>
    </div>
  );
}

export default App;

