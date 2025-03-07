
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
    };
    hot: QuestionCategory;
    cool: QuestionCategory;
    extras: QuestionCategory;
  }
  
  interface ExamAnalysisError {
    error: boolean;
    errorType: "INVALID_DOCUMENT" | "MIXED_SUBJECTS" | "API_FETCH_FAILED" | "UNKNOWN_ERROR";
    message: string;
  }
  
  type ExamAnalysisResult = ExamAnalysisResponse | ExamAnalysisError;