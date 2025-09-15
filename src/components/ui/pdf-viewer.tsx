import { useState } from "react";
import { 
  Eye, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PDFViewerProps {
  file: File;
  className?: string;
  onClose?: () => void;
}

export function PDFViewer({ file, className, onClose }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pdfUrl = URL.createObjectURL(file);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const ViewerContent = () => (
    <div className="flex flex-col h-full bg-background">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-medium text-sm truncate max-w-xs">{file.name}</h3>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <Badge variant="outline">PDF</Badge>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm min-w-[60px] text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Rotation */}
          <Button variant="ghost" size="sm" onClick={handleRotate}>
            <RotateCw className="w-4 h-4" />
          </Button>

          {/* Page Navigation */}
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm min-w-[80px] text-center">
              Sahifa {currentPage}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Actions */}
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>

          {!isFullscreen && (
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(true)}>
              <Maximize className="w-4 h-4" />
            </Button>
          )}

          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4">
        <div className="flex justify-center">
          <div 
            className="bg-white shadow-lg"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center top'
            }}
          >
            <iframe
              src={`${pdfUrl}#page=${currentPage}&zoom=${zoom}`}
              width="800"
              height="1000"
              className="border border-gray-300"
              title={file.name}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <ViewerContent />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4"
          onClick={() => setIsFullscreen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden h-96", className)}>
      <ViewerContent />
    </div>
  );
}

// Simple PDF Preview Component for thumbnails
export function PDFPreview({ file, onClick }: { file: File; onClick?: () => void }) {
  const pdfUrl = URL.createObjectURL(file);

  return (
    <div 
      className="relative group cursor-pointer border border-border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative">
        <iframe
          src={`${pdfUrl}#page=1&zoom=50`}
          width="100%"
          height="100%"
          className="pointer-events-none"
          title={file.name}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Ko'rish
          </Button>
        </div>
      </div>
      
      <div className="p-2 border-t">
        <p className="text-xs font-medium truncate">{file.name}</p>
        <Badge variant="outline" className="text-xs mt-1">PDF</Badge>
      </div>
    </div>
  );
}