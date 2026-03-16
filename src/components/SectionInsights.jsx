import React from "react";
import { motion } from "framer-motion";

const ProgressRow = ({ label, score }) => {
  const color =
    score >= 80
      ? "from-emerald-400 to-emerald-500"
      : score >= 60
      ? "from-sky-400 to-sky-500"
      : "from-rose-400 to-rose-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span className="text-slate-400">{score}/100</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SectionInsights = ({ sectionScores }) => {
  const { skills, experience, projects, education } = sectionScores;
  return (
    <div className="glass-panel gradient-border flex flex-col gap-4 rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Section Insights
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Approximate strength of each major section based on headings and
            keyword density.
          </p>
        </div>
      </div>

      <div className="mt-1 space-y-3">
        <ProgressRow label="Skills" score={skills} />
        <ProgressRow label="Experience" score={experience} />
        <ProgressRow label="Projects" score={projects} />
        <ProgressRow label="Education" score={education} />
      </div>
    </div>
  );
};

export default SectionInsights;

