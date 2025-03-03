
interface ExamQuestion {
    question: string;
    marks: number | null;
    frequency: string;
    solution: string;
  }
  
  interface QuestionCategory {
    questions: ExamQuestion[];
  }
  
  // Main response structure
  interface ExamAnalysisResponse {
    metadata: {
      subject: string;
      paperCount: number;
      totalQuestions: number;
      examYear: string | null;
    };
    hot: QuestionCategory;
    cool: QuestionCategory;
    extras: QuestionCategory;
  }
  
  interface ExamAnalysisError {
    error: true;
    errorType: "INVALID_DOCUMENT" | "MIXED_SUBJECTS";
    message: string;
  }
  
  type ExamAnalysisResult = ExamAnalysisResponse | ExamAnalysisError;