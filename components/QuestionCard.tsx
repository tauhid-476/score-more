
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  marks: number | null;
  frequency: string;
  solution: string;
}

interface QuestionCardProps {
  question: Question;
  type: "hot" | "cool" | "extra";
  index: number;
}

export default function QuestionCard({ question, type, index }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getCardClasses = () => {
    switch (type) {
      case "hot":
        return "border-l-4 border-l-destructive";
      case "cool":
        return "border-l-4 border-l-[#192cc2]";
      case "extra":
        return "border-l-4 border-l-[#b6de3f]";
      default:
        return "";
    }
  };

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

  const getAnimationDelay = () => {
    return `${index * 0.1}s`;
  };

  return (
    <Card
      className={cn(
        "animate-fade-in-up overflow-hidden",
        getCardClasses()
      )}
      style={{ animationDelay: getAnimationDelay() }}
    >
         <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 justify-between">
            <div className="flex-1">
              <p className="font-medium">{question.question}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {/* {question.marks && (
                  <Badge variant="outline" className="bg-background/50">
                    {question.marks} marks
                  </Badge>
                )} */}
                <Badge 
                  variant="outline" 
                  className={cn(
                    "bg-background/50",
                    type === "hot" && "border-destructive text-destructive",
                    type === "cool" && "border-[#192cc2] text-[#192cc2]",
                    type === "extra" && "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {getFrequencyText(question.frequency)}
                </Badge>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="mt-0"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {expanded && (
            <div className="mt-2 pt-3 border-t text-sm">
              <h4 className="font-medium mb-1">Solution:</h4>
              <div className="whitespace-pre-line text-muted-foreground">
                {question.solution}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}