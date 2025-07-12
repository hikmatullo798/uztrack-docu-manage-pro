import { AlertTriangle, Clock, FileX, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CriticalAlert {
  id: number;
  type: "expired" | "critical" | "missing";
  title: string;
  description: string;
  truckPlate: string;
  daysRemaining: number;
  priority: "high" | "critical";
}

const criticalAlerts: CriticalAlert[] = [
  {
    id: 1,
    type: "expired",
    title: "Sug'urta polisi muddati tugagan",
    description: "Majburiy avtosug'urta polisi yangilanishi kerak",
    truckPlate: "01A123BC",
    daysRemaining: -15,
    priority: "critical"
  },
  {
    id: 2,
    type: "critical",
    title: "CMR shartnomasi 3 kunda tugaydi",
    description: "Xalqaro yuk tashish uchun zarur hujjat",
    truckPlate: "01A123BC",
    daysRemaining: 3,
    priority: "critical"
  },
  {
    id: 3,
    type: "critical",
    title: "TIR Carnet 3 kunda tugaydi",
    description: "Tranzit rejimi uchun zarur",
    truckPlate: "01B456DE",
    daysRemaining: 3,
    priority: "critical"
  },
  {
    id: 4,
    type: "missing",
    title: "Green Card mavjud emas",
    description: "Xalqaro sug'urta polisi yuklanmagan",
    truckPlate: "01C789FG",
    daysRemaining: 0,
    priority: "high"
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case "expired":
      return <FileX className="w-4 h-4" />;
    case "critical":
      return <Clock className="w-4 h-4" />;
    case "missing":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <AlertTriangle className="w-4 h-4" />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case "expired":
      return "bg-black text-white";
    case "critical":
      return "bg-red-600 text-white";
    case "missing":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-500 text-white";
  }
};

export function CriticalAlerts() {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>🚨</span>
            <span>Kritik Eslatmalar</span>
          </div>
          <Badge variant="destructive" className="bg-red-600">
            {criticalAlerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 ${
              alert.type === "expired" 
                ? "border-l-black bg-gray-900/10" 
                : alert.type === "critical"
                ? "border-l-red-600 bg-red-50/10"
                : "border-l-yellow-500 bg-yellow-50/10"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-1.5 rounded-full ${getAlertColor(alert.type)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">
                      {alert.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Truck className="w-3 h-3" />
                      <span>{alert.truckPlate}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {alert.daysRemaining <= 0 ? (
                      <Badge variant="destructive" className="text-xs bg-black">
                        {Math.abs(alert.daysRemaining)} kun kechikdi
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        {alert.daysRemaining} kun qoldi
                      </Badge>
                    )}
                    
                    <Button size="sm" variant="outline" className="text-xs h-6">
                      Harakatga o'tish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          Barcha kritik eslatmalarni ko'rish
        </Button>
      </CardContent>
    </Card>
  );
}