import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Truck, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function TruckAdd() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    licensePlate: '',
    brand: '',
    model: '',
    year: '',
    capacityTons: '',
    engineVolume: '',
    fuelType: '',
    color: '',
    vinNumber: '',
    notes: ''
  });

  const handleSave = () => {
    if (!formData.licensePlate || !formData.brand || !formData.model) {
      toast({
        title: "Xatolik",
        description: "Majburiy maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mashina saqlandi",
      description: "Yangi mashina muvaffaqiyatli qo'shildi"
    });
    
    navigate('/trucks');
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/trucks')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Yangi mashina qo'shish</h1>
            <p className="text-muted-foreground">Yangi yuk mashinasi ma'lumotlarini kiriting</p>
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
                <Truck className="w-5 h-5" />
                <span>Asosiy ma'lumotlar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">Davlat raqami *</Label>
                  <Input
                    id="licensePlate"
                    placeholder="01A123BC"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({...formData, licensePlate: e.target.value.toUpperCase()})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marka *</Label>
                  <Select 
                    value={formData.brand} 
                    onValueChange={(value) => setFormData({...formData, brand: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Markani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KAMAZ">KAMAZ</SelectItem>
                      <SelectItem value="MAN">MAN</SelectItem>
                      <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                      <SelectItem value="Volvo">Volvo</SelectItem>
                      <SelectItem value="Scania">Scania</SelectItem>
                      <SelectItem value="Isuzu">Isuzu</SelectItem>
                      <SelectItem value="Boshqa">Boshqa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="Masalan: 65116"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Ishlab chiqarilgan yil</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="2020"
                    min="1980"
                    max="2025"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vinNumber">VIN raqami</Label>
                <Input
                  id="vinNumber"
                  placeholder="17 belgidan iborat VIN raqam"
                  value={formData.vinNumber}
                  onChange={(e) => setFormData({...formData, vinNumber: e.target.value.toUpperCase()})}
                  maxLength={17}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Texnik xususiyatlari</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacityTons">Yuk ko'tarish quvvati (tonna)</Label>
                  <Input
                    id="capacityTons"
                    type="number"
                    placeholder="20"
                    step="0.1"
                    value={formData.capacityTons}
                    onChange={(e) => setFormData({...formData, capacityTons: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="engineVolume">Motor hajmi (L)</Label>
                  <Input
                    id="engineVolume"
                    type="number"
                    placeholder="6.7"
                    step="0.1"
                    value={formData.engineVolume}
                    onChange={(e) => setFormData({...formData, engineVolume: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Yoqilg'i turi</Label>
                  <Select 
                    value={formData.fuelType} 
                    onValueChange={(value) => setFormData({...formData, fuelType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Yoqilg'i turini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Dizel</SelectItem>
                      <SelectItem value="petrol">Benzin</SelectItem>
                      <SelectItem value="gas">Gaz</SelectItem>
                      <SelectItem value="electric">Elektr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Rangi</Label>
                  <Input
                    id="color"
                    placeholder="Oq, Qora, Qizil..."
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Qo'shimcha ma'lumotlar</Label>
                <Textarea
                  id="notes"
                  placeholder="Mashina haqida qo'shimcha ma'lumotlar..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rasm yuklash</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Mashina rasmini yuklash
                </p>
                <Button variant="outline" size="sm">
                  Rasm tanlash
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hujjatlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Mashina qo'shilgandan so'ng quyidagi hujjatlarni yuklang:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Texnik passport</li>
                  <li>Ro'yxatdan o'tish guvohnomasi</li>
                  <li>Sug'urta polisi</li>
                  <li>Texnik ko'rik guvohnomasi</li>
                </ul>
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
                  <li>Davlat raqami</li>
                  <li>Marka</li>
                  <li>Model</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}