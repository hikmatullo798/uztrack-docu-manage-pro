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

interface RoutePlan {
  id: string;
  name: string;
  origin: string;
  destination: string;
  cargoType: string;
  cargoWeight: string;
  plannedDate: string;
  requirements: RouteRequirement[];
  createdAt: string;
  status: 'draft' | 'ready' | 'incomplete';
}

const cities = [
  // O'zbekiston
  { name: "Toshkent, O'zbekiston", country: "UZ" },
  { name: "Samarqand, O'zbekiston", country: "UZ" },
  { name: "Buxoro, O'zbekiston", country: "UZ" },
  { name: "Andijon, O'zbekiston", country: "UZ" },
  { name: "Namangan, O'zbekiston", country: "UZ" },
  { name: "Farg'ona, O'zbekiston", country: "UZ" },
  
  // Rossiya
  { name: "Moskva, Rossiya", country: "RU" },
  { name: "Sankt-Peterburg, Rossiya", country: "RU" },
  { name: "Novosibirsk, Rossiya", country: "RU" },
  { name: "Yekaterinburg, Rossiya", country: "RU" },
  { name: "Kazan, Rossiya", country: "RU" },
  { name: "Nizhniy Novgorod, Rossiya", country: "RU" },
  
  // Qozog'iston
  { name: "Almaty, Qozog'iston", country: "KZ" },
  { name: "Nur-Sultan, Qozog'iston", country: "KZ" },
  { name: "Shymkent, Qozog'iston", country: "KZ" },
  { name: "Aktobe, Qozog'iston", country: "KZ" },
  
  // Qirg'iziston
  { name: "Bishkek, Qirg'iziston", country: "KG" },
  { name: "Osh, Qirg'iziston", country: "KG" },
  
  // Tojikiston
  { name: "Dushanbe, Tojikiston", country: "TJ" },
  { name: "Xujand, Tojikiston", country: "TJ" },
  
  // Turkmaniston
  { name: "Ashgabat, Turkmaniston", country: "TM" },
  { name: "Turkmenbashi, Turkmaniston", country: "TM" },
  
  // Xitoy
  { name: "Urumchi, Xitoy", country: "CN" },
  { name: "Kashgar, Xitoy", country: "CN" },
  { name: "Beijing, Xitoy", country: "CN" },
  { name: "Shanghai, Xitoy", country: "CN" },
  
  // Turkiya
  { name: "Istanbul, Turkiya", country: "TR" },
  { name: "Ankara, Turkiya", country: "TR" },
  { name: "Trabzon, Turkiya", country: "TR" },
  { name: "Antalya, Turkiya", country: "TR" }
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
  const [savedPlans, setSavedPlans] = useState<RoutePlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<RoutePlan | null>(null);
  const [showPlansList, setShowPlansList] = useState(false);

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

  const savePlan = () => {
    if (!formData.origin || !formData.destination || !formData.cargoType || requirements.length === 0) {
      return;
    }

    const planName = `${formData.origin} → ${formData.destination}`;
    const planStatus: 'draft' | 'ready' | 'incomplete' = 
      requirements.flatMap(r => r.documents).some(d => d.status === 'missing') ? 'incomplete' : 'ready';

    const newPlan: RoutePlan = {
      id: editingPlan ? editingPlan.id : `plan_${Date.now()}`,
      name: planName,
      origin: formData.origin,
      destination: formData.destination,
      cargoType: formData.cargoType,
      cargoWeight: formData.cargoWeight,
      plannedDate: formData.plannedDate,
      requirements,
      createdAt: editingPlan ? editingPlan.createdAt : new Date().toISOString(),
      status: planStatus
    };

    if (editingPlan) {
      setSavedPlans(plans => plans.map(p => p.id === editingPlan.id ? newPlan : p));
      setEditingPlan(null);
    } else {
      setSavedPlans(plans => [...plans, newPlan]);
    }
  };

  const loadPlanForEditing = (plan: RoutePlan) => {
    setFormData({
      origin: plan.origin,
      destination: plan.destination,
      cargoType: plan.cargoType,
      cargoWeight: plan.cargoWeight,
      truckType: "",
      plannedDate: plan.plannedDate
    });
    setRequirements(plan.requirements);
    setEditingPlan(plan);
    setShowPlansList(false);
  };

  const deletePlan = (planId: string) => {
    setSavedPlans(plans => plans.filter(p => p.id !== planId));
  };

  const resetForm = () => {
    setFormData({
      origin: "",
      destination: "",
      cargoType: "",
      cargoWeight: "",
      truckType: "",
      plannedDate: ""
    });
    setRequirements([]);
    setEditingPlan(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Header 
          title="Yo'nalish Rejasi" 
          subtitle="Yo'nalish bo'yicha kerakli hujjatlarni aniqlash va boshqarish"
        />
        <div className="flex gap-2">
          <Button
            variant={showPlansList ? "outline" : "default"}
            onClick={() => setShowPlansList(false)}
          >
            {editingPlan ? "Tahrirlash" : "Yangi Reja"}
          </Button>
          <Button
            variant={showPlansList ? "default" : "outline"}
            onClick={() => setShowPlansList(true)}
          >
            Saqlangan Rejalar ({savedPlans.length})
          </Button>
        </div>
      </div>

      {!showPlansList ? (
        <>
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
                <Select onValueChange={(value) => setFormData({...formData, origin: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chiqish joyini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Borish joyi</Label>
                <Select onValueChange={(value) => setFormData({...formData, destination: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Borish joyini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
...
              </div>
            ))}

            <div className="mt-6 flex gap-4">
              <Button 
                onClick={savePlan}
                className="flex-1"
                disabled={!formData.origin || !formData.destination || !formData.cargoType || requirements.length === 0}
              >
                <FileText className="w-4 h-4 mr-2" />
                {editingPlan ? "Rejani Yangilash" : "Rejani Saqlash"}
              </Button>
              {editingPlan && (
                <Button variant="outline" onClick={resetForm}>
                  Bekor Qilish
                </Button>
              )}
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Hisobot Eksport
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
        </>
      ) : (
        // Saved Plans List
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Saqlangan Yo'nalish Rejalari
              </CardTitle>
              <CardDescription>
                Yaratilgan va saqlangan yo'nalish rejalaringiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedPlans.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Hozircha saqlangan rejalar yo'q</p>
                  <p className="text-sm">Yangi yo'nalish rejasi yarating</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedPlans.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {plan.cargoType} • {plan.cargoWeight}t • {new Date(plan.createdAt).toLocaleDateString('uz-UZ')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={plan.status === 'ready' ? 'default' : plan.status === 'incomplete' ? 'destructive' : 'secondary'}
                          >
                            {plan.status === 'ready' ? 'Tayyor' : plan.status === 'incomplete' ? 'Tugallanmagan' : 'Qoralama'}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => loadPlanForEditing(plan)}>
                            Tahrirlash
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deletePlan(plan.id)}>
                            O'chirish
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Hujjatlar:</span>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {plan.requirements.flatMap(r => r.documents).filter(d => d.status === 'valid').length} tayyor
                            </Badge>
                            <Badge variant="destructive" className="text-xs">
                              {plan.requirements.flatMap(r => r.documents).filter(d => d.status === 'missing').length} yo'q
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Xarajat:</span>
                          <div className="font-medium">
                            {plan.requirements.reduce((sum, r) => sum + r.transitFee, 0)} {plan.requirements[0]?.currency}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tayyorlov:</span>
                          <div className="font-medium">
                            {Math.max(...plan.requirements.map(r => r.processingDays))} kun
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}