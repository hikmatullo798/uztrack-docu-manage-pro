import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MapPin, 
  Truck, 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Upload,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteRequirement {
  country: string;
  documents: Array<{
    name: string;
    required: boolean;
    status: 'missing' | 'valid' | 'expiring' | 'expired';
    expiryDate?: string;
    description: string;
  }>;
  transitFee: number;
  currency: string;
  processingDays: number;
}

const countries = [
  { code: "RU", name: "Rossiya", nameUz: "Rossiya" },
  { code: "KZ", name: "Qozog'iston", nameUz: "Qozog'iston" },
  { code: "KG", name: "Qirg'iziston", nameUz: "Qirg'iziston" },
  { code: "TJ", name: "Tojikiston", nameUz: "Tojikiston" },
  { code: "TM", name: "Turkmaniston", nameUz: "Turkmaniston" },
  { code: "CN", name: "Xitoy", nameUz: "Xitoy" },
  { code: "TR", name: "Turkiya", nameUz: "Turkiya" }
];

const cargoTypes = [
  "Tekstil mahsulotlari",
  "Oziq-ovqat mahsulotlari", 
  "Qurilish materiallari",
  "Kimyoviy moddalar",
  "Elektronika",
  "Avtomobil ehtiyot qismlari",
  "Boshqa"
];

export default function RoutePlanner() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    cargoType: "",
    cargoWeight: "",
    truckType: "",
    plannedDate: ""
  });
  
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<RouteRequirement[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeRoute = async () => {
    if (!formData.origin || !formData.destination || !formData.cargoType) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate route analysis
    setTimeout(() => {
      const mockRequirements: RouteRequirement[] = [
        {
          country: "Rossiya",
          documents: [
            {
              name: "TIR Karneti",
              required: true,
              status: "valid",
              expiryDate: "2024-12-15",
              description: "Xalqaro yuk tashish uchun majburiy"
            },
            {
              name: "CMR hujjati",
              required: true,
              status: "missing",
              description: "Yuk tashish shartnomasi"
            },
            {
              name: "Yoqilg'i kartasi",
              required: true,
              status: "valid",
              expiryDate: "2025-06-20",
              description: "Rossiyada yoqilg'i sotib olish uchun"
            },
            {
              name: "GLONASS qurulmasi",
              required: true,
              status: "expiring",
              expiryDate: "2024-10-30",
              description: "Rossiyada majburiy monitoring tizimi"
            }
          ],
          transitFee: 1500,
          currency: "RUB",
          processingDays: 3
        }
      ];
      
      setRequirements(mockRequirements);
      setSelectedCountries(["RU"]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600';
      case 'expiring': return 'text-yellow-600';
      case 'expired': return 'text-red-600';
      case 'missing': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'expiring': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'missing': return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Yo'nalish Rejasi" 
        subtitle="Yo'nalish bo'yicha kerakli hujjatlarni aniqlash va boshqarish"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Planning Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Yo'nalish Ma'lumotlari
            </CardTitle>
            <CardDescription>
              Yo'nalish va yuk ma'lumotlarini kiriting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Chiqish joyi</Label>
                <Input
                  id="origin"
                  placeholder="Toshkent, O'zbekiston"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Borish joyi</Label>
                <Input
                  id="destination"
                  placeholder="Moskva, Rossiya"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo-type">Yuk turi</Label>
              <Select onValueChange={(value) => setFormData({...formData, cargoType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Yuk turini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {cargoTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargo-weight">Yuk og'irligi (tonna)</Label>
                <Input
                  id="cargo-weight"
                  type="number"
                  placeholder="20"
                  value={formData.cargoWeight}
                  onChange={(e) => setFormData({...formData, cargoWeight: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planned-date">Rejalashtirilgan sana</Label>
                <Input
                  id="planned-date"
                  type="date"
                  value={formData.plannedDate}
                  onChange={(e) => setFormData({...formData, plannedDate: e.target.value})}
                />
              </div>
            </div>

            <Button 
              onClick={analyzeRoute}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Tahlil qilinmoqda...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Hujjatlarni Tahlil Qilish
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Requirements Summary */}
        {requirements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Hujjatlar Xulasasi
              </CardTitle>
              <CardDescription>
                Yo'nalish bo'yicha kerakli hujjatlar va xarajatlar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {requirements.flatMap(r => r.documents).filter(d => d.status === 'valid').length}
                  </div>
                  <div className="text-sm text-green-700">Tayyor</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {requirements.flatMap(r => r.documents).filter(d => d.status === 'expiring').length}
                  </div>
                  <div className="text-sm text-yellow-700">Muddati tugaydi</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {requirements.flatMap(r => r.documents).filter(d => d.status === 'missing').length}
                  </div>
                  <div className="text-sm text-red-700">Yo'q</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Umumiy xarajat:
                  </span>
                  <Badge variant="outline">
                    {requirements.reduce((sum, r) => sum + r.transitFee, 0)} {requirements[0]?.currency}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Tayyorlov vaqti:
                  </span>
                  <Badge variant="outline">
                    {Math.max(...requirements.map(r => r.processingDays))} kun
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Requirements */}
      {requirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Batafsil Hujjatlar Ro'yxati</CardTitle>
            <CardDescription>
              Har bir davlat bo'yicha kerakli hujjatlar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requirements.map((req, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {req.country}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {req.transitFee} {req.currency} • {req.processingDays} kun
                  </div>
                </div>

                <div className="grid gap-3">
                  {req.documents.map((doc, docIndex) => (
                    <div 
                      key={docIndex}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        doc.status === 'missing' && "border-red-200 bg-red-50",
                        doc.status === 'expiring' && "border-yellow-200 bg-yellow-50",
                        doc.status === 'valid' && "border-green-200 bg-green-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">{doc.description}</div>
                          {doc.expiryDate && (
                            <div className="text-xs text-muted-foreground">
                              Muddat: {new Date(doc.expiryDate).toLocaleDateString('uz-UZ')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.required && (
                          <Badge variant="secondary">Majburiy</Badge>
                        )}
                        {doc.status === 'missing' && (
                          <Button size="sm" variant="outline">
                            <Upload className="w-3 h-3 mr-1" />
                            Yuklash
                          </Button>
                        )}
                        {doc.status === 'valid' && (
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Ko'rish
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {index < requirements.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            <div className="mt-6 flex gap-4">
              <Button className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Barcha Hujjatlarni Yuklab Olish
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Hisobot Eksport
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}