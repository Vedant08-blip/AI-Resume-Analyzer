import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="glass-panel gradient-border border-t border-white/10 bg-slate-900/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>
            © 2024 AI Resume Analyzer. Built with React + Tailwind + Framer Motion.
          </span>
          <div className="flex gap-4">
            <a href="#features" className="hover:text-slate-200 transition-colors">
              Features
            </a>
            <a href="#privacy" className="hover:text-slate-200 transition-colors">
              Privacy
            </a>
            <a href="https://github.com" className="hover:text-slate-200 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

