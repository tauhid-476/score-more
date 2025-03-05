import React from 'react';
import dynamic from 'next/dynamic';
import Editor from "@uiw/react-md-editor";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MdPreviewProps {
  source: string;
  className?: string;
}

// Custom markdown preview component with enhanced styling and parsing
const EnhancedMarkdownPreview = ({ source, className = '' }: MdPreviewProps) => {
  // Clean up source by removing extra backslash newlines
  const cleanedSource = source.replace(/\\n/g, '\n');

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({node, ...props}) => (
            <h2 
              {...props} 
              className="text-xl font-bold text-foreground mb-3 mt-4 pb-2 border-b-2 border-primary"
            />
          ),
          h4: ({node, ...props}) => (
            <h4 
              {...props} 
              className="text-lg font-semibold text-foreground mb-2 pb-1 border-b border-border"
            />
          ),
          strong: ({node, ...props}) => (
            <strong 
              {...props} 
              className="font-bold text-foreground"
            />
          ),
          ul: ({node, ...props}) => (
            <ul 
              {...props} 
              className="list-disc list-inside space-y-1 ml-4 text-muted-foreground"
            />
          ),
          ol: ({node, ...props}) => (
            <ol 
              {...props} 
              className="list-decimal list-inside space-y-1 ml-4 text-muted-foreground"
            />
          ),
          li: ({node, ...props}) => (
            <li 
              {...props} 
              className="pl-2 mb-1"
            />
          ),
          p: ({node, ...props}) => (
            <p 
              {...props} 
              className="mb-3 text-muted-foreground leading-relaxed"
            />
          ),
          code: ({node, ...props}) => (
            <code 
              {...props} 
              className="bg-secondary/20 text-secondary-foreground rounded px-1 py-0.5 text-sm font-mono"
            />
          ),
        }}
      >
        {cleanedSource}
      </ReactMarkdown>
    </div>
  );
};

export const MarkdownPreview = EnhancedMarkdownPreview;
export default dynamic(
  () => import("@uiw/react-md-editor").then(mod => mod.default),
  { ssr: false }
);