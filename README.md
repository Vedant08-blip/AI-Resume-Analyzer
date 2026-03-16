## AI Resume Analyzer (Frontend Only)

A modern, dark-mode, AI-style **Resume Analyzer** built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Chart.js**, and **pdf.js** for local PDF text extraction.

This project uses **mock analysis** logic only (no backend). It is structured so you can later plug in a real AI/ATS API.

### Tech Stack

- **React + Vite**
- **Tailwind CSS**
- **Framer Motion** for layout / hover / loading animations
- **Chart.js** for the ATS score circular chart
- **pdf.js (pdfjs-dist)** for reading text from uploaded PDF resumes

### Key Features

- Dark, futuristic UI with glassmorphism and gradient accents.
- Drag-and-drop resume upload (PDF + DOCX placeholder).
- Local PDF text extraction with `pdf.js` (no server upload).
- Mock ATS-style analysis:
  - Overall ATS score (0–100) with animated circular chart.
  - Detected skills vs. missing skills.
  - Strengths, weaknesses, and suggestions.
  - Section-wise scores (Skills, Experience, Projects, Education).
- Job description matcher:
  - Paste job description text.
  - Highlights missing keywords versus the resume.
- Animated loading state while "analyzing".

### Project Structure

```text
src/
  components/
    ATSScoreCard.jsx
    JobMatcher.jsx
    LoadingAnimation.jsx
    ResumeSuggestions.jsx
    ResumeUploader.jsx
    SectionInsights.jsx
    SkillsAnalysis.jsx
  hooks/
    useResumeAnalyzer.js
  pages/
    Dashboard.jsx
    Hero.jsx
  utils/
    mockAnalysis.js
    pdfUtils.js
  App.jsx
  main.jsx
  index.css
```

### Getting Started

1. **Install dependencies**

```bash
cd AI-Resume-Analyzer
npm install
```

2. **Run the dev server**

```bash
npm run dev
```

3. Open the printed local URL in your browser (typically `http://localhost:5173`).

### How PDF Extraction Works

- When you upload a PDF, the app:
  - Reads it into an `ArrayBuffer` in the browser.
  - Uses `pdfjs-dist` (`getDocument`) to parse pages.
  - Concatenates page text into a single string.
  - Stores that string in React state for analysis.

DOCX parsing is currently mocked with a placeholder string so you can later plug in a real DOCX parser or server-side pipeline.

### Where to Plug in a Real AI API

- Look at `src/utils/mockAnalysis.js` and `src/hooks/useResumeAnalyzer.js`.
- Replace the `analyzeResumeText` implementation, or call an external API from within `runAnalysis` in the `useResumeAnalyzer` hook.
- Keep the return shape similar to keep the UI components working:

```js
{
  atsScore: number,            // 0–100
  detectedSkills: string[],
  missingSkills: string[],
  strengths: string[],
  weaknesses: string[],
  suggestions: string[],
  sectionScores: {
    skills: number,
    experience: number,
    projects: number,
    education: number,
  },
}
```

### Notes

- This is a **frontend-only** demo; no resumes are sent to a server.
- The analysis logic is heuristic and for demonstration only.

