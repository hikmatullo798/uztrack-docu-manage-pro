import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, FileText, Truck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { PDFViewer, PDFPreview } from '@/components/ui/pdf-viewer';
import { documentTypes, trucks } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function DocumentAdd() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    documentTypeId: '',
    truckId: '',
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
    notes: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);

  const handleSave = () => {
    if (!formData.documentTypeId || !formData.truckId || !formData.documentNumber) {
      toast({
        title: "Xatolik",
        description: "Majburiy maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    // Here you would save the document data and files to your backend
    console.log('Saving document:', { formData, files: uploadedFiles });

    toast({
      title: "Hujjat saqlandi",
      description: `Yangi hujjat va ${uploadedFiles.length} ta fayl muvaffaqiyatli qo'shildi`
    });
    
    navigate('/documents');
  };

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    
    // If any PDF files are uploaded, select the first one for viewing
    const pdfFile = files.find(f => f.type === 'application/pdf');
    if (pdfFile && !selectedPDF) {
      setSelectedPDF(pdfFile);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/documents')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Yangi hujjat qo'shish</h1>
            <p className="text-muted-foreground">Yangi hujjat ma'lumotlarini kiriting</p>
          </div>
        </div>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Saqlash</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Asosiy ma'lumotlar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Hujjat turi *</Label>
                  <Select 
                    value={formData.documentTypeId} 
                    onValueChange={(value) => setFormData({...formData, documentTypeId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Hujjat turini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="truck">Mashina *</Label>
                  <Select 
                    value={formData.truckId} 
                    onValueChange={(value) => setFormData({...formData, truckId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Mashinani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {trucks.map(truck => (
                        <SelectItem key={truck.id} value={truck.id.toString()}>
                          {truck.licensePlate} - {truck.brand} {truck.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentNumber">Hujjat raqami *</Label>
                <Input
                  id="documentNumber"
                  placeholder="Masalan: AA 1234567"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({...formData, documentNumber: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuingAuthority">Bergan organ</Label>
                <Input
                  id="issuingAuthority"
                  placeholder="Masalan: O'zbekiston Respublikasi IIV"
                  value={formData.issuingAuthority}
                  onChange={(e) => setFormData({...formData, issuingAuthority: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Qo'shimcha ma'lumotlar</Label>
                <Textarea
                  id="notes"
                  placeholder="Hujjat haqida qo'shimcha ma'lumotlar..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Sanalar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Berilgan sana</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Tugash sanasi</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hujjat fayllari</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']}
                maxFileSize={10 * 1024 * 1024} // 10MB
                onFilesUploaded={handleFilesUploaded}
                placeholder="Hujjat skanini yoki rasmini yuklash"
              />
            </CardContent>
          </Card>

          {/* PDF Previews */}
          {uploadedFiles.filter(f => f.type === 'application/pdf').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>PDF Hujjatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {uploadedFiles
                    .filter(f => f.type === 'application/pdf')
                    .map((file, index) => (
                      <PDFPreview
                        key={index}
                        file={file}
                        onClick={() => setSelectedPDF(file)}
                      />
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Previews */}
          {uploadedFiles.filter(f => f.type.startsWith('image/')).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Rasm Hujjatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {uploadedFiles
                    .filter(f => f.type.startsWith('image/'))
                    .map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full aspect-[3/4] object-cover rounded border"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              const url = URL.createObjectURL(file);
                              window.open(url, '_blank');
                            }}
                          >
                            Ko'rish
                          </Button>
                        </div>
                        <p className="text-xs mt-1 truncate">{file.name}</p>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Yordam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <h4 className="font-medium">Majburiy maydonlar:</h4>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Hujjat turi</li>
                  <li>Mashina</li>
                  <li>Hujjat raqami</li>
                </ul>
              </div>
              
              <div className="text-sm">
                <h4 className="font-medium">Qo'llab-quvvatlanadigan formatlar:</h4>
                <p className="text-muted-foreground mt-1">PDF, JPG, PNG, DOC, DOCX</p>
              </div>
              
              <div className="text-sm">
                <h4 className="font-medium">Yuklangan fayllar:</h4>
                <p className="text-muted-foreground mt-1">{uploadedFiles.length} ta fayl</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <div className="fixed inset-0 z-50 bg-background">
          <PDFViewer 
            file={selectedPDF} 
            onClose={() => setSelectedPDF(null)}
          />
        </div>
      )}
    </div>
  );
}