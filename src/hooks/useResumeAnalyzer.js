import { useState, useCallback } from "react";
import { extractTextFromPdf } from "../utils/pdfUtils.js";
import { analyzeResumeText } from "../utils/mockAnalysis.js";

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
        // DOCX placeholder – real parsing can be added later.
        text =
          "DOCX parsing not implemented in this demo. Convert your resume to PDF for better results.\n\nFile name: " +
          file.name;
        setUploadProgress(70);
      } else {
        throw new Error("Unsupported file type. Please upload PDF or DOCX.");
      }

      setResumeText(text);
      setUploadProgress(100);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process resume.");
      setUploadProgress(0);
    }
  }, []);

  const runAnalysis = useCallback(() => {
    if (!resumeText) {
      setError("Upload a resume before running analysis.");
      return;
    }
    setError("");
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeResumeText(resumeText, jobDescription);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 900);
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
