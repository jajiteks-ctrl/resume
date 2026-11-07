
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

function AnalysisResult({ result }) {
  if (!result) return null;

  const chartData = [
    { name: "ATS Score", value: result.score },
    { name: "Remaining", value: 100 - result.score }
  ];

  return (
    <div className="result-container">
      <h2>Resume Analysis Results</h2>

      <div className="score-section">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#4f46e5" />
                <Cell fill="#e5e7eb" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="score-label">
            <strong>{result.score}%</strong>
            <span>ATS Score</span>
          </div>
        </div>
      </div>

      <section>
        <h3>Detected Skills</h3>
        <div className="skills-list">
          {result.detectedSkills.length > 0
            ? result.detectedSkills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))
            : <p>No skills detected.</p>}
        </div>
      </section>

      <section>
        <h3>Job Description Match</h3>

        <p>Matched Skills: {result.matchedSkills.length}</p>
        <div className="skills-list">
          {result.matchedSkills.map((skill) => (
            <span className="matched-tag" key={skill}>
              ✓ {skill}
            </span>
          ))}
        </div>

        <p>Missing Skills: {result.missingSkills.length}</p>
        <div className="skills-list">
          {result.missingSkills.map((skill) => (
            <span className="missing-tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3>Resume Sections</h3>
        <ul>
          {Object.entries(result.sections).map(([section, present]) => (
            <li key={section}>
              {present ? "✅" : "❌"} {section}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Improvement Suggestions</h3>
        <ul>
          {result.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AnalysisResult;
