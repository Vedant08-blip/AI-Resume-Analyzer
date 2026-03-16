import React, { useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ResumeUploader = ({
  onFileSelect,
  onClearResume,
  file,
  uploadProgress,
  error,
  resumeText,
}) => {
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (!file) return;
      if (!allowedTypes.includes(file.type) && !file.name.endsWith(".docx")) {
        toast.error("Please upload a PDF or DOCX file.");
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="glass-panel gradient-border relative overflow-hidden rounded-3xl p-4 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="sm:max-w-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            1. Upload Resume
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Drag & drop your resume in PDF or DOCX format. We will extract
            the raw text locally in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span className="rounded-full bg-white/5 px-2.5 py-1">
              No file upload to server
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1">
              PDF parsing via pdf.js
            </span>
          </div>
        </div>

        <div className="flex-1">
          <motion.div
            onDrop={onDrop}
            onDragOver={onDragOver}
            whileHover={{ scale: 1.01 }}
            className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600/60 bg-slate-900/60 px-4 py-6 text-center transition-colors hover:border-accent-blue/70"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent-purple/80 to-accent-blue/80 text-xl shadow-lg shadow-accent-purple/40">
                ⬆
              </div>
              <div>
                <p className="text-sm font-medium text-slate-100">
                  Drop your resume here
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  or click to browse from your device
                </p>
              </div>
            </div>

            <AnimatePresence>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="mt-5 w-full max-w-xs"
                >
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "easeOut", duration: 0.3 }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Extracting text… {uploadProgress}%
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {file && uploadProgress === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 w-full max-w-xs text-left text-xs text-slate-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-100">Selected file</p>
                    <p className="truncate text-slate-300">{file.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {Math.round(file.size / 1024)} KB · text extracted
                    </p>
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearResume();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Clear resume"
                  >
                    ×
                  </motion.button>
                </div>
              </motion.div>
            )}

            {error && (
              <p className="mt-3 max-w-xs text-xs text-rose-400">{error}</p>
            )}
          </motion.div>
        </div>
      </div>

      {resumeText && (
        <div className="mt-6">
          <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Raw extracted text (preview)
          </h3>
          <div className="max-h-40 overflow-y-auto rounded-2xl border border-white/5 bg-black/20 p-3 text-[11px] leading-relaxed text-slate-300">
            {resumeText.slice(0, 1200) || "No text detected yet."}
            {resumeText.length > 1200 && (
              <span className="text-slate-500"> … (truncated)</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;

