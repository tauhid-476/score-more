"use client"
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Upload } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import QuestionCard from "@/components/QuestionCard";
import { TextAnimation } from "@/components/ui/text-animation";

const placeholders = [
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
  const [isDisabled, setIsDisabled] = useState(false);

  const handleFilesUploaded = async (files: File[]) => {
    if (!files.length) return;
    if(files.length <=1 ) setIsDisabled(true);

    setLoading(true);

    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append("files", files[i]);
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formdata,
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        toast("Files processed successfully!");
      } else {
        const errorData = await response.json();
        toast(errorData.error || "Failed to process files. Please try again.");
      }
    } catch (error) {
      console.error("Error processing files:", error);
      toast("Failed to process files. Please try again.");
    } finally {
      setLoading(false);
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

              {!loading && !data && (
                <div className="relative">
                  <div className="py-8">
                    <FileUpload onFilesUploaded={handleFilesUploaded} />
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center flex-col ">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <TextAnimation texts={placeholders} />
                </div>
              )}
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
                    onClick={() => {
                      setData(null);
                      setLoading(false);
                    }}
                    className="gap-2 order-1 md:order-2"
                    disabled={isDisabled}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Different Papers
                  </Button>
                </div>


                {/* Hot Questions Section */}
                {data.hot.questions.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-destructive mr-2"></span>
                      🔥 Hot Topics ({data.hot.questions.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {data.hot.questions.map((question, index) => (
                        <QuestionCard
                          key={index}
                          question={question}
                          type="hot"
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Cool Questions Section */}
                {data.cool.questions.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-[#192cc2] mr-2"></span>
                      ❄️ Cool Topics ({data.cool.questions.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {data.cool.questions.map((question, index) => (
                        <QuestionCard
                          key={index}
                          question={question}
                          type="cool"
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras Questions Section */}
                {data.extras.questions.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-[#b6de3f] mr-2"></span>
                      ⭐ Extra Topics ({data.extras.questions.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {data.extras.questions.map((question, index) => (
                        <QuestionCard
                          key={index}
                          question={question}
                          type="extra"
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}