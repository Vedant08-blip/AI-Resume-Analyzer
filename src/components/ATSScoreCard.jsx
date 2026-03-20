import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, DoughnutController, CategoryScale } from "chart.js";
import { motion } from "framer-motion";

Chart.register(ArcElement, Tooltip, DoughnutController, CategoryScale);

const ATSScoreCard = ({ score = 0, highlight = false }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Safe destroy previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvas.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Score", "Remaining"],
        datasets: [
          {
            data: [score, 100 - score],
            backgroundColor: [
              "rgba(129, 140, 248, 0.95)",
              "rgba(15, 23, 42, 0.7)",
            ],
            borderWidth: 0,
            cutout: "75%",
          },
        ],
      },
      options: {
        plugins: {
          tooltip: { enabled: false },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [score]);

  const label =
    score >= 85
      ? "Excellent ATS fit"
      : score >= 70
      ? "Strong match"
      : score >= 55
      ? "Moderate match"
      : "Needs improvement";

  return (
    <motion.div
      className={`glass-panel gradient-border relative flex flex-col gap-4 rounded-3xl p-5 sm:p-6 ${
        highlight ? "ring-1 ring-amber-300/40" : ""
      }`}
      animate={
        highlight
          ? {
              boxShadow: [
                "0 0 0 rgba(251,191,36,0)",
                "0 0 22px rgba(251,191,36,0.25)",
                "0 0 0 rgba(251,191,36,0)",
              ],
            }
          : { boxShadow: "0 0 0 rgba(0,0,0,0)" }
      }
      transition={{ duration: 2.2, repeat: highlight ? Infinity : 0, ease: "easeInOut" }}
    >
      {highlight && (
        <span className="absolute right-4 top-4 rounded-full bg-amber-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200">
          Winner
        </span>
      )}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            ATS Score
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Simulated match between your resume and a generic ATS profile.
          </p>
        </div>

      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36 md:h-44 md:w-44">
          <canvas ref={canvasRef} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-slate-100 bg-clip-text text-transparent drop-shadow-2xl mb-1">
              {Math.round(score)}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-medium">
              / 100
            </span>
          </motion.div>
        </div>

        <div className="flex-1 text-sm text-slate-300 space-y-2">
          <p className="font-semibold text-slate-100 text-lg">{label}</p>
          <p className="text-xs leading-relaxed">
            This visualization approximates how aligned your resume might be
            with a typical ATS search. Use the skills, sections, and suggestions
            panels to increase this score.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300 border border-emerald-400/20">
              Keywords
            </span>
            <span className="rounded-full bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 border border-sky-400/20">
              Section quality
            </span>
            <span className="rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300 border border-violet-400/20">
              Coverage vs. job
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ATSScoreCard;
