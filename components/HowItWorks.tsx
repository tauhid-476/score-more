"use client"
import { Check, FileUp, ArrowRight, Lightbulb } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = containerRef.current?.querySelectorAll(".fade-in-element");
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div id="how-it-works" className="py-24 bg-accent/5">
      <div className="container-custom" ref={containerRef}>
        <div className="max-w-xl mx-auto text-center mb-16 fade-in-element opacity-0" style={{ transitionDelay: "0.1s" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered platform simplifies your exam preparation in just three easy steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-background border border-border/50 rounded-xl p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-primary/5 fade-in-element opacity-0" style={{ transitionDelay: "0.2s" }}>
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
              <FileUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload PYQs</h3>
            <p className="text-muted-foreground">
              Upload 3-4 previous year question papers in PDF format to our secure platform.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-background border border-border/50 rounded-xl p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-primary/5 fade-in-element opacity-0" style={{ transitionDelay: "0.3s" }}>
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
            <p className="text-muted-foreground">
              Our advanced AI analyzes the papers, identifies patterns, and categorizes important questions.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-background border border-border/50 rounded-xl p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-primary/5 fade-in-element opacity-0" style={{ transitionDelay: "0.4s" }}>
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">See the Magic</h3>
            <p className="text-muted-foreground">
              Get categorized questions, solutions, and insights to efficiently prepare for your exams.
            </p>
          </div>
        </div>
        
        <div className="mt-16 fade-in-element opacity-0" style={{ transitionDelay: "0.5s" }}>
          <div className="bg-background border border-border/50 rounded-xl p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">Ready to boost your exam performance?</h3>
                <p className="text-muted-foreground mb-6">
                  Start preparing smarter, not harder, with our intelligent exam analysis tools.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <p>Important topics identification</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <p>Question categorization</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <p>Detailed solutions and explanations</p>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-6 py-3 transition-all shadow-lg shadow-primary/20 group"
                >
                  Try SCORE MORE Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}