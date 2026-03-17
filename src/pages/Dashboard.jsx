import React, { useCallback, useState } from "react";
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

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
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
              <div className="space-y-5">
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
              </div>

              <div className="space-y-5">
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
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Dashboard;
