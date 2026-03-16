import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/20 p-6 shadow-glass sm:p-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
          Powered by mock AI · ATS-focused
        </p>
        <h1 className="mt-4 bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-3xl font-semibold leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl">
          AI Resume Analyzer for{" "}
          <span className="text-accent-blue">ATS-optimized</span> job
          applications.
        </h1>
        <p className="mt-4 text-sm text-slate-300 sm:text-base">
          Upload your resume and instantly simulate how modern Applicant
          Tracking Systems read and score your profile. Detect missing skills,
          match job descriptions, and get actionable suggestions to stand out.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="rounded-full bg-white/5 px-3 py-1">
            ATS-friendly keyword analysis
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Job description matcher
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Section-wise insights
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        className="pointer-events-none absolute -right-8 -top-10 hidden h-52 w-52 rounded-full bg-[conic-gradient(from_190deg_at_50%_50%,#22d3ee,#7c3aed,#22c55e,#22d3ee)] opacity-60 blur-3xl sm:block"
      />
    </section>
  );
};

export default Hero;
