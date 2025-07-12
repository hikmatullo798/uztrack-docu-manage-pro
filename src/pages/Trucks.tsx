import { useState } from "react";
import { Plus, Search, Filter, Truck, FileText, AlertTriangle, Wrench, Eye } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trucks } from "@/data/mockData";
import { TruckStatus } from "@/types";

const getStatusColor = (status: TruckStatus) => {
  switch (status) {
    case 'active':
      return 'bg-green-600 text-white';
    case 'maintenance':
      return 'bg-yellow-500 text-black';
    case 'sold':
      return 'bg-gray-600 text-white';
    case 'inactive':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusText = (status: TruckStatus) => {
  switch (status) {
    case 'active':
      return 'Faol';
    case 'maintenance':
      return 'Ta\'mirdا';
    case 'sold':
      return 'Sotilgan';
    case 'inactive':
      return 'Faol emas';
    default:
      return status;
  }
};

const getStatusIcon = (status: TruckStatus) => {
  switch (status) {
    case 'active':
      return <Truck className="w-4 h-4" />;
    case 'maintenance':
      return <Wrench className="w-4 h-4" />;
    case 'sold':
      return <FileText className="w-4 h-4" />;
    case 'inactive':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Truck className="w-4 h-4" />;
  }
};

export default function Trucks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = searchTerm === "" || 
      truck.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || truck.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalCritical = trucks.reduce((sum, truck) => sum + truck.criticalDocuments, 0);
  const totalExpired = trucks.reduce((sum, truck) => sum + truck.expiredDocuments, 0);
  const activeTrucks = trucks.filter(truck => truck.status === 'active').length;
  const maintenanceTrucks = trucks.filter(truck => truck.status === 'maintenance').length;

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Mashinalar Boshqaruvi" 
        subtitle="Yuk mashinalari va ularning hujjatlari holati"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Jami mashinalar</p>
                <p className="text-2xl font-bold">{trucks.length}</p>
              </div>
              <Truck className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Faol mashinalar</p>
                <p className="text-2xl font-bold">{activeTrucks}</p>
              </div>
              <Truck className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Kritik hujjatlar</p>
                <p className="text-2xl font-bold">{totalCritical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500 text-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Ta'mirdagi mashinalar</p>
                <p className="text-2xl font-bold">{maintenanceTrucks}</p>
              </div>
              <Wrench className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Davlat raqami, marka yoki modelni qidiring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Holat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holatlar</SelectItem>
              <SelectItem value="active">Faol</SelectItem>
              <SelectItem value="maintenance">Ta'mirda</SelectItem>
              <SelectItem value="inactive">Faol emas</SelectItem>
              <SelectItem value="sold">Sotilgan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Yangi mashina qo'shish
        </Button>
      </div>

      {/* Trucks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrucks.map((truck) => (
          <Card key={truck.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusColor(truck.status)} flex items-center space-x-1`}>
                  {getStatusIcon(truck.status)}
                  <span>{getStatusText(truck.status)}</span>
                </Badge>
              </div>

              {/* Truck Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-1">
                    {truck.licensePlate}
                  </h3>
                  <p className="text-muted-foreground">
                    {truck.brand} {truck.model} ({truck.year})
                  </p>
                </div>

                {/* Technical Info */}
                <div className="bg-muted rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Yuk ko'tarish quvvati:</span>
                    <span className="font-medium">{truck.capacityTons} tonna</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Motor hajmi:</span>
                    <span className="font-medium">{truck.engineVolume}L</span>
                  </div>
                </div>

                {/* Document Status */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Hujjatlar holati:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-red-600 text-white rounded">
                      <p className="text-lg font-bold">{truck.expiredDocuments}</p>
                      <p className="text-xs">Tugagan</p>
                    </div>
                    <div className="text-center p-2 bg-red-500 text-white rounded">
                      <p className="text-lg font-bold">{truck.criticalDocuments}</p>
                      <p className="text-xs">Kritik</p>
                    </div>
                    <div className="text-center p-2 bg-yellow-500 text-black rounded">
                      <p className="text-lg font-bold">{truck.warningDocuments}</p>
                      <p className="text-xs">Ogohlantiruv</p>
                    </div>
                    <div className="text-center p-2 bg-green-600 text-white rounded">
                      <p className="text-lg font-bold">{truck.safeDocuments}</p>
                      <p className="text-xs">Xavfsiz</p>
                    </div>
                  </div>
                </div>

                {/* Critical Alerts */}
                {(truck.expiredDocuments > 0 || truck.criticalDocuments > 0) && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <p className="text-sm font-medium text-red-800">
                        Tezkor harakat talab qilinadi!
                      </p>
                    </div>
                    <p className="text-xs text-red-700 mt-1">
                      {truck.expiredDocuments + truck.criticalDocuments} ta hujjat diqqat talab qiladi
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ko'rish
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="w-4 h-4 mr-1" />
                    Hujjatlar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTrucks.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mashina topilmadi</h3>
          <p className="text-muted-foreground">
            Qidiruv mezonlaringizni o'zgartiring yoki yangi mashina qo'shing
          </p>
        </div>
      )}
    </div>
  );
}