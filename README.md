## 🚀 AI Resume Analyzer - **Real AI ATS Scoring**

Modern **React** app with **OpenAI GPT-4o-mini** for real ATS analysis. Upload PDF, get AI-powered scores, skills gaps & suggestions. Fully client-side (PDF parsing), secure API fallback.

[![Vite](https://img.shields.io/badge/vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/react-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)

### ✨ **Key Features**
- **Real AI Analysis**: OpenAI GPT-4o-mini (ATS score, skills, suggestions, section scores).
- **Client-side PDF Extraction**: pdf.js (no server uploads).
- **Job Matching**: Paste JD, highlights missing keywords.
- **Dark Glassmorphism UI**: Tailwind + Framer Motion.
- **Dev Ready**: ESLint, Prettier, Vitest.

### 🛠 Tech Stack
- React 18 + Vite 6
- TailwindCSS, Framer Motion
- Chart.js, pdfjs-dist, OpenAI
- react-hot-toast, Vitest

### 🚀 Quick Start
1. Clone & install:
   ```bash
   npm install
   ```
2. **Add OpenAI key** (for real AI):
   ```
   cp .env.example .env
   # Edit .env: VITE_OPENAI_API_KEY=sk-...
   ```
3. Dev server:
   ```bash
   npm run dev
   ```
4. Open `localhost:5173`

### 🎯 **How AI Works**
```
Upload PDF → pdf.js extracts text → OpenAI prompt → Structured JSON → UI charts
```
- **Fallback**: Mock analysis if no key.
- **Prompt**: ATS-focused (score 0-100, skills, gaps, sections).

### 📁 Structure
```
src/
├── components/     ResumeUploader, ATSScoreCard...
├── hooks/          useResumeAnalyzer.js (AI logic)
├── utils/          realAnalysis.js (OpenAI), mockAnalysis.js
├── pages/          Dashboard, Hero
```

### 🔧 Scripts
```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # ESLint
npm run format   # Prettier
npm test         # Vitest
npm run preview  # Preview build
```

### .env Setup
```
VITE_OPENAI_API_KEY=sk-your-key-here
```
**Note**: Frontend-only. Key exposed client-side (fine for demo; proxy for prod).

### 📈 **Next Steps (TODO.md)**
- DOCX support (mammoth.js)
- Multi-resume compare
- PDF export
- PWA

### 🙌 Credits
Built with Vite, Tailwind, OpenAI. Demo → Production ready!

⭐ **Star if useful!**

