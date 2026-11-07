
const skillsList = [
  "javascript",
  "react",
  "node.js",
  "python",
  "java",
  "html",
  "css",
  "sql",
  "mongodb",
  "express",
  "typescript",
  "aws",
  "git",
  "docker",
  "c++",
  "machine learning",
  "data analysis",
  "communication",
  "leadership",
  "problem solving"
];

export function analyzeResume(resumeText, jobDescription = "") {
  const text = resumeText.toLowerCase();

  // Detect skills
  const detectedSkills = skillsList.filter((skill) =>
    text.includes(skill)
  );

  // Check resume sections
  const sections = {
    summary: /summary|objective|profile/i.test(resumeText),
    education: /education|academic/i.test(resumeText),
    experience: /experience|employment|work history/i.test(resumeText),
    skills: /skills|technical skills/i.test(resumeText),
    projects: /projects|personal projects/i.test(resumeText)
  };

  const completedSections = Object.values(sections).filter(Boolean).length;

  // ATS score calculation
  let score = 0;

  score += Math.min(detectedSkills.length * 3, 30);
  score += completedSections * 10;
  score += resumeText.length > 1000 ? 15 : 5;
  score += /\b(email|@)\b/i.test(resumeText) ? 5 : 0;
  score += /\b(phone|mobile|\+?\d[\d\s-]{8,})\b/i.test(resumeText) ? 5 : 0;

  score = Math.min(score, 100);

  // Match job description
  const jobText = jobDescription.toLowerCase();

  const requiredSkills = jobDescription
    ? skillsList.filter((skill) => jobText.includes(skill))
    : [];

  const matchedSkills = requiredSkills.filter((skill) =>
    detectedSkills.includes(skill)
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !detectedSkills.includes(skill)
  );

  // Suggestions
  const suggestions = [];

  if (!sections.summary) suggestions.push("Add a professional summary.");
  if (!sections.education) suggestions.push("Add an education section.");
  if (!sections.experience) suggestions.push("Add your work experience.");
  if (!sections.projects) suggestions.push("Include relevant projects.");
  if (detectedSkills.length < 5) {
    suggestions.push("Include more relevant technical skills.");
  }
  if (resumeText.length < 1000) {
    suggestions.push("Add more detail about your experience and achievements.");
  }
  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider highlighting relevant skills: ${missingSkills.join(", ")}.`
    );
  }

  if (suggestions.length === 0) {
    suggestions.push("Your resume looks well structured. Keep it updated!");
  }

  return {
    score,
    detectedSkills,
    sections,
    matchedSkills,
    missingSkills,
    suggestions
  };
}
