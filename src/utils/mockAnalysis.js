// Enhanced Resume Analyzer (No API Required)

const SKILL_DICTIONARY = [
  "javascript","typescript","react","node","node.js","python",
  "django","flask","sql","nosql","aws","docker","kubernetes",
  "git","ci/cd","tailwind","next.js","rest","graphql","mongodb","express"
];

// Utility: clean + normalize text
const normalizeText = (text) =>
  text.toLowerCase().replace(/\s+/g, " ").trim();

// Utility: extract keywords smartly
const extractKeywords = (text) => {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/[^a-zA-Z0-9+#.]+/)
        .filter((word) => word.length > 3)
    )
  );
};

// Utility: detect numbers/impact (e.g. 50%, 2x, 100 users)
const hasImpactMetrics = (text) => {
  return /\b\d+(\+|%|x)?\b/.test(text);
};

export function analyzeResumeText(resumeText, jobDescriptionText = "") {
  const resume = normalizeText(resumeText);
  const job = normalizeText(jobDescriptionText);

  // ✅ Improved skill detection (handles variations)
  const detectedSkills = SKILL_DICTIONARY.filter((skill) =>
    new RegExp(`\\b${skill}\\b`, "i").test(resume)
  );

  // ✅ Smarter keyword extraction
  const jobKeywords = job ? extractKeywords(job) : [];

  const missingSkills = jobKeywords.filter(
    (keyword) => !resume.includes(keyword)
  );

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // ✅ Skills Analysis
  if (detectedSkills.length >= 5) {
    strengths.push("Strong technical skillset aligned with industry demand.");
  } else if (detectedSkills.length > 0) {
    weaknesses.push("Limited number of technical skills listed.");
    suggestions.push("Add more relevant tools/technologies (8–15 recommended).");
  } else {
    weaknesses.push("No clear technical skills detected.");
    suggestions.push("Create a dedicated 'Skills' section.");
  }

  // ✅ Section Detection
  const hasExperience = /experience|work history/.test(resume);
  const hasProjects = /project|portfolio/.test(resume);
  const hasEducation = /education|degree/.test(resume);

  if (hasExperience) {
    strengths.push("Experience section is present.");
  } else {
    weaknesses.push("Missing 'Experience' section.");
    suggestions.push("Add work experience with measurable achievements.");
  }

  if (hasProjects) {
    strengths.push("Projects section is included.");
  } else {
    weaknesses.push("Projects section missing.");
    suggestions.push("Add 2–4 strong projects with impact.");
  }

  if (!hasEducation) {
    weaknesses.push("Education section missing.");
    suggestions.push("Include education details clearly.");
  }

  // ✅ Impact Analysis
  if (hasImpactMetrics(resume)) {
    strengths.push("Uses measurable achievements (numbers/metrics).");
  } else {
    weaknesses.push("No measurable achievements found.");
    suggestions.push("Add numbers (e.g., improved performance by 30%).");
  }

  // ✅ Section Scores (Improved Logic)
  const sectionScores = {
    skills: Math.min(100, detectedSkills.length * 10),
    experience: hasExperience ? 85 : 40,
    projects: hasProjects ? 80 : 35,
    education: hasEducation ? 75 : 45,
    impact: hasImpactMetrics(resume) ? 90 : 50,
  };

  // ✅ Weighted ATS Score
  const atsScore = Math.round(
    0.3 * sectionScores.skills +
    0.25 * sectionScores.experience +
    0.2 * sectionScores.projects +
    0.15 * sectionScores.education +
    0.1 * sectionScores.impact
  );

  return {
    atsScore,
    detectedSkills,
    missingSkills: missingSkills.slice(0, 20),
    strengths,
    weaknesses,
    suggestions,
    sectionScores,
  };
}