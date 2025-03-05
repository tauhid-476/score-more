import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
  isLoading?: boolean;
}

export default function FileUpload({ onFilesUploaded, isLoading = false }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (files.length > 4) {
    toast.error("Maximum 5 files are allowed")
    return
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileList = Array.from(selectedFiles);
    const pdfFiles = fileList.filter(file => file.type === "application/pdf");

    if (pdfFiles.length !== fileList.length) {
      toast.error("Only PDF files are allowed");
    }

    setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === "application/pdf");

    if (pdfFiles.length !== droppedFiles.length) {
      toast.error("Only PDF files are allowed");
    }

    setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please select at least one PDF file");
      return;
    }

    onFilesUploaded(files);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center mb-4 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="font-medium text-lg">Upload Exam Papers</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop your PDF files or click to browse
          </p>
          <p className="text-sm text-muted-foreground mt-1">&#40;Max 4 files&#41;</p>
        </div>

        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
          disabled={isLoading}
        >
          <File className="h-4 w-4" />
          Browse Files
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf"
          multiple
          max={4}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected Files ({files.length})</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto p-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/50 p-2 rounded"
              >
                <div className="flex items-center gap-2 truncate">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleSubmit}
              className="gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Process Files"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}