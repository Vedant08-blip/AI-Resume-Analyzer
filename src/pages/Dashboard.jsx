import React from "react";
import ResumeUploader from "../components/ResumeUploader.jsx";
import ATSScoreCard from "../components/ATSScoreCard.jsx";
import SkillsAnalysis from "../components/SkillsAnalysis.jsx";
import ResumeSuggestions from "../components/ResumeSuggestions.jsx";
import JobMatcher from "../components/JobMatcher.jsx";
import SectionInsights from "../components/SectionInsights.jsx";
import LoadingAnimation from "../components/LoadingAnimation.jsx";
import { useResumeAnalyzer } from "../hooks/useResumeAnalyzer.js";

const Dashboard = () => {
  const {
    resumeFile,
    resumeText,
    jobDescription,
    setJobDescription,
    analysis,
    isAnalyzing,
    uploadProgress,
    error,
    handleFile,
    runAnalysis,
    clearResume,
  } = useResumeAnalyzer();

  return (
    <section className="space-y-6">
      <ResumeUploader
        onFileSelect={handleFile}
        onClearResume={clearResume}
        file={resumeFile}
        uploadProgress={uploadProgress}
        error={error}
        resumeText={resumeText}
      />

      <JobMatcher
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        missingKeywords={analysis?.missingSkills ?? []}
        onAnalyze={runAnalysis}
        disabled={!resumeText || isAnalyzing}
      />

      {isAnalyzing && (
        <div className="glass-panel rounded-3xl">
          <LoadingAnimation />
        </div>
      )}

      {analysis && !isAnalyzing && (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <ATSScoreCard score={analysis.atsScore} />
            <SectionInsights sectionScores={analysis.sectionScores} />
          </div>
          <div className="space-y-5">
            <SkillsAnalysis
              detectedSkills={analysis.detectedSkills}
              missingSkills={analysis.missingSkills}
            />
            <ResumeSuggestions
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
              suggestions={analysis.suggestions}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

