import { useState } from "react";
import { AlertTriangle, Clock, FileX, Truck, Send, Mail, MessageSquare, Bell } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface CriticalAlert {
  id: number;
  type: "expired" | "critical" | "missing";
  title: string;
  description: string;
  truckPlate: string;
  documentType: string;
  daysRemaining: number;
  priority: "high" | "critical";
  lastReminded: string;
  assignedTo: string;
}

const criticalAlerts: CriticalAlert[] = [
  {
    id: 1,
    type: "expired",
    title: "Sug'urta polisi muddati tugagan",
    description: "Majburiy avtosug'urta polisi yangilanishi kerak. Yo'lda harakat qilish taqiqlanadi.",
    truckPlate: "01A123BC",
    documentType: "Sug'urta polisi",
    daysRemaining: -15,
    priority: "critical",
    lastReminded: "2024-05-15",
    assignedTo: "Alisher Karimov"
  },
  {
    id: 2,
    type: "critical",
    title: "CMR shartnomasi 3 kunda tugaydi",
    description: "Xalqaro yuk tashish uchun zarur hujjat. Tezkor yangilanishi talab qilinadi.",
    truckPlate: "01A123BC",
    documentType: "CMR shartnomasi",
    daysRemaining: 3,
    priority: "critical",
    lastReminded: "2024-05-20",
    assignedTo: "Aziz Tashmatov"
  },
  {
    id: 3,
    type: "critical",
    title: "TIR Carnet 3 kunda tugaydi",
    description: "Tranzit rejimi uchun zarur. Yevroosiyo yo'lida foydalanish uchun majburiy.",
    truckPlate: "01B456DE",
    documentType: "TIR Carnet",
    daysRemaining: 3,
    priority: "critical",
    lastReminded: "2024-05-18",
    assignedTo: "Bobur Rashidov"
  },
  {
    id: 4,
    type: "missing",
    title: "Green Card mavjud emas",
    description: "Xalqaro sug'urta polisi yuklanmagan. Xalqaro yo'lda zarur.",
    truckPlate: "01C789FG",
    documentType: "Green Card",
    daysRemaining: 0,
    priority: "high",
    lastReminded: "2024-05-10",
    assignedTo: "Doniyor Ergashev"
  },
  {
    id: 5,
    type: "expired",
    title: "Texnik ko'rik guvohnomasi tugagan",
    description: "Transport vositasi texnik holatini tasdiqlash uchun zarur hujjat.",
    truckPlate: "01E345JK",
    documentType: "Texnik ko'rik",
    daysRemaining: -7,
    priority: "critical",
    lastReminded: "2024-05-12",
    assignedTo: "Farrux Nazarov"
  },
  {
    id: 6,
    type: "critical",
    title: "Ro'yxat guvohnomasi 5 kunda tugaydi",
    description: "Davlat ro'yxatiga olish guvohnomasi yangilanishi kerak.",
    truckPlate: "01D012HI",
    documentType: "Ro'yxat guvohnomasi",
    daysRemaining: 5,
    priority: "high",
    lastReminded: "2024-05-19",
    assignedTo: "Gulnora Salimova"
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case "expired":
      return <FileX className="w-5 h-5" />;
    case "critical":
      return <Clock className="w-5 h-5" />;
    case "missing":
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return <AlertTriangle className="w-5 h-5" />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case "expired":
      return "border-l-black bg-gray-900/5";
    case "critical":
      return "border-l-red-600 bg-red-50/50";
    case "missing":
      return "border-l-yellow-500 bg-yellow-50/50";
    default:
      return "border-l-gray-500 bg-gray-50/50";
  }
};

const getUrgencyScore = (alert: CriticalAlert) => {
  if (alert.type === "expired") return 100;
  if (alert.type === "critical" && alert.daysRemaining <= 3) return 90;
  if (alert.type === "critical" && alert.daysRemaining <= 7) return 80;
  if (alert.type === "missing") return 70;
  return 50;
};

