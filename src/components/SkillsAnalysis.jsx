import React from "react";
import { motion } from "framer-motion";

const Pill = ({ label, tone = "default" }) => {
  const tones = {
    default:
      "bg-white/5 text-slate-200 border border-white/5 hover:border-slate-400/60",
    missing:
      "bg-rose-500/10 text-rose-200 border border-rose-500/40 hover:border-rose-400/80",
    present:
      "bg-emerald-500/10 text-emerald-200 border border-emerald-500/40 hover:border-emerald-400/80",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] transition-colors ${tones[tone]}`}
    >
      {label}
    </span>
  );
};

const SkillsAnalysis = ({ detectedSkills, missingSkills }) => {
  return (
    <div className="glass-panel gradient-border flex flex-col gap-4 rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Skills Coverage
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            What the ATS is likely to detect from your resume vs. what the job
            description is asking for.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            Skills detected
          </h3>
          <p className="mt-1 text-[11px] text-slate-400">
            These skills appear in your resume text.
          </p>
          <motion.div
            className="mt-3 flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {detectedSkills.length === 0 && (
              <p className="text-xs text-slate-400">
                No recognizable skills extracted. Consider adding a dedicated
                skills section.
              </p>
            )}
            {detectedSkills.map((skill) => (
              <Pill key={skill} label={skill} tone="present" />
            ))}
          </motion.div>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-rose-300">
            Potentially missing
          </h3>
          <p className="mt-1 text-[11px] text-slate-400">
            Keywords present in the job description but not strongly visible in
            your resume.
          </p>
          <motion.div
            className="mt-3 flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {missingSkills.length === 0 && (
              <p className="text-xs text-slate-400">
                No obvious missing keywords detected for this description.
              </p>
            )}
            {missingSkills.map((skill) => (
              <Pill key={skill} label={skill} tone="missing" />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysis;

