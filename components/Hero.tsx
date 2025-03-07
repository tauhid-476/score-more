
import { ArrowRight } from "lucide-react";
import AnimatedObject from "@/components/AnimatedObject";
import Link from "next/link";

export default function Hero() {
  return (
    <div id="features" className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-2">
            <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20 animate-blur-in">
              AI-Powered Exam Preparation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Ace Your Exams with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                SCORE MORE
              </span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-md animate-blur-in" style={{ animationDelay: "0.4s" }}>
            Upload your previous year questions, and let our AI analyze patterns, categorize important topics, and provide solutions - all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-blur-in" style={{ animationDelay: "0.6s" }}>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-6 py-3 transition-all shadow-lg shadow-primary/20 group"
            >
              Try Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-border hover:border-primary text-foreground font-medium rounded-lg px-6 py-3 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="relative animate-blur-in" style={{ animationDelay: "0.8s" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-30 animate-pulse-soft"></div>
          <div className="relative">
            <AnimatedObject />
          </div>
        </div>
      </div>
    </div>
  );
}