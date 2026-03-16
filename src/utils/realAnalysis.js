import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeResumeWithAI(resumeText, jobDescriptionText = '') {
  try {
    const prompt = `
Analyze this resume for ATS compatibility and provide structured feedback.

Resume:
\`\`\`
${resumeText.substring(0, 4000)}
\`\`\`

Job Description (if provided):
\`\`\`
${jobDescriptionText}
\`\`\`

Return ONLY valid JSON with this exact structure:
{
  "atsScore": 85,
  "detectedSkills": ["JavaScript", "React"],
  "missingSkills": ["Kubernetes"],
  "strengths": ["Strong React experience"],
  "weaknesses": ["No cloud experience"],
  "suggestions": ["Add AWS to skills"],
  "sectionScores": {
    "skills": 90,
    "experience": 80,
    "projects": 75,
    "education": 85
  }
}

Ensure atsScore is 0-100 number, arrays are valid, scores 0-100.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return {
      ...result,
      detectedSkills: result.detectedSkills || [],
      missingSkills: result.missingSkills || [],
      strengths: result.strengths || [],
      weaknesses: result.weaknesses || [],
      suggestions: result.suggestions || [],
      sectionScores: {
        skills: result.sectionScores.skills || 50,
        experience: result.sectionScores.experience || 50,
        projects: result.sectionScores.projects || 50,
        education: result.sectionScores.education || 50
      }
    };
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw new Error('AI service unavailable, using mock analysis.');
  }
}

