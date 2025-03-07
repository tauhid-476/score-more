import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownPreview } from "./RTE"; // Adjust path to your Markdown file

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
  const [expanded, setExpanded] = useState<boolean>(false);

  const getCardClasses = (): string => {
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

  const getFrequencyText = (frequency: string): string => {
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

  const getAnimationDelay = (): string => {
    return `${index * 0.1}s`;
  };

  const preprocessMarkdown = (text: string): string => {
    const lines = text.split('\n');
    let output = '';
    let inList = false;

    lines.forEach((line) => {
      if (!inList && !line.match(/^\d+\./)) {
        output += line + '\n';
      }
      else if (line.match(/^\d+\./)) {
        inList = true;
        output += line + '\n';
      }
      else if (line.match(/^\s*\*\s/)) {
        output += line.replace(/^\s*\*\s/, '  - ') + '\n';
      }
      else if (line.trim() && inList) {
        output += '  ' + line + '\n'; 
      }
      else {
        output += '\n';
      }
    });

    return output.trim();
  };

  return (
    <Card
      className={cn("animate-fade-in-up overflow-hidden", getCardClasses())}
      style={{ animationDelay: getAnimationDelay() }}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 justify-between">
            <div className="flex-1">
              <p className="font-medium">{question.question}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {question.marks !== null && (
                  <Badge variant="outline" className="bg-background/50">
                    {question.marks} marks
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={cn(
                    "bg-background/50",
                    type === "hot" && "hot-badge",
                    type === "cool" && "cool-badge",
                    type === "extra" && "extra-badge"
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
            <div className="mt-2 pt-3 border-t">
              <h4 className="font-medium mb-1">Solution:</h4>
              <MarkdownPreview
                source={preprocessMarkdown(question.solution)}
                className="prose prose-sm max-w-none text-muted-foreground"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}