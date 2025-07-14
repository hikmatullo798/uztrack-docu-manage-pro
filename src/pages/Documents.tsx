import { useState } from "react";
import { Plus, Search, Filter, FileText, AlertTriangle, Calendar, Truck } from "lucide-react";
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
import { documents, trucks, documentTypes } from "@/data/mockData";
import { Document, AlertLevel } from "@/types";

const getAlertLevelColor = (level: AlertLevel) => {
  switch (level) {
    case 'critical':
      return 'bg-red-600 text-white';
    case 'warning':
      return 'bg-yellow-500 text-black';
    case 'expired':
      return 'bg-black text-white animate-pulse';
    case 'safe':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'valid':
      return 'Amal qiladi';
    case 'expired':
      return 'Muddati tugagan';
    case 'expiring_soon':
      return 'Tugaydi';
    case 'missing':
      return 'Mavjud emas';
    default:
      return status;
  }
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTruck, setFilterTruck] = useState("all");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documentTypes.find(dt => dt.id === doc.documentTypeId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trucks.find(t => t.id === doc.truckId)?.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || doc.alertLevel === filterStatus;
    const matchesTruck = filterTruck === "all" || doc.truckId.toString() === filterTruck;
    
    return matchesSearch && matchesStatus && matchesTruck;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Hujjatlar Nazorati" 
        subtitle="Barcha hujjatlarni real-time monitoring va boshqarish"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Kritik</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500 text-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Ogohlantiruv</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Muddati tugagan</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <FileText className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Xavfsiz</p>
                <p className="text-2xl font-bold">16</p>
              </div>
              <FileText className="w-8 h-8 opacity-80" />
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
              placeholder="Hujjat raqami, turi yoki mashina raqamini qidiring..."
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
              <SelectItem value="critical">Kritik</SelectItem>
              <SelectItem value="warning">Ogohlantiruv</SelectItem>
              <SelectItem value="expired">Muddati tugagan</SelectItem>
              <SelectItem value="safe">Xavfsiz</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterTruck} onValueChange={setFilterTruck}>
            <SelectTrigger className="w-40">
              <Truck className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Mashina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha mashinalar</SelectItem>
              {trucks.map(truck => (
                <SelectItem key={truck.id} value={truck.id.toString()}>
                  {truck.licensePlate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => window.location.href = '/documents/add'}
        >
          <Plus className="w-4 h-4 mr-2" />
          Yangi hujjat yuklash
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => {
          const truck = trucks.find(t => t.id === doc.truckId);
          const docType = documentTypes.find(dt => dt.id === doc.documentTypeId);
          
          return (
            <Card key={doc.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Alert Level Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${getAlertLevelColor(doc.alertLevel)} text-xs px-2 py-1`}>
                    {doc.alertLevel === 'critical' ? 'Kritik' :
                     doc.alertLevel === 'warning' ? 'Ogohlantiruv' :
                     doc.alertLevel === 'expired' ? 'Tugagan' : 'Xavfsiz'}
                  </Badge>
                </div>

                {/* Document Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {docType?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.documentNumber}
                    </p>
                  </div>

                  {/* Truck Info */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{truck?.licensePlate}</span>
                    <span className="text-muted-foreground">
                      {truck?.brand} {truck?.model}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Berilgan sana:</span>
                      <span>{doc.issueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tugash sanasi:</span>
                      <span className={doc.daysUntilExpiry <= 0 ? 'text-red-600 font-medium' : ''}>
                        {doc.expiryDate}
                      </span>
                    </div>
                  </div>

                  {/* Days Remaining */}
                  <div className="text-center p-3 rounded-lg bg-muted">
                    {doc.daysUntilExpiry <= 0 ? (
                      <p className="text-red-600 font-bold">
                        {Math.abs(doc.daysUntilExpiry)} kun kechikdi
                      </p>
                    ) : (
                      <p className="font-semibold">
                        <span className={`text-2xl ${
                          doc.daysUntilExpiry <= 7 ? 'text-red-600' :
                          doc.daysUntilExpiry <= 30 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {doc.daysUntilExpiry}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">kun qoldi</span>
                      </p>
                    )}
                  </div>

                  {/* Issuing Authority */}
                  <p className="text-xs text-muted-foreground text-center">
                    {doc.issuingAuthority}
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Ko'rish
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Yangilash
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Hujjat topilmadi</h3>
          <p className="text-muted-foreground">
            Qidiruv mezonlaringizni o'zgartiring yoki yangi hujjat yuklang
          </p>
        </div>
      )}
    </div>
  );
}