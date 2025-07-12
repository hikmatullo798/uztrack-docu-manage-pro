import { Calendar, Clock, FileText, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ExpirationItem {
  id: number;
  documentName: string;
  truckPlate: string;
  expiryDate: string;
  daysRemaining: number;
  priority: "high" | "medium" | "low";
}

const upcomingExpirations: ExpirationItem[] = [
  {
    id: 1,
    documentName: "Ro'yxatdan o'tish guvohnomasi",
    truckPlate: "01A123BC",
    expiryDate: "2024-12-31",
    daysRemaining: 25,
    priority: "high"
  },
  {
    id: 2,
    documentName: "Texnik ko'rik guvohnomasi",
    truckPlate: "01B456DE",
    expiryDate: "2025-01-15",
    daysRemaining: 40,
    priority: "medium"
  },
  {
    id: 3,
    documentName: "Green Card",
    truckPlate: "01D012HI",
    expiryDate: "2025-02-10",
    daysRemaining: 66,
    priority: "medium"
  },
  {
    id: 4,
    documentName: "ATP guvohnomasi",
    truckPlate: "01C789FG",
    expiryDate: "2025-03-05",
    daysRemaining: 89,
    priority: "low"
  },
  {
    id: 5,
    documentName: "ADR guvohnomasi",
    truckPlate: "01E345JK",
    expiryDate: "2025-04-20",
    daysRemaining: 135,
    priority: "low"
  }
];

const getPriorityColor = (daysRemaining: number) => {
  if (daysRemaining <= 7) return "text-red-600";
  if (daysRemaining <= 30) return "text-yellow-600";
  return "text-green-600";
};

const getProgressValue = (daysRemaining: number, totalDays: number = 365) => {
  return Math.max(0, Math.min(100, ((totalDays - daysRemaining) / totalDays) * 100));
};

export function UpcomingExpirations() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📅</span>
          <span>Kelayotgan Muddatlar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingExpirations.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.documentName}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Truck className="w-3 h-3" />
                      <span>{item.truckPlate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{item.expiryDate}</span>
                    </div>
                    
                    <div className="flex-1">
                      <Progress 
                        value={getProgressValue(item.daysRemaining)} 
                        className="h-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${getPriorityColor(item.daysRemaining)}`}>
                    <Clock className="w-4 h-4" />
                    <span>{item.daysRemaining} kun</span>
                  </div>
                  <p className="text-xs text-muted-foreground">qoldi</p>
                </div>
                
                <Badge 
                  variant={item.daysRemaining <= 30 ? "destructive" : "secondary"}
                  className={item.daysRemaining <= 7 ? "bg-red-600" : item.daysRemaining <= 30 ? "bg-yellow-500 text-black" : ""}
                >
                  {item.priority === "high" ? "Yuqori" : item.priority === "medium" ? "O'rta" : "Past"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}