import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, DoughnutController, CategoryScale } from "chart.js";
import { motion } from "framer-motion";

Chart.register(ArcElement, Tooltip, DoughnutController, CategoryScale);

const ATSScoreCard = ({ score }) => {
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

    // Unique canvas ID to prevent conflicts
    canvas.id = 'ats-chart';

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
            cutout: "70%",
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
    <div className="glass-panel gradient-border relative flex flex-col gap-4 rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            ATS Score
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Simulated match between your resume and a generic ATS profile.
          </p>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
          Mock score
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
          <canvas ref={canvasRef} />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="text-3xl font-semibold text-slate-50">
              {score}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
              / 100
            </span>
          </motion.div>
        </div>

        <div className="flex-1 text-sm text-slate-300">
          <p className="font-medium text-slate-100">{label}</p>
          <p className="mt-2 text-xs text-slate-300">
            This visualization approximates how aligned your resume might be
            with a typical ATS search. Use the skills, sections, and suggestions
            panels to increase this score.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
              Keywords
            </span>
            <span className="rounded-full bg-sky-400/10 px-2.5 py-1 text-sky-300">
              Section quality
            </span>
            <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-violet-300">
              Coverage vs. job
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;
