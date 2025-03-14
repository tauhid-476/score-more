"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, Loader2, Upload } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { TextAnimation } from "@/components/ui/text-animation";
import { generatePDF } from "@/lib/pdf-generator";
import { renderErrorMessage } from "@/components/ErrorMessage";
import QuesCardSec from "@/components/QuesCardSec";

const loadingTexts = [
  "Let me cook",
  "Better give me one minute rather than you spending hours",
  "Analyzing your exam papers more carefully than you did...",
  "Studying for exams? Or just speed-running the syllabus like it's a side quest?",
  "That moment when you flip the question paper and realize you studied the wrong subject.",
  "Exams: Where your handwriting gets worse than a doctor's prescription.",
  "The only thing getting 'passed' this semester is time.",
  "Exam hall be like: 'Dear brain, now is not the time to forget everything.'",
  "One night before the exam: 'Let me just take a 5-minute break'—*wakes up 6 hours later*."
];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ExamAnalysisResponse | null>(null);
  const [error, setError] = useState<ExamAnalysisError | null>(null);

  const handleFilesUploaded = async (files: File[]) => {
    if (!files.length) return;
    setLoading(true);
    setError(null);
    setData(null);

    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append("files", files[i]);
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formdata,
      });

      const responseData = await response.json();

      if (response.ok && !responseData.error) {
        setData(responseData);
        toast("Files processed successfully!");
      } else {
        setError(responseData as ExamAnalysisError);
        toast.error(responseData.message || "Failed to process files. Please try again.");
      }
    } catch (error) {
      console.error("Error processing files:", error);
      setError({
        error: true,
        errorType: "API_FETCH_FAILED",
        message: "There was an error processing your files. Please try again."
      });
      toast.error("Failed to process files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if (!data) {
      toast.error("No data available to download");
      return;
    }
    try {
      generatePDF({
        subject: data.metadata.subject,
        hot: data.hot,
        cool: data.cool,
        extras: data.extras
      });
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="container-custom min-h-screen py-10 mt-[40px]">
      <div className="grid grid-cols-1 gap-8">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl">
              Exam Question Analysis Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto text-center mb-6">
              <p className="text-muted-foreground mb-4">
                Upload your exam papers (PDF format) to analyze frequently asked questions and patterns.
              </p>

              {!loading && !data && !error && (
                <div className="relative">
                  <div className="py-8">
                    <FileUpload onFilesUploaded={handleFilesUploaded} />
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center flex-col">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <TextAnimation texts={loadingTexts} />
                </div>
              )}

              {error && renderErrorMessage({error, resetForm})}
            </div>

            {data && (
              <div className="mt-8 animate-fade-in-up">
                <div className="flex items-center gap-2 p-3 bg-yellow-100 text-yellow-800 rounded-md mb-6">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span>Note: The solution provided is for guidance only and should not be considered final.</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <div className="order-2 md:order-1">
                    <h3 className="text-xl font-medium">{data.metadata.subject}</h3>
                    <p className="text-muted-foreground">
                      {data.metadata.paperCount} papers analyzed • {data.hot.questions.length + data.cool.questions.length + data.extras.questions.length} important questions found
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="gap-2 order-1 md:order-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Different Papers
                  </Button>
                </div>

                {/* Questions Section */}
               <QuesCardSec data={data} />

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleDownloadPDF}
                    className="gap-2 bg-primary text-white px-6 shadow-lg shadow-primary/20"
                  >
                    <Download className="h-4 w-4" />
                    Download All Questions and  as PDF
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}