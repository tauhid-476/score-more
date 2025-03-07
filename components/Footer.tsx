
import { Twitter, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="about" className="py-16 border-t border-border/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              SCORE MORE
            </div>
            <p className="text-muted-foreground max-w-md">
              An AI-powered exam preparation assistant that helps students identify important questions, categorize topics, and provide solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">

              <Link
                href="https://x.com/tauhid_khan476"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/tauhid-476"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
            <a
              href="mailto:tauheedxd90@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              tauheedxd90@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SCORE MORE. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}