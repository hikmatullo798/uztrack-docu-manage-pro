import { useState } from "react";
import { MapPin, Route, FileText, AlertTriangle, Globe, Clock, DollarSign } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/mockData";

const routeExamples = [
  {
    id: 1,
    name: "Toshkent - Moskva",
    distance: 2847,
    duration: 35,
    countries: ["UZ", "KZ", "RU"],
    documents: 12,
    cost: 1250
  },
  {
    id: 2,
    name: "Toshkent - Berlin",
    distance: 4521,
    duration: 48,
    countries: ["UZ", "KZ", "RU", "BY", "PL", "DE"],
    documents: 18,
    cost: 2100
  },
  {
    id: 3,
    name: "Toshkent - Varshava",
    distance: 4102,
    duration: 45,
    countries: ["UZ", "KZ", "RU", "BY", "PL"],
    documents: 15,
    cost: 1890
  }
];

const requiredDocuments = [
  {
    type: "Asosiy hujjatlar",
    items: [
      "Xalqaro haydovchilik guvohnomasi",
      "Texnik passport",
      "Ro'yxatdan o'tish guvohnomasi",
      "Sug'urta polisi (Green Card)"
    ]
  },
  {
    type: "Tranzit hujjatlari",
    items: [
      "CMR shartnomasi",
      "TIR Carnet",
      "Tranzit ruxsatnomasi",
      "Viza (agar kerak bo'lsa)"
    ]
  },
  {
    type: "Maxsus hujjatlar",
    items: [
      "ATP guvohnomasi (tez buziladigan yuklar)",
      "ADR guvohnomasi (xavfli yuklar)",
      "EUR-1 guvohnomasi (tijorat yuklari)",
      "Veterinariya sertifikati (oziq-ovqat)"
    ]
  }
];

export default function EurasianRoute() {
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const handlePlanRoute = () => {
    if (originCity && destinationCity) {
      setSelectedRoute(1); // Mock route selection
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Yevroosiyo Moduli" 
        subtitle="Xalqaro yo'l rejalashtirish va hujjatlar tayyorlash"
      />

      {/* Route Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="w-5 h-5" />
            <span>Yo'l Rejalashtirish</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Boshlang'ich nuqta</label>
              <Input
                placeholder="Shahar nomini kiriting..."
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Manzil nuqta</label>
              <Input
                placeholder="Shahar nomini kiriting..."
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handlePlanRoute}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!originCity || !destinationCity}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Yo'l rejasini tuzish
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Mashhur yo'nalishlar</h3>
          <div className="space-y-4">
            {routeExamples.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">{route.name}</h4>
                    <Badge variant="outline">
                      {route.countries.length} davlat
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{route.distance}</p>
                      <p className="text-xs text-muted-foreground">km</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{route.duration}</p>
                      <p className="text-xs text-muted-foreground">soat</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{route.documents}</p>
                      <p className="text-xs text-muted-foreground">hujjat</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">${route.cost}</p>
                      <p className="text-xs text-muted-foreground">taxminiy</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-muted-foreground">Davlatlar:</span>
                    <div className="flex space-x-1">
                      {route.countries.map((countryCode) => {
                        const country = countries.find(c => c.code === countryCode);
                        return (
                          <Badge key={countryCode} variant="secondary" className="text-xs">
                            {country?.nameUz || countryCode}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    Batafsil ma'lumot
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kerakli hujjatlar</h3>
          <div className="space-y-4">
            {requiredDocuments.map((category, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{category.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Countries Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Davlatlar ma'lumotlari</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <div key={country.code} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{country.nameUz}</h4>
                    <p className="text-sm text-muted-foreground">{country.name}</p>
                  </div>
                  <Badge variant={country.visaRequired ? "destructive" : "secondary"}>
                    {country.code}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Viza:</span>
                    <span className={country.visaRequired ? "text-red-600" : "text-green-600"}>
                      {country.visaRequired ? "Kerak" : "Kerak emas"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tranzit vaqti:</span>
                    <span>{country.transitDays} kun</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Talablar:</span>
                    <span>{country.requirements.length} ta</span>
                  </div>
                </div>

                {country.additionalInfo && (
                  <div className="mt-3 p-2 bg-muted rounded text-xs">
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    {country.additionalInfo}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}