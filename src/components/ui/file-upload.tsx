import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, Eye, Download, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
  onFilesUploaded?: (files: File[]) => void;
  placeholder?: string;
  className?: string;
}

export interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

export function FileUpload({
  acceptedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  onFilesUploaded,
  placeholder = "Fayllarni shu yerga torting yoki tanlash uchun bosing",
  className
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(({ errors }) => errors[0]?.message).join(', ');
      setError(`Fayl xatolari: ${errors}`);
      return;
    }

    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading' as const,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(uploadedFile => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === uploadedFile.id) {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'completed' as const };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });

    onFilesUploaded?.(acceptedFiles);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/msword': ['.doc', '.docx'],
    },
    maxSize: maxFileSize,
    multiple
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragActive && "border-primary bg-primary/10",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              {isDragActive ? "Fayllarni qo'yib yuboring..." : placeholder}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Qo'llab-quvvatlanadigan formatlar: {acceptedFileTypes.join(', ')}
            </p>
            <p className="text-xs text-muted-foreground">
              Maksimal fayl hajmi: {formatFileSize(maxFileSize)}
            </p>
          </div>
          <Button variant="outline" size="sm" type="button">
            <Upload className="w-4 h-4 mr-2" />
            Fayl tanlash
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Yuklangan fayllar ({uploadedFiles.length})</h4>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center space-x-3 p-3 border rounded-lg bg-card"
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                      {getFileIcon(uploadedFile.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  {uploadedFile.status === 'uploading' && (
                    <div className="mt-1">
                      <Progress value={uploadedFile.progress} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(uploadedFile.progress)}% yuklandi
                      </p>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  <Badge
                    variant={
                      uploadedFile.status === 'completed' 
                        ? 'default' 
                        : uploadedFile.status === 'error' 
                        ? 'destructive' 
                        : 'secondary'
                    }
                  >
                    {uploadedFile.status === 'completed' && 'Tayyor'}
                    {uploadedFile.status === 'uploading' && 'Yuklanmoqda'}
                    {uploadedFile.status === 'error' && 'Xatolik'}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  {uploadedFile.status === 'completed' && (
                    <>
                      {uploadedFile.file.type === 'application/pdf' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const url = URL.createObjectURL(uploadedFile.file);
                            window.open(url, '_blank');
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(uploadedFile.file)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}