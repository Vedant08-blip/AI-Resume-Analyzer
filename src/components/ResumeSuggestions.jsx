import React from "react";
import { motion } from "framer-motion";

const BulletList = ({ title, items, tone }) => {
  const accent =
    tone === "good"
      ? "text-emerald-300 bg-emerald-400/10"
      : "text-rose-300 bg-rose-400/10";

  return (
    <div className="rounded-2xl border border-white/5 bg-black/20 p-3.5 sm:p-4">
      <h3
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${accent}`}
      >
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="mt-3 text-xs text-slate-400">
          Nothing obvious detected here.
        </p>
      ) : (
        <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ResumeSuggestions = ({ strengths, weaknesses, suggestions }) => {
  return (
    <div className="glass-panel gradient-border flex flex-col gap-4 rounded-3xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Insights & Suggestions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            High-level signals a recruiter or ATS-like system might pick up from
            your current resume.
          </p>
        </div>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-3"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BulletList title="Strengths" items={strengths} tone="good" />
        <BulletList title="Weaknesses" items={weaknesses} tone="bad" />
        <div className="rounded-2xl border border-accent-purple/40 bg-accent-purple/10 p-3.5 sm:p-4">
          <h3 className="inline-flex items-center rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-violet-200">
            Suggestions
          </h3>
          {suggestions.length === 0 ? (
            <p className="mt-3 text-xs text-violet-50">
              No major issues detected. You can still fine-tune wording and
              quantify achievements.
            </p>
          ) : (
            <ul className="mt-3 space-y-1.5 text-xs text-violet-50">
              {suggestions.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeSuggestions;
