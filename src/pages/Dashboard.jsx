import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import ResumeUploader from "../components/ResumeUploader.jsx";
import ATSScoreCard from "../components/ATSScoreCard.jsx";
import SkillsAnalysis from "../components/SkillsAnalysis.jsx";
import ResumeSuggestions from "../components/ResumeSuggestions.jsx";
import JobMatcher from "../components/JobMatcher.jsx";
import SectionInsights from "../components/SectionInsights.jsx";
import LoadingAnimation from "../components/LoadingAnimation.jsx";
import { useResumeAnalyzer } from "../hooks/useResumeAnalyzer.js";

const Dashboard = () => {
  const [mode, setMode] = useState("single");

  const single = useResumeAnalyzer();
  const compareLeft = useResumeAnalyzer();
  const compareRight = useResumeAnalyzer();
  const [compareJobDescription, setCompareJobDescription] = useState("");

  const runCompareAnalysis = useCallback(async () => {
    await Promise.all([
      compareLeft.runAnalysis(compareJobDescription),
      compareRight.runAnalysis(compareJobDescription),
    ]);
  }, [
    compareLeft.runAnalysis,
    compareRight.runAnalysis,
    compareJobDescription,
  ]);

  const isComparing = compareLeft.isAnalyzing || compareRight.isAnalyzing;
  const canCompare = Boolean(
    compareLeft.resumeText && compareRight.resumeText
  );
  const leftScore = compareLeft.analysis?.atsScore ?? null;
  const rightScore = compareRight.analysis?.atsScore ?? null;
  const winner =
    leftScore != null && rightScore != null
      ? leftScore === rightScore
        ? "tie"
        : leftScore > rightScore
        ? "left"
        : "right"
      : null;

  const confettiPieces = [
    { x: "10%", rotate: -18, delay: 0 },
    { x: "25%", rotate: 22, delay: 0.05 },
    { x: "40%", rotate: -12, delay: 0.1 },
    { x: "55%", rotate: 28, delay: 0.08 },
    { x: "70%", rotate: -24, delay: 0.12 },
    { x: "85%", rotate: 16, delay: 0.06 },
  ];

  const ConfettiBurst = () => (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-visible">
      {confettiPieces.map((piece, index) => (
        <motion.span
          key={`confetti-${index}`}
          className="absolute top-0 h-2.5 w-1.5 rounded-full"
          style={{
            left: piece.x,
            background:
              index % 3 === 0
                ? "linear-gradient(180deg, #fbbf24, #f59e0b)"
                : index % 3 === 1
                ? "linear-gradient(180deg, #38bdf8, #0ea5e9)"
                : "linear-gradient(180deg, #a855f7, #7c3aed)",
          }}
          initial={{ opacity: 0, y: -10, rotate: piece.rotate }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, 90],
            rotate: [piece.rotate, piece.rotate + 120],
          }}
          transition={{
            duration: 1.4,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-200 border border-rose-400/30 shadow-[0_0_18px_rgba(244,63,94,0.35)]">
          View mode
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("single")}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
              mode === "single"
                ? "bg-gradient-to-r from-accent-purple to-accent-blue text-slate-950"
                : "bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            Single resume
          </button>
          <button
            type="button"
            onClick={() => setMode("compare")}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
              mode === "compare"
                ? "bg-gradient-to-r from-accent-purple to-accent-blue text-slate-950"
                : "bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            Compare 2 resumes
          </button>
        </div>
      </div>

      {mode === "single" && (
        <>
          <ResumeUploader
            onFileSelect={single.handleFile}
            onClearResume={single.clearResume}
            file={single.resumeFile}
            uploadProgress={single.uploadProgress}
            error={single.error}
            resumeText={single.resumeText}
          />

          <JobMatcher
            jobDescription={single.jobDescription}
            setJobDescription={single.setJobDescription}
            missingKeywords={single.analysis?.missingSkills ?? []}
            onAnalyze={single.runAnalysis}
            disabled={!single.resumeText || single.isAnalyzing}
          />

          {single.isAnalyzing && (
            <div className="glass-panel rounded-3xl">
              <LoadingAnimation />
            </div>
          )}

          {single.analysis && !single.isAnalyzing && (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="space-y-5">
                <ATSScoreCard score={single.analysis.atsScore} />
                <SectionInsights sectionScores={single.analysis.sectionScores} />
              </div>
              <div className="space-y-5">
                <SkillsAnalysis
                  detectedSkills={single.analysis.detectedSkills}
                  missingSkills={single.analysis.missingSkills}
                />
                <ResumeSuggestions
                  strengths={single.analysis.strengths}
                  weaknesses={single.analysis.weaknesses}
                  suggestions={single.analysis.suggestions}
                />
              </div>
            </div>
          )}
        </>
      )}

      {mode === "compare" && (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-slate-200">
                  Resume A
                </span>
                <span className="text-slate-500">First candidate</span>
              </div>
              <ResumeUploader
                onFileSelect={compareLeft.handleFile}
                onClearResume={compareLeft.clearResume}
                file={compareLeft.resumeFile}
                uploadProgress={compareLeft.uploadProgress}
                error={compareLeft.error}
                resumeText={compareLeft.resumeText}
                variant="compare"
                showPreview={false}
              />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-slate-200">
                  Resume B
                </span>
                <span className="text-slate-500">Second candidate</span>
              </div>
              <ResumeUploader
                onFileSelect={compareRight.handleFile}
                onClearResume={compareRight.clearResume}
                file={compareRight.resumeFile}
                uploadProgress={compareRight.uploadProgress}
                error={compareRight.error}
                resumeText={compareRight.resumeText}
                variant="compare"
                showPreview={false}
              />
            </div>
          </div>

          <JobMatcher
            jobDescription={compareJobDescription}
            setJobDescription={setCompareJobDescription}
            missingKeywords={[]}
            onAnalyze={runCompareAnalysis}
            disabled={!canCompare || isComparing}
            showMissingKeywords={false}
            analyzeLabel="Run analysis for both"
          />

          {isComparing && (
            <div className="glass-panel rounded-3xl">
              <LoadingAnimation />
            </div>
          )}

          {(compareLeft.analysis || compareRight.analysis) && !isComparing && (
            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                className="relative space-y-5"
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow:
                    winner === "left"
                      ? "0 0 28px rgba(251,191,36,0.28)"
                      : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {winner === "left" && <ConfettiBurst />}
                <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Resume A Insights
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Results for the first resume.
                  </p>
                </div>
                {compareLeft.analysis ? (
                  <>
                    {winner === "left" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: [1, 1.03, 1],
                          boxShadow: [
                            "0 0 16px rgba(251,191,36,0.25)",
                            "0 0 32px rgba(251,191,36,0.45)",
                            "0 0 16px rgba(251,191,36,0.25)",
                          ],
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-300/20 text-amber-200">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M4 18h16v2H4v-2zm0-2l2.5-9 5 5 4-7 3.5 11H4z"
                            />
                          </svg>
                        </span>
                        <span>Winner</span>
                      </motion.div>
                    )}
                    {winner === "tie" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-sky-300/30 bg-sky-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200"
                      >
                        Tie
                      </motion.div>
                    )}
                    <ATSScoreCard score={compareLeft.analysis.atsScore} />
                    <SectionInsights
                      sectionScores={compareLeft.analysis.sectionScores}
                    />
                    <SkillsAnalysis
                      detectedSkills={compareLeft.analysis.detectedSkills}
                      missingSkills={compareLeft.analysis.missingSkills}
                    />
                    <ResumeSuggestions
                      strengths={compareLeft.analysis.strengths}
                      weaknesses={compareLeft.analysis.weaknesses}
                      suggestions={compareLeft.analysis.suggestions}
                    />
                  </>
                ) : (
                  <div className="rounded-2xl border border-white/5 bg-black/20 p-4 text-xs text-slate-400">
                    No analysis yet for Resume A.
                  </div>
                )}
              </motion.div>

              <motion.div
                className="relative space-y-5"
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow:
                    winner === "right"
                      ? "0 0 28px rgba(251,191,36,0.28)"
                      : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {winner === "right" && <ConfettiBurst />}
                <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Resume B Insights
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Results for the second resume.
                  </p>
                </div>
                {compareRight.analysis ? (
                  <>
                    {winner === "right" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: [1, 1.03, 1],
                          boxShadow: [
                            "0 0 16px rgba(251,191,36,0.25)",
                            "0 0 32px rgba(251,191,36,0.45)",
                            "0 0 16px rgba(251,191,36,0.25)",
                          ],
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-300/20 text-amber-200">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M4 18h16v2H4v-2zm0-2l2.5-9 5 5 4-7 3.5 11H4z"
                            />
                          </svg>
                        </span>
                        <span>Winner</span>
                      </motion.div>
                    )}
                    {winner === "tie" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-sky-300/30 bg-sky-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200"
                      >
                        Tie
                      </motion.div>
                    )}
                    <ATSScoreCard score={compareRight.analysis.atsScore} />
                    <SectionInsights
                      sectionScores={compareRight.analysis.sectionScores}
                    />
                    <SkillsAnalysis
                      detectedSkills={compareRight.analysis.detectedSkills}
                      missingSkills={compareRight.analysis.missingSkills}
                    />
                    <ResumeSuggestions
                      strengths={compareRight.analysis.strengths}
                      weaknesses={compareRight.analysis.weaknesses}
                      suggestions={compareRight.analysis.suggestions}
                    />
                  </>
                ) : (
                  <div className="rounded-2xl border border-white/5 bg-black/20 p-4 text-xs text-slate-400">
                    No analysis yet for Resume B.
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Dashboard;
