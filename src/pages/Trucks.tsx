import { useState } from "react";
import { Plus, Search, Filter, Truck, FileText, AlertTriangle, Wrench, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      return 'bg-green-100 text-green-700 border border-green-200';
    case 'maintenance':
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'sold':
      return 'bg-gray-100 text-gray-700 border border-gray-200';
    case 'inactive':
      return 'bg-red-100 text-red-700 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-600 border border-gray-200';
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
  const navigate = useNavigate();

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
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Jami mashinalar</p>
                <p className="text-2xl font-bold text-blue-700">{trucks.length}</p>
              </div>
              <Truck className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Faol mashinalar</p>
                <p className="text-2xl font-bold text-green-700">{activeTrucks}</p>
              </div>
              <Truck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Kritik hujjatlar</p>
                <p className="text-2xl font-bold text-red-700">{totalCritical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Ta'mirdagi mashinalar</p>
                <p className="text-2xl font-bold text-amber-700">{maintenanceTrucks}</p>
              </div>
              <Wrench className="w-8 h-8 text-amber-500" />
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
        
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => window.location.href = '/trucks/add'}
        >
          <Plus className="w-4 h-4 mr-2" />
          Yangi mashina qo'shish
        </Button>
      </div>

      {/* Trucks Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mashina</TableHead>
              <TableHead>Holat</TableHead>
              <TableHead>Texnik ma'lumotlar</TableHead>
              <TableHead>Hujjatlar holati</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrucks.map((truck) => (
              <TableRow key={truck.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <p className="font-semibold">{truck.licensePlate}</p>
                    <p className="text-sm text-muted-foreground">
                      {truck.brand} {truck.model} ({truck.year})
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(truck.status)} flex items-center space-x-1 w-fit`}>
                    {getStatusIcon(truck.status)}
                    <span>{getStatusText(truck.status)}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{truck.capacityTons} t</p>
                    <p className="text-muted-foreground">{truck.engineVolume}L</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {truck.expiredDocuments > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {truck.expiredDocuments} tugagan
                      </Badge>
                    )}
                    {truck.criticalDocuments > 0 && (
                      <Badge variant="destructive" className="text-xs bg-red-600">
                        {truck.criticalDocuments} kritik
                      </Badge>
                    )}
                    {truck.warningDocuments > 0 && (
                      <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                        {truck.warningDocuments} ogohlantiruv
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      {truck.safeDocuments} xavfsiz
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/trucks/${truck.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ko'rish
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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