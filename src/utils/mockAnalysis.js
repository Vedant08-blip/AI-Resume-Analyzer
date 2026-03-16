// Simple mock "AI" analysis helpers. These operate purely on text and
// generate deterministic JSON structures that can later be replaced by
// real API calls.

const SKILL_DICTIONARY = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "SQL",
  "NoSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "CI/CD",
  "Tailwind",
  "Next.js",
  "REST",
  "GraphQL",
];

export function analyzeResumeText(resumeText, jobDescriptionText = "") {
  const normalizedResume = resumeText.toLowerCase();
  const normalizedJob = jobDescriptionText.toLowerCase();

  const detectedSkills = SKILL_DICTIONARY.filter((skill) =>
    normalizedResume.includes(skill.toLowerCase())
  );

  const jobKeywords =
    normalizedJob.length > 0
      ? Array.from(
          new Set(
            normalizedJob
              .split(/[^a-zA-Z+#]+/)
              .filter((word) => word.length > 3)
          )
        )
      : [];

  const missingSkills = jobKeywords.filter(
    (keyword) => !normalizedResume.includes(keyword)
  );

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  if (detectedSkills.length > 0) {
    strengths.push("Resume lists several in-demand technical skills.");
  } else {
    weaknesses.push("Skills section is very light or missing.");
    suggestions.push(
      "Add a dedicated 'Skills' section with 8–15 relevant technologies."
    );
  }

  if (normalizedResume.includes("experience")) {
    strengths.push("Experience section detected with role descriptions.");
  } else {
    weaknesses.push("No clear 'Experience' heading detected.");
    suggestions.push(
      "Create a distinct 'Experience' section with bullet-point achievements."
    );
  }

  if (!normalizedResume.includes("project")) {
    weaknesses.push("Projects section is missing or difficult to identify.");
    suggestions.push(
      "Add a 'Projects' section that highlights 2–4 high-impact projects."
    );
  } else {
    strengths.push("Projects section appears in the resume.");
  }

  if (!normalizedResume.includes("education")) {
    weaknesses.push("Education section is missing or not clearly labeled.");
    suggestions.push(
      "Add an 'Education' section with degree, institution, and graduation year."
    );
  }

  const sectionScores = {
    skills: detectedSkills.length > 5 ? 85 : detectedSkills.length > 0 ? 65 : 40,
    experience: normalizedResume.includes("experience") ? 80 : 45,
    projects: normalizedResume.includes("project") ? 78 : 35,
    education: normalizedResume.includes("education") ? 82 : 50,
  };

  const atsScore = Math.round(
    0.35 * sectionScores.skills +
      0.3 * sectionScores.experience +
      0.2 * sectionScores.projects +
      0.15 * sectionScores.education
  );

  const highlightedMissingKeywords = missingSkills.slice(0, 25);

  return {
    atsScore,
    detectedSkills,
    missingSkills: highlightedMissingKeywords,
    strengths,
    weaknesses,
    suggestions,
    sectionScores,
  };
}

