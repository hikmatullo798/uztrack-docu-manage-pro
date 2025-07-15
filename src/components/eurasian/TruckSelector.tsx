import { useState, useEffect } from "react";
import { Truck, Check, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trucks } from "@/data/mockData";
import { Truck as TruckType } from "@/types";

interface TruckSelectorProps {
  selectedTruckId?: number;
  onTruckSelect: (truck: TruckType) => void;
  countries: string[];
}

export function TruckSelector({ selectedTruckId, onTruckSelect, countries }: TruckSelectorProps) {
  const [selectedTruck, setSelectedTruck] = useState<TruckType | null>(null);

  useEffect(() => {
    if (selectedTruckId) {
      const truck = trucks.find(t => t.id === selectedTruckId);
      if (truck) {
        setSelectedTruck(truck);
      }
    }
  }, [selectedTruckId]);

  const handleTruckSelect = (truckId: string) => {
    const truck = trucks.find(t => t.id === parseInt(truckId));
    if (truck) {
      setSelectedTruck(truck);
      onTruckSelect(truck);
    }
  };

  const getTruckStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'maintenance': return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getDocumentReadiness = (truck: TruckType) => {
    const total = truck.documentsCount;
    const safe = truck.safeDocuments;
    const percentage = total > 0 ? Math.round((safe / total) * 100) : 0;
    
    if (percentage >= 90) return { level: 'high', color: 'text-success', label: 'Tayyor' };
    if (percentage >= 70) return { level: 'medium', color: 'text-warning', label: 'Qisman' };
    return { level: 'low', color: 'text-destructive', label: 'Tayyorlanmagan' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Avtomobil tanlash
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Avtomobilni tanlang
          </label>
          <Select value={selectedTruck?.id.toString() || ""} onValueChange={handleTruckSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Avtomobilni tanlang..." />
            </SelectTrigger>
            <SelectContent>
              {trucks.map((truck) => {
                const readiness = getDocumentReadiness(truck);
                return (
                  <SelectItem key={truck.id} value={truck.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">
                        {truck.licensePlate} - {truck.brand} {truck.model}
                      </span>
                      <Badge variant="outline" className={readiness.color}>
                        {readiness.label}
                      </Badge>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedTruck && (
          <div className="space-y-4">
            {/* Truck Details */}
            <div className="bg-background/50 border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-lg">
                    {selectedTruck.brand} {selectedTruck.model}
                  </h4>
                  <p className="text-muted-foreground">
                    {selectedTruck.licensePlate} • {selectedTruck.year}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <Badge className={getTruckStatusColor(selectedTruck.status)}>
                    {selectedTruck.status === 'active' ? 'Faol' : 
                     selectedTruck.status === 'maintenance' ? 'Ta\'mirlash' : 'Nofaol'}
                  </Badge>
                  <span className="text-sm text-muted-foreground mt-1">
                    {selectedTruck.capacityTons}t • {selectedTruck.engineVolume}L
                  </span>
                </div>
              </div>

              {/* Document Status Overview */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-success/10 border border-success/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-success">
                    {selectedTruck.safeDocuments}
                  </div>
                  <div className="text-xs text-success">Xavfsiz</div>
                </div>
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-warning">
                    {selectedTruck.warningDocuments}
                  </div>
                  <div className="text-xs text-warning">Ogohlantirish</div>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-destructive">
                    {selectedTruck.criticalDocuments}
                  </div>
                  <div className="text-xs text-destructive">Muhim</div>
                </div>
                <div className="bg-muted/10 border border-muted/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-muted-foreground">
                    {selectedTruck.expiredDocuments}
                  </div>
                  <div className="text-xs text-muted-foreground">Muddati o'tgan</div>
                </div>
              </div>
            </div>

            {/* Readiness Assessment */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Tanlangan davlatlar uchun: <strong>{countries.join(', ')}</strong>
                <br />
                Bu avtomobil {getDocumentReadiness(selectedTruck).label.toLowerCase()} holda. 
                Barcha kerakli hujjatlarni tekshirish uchun "Hujjatlarni tekshirish" tugmasini bosing.
              </AlertDescription>
            </Alert>

            {/* Warning for problematic trucks */}
            {(selectedTruck.status !== 'active' || selectedTruck.criticalDocuments > 0 || selectedTruck.expiredDocuments > 0) && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {selectedTruck.status !== 'active' && "Bu avtomobil hozir faol emas. "}
                  {selectedTruck.criticalDocuments > 0 && `${selectedTruck.criticalDocuments} ta muhim hujjat muammosi mavjud. `}
                  {selectedTruck.expiredDocuments > 0 && `${selectedTruck.expiredDocuments} ta hujjat muddati o'tgan.`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}