import jsPDF from "jspdf";


interface PDFData {
  subject: string;
  hot: { questions: ExamQuestion[] };
  cool: { questions: ExamQuestion[] };
  extras: { questions: ExamQuestion[] };
}

const getFrequencyText = (frequency: string) => {
  switch (frequency) {
    case "1_OF_3_PAPERS":
      return "1 of 3 papers";
    case "2_OF_3_PAPERS":
      return "2 of 3 papers";
    case "3_OF_3_PAPERS":
      return "All 3 papers";
    default:
      return frequency;
  }
};

export const generatePDF = (data: PDFData) => {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const textWidth = pageWidth - 2 * margin;
  
    // Add a stylish header background
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, pageWidth, 40, 'F');
  
    // Title with gradient effect
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 150, 243);
    doc.text(`${data.subject}`, margin, yPos);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Question Analysis", margin, yPos + 8);
    yPos += 30;
  
    // Function to add a new page with header
    const addNewPage = () => {
      doc.addPage();
      yPos = 20;
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`${data.subject} - Question Analysis (cont.)`, margin, 15);
    };
  
    // Function to check page break
    const checkPageBreak = (textHeight: number) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      if (yPos + textHeight > pageHeight - margin) {
        addNewPage();
        return true;
      }
      return false;
    };
  
    // Function to add question section
    const addQuestionSection = (title: string, questions: ExamQuestion[], color: string) => {
      // Section header with background
      checkPageBreak(lineHeight * 4);
      doc.setFillColor(color);
      doc.rect(margin, yPos - 5, textWidth, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text(`${title} (${questions.length})`, margin + 5, yPos + 2);
      yPos += lineHeight * 2;
      doc.setTextColor(0, 0, 0);
  
      let questionsOnPage = 0;
  
      questions.forEach((q, index) => {
        if (questionsOnPage >= 2) {
          addNewPage();
          questionsOnPage = 0;
        }
  
        const solutionLines = doc.splitTextToSize(q.solution, textWidth - 10);
        const questionHeight = lineHeight * (8 + solutionLines.length);
        checkPageBreak(questionHeight);
  
        // Question container with border
        const questionStart = yPos;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
  
        // Question number and text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(color);
        doc.text(`Q${index + 1}`, margin, yPos);
        doc.setTextColor(0, 0, 0);
        const questionLines = doc.splitTextToSize(q.question, textWidth - 20);
        doc.text(questionLines, margin + 10, yPos);
        yPos += lineHeight * (questionLines.length + 0.5);
  
        // Question details in a subtle box
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, yPos - 4, textWidth, 10, 'F');
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const marks = q.marks ? `${q.marks} marks` : "Marks N/A";
        const frequency = getFrequencyText(q.frequency);
        doc.text(`${marks} | ${frequency}`, margin + 5, yPos + 2);
        yPos += lineHeight * 1.5;
  
        // Solution with subtle styling
        doc.setFont("helvetica", "italic");
        doc.setTextColor(80, 80, 80);
        doc.text("Solution:", margin, yPos);
        yPos += lineHeight;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(solutionLines, margin + 5, yPos);
        yPos += lineHeight * (solutionLines.length + 1);
  
        // Draw border around question
        doc.rect(margin, questionStart - 4, textWidth, yPos - questionStart, 'S');
  
        questionsOnPage++;
        yPos += lineHeight;
      });
  
      yPos += lineHeight;
    };
  
    // Add sections
    if (data.hot.questions.length > 0) {
      addQuestionSection("Hot Questions", data.hot.questions, "#ef4444");
    }
    if (data.cool.questions.length > 0) {
      addQuestionSection("Cool Questions", data.cool.questions, "#16a34a");
    }
    if (data.extras.questions.length > 0) {
      addQuestionSection("Extra Questions", data.extras.questions, "#64748b");
    }
  
    // Add footer
    const pageCount = doc.internal.pages.length - 1; 
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, doc.internal.pageSize.getHeight() - 10);
    }
  
    doc.save(`${data.subject}-question-analysis.pdf`);
  };