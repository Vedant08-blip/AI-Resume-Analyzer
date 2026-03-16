import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-sm text-slate-300">
      <motion.div
        className="relative h-14 w-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent-purple/40"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-accent-blue/60 border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
        />
        <div className="absolute inset-4 rounded-full bg-slate-900/90" />
      </motion.div>
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
        Analyzing resume with mock AI…
      </p>
    </div>
  );
};

export default LoadingAnimation;

