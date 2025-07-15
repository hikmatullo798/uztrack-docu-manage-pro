import { useState } from "react";
import { MapPin, Route, FileText, AlertTriangle, Globe, Clock, DollarSign, BarChart3 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/mockData";
import { TruckSelector } from "@/components/eurasian/TruckSelector";
import { CountrySelector } from "@/components/eurasian/CountrySelector";
import { DocumentDeficiencyDetector } from "@/components/eurasian/DocumentDeficiencyDetector";
import { DocumentUploadSystem } from "@/components/eurasian/DocumentUploadSystem";
import { EurasianDashboard } from "@/components/eurasian/EurasianDashboard";
import { Truck } from "@/types";

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
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showUploadSystem, setShowUploadSystem] = useState(false);
  const [uploadDocumentType, setUploadDocumentType] = useState<string>("");
  const [uploadCountryCode, setUploadCountryCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState("planning");

  const handlePlanRoute = () => {
    if (originCity && destinationCity) {
      setSelectedRoute(1); // Mock route selection
      setActiveTab("documents");
    }
  };

  const handleTruckSelect = (truck: Truck) => {
    setSelectedTruck(truck);
  };

  const handleCountriesChange = (countries: string[]) => {
    setSelectedCountries(countries);
  };

  const handleUploadRequest = (documentType: string, countryCode: string) => {
    setUploadDocumentType(documentType);
    setUploadCountryCode(countryCode);
    setShowUploadSystem(true);
    setActiveTab("upload");
  };

  const handleUploadComplete = (file: File, metadata: any) => {
    console.log("Upload completed:", file, metadata);
    setShowUploadSystem(false);
    setActiveTab("documents");
    // Here you would typically save to your backend
  };

  const handleUploadCancel = () => {
    setShowUploadSystem(false);
    setActiveTab("documents");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Yevroosiyo Moduli" 
        subtitle="Xalqaro yo'l rejalashtirish va hujjatlar boshqaruvi"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="planning" className="gap-2">
            <Route className="w-4 h-4" />
            Rejalashtirish
          </TabsTrigger>
          <TabsTrigger value="trucks" className="gap-2">
            <MapPin className="w-4 h-4" />
            Avtomobillar
          </TabsTrigger>
          <TabsTrigger value="countries" className="gap-2">
            <Globe className="w-4 h-4" />
            Davlatlar
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="w-4 h-4" />
            Hujjatlar
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planning" className="space-y-6">
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

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSelectedCountries(route.countries);
                          setActiveTab("countries");
                        }}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Bu yo'nalishni tanlash
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Required Documents Summary */}
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
        </TabsContent>

        <TabsContent value="trucks" className="space-y-6">
          <TruckSelector
            selectedTruckId={selectedTruck?.id}
            onTruckSelect={handleTruckSelect}
            countries={selectedCountries}
          />
        </TabsContent>

        <TabsContent value="countries" className="space-y-6">
          <CountrySelector
            selectedCountries={selectedCountries}
            onCountriesChange={handleCountriesChange}
            origin={originCity}
            destination={destinationCity}
          />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          {showUploadSystem ? (
            <DocumentUploadSystem
              documentType={uploadDocumentType}
              countryCode={uploadCountryCode}
              onUploadComplete={handleUploadComplete}
              onCancel={handleUploadCancel}
            />
          ) : (
            <DocumentDeficiencyDetector
              selectedTruck={selectedTruck}
              selectedCountries={selectedCountries}
              onUploadRequest={handleUploadRequest}
            />
          )}
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <EurasianDashboard
            selectedTruckId={selectedTruck?.id}
            selectedCountries={selectedCountries}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}