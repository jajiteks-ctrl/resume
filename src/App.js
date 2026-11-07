
import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import AnalysisResult from "./components/AnalysisResult";
import { analyzeResume } from "./utils/analyzer";
import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      alert("Please upload your resume first.");
      return;
    }

    const analysis = analyzeResume(resumeText, jobDescription);
    setResult(analysis);
  };

  return (
    <div className="app">
      <h1>AI Resume Analyzer</h1>
      <p>Analyze your resume and improve your ATS compatibility.</p>

      <ResumeUpload
        onTextExtracted={(text) => {
          setResumeText(text);
          setResult(null);
        }}
      />

      {resumeText && (
        <div className="job-description">
          <h3>Paste Job Description</h3>
          <textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="6"
          />

          <button onClick={handleAnalyze}>
            Analyze Resume
          </button>
        </div>
      )}

      <AnalysisResult result={result} />
    </div>
  );
}

export default App;
