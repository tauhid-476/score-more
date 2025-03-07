
import { AlertTriangle, FileWarning, Upload, XCircle } from "lucide-react";
import { Button } from "./ui/button";


interface ErrorMessageProps {
    error: ExamAnalysisError | null;
    resetForm: () => void;
}

export const renderErrorMessage = ({ error, resetForm }: ErrorMessageProps) => {
    const errorIcons = {
      "INVALID_DOCUMENT": <FileWarning className="h-16 w-16 text-destructive mb-4" />,
      "MIXED_SUBJECTS": <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />,
      "API_FETCH_FAILED": <XCircle className="h-16 w-16 text-red-600 mb-4" />,
      "UNKNOWN_ERROR": <XCircle className="h-16 w-16 text-red-600 mb-4" />
    };

    const errorTitles = {
      "INVALID_DOCUMENT": "Invalid Document Detected",
      "MIXED_SUBJECTS": "Mixed Subjects Detected",
      "API_FETCH_FAILED": "Looks like there was an error processing your files. Please try again.",
      "UNKNOWN_ERROR": "An unknown error occurred. Please try again."
    };

    const errorType = error?.errorType || "UNKNOWN_ERROR";
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        {errorIcons[errorType]}
        <h3 className="text-xl font-semibold mb-2">{errorTitles[errorType]}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{error?.message}</p>
        <Button onClick={resetForm} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Different Papers
        </Button>
      </div>
    );
  };