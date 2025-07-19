import { useState, useCallback, useRef } from "react";
import { Upload, File, X, CheckCircle, AlertTriangle, Eye, Download, Scan } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { DocumentUploadProgress, DocumentValidationResult } from "@/types/eurasian";

interface DocumentUploadSystemProps {
  documentType?: string;
  countryCode?: string;
  onUploadComplete: (file: File, metadata: any) => void;
  onCancel?: () => void;
}

export function DocumentUploadSystem({ 
  documentType, 
  countryCode, 
  onUploadComplete, 
  onCancel 
}: DocumentUploadSystemProps) {
  const [uploadProgress, setUploadProgress] = useState<DocumentUploadProgress[]>([]);
  const [validationResults, setValidationResults] = useState<Record<string, DocumentValidationResult>>({});
  const [metadata, setMetadata] = useState({
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
    notes: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Start upload simulation
      const newUpload: DocumentUploadProgress = {
        id: uploadId,
        fileName: file.name,
        fileSize: file.size,
        uploadedBytes: 0,
        progress: 0,
        status: 'uploading'
      };
      
      setUploadProgress(prev => [...prev, newUpload]);
      
      // Simulate upload progress
      simulateUpload(uploadId, file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 15 * 1024 * 1024, // 15MB
    multiple: true
  });

  const simulateUpload = async (uploadId: string, file: File) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(prev => prev.map(upload => 
        upload.id === uploadId 
          ? { 
              ...upload, 
              progress, 
              uploadedBytes: Math.round((file.size * progress) / 100),
              status: progress === 100 ? 'processing' : 'uploading'
            }
          : upload
      ));
    }

    // Simulate OCR processing
    setUploadProgress(prev => prev.map(upload => 
      upload.id === uploadId 
        ? { ...upload, status: 'processing', ocrProgress: 0 }
        : upload
    ));

    for (let ocrProgress = 0; ocrProgress <= 100; ocrProgress += 25) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadProgress(prev => prev.map(upload => 
        upload.id === uploadId 
          ? { ...upload, ocrProgress }
          : upload
      ));
    }

    // Simulate validation
    setUploadProgress(prev => prev.map(upload => 
      upload.id === uploadId 
        ? { ...upload, validationStatus: 'validating' }
        : upload
    ));

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation result
    const mockValidation: DocumentValidationResult = {
      isValid: Math.random() > 0.3,
      errors: Math.random() > 0.7 ? [
        { field: 'document_number', message: 'Hujjat raqami aniq emas', severity: 'error' },
        { field: 'expiry_date', message: 'Amal qilish muddati o\'qilmadi', severity: 'warning' }
      ] : [],
      warnings: [],
      confidence: Math.round(Math.random() * 30 + 70),
      extractedData: {
        documentNumber: 'AUTO-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        issuingAuthority: 'Auto-detected Authority'
      },
      suggestions: [
        'Hujjat sifatini yaxshilash uchun yuqori rezolyutsiyada skanerlang',
        'Barcha ma\'lumotlar ko\'rinishini tekshiring'
      ]
    };

    setValidationResults(prev => ({ ...prev, [uploadId]: mockValidation }));
    
    setUploadProgress(prev => prev.map(upload => 
      upload.id === uploadId 
        ? { 
            ...upload, 
            status: 'completed',
            validationStatus: mockValidation.isValid ? 'valid' : 'invalid',
            validationErrors: mockValidation.errors.map(e => e.message)
          }
        : upload
    ));

    // Auto-fill metadata if extracted successfully
    if (mockValidation.extractedData) {
      setMetadata(prev => ({
        ...prev,
        documentNumber: prev.documentNumber || mockValidation.extractedData.documentNumber || '',
        issueDate: prev.issueDate || mockValidation.extractedData.issueDate || '',
        expiryDate: prev.expiryDate || mockValidation.extractedData.expiryDate || '',
        issuingAuthority: prev.issuingAuthority || mockValidation.extractedData.issuingAuthority || ''
      }));
    }
  };

  const removeUpload = (uploadId: string) => {
    setUploadProgress(prev => prev.filter(upload => upload.id !== uploadId));
    setValidationResults(prev => {
      const newResults = { ...prev };
      delete newResults[uploadId];
      return newResults;
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Upload className="w-4 h-4 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getValidationStatusColor = (status?: string) => {
    switch (status) {
      case 'valid':
        return 'text-success border-success/20 bg-success/10';
      case 'invalid':
        return 'text-destructive border-destructive/20 bg-destructive/10';
      case 'validating':
        return 'text-warning border-warning/20 bg-warning/10';
      default:
        return 'text-muted-foreground border-muted/20 bg-muted/10';
    }
  };

  const handleSubmit = () => {
    const completedUploads = uploadProgress.filter(upload => upload.status === 'completed');
    if (completedUploads.length === 0) return;

    const firstUpload = completedUploads[0];
    const mockFile = { name: firstUpload.fileName, size: firstUpload.fileSize } as File;

    onUploadComplete(mockFile, {
      ...metadata,
      documentType,
      countryCode,
      uploadId: firstUpload.id,
      validationResult: validationResults[firstUpload.id]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Hujjat yuklash
          {documentType && (
            <Badge variant="outline" className="ml-auto">
              {documentType}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} ref={fileInputRef} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            Fayllarni shu yerga torting yoki tanlang
          </h3>
          <p className="text-muted-foreground mb-4">
            PDF, JPG, PNG, DOC fayllari (maksimal 15MB)
          </p>
          <Button type="button" variant="outline">
            Fayllarni tanlash
          </Button>
        </div>

        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Yuklangan fayllar</h3>
            {uploadProgress.map((upload) => {
              const validation = validationResults[upload.id];
              return (
                <Card key={upload.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(upload.status)}
                        <div>
                          <p className="font-medium">{upload.fileName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(upload.fileSize)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {upload.validationStatus && (
                          <Badge className={getValidationStatusColor(upload.validationStatus)}>
                            {upload.validationStatus === 'valid' ? 'Yaroqli' :
                             upload.validationStatus === 'invalid' ? 'Noto\'g\'ri' :
                             upload.validationStatus === 'validating' ? 'Tekshirilmoqda' : 'Kutilmoqda'}
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeUpload(upload.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {upload.status === 'uploading' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Yuklanmoqda...</span>
                          <span>{upload.progress}%</span>
                        </div>
                        <Progress value={upload.progress} />
                      </div>
                    )}

                    {/* OCR Progress */}
                    {upload.status === 'processing' && upload.ocrProgress !== undefined && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Scan className="w-3 h-3" />
                            Matn aniqlanmoqda...
                          </span>
                          <span>{upload.ocrProgress}%</span>
                        </div>
                        <Progress value={upload.ocrProgress} />
                      </div>
                    )}

                    {/* Validation Results */}
                    {validation && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Tekshiruv natijasi ({validation.confidence}% ishonch)
                          </span>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="gap-1">
                              <Eye className="w-3 h-3" />
                              Ko'rish
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Download className="w-3 h-3" />
                              Yuklab olish
                            </Button>
                          </div>
                        </div>

                        {validation.errors.length > 0 && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              <ul className="list-disc list-inside space-y-1">
                                {validation.errors.map((error, index) => (
                                  <li key={index}>{error.message}</li>
                                ))}
                              </ul>
                            </AlertDescription>
                          </Alert>
                        )}

                        {validation.suggestions.length > 0 && (
                          <div className="text-sm text-muted-foreground">
                            <strong>Tavsiyalar:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {validation.suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Metadata Form */}
        <div className="space-y-4">
          <h3 className="font-semibold">Hujjat ma'lumotlari</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentNumber">Hujjat raqami</Label>
              <Input
                id="documentNumber"
                value={metadata.documentNumber}
                onChange={(e) => setMetadata(prev => ({ ...prev, documentNumber: e.target.value }))}
                placeholder="Hujjat raqamini kiriting"
              />
            </div>
            <div>
              <Label htmlFor="issuingAuthority">Bergan organ</Label>
              <Input
                id="issuingAuthority"
                value={metadata.issuingAuthority}
                onChange={(e) => setMetadata(prev => ({ ...prev, issuingAuthority: e.target.value }))}
                placeholder="Hujjat bergan organni kiriting"
              />
            </div>
            <div>
              <Label htmlFor="issueDate">Berilgan sana</Label>
              <Input
                id="issueDate"
                type="date"
                value={metadata.issueDate}
                onChange={(e) => setMetadata(prev => ({ ...prev, issueDate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Amal qilish muddati</Label>
              <Input
                id="expiryDate"
                type="date"
                value={metadata.expiryDate}
                onChange={(e) => setMetadata(prev => ({ ...prev, expiryDate: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Qo'shimcha ma'lumot</Label>
            <Textarea
              id="notes"
              value={metadata.notes}
              onChange={(e) => setMetadata(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Qo'shimcha ma'lumot yoki eslatmalar"
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Bekor qilish
            </Button>
          )}
          <Button 
            onClick={handleSubmit}
            disabled={uploadProgress.length === 0 || !uploadProgress.some(u => u.status === 'completed')}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Saqlash
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}