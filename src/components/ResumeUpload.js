
import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

function ResumeUpload({ onTextExtracted }) {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload a file smaller than 5MB.");
      return;
    }

    try {
      let extractedText = "";

      if (file.type === "application/pdf") {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(buffer),
        }).promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();

          extractedText +=
            content.items.map((item) => item.str).join(" ") + "\n";
        }
      } else if (
        file.name.endsWith(".docx") ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const buffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        extractedText = result.value;
      } else {
        alert("Please upload a PDF or DOCX file.");
        return;
      }

      if (!extractedText.trim()) {
        alert("No readable text found in this resume.");
        return;
      }

      onTextExtracted(extractedText);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Resume extraction error:", error);
      alert("Unable to read this file. Please try another PDF or DOCX.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Resume</h2>
      <p>Upload your resume in PDF or DOCX format (maximum 5MB).</p>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ResumeUpload;
