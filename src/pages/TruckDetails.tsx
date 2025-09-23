import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Truck, FileText, AlertTriangle, Calendar, Building, Eye } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trucks, documents, documentTypes } from "@/data/mockData";
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
      return 'Ta\'mirda';
    case 'sold':
      return 'Sotilgan';
    case 'inactive':
      return 'Faol emas';
    default:
      return status;
  }
};

const getAlertLevelColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'bg-red-100 text-red-700 border border-red-200';
    case 'warning':
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'expired':
      return 'bg-gray-100 text-gray-700 border border-gray-200';
    case 'safe':
      return 'bg-green-100 text-green-700 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-600 border border-gray-200';
  }
};

const getAlertLevelText = (level: string) => {
  switch (level) {
    case 'critical':
      return 'Kritik';
    case 'warning':
      return 'Ogohlantiruv';
    case 'expired':
      return 'Tugagan';
    case 'safe':
      return 'Xavfsiz';
    default:
      return level;
  }
};

export default function TruckDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const truck = trucks.find(t => t.id === parseInt(id || '0'));
  const truckDocuments = documents.filter(doc => doc.truckId === parseInt(id || '0'));
  
  if (!truck) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mashina topilmadi</h3>
          <p className="text-muted-foreground mb-4">
            So'ralgan mashina mavjud emas yoki o'chirilgan
          </p>
          <Button onClick={() => navigate('/trucks')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga qaytish
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/trucks')}
          className="shrink-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Orqaga
        </Button>
        <Header 
          title={`${truck.licensePlate} - Batafsil ma'lumot`} 
          subtitle={`${truck.brand} ${truck.model} (${truck.year})`}
        />
      </div>

      {/* Truck Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Mashina ma'lumotlari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Davlat raqami:</span>
              <span className="font-semibold">{truck.licensePlate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Marka:</span>
              <span className="font-semibold">{truck.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model:</span>
              <span className="font-semibold">{truck.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Yil:</span>
              <span className="font-semibold">{truck.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Yuk ko'tarish quvvati:</span>
              <span className="font-semibold">{truck.capacityTons} tonna</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Motor hajmi:</span>
              <span className="font-semibold">{truck.engineVolume}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Holat:</span>
              <Badge className={`${getStatusColor(truck.status)} flex items-center space-x-1 w-fit`}>
                <span>{getStatusText(truck.status)}</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Hujjatlar statistikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                <p className="text-2xl font-bold">{truck.expiredDocuments}</p>
                <p className="text-sm">Tugagan</p>
              </div>
              <div className="text-center p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">
                <p className="text-2xl font-bold">{truck.criticalDocuments}</p>
                <p className="text-sm">Kritik</p>
              </div>
              <div className="text-center p-4 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
                <p className="text-2xl font-bold">{truck.warningDocuments}</p>
                <p className="text-sm">Ogohlantiruv</p>
              </div>
              <div className="text-center p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                <p className="text-2xl font-bold">{truck.safeDocuments}</p>
                <p className="text-sm">Xavfsiz</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Mashinaga tegishli hujjatlar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {truckDocuments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hujjat turi</TableHead>
                  <TableHead>Raqam</TableHead>
                  <TableHead>Bergan organ</TableHead>
                  <TableHead>Amal qilish muddati</TableHead>
                  <TableHead>Holat</TableHead>
                  <TableHead>Qolgan kunlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {truckDocuments.map((doc) => {
                  const docType = documentTypes.find(dt => dt.id === doc.documentTypeId);
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{docType?.name}</p>
                          <p className="text-sm text-muted-foreground">{docType?.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{doc.documentNumber}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{doc.issuingAuthority}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{doc.expiryDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getAlertLevelColor(doc.alertLevel)} flex items-center space-x-1 w-fit`}>
                          {doc.alertLevel === 'expired' && <AlertTriangle className="w-3 h-3" />}
                          <span>{getAlertLevelText(doc.alertLevel)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${
                          doc.daysUntilExpiry < 0 ? 'text-red-600' :
                          doc.daysUntilExpiry <= 7 ? 'text-red-500' :
                          doc.daysUntilExpiry <= 30 ? 'text-amber-600' :
                          'text-green-600'
                        }`}>
                          {doc.daysUntilExpiry < 0 
                            ? `${Math.abs(doc.daysUntilExpiry)} kun o'tgan`
                            : `${doc.daysUntilExpiry} kun`
                          }
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hujjatlar topilmadi</h3>
              <p className="text-muted-foreground">
                Bu mashina uchun hech qanday hujjat ro'yxatdan o'tmagan
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}