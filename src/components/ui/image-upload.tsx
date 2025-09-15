import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, X, RotateCw, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface ImageUploadProps {
  onImageUploaded?: (file: File, dataUrl: string) => void;
  maxFileSize?: number;
  placeholder?: string;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
}

export function ImageUpload({
  onImageUploaded,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  placeholder = "Rasm yuklash uchun bosing yoki shu yerga torting",
  className,
  aspectRatio = 'auto'
}: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<{
    file: File;
    dataUrl: string;
    rotation: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(({ errors }) => errors[0]?.message).join(', ');
      setError(`Rasm xatolari: ${errors}`);
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setUploadedImage({ file, dataUrl, rotation: 0 });
        onImageUploaded?.(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    },
    maxSize: maxFileSize,
    multiple: false
  });

  const removeImage = () => {
    setUploadedImage(null);
    setError(null);
  };

  const rotateImage = () => {
    if (uploadedImage) {
      const newRotation = (uploadedImage.rotation + 90) % 360;
      setUploadedImage({ ...uploadedImage, rotation: newRotation });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'landscape': return 'aspect-[4/3]';
      case 'portrait': return 'aspect-[3/4]';
      default: return '';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {!uploadedImage ? (
        // Upload Area
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            "hover:border-primary/50 hover:bg-primary/5",
            isDragActive && "border-primary bg-primary/10",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            getAspectRatioClass()
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {isDragActive ? "Rasmni qo'yib yuboring..." : placeholder}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WebP (maks. {formatFileSize(maxFileSize)})
              </p>
            </div>
            <Button variant="outline" size="sm" type="button">
              <Upload className="w-4 h-4 mr-2" />
              Rasm tanlash
            </Button>
          </div>
        </div>
      ) : (
        // Image Preview
        <div className="space-y-3">
          <div className="relative group">
            <div 
              className={cn(
                "relative bg-muted rounded-lg overflow-hidden",
                getAspectRatioClass()
              )}
            >
              <img
                src={uploadedImage.dataUrl}
                alt="Yuklangan rasm"
                className="w-full h-full object-cover"
                style={{
                  transform: `rotate(${uploadedImage.rotation}deg)`
                }}
              />
              
              {/* Image Actions Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={rotateImage}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image Info */}
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{uploadedImage.file.name}</p>
              <p className="text-muted-foreground">
                {formatFileSize(uploadedImage.file.size)}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={rotateImage}
              >
                <RotateCw className="w-4 h-4 mr-1" />
                Burish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={removeImage}
              >
                <X className="w-4 h-4 mr-1" />
                O'chirish
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Full Screen Preview Modal */}
      {isPreviewOpen && uploadedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={uploadedImage.dataUrl}
              alt="Rasm preview"
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `rotate(${uploadedImage.rotation}deg)`
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setIsPreviewOpen(false);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}