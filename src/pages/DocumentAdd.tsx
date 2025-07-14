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

  const handleSave = () => {
    if (!formData.documentTypeId || !formData.truckId || !formData.documentNumber) {
      toast({
        title: "Xatolik",
        description: "Majburiy maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Hujjat saqlandi",
      description: "Yangi hujjat muvaffaqiyatli qo'shildi"
    });
    
    navigate('/documents');
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
              <CardTitle>Fayl yuklash</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Hujjat skanini yuklash
                </p>
                <Button variant="outline" size="sm">
                  Fayl tanlash
                </Button>
              </div>
            </CardContent>
          </Card>

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
                <p className="text-muted-foreground mt-1">PDF, JPG, PNG</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}