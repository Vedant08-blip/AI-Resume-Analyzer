import React from "react";
import { motion } from "framer-motion";

const JobMatcher = ({
  jobDescription,
  setJobDescription,
  missingKeywords,
  onAnalyze,
  disabled,
  showMissingKeywords = true,
  analyzeLabel = "Run analysis",
}) => {
  const gridClass = showMissingKeywords
    ? "grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
    : "grid gap-4";

  return (
    <div className="glass-panel gradient-border flex flex-col gap-4 rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Job Description Matcher
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Paste a job description and compare its keywords against your
            resume&apos;s current content.
          </p>
        </div>
      </div>

      <div className={gridClass}>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Target job description
          </label>
          <textarea
            className="mt-2 h-32 w-full rounded-2xl border border-white/5 bg-black/20 p-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/60 sm:h-40"
            placeholder="Paste the role description you are targeting. We'll look for overlap and missing keywords."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              {jobDescription.length === 0
                ? "No description provided yet."
                : `${jobDescription.length} characters`}
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={onAnalyze}
              className="rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {analyzeLabel}
            </button>
          </div>
        </div>

        {showMissingKeywords && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-black/30 p-3.5"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Missing keywords from this job
            </p>
            <p className="mt-2 text-xs text-slate-300">
              These tokens are present in the job description but not clearly
              visible in your resume text.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {missingKeywords.length === 0 ? (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-200">
                  No clear missing keywords detected for this role.
                </span>
              ) : (
                missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full bg-rose-500/10 px-2.5 py-1 text-rose-200"
                  >
                    {kw}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;