export default function CriticalAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<CriticalAlert | null>(null);

  const sortedAlerts = [...criticalAlerts].sort((a, b) => getUrgencyScore(b) - getUrgencyScore(a));
  const expiredCount = criticalAlerts.filter(a => a.type === "expired").length;
  const criticalCount = criticalAlerts.filter(a => a.type === "critical").length;
  const missingCount = criticalAlerts.filter(a => a.type === "missing").length;

  const handleSendReminder = (alertId: number, method: string) => {
    console.log(`Sending reminder for alert ${alertId} via ${method}`);
    // Mock API call
  };

  const handleMarkAsHandled = (alertId: number) => {
    console.log(`Marking alert ${alertId} as handled`);
    // Mock API call
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Kritik Eslatmalar" 
        subtitle="Tezkor harakat talab qilinadigan hujjatlar va eslatmalar"
      />

      {/* Critical Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Jami kritik</p>
                <p className="text-3xl font-bold">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="w-10 h-10 opacity-80 animate-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Muddati tugagan</p>
                <p className="text-3xl font-bold">{expiredCount}</p>
              </div>
              <FileX className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Kritik (1-7 kun)</p>
                <p className="text-3xl font-bold">{criticalCount}</p>
              </div>
              <Clock className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500 text-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Mavjud emas</p>
                <p className="text-3xl font-bold">{missingCount}</p>
              </div>
              <AlertTriangle className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Eslatmalar ro'yxati</TabsTrigger>
          <TabsTrigger value="actions">Tezkor harakatlar</TabsTrigger>
          <TabsTrigger value="analytics">Tahlil</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {sortedAlerts.map((alert) => (
            <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-full ${
                      alert.type === "expired" ? "bg-black text-white" :
                      alert.type === "critical" ? "bg-red-600 text-white" : "bg-yellow-500 text-black"
                    }`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {alert.title}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Truck className="w-4 h-4" />
                          <span>{alert.truckPlate}</span>
                        </div>
                        <Badge variant={alert.priority === "critical" ? "destructive" : "secondary"}>
                          {alert.priority === "critical" ? "Kritik" : "Yuqori"}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">
                        {alert.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Hujjat turi:</span>
                          <p className="font-medium">{alert.documentType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Javobgar:</span>
                          <p className="font-medium">{alert.assignedTo}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Oxirgi eslatma:</span>
                          <p className="font-medium">{alert.lastReminded}</p>
                        </div>
                      </div>

                      {/* Urgency Meter */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Dolzarblik darajasi:</span>
                          <span className="font-bold">{getUrgencyScore(alert)}%</span>
                        </div>
                        <Progress value={getUrgencyScore(alert)} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {alert.daysRemaining <= 0 ? (
                      <Badge variant="destructive" className="bg-black text-center">
                        {Math.abs(alert.daysRemaining)} kun kechikdi
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-center">
                        {alert.daysRemaining} kun qoldi
                      </Badge>
                    )}
                    
                    <div className="flex flex-col space-y-1">
                      <Button size="sm" variant="destructive" className="text-xs">
                        Darhol harakat qilish
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Batafsil ko'rish
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Ommaviy eslatmalar yuborish</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email eslatma yuborish ({criticalAlerts.length} ta)
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SMS yuborish ({criticalAlerts.length} ta)
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Telegram eslatma ({criticalAlerts.length} ta)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avtomatik harakatlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Kunlik eslatmalar</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Har kuni 09:00 da avtomatik eslatmalar yuboriladi
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="secondary" className="bg-green-600 text-white">Faol</Badge>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Tezkor eslatmalar</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Kritik hujjatlar uchun har 4 soatda eslatma
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="secondary" className="bg-green-600 text-white">Faol</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Oxirgi 30 kun ichida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Jami eslatmalar:</span>
                    <span className="font-bold">248</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hal qilingan:</span>
                    <span className="font-bold text-green-600">186</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Muddati o'tgan:</span>
                    <span className="font-bold text-red-600">36</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hal qilish tezligi:</span>
                    <span className="font-bold">75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eng ko'p muammo bo'lgan hujjatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Sug'urta polisi", count: 12 },
                    { name: "CMR shartnomasi", count: 8 },
                    { name: "TIR Carnet", count: 6 },
                    { name: "Green Card", count: 5 },
                    { name: "Texnik ko'rik", count: 4 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.name}</span>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}