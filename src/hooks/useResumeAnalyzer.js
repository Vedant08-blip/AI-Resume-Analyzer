import { useState, useCallback } from "react";
import { extractTextFromPdf } from "../utils/pdfUtils.js";
import { analyzeResumeText } from "../utils/mockAnalysis.js";
import { analyzeResumeWithAI } from "../utils/realAnalysis.js";
import toast from "react-hot-toast";

export function useResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    setError("");
    setResumeFile(file);
    setAnalysis(null);
    setUploadProgress(10);

    try {
      let text = "";

      if (file.type === "application/pdf") {
        setUploadProgress(30);
        text = await extractTextFromPdf(file);
        setUploadProgress(90);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.toLowerCase().endsWith(".docx")
      ) {
        text =
          "DOCX parsing not implemented. Convert to PDF for best results.\\n\\nFile name: " +
          file.name;
        setUploadProgress(70);
      } else {
        throw new Error("Unsupported file type. Please upload PDF or DOCX.");
      }

      setResumeText(text);
      setUploadProgress(100);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to process resume.");
      setError(err.message || "Failed to process resume.");
      setUploadProgress(0);
    }
  }, []);

  const runAnalysis = useCallback(async (jobDescriptionOverride) => {
    if (!resumeText) {
      toast.error("Upload a resume before running analysis.");
      return;
    }
    setError("");
    setIsAnalyzing(true);
    const effectiveJobDescription =
      jobDescriptionOverride ?? jobDescription;

    try {
      let result;
      if (import.meta.env.VITE_OPENAI_API_KEY) {
        toast.loading("Analyzing with real AI...", { id: "analysis" });
        result = await analyzeResumeWithAI(resumeText, effectiveJobDescription);
        toast.success("AI analysis complete!", { id: "analysis" });
      } else {
        toast("Using mock analysis (add VITE_OPENAI_API_KEY to .env)", { duration: 4000 });
        result = analyzeResumeText(resumeText, effectiveJobDescription);
      }
      setAnalysis(result);
    } catch (err) {
      toast.error("Analysis failed, using mock.", { id: "analysis" });
      const mockResult = analyzeResumeText(resumeText, effectiveJobDescription);
      setAnalysis(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  }, [resumeText, jobDescription]);

  const clearResume = useCallback(() => {
    setResumeFile(null);
    setResumeText("");
    setAnalysis(null);
    setUploadProgress(0);
    setError("");
  }, []);

  return {
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
  };
}
