import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Upload,
  Eye,
  Settings
} from 'lucide-react';
import { trucks } from '@/data/mockData';

// Mock data for demonstration
const mockDocuments = [
  { id: 1, truckId: 1, documentType: 'TIR Carnet', status: 'valid', expiryDate: '2025-06-15', isUploaded: true },
  { id: 2, truckId: 1, documentType: 'CMR', status: 'expiring_soon', expiryDate: '2024-08-10', isUploaded: true },
  { id: 3, truckId: 1, documentType: 'Green Card', status: 'expired', expiryDate: '2024-07-01', isUploaded: false },
  { id: 4, truckId: 2, documentType: 'TIR Carnet', status: 'valid', expiryDate: '2025-03-20', isUploaded: true },
  { id: 5, truckId: 2, documentType: 'ATP Certificate', status: 'missing', expiryDate: '', isUploaded: false },
];

const EurasianRoute = () => {
  const [selectedTruck, setSelectedTruck] = useState(trucks[0]);
  const [activeTab, setActiveTab] = useState('overview');

  // Get documents for selected truck
  const truckDocuments = mockDocuments.filter(doc => doc.truckId === selectedTruck.id);
  
  // Calculate statistics
  const totalDocs = truckDocuments.length;
  const validDocs = truckDocuments.filter(doc => doc.status === 'valid').length;
  const expiredDocs = truckDocuments.filter(doc => doc.status === 'expired').length;
  const expiringSoonDocs = truckDocuments.filter(doc => doc.status === 'expiring_soon').length;
  const missingDocs = truckDocuments.filter(doc => doc.status === 'missing').length;

  const completionRate = totalDocs > 0 ? Math.round((validDocs / totalDocs) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Hujjatlar Nazorati</h1>
            <p className="text-sm text-muted-foreground">Xalqaro yuk tashish hujjatlari</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Hujjat Yuklash
          </Button>
        </div>

        {/* Stats Cards - Simplified */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-card border border-border">
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-success" />
                <p className="text-lg sm:text-xl font-bold text-foreground">{validDocs}</p>
                <p className="text-xs text-muted-foreground">Yaroqli</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                <p className="text-lg sm:text-xl font-bold text-foreground">{expiringSoonDocs}</p>
                <p className="text-xs text-muted-foreground">Tugaydi</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-destructive" />
                <p className="text-lg sm:text-xl font-bold text-foreground">{expiredDocs}</p>
                <p className="text-xs text-muted-foreground">Muddati o'tgan</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg sm:text-xl font-bold text-foreground">{missingDocs}</p>
                <p className="text-xs text-muted-foreground">Kamayotgan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Umumiy</TabsTrigger>
            <TabsTrigger value="trucks" className="text-xs sm:text-sm">Mashinalar</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs sm:text-sm">Eslatmalar</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">Sozlamalar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            {/* Progress Card */}
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Hujjatlar Holati
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{completionRate}%</div>
                  <p className="text-sm text-muted-foreground">Tayyor hujjatlar</p>
                </div>
                <Progress value={completionRate} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{totalDocs}</div>
                    <p className="text-xs text-muted-foreground">Jami</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{validDocs}</div>
                    <p className="text-xs text-muted-foreground">Yaroqli</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            {(expiredDocs > 0 || expiringSoonDocs > 0) && (
              <Alert className="border-destructive/20 bg-destructive/5">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Diqqat:</strong> {expiredDocs} ta hujjat muddati o'tgan, 
                  {expiringSoonDocs} ta hujjat muddati tugaydi.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="trucks" className="space-y-4 sm:space-y-6">
            {/* Truck Selector */}
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Mashina Tanlash</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {trucks.map((truck) => {
                    const truckDocs = mockDocuments.filter(doc => doc.truckId === truck.id);
                    const validCount = truckDocs.filter(doc => doc.status === 'valid').length;
                    const totalCount = truckDocs.length;
                    
                    return (
                      <Card 
                        key={truck.id}
                        className={`cursor-pointer transition-all ${
                          selectedTruck.id === truck.id 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedTruck(truck)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              <span className="font-medium text-sm">{truck.licensePlate}</span>
                            </div>
                            <Badge 
                              variant={validCount === totalCount ? 'default' : validCount > totalCount/2 ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {validCount === totalCount ? 'Tayyor' : validCount > totalCount/2 ? 'Qisman' : 'Kamchil'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{truck.model}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Hujjatlar:</span>
                              <span>{validCount}/{totalCount}</span>
                            </div>
                            <Progress value={(validCount/totalCount) * 100} className="h-1.5" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Truck Documents */}
            <Card className="bg-card border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base sm:text-lg">{selectedTruck.licensePlate} - Hujjatlar</CardTitle>
                <Button size="sm" className="text-xs">
                  <Upload className="h-3 w-3 mr-1" />
                  Qo'shish
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {truckDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-sm">{doc.documentType}</h4>
                          <p className="text-xs text-muted-foreground">
                            Muddat: {doc.expiryDate || 'Belgilanmagan'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={doc.status === 'valid' ? 'default' : doc.status === 'expired' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {doc.status === 'valid' ? 'Yaroqli' : 
                           doc.status === 'expired' ? 'Tugagan' : 
                           doc.status === 'expiring_soon' ? 'Tugaydi' : 'Yetishmaydi'}
                        </Badge>
                        {doc.isUploaded && (
                          <Button size="sm" variant="outline" className="h-7 px-2">
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 sm:space-y-6">
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Kritik Eslatmalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDocuments
                    .filter(doc => doc.status === 'expired' || doc.status === 'expiring_soon')
                    .map((doc) => {
                      const truck = trucks.find(t => t.id === doc.truckId);
                      return (
                        <Alert key={doc.id} className={doc.status === 'expired' ? 'border-destructive/20 bg-destructive/5' : 'border-warning/20 bg-warning/5'}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>{truck?.licensePlate}</strong> - {doc.documentType}
                            {doc.status === 'expired' ? ' muddati o\'tgan' : ' muddati tugaydi'} ({doc.expiryDate})
                          </AlertDescription>
                        </Alert>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 sm:space-y-6">
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                  Eslatma Sozlamalari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Eslatish vaqti</h4>
                      <p className="text-xs text-muted-foreground">Muddat tugashidan oldin</p>
                    </div>
                    <select className="border border-border rounded px-3 py-2 text-sm bg-background">
                      <option value="7">7 kun</option>
                      <option value="14">14 kun</option>
                      <option value="30">30 kun</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Email eslatma</h4>
                      <p className="text-xs text-muted-foreground">Email orqali xabar</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded h-4 w-4" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">SMS eslatma</h4>
                      <p className="text-xs text-muted-foreground">SMS orqali xabar</p>
                    </div>
                    <input type="checkbox" className="rounded h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EurasianRoute;