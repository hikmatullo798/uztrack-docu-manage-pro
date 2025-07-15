import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Clock, FileX, Upload, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allDocumentRequirements } from "@/data/eurasianData";
import { documents } from "@/data/mockData";
import { countries } from "@/data/mockData";
import { Truck } from "@/types";
import { CountryDocumentRequirement, RouteDocumentCheck } from "@/types/eurasian";

interface DocumentDeficiencyDetectorProps {
  selectedTruck?: Truck;
  selectedCountries: string[];
  onUploadRequest: (documentType: string, countryCode: string) => void;
}

export function DocumentDeficiencyDetector({ 
  selectedTruck, 
  selectedCountries, 
  onUploadRequest 
}: DocumentDeficiencyDetectorProps) {
  const [documentCheck, setDocumentCheck] = useState<RouteDocumentCheck | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTruck && selectedCountries.length > 0) {
      performDocumentCheck();
    }
  }, [selectedTruck, selectedCountries]);

  const performDocumentCheck = async () => {
    if (!selectedTruck) return;

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get required documents for selected countries
    const requiredDocuments = allDocumentRequirements.filter(req => 
      selectedCountries.includes(req.countryCode) || req.countryCode === 'ALL'
    );

    // Get user's documents for this truck (convert to EurasianDocument format)
    const userDocuments = documents.filter(doc => doc.truckId === selectedTruck.id).map(doc => ({
      ...doc,
      countryCode: 'UZ', // Default country
      isUploaded: true,
      uploadDate: doc.createdAt,
      ocrText: ''
    }));

    // Find missing documents
    const missingDocuments = requiredDocuments.filter(req => {
      const hasDocument = userDocuments.some(doc => {
        // Simple matching by document type name
        return doc.documentType?.name.toLowerCase().includes(req.displayName.toLowerCase().split(' ')[0]);
      });
      return !hasDocument;
    });

    // Find expiring documents (within 30 days)
    const expiringDocuments = userDocuments.filter(doc => 
      doc.daysUntilExpiry <= 30 && doc.daysUntilExpiry > 0
    );

    // Find valid documents
    const validDocuments = userDocuments.filter(doc => 
      doc.status === 'valid' && doc.daysUntilExpiry > 30
    );

    const totalRequired = requiredDocuments.length;
    const totalAvailable = userDocuments.length;
    const deficiencyCount = missingDocuments.length + expiringDocuments.length;
    const completionPercentage = totalRequired > 0 ? 
      Math.round(((totalRequired - deficiencyCount) / totalRequired) * 100) : 100;

    const estimatedCompletionTime = missingDocuments.reduce((total, doc) => 
      total + doc.processingTimeHours, 0
    );

    const totalEstimatedCost = missingDocuments.reduce((total, doc) => 
      total + doc.estimatedCost, 0
    );

    setDocumentCheck({
      routeId: `route_${selectedCountries.join('_')}`,
      truckId: selectedTruck.id,
      countries: selectedCountries,
      requiredDocuments,
      userDocuments,
      missingDocuments,
      expiringDocuments,
      validDocuments,
      deficiencyCount,
      completionPercentage,
      estimatedCompletionTime,
      totalEstimatedCost,
      lastChecked: new Date().toISOString()
    });

    setLoading(false);
  };

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vehicle': return '🚛';
      case 'driver': return '👨‍💼';
      case 'cargo': return '📦';
      case 'transit': return '🛂';
      case 'insurance': return '🛡️';
      case 'special': return '⭐';
      default: return '📄';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') return `$${amount}`;
    if (currency === 'RUB') return `${amount} руб`;
    if (currency === 'KZT') return `${amount} тенге`;
    return `${amount} ${currency}`;
  };

  const formatProcessingTime = (hours: number) => {
    if (hours < 24) return `${hours} soat`;
    const days = Math.round(hours / 24);
    return `${days} kun`;
  };

  if (!selectedTruck || selectedCountries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Hujjat tekshiruvi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Hujjatlarni tekshirish uchun avval avtomobil va davlatlarni tanlang.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 animate-spin" />
            Hujjatlar tekshirilmoqda...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!documentCheck) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Hujjat tekshiruvi natijasi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Status */}
        <div className="bg-background/50 border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Umumiy holat</h3>
            <Badge variant={documentCheck.completionPercentage >= 90 ? "default" : 
                           documentCheck.completionPercentage >= 70 ? "secondary" : "destructive"}>
              {documentCheck.completionPercentage}% tayyor
            </Badge>
          </div>
          
          <Progress value={documentCheck.completionPercentage} className="mb-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">
                {documentCheck.validDocuments.length}
              </div>
              <div className="text-sm text-muted-foreground">Tayyor hujjatlar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {documentCheck.expiringDocuments.length}
              </div>
              <div className="text-sm text-muted-foreground">Muddati tugaydi</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">
                {documentCheck.missingDocuments.length}
              </div>
              <div className="text-sm text-muted-foreground">Yetishmaydi</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {documentCheck.requiredDocuments.length}
              </div>
              <div className="text-sm text-muted-foreground">Jami kerak</div>
            </div>
          </div>
        </div>

        {/* Cost and Time Estimates */}
        {(documentCheck.estimatedCompletionTime > 0 || documentCheck.totalEstimatedCost > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
                <div className="text-2xl font-bold">
                  {formatProcessingTime(documentCheck.estimatedCompletionTime)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Tayyorlash vaqti
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Download className="w-8 h-8 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">
                  ${documentCheck.totalEstimatedCost}
                </div>
                <div className="text-sm text-muted-foreground">
                  Taxminiy xarajat
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed Document Status */}
        <Tabs defaultValue="missing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="missing" className="gap-2">
              <FileX className="w-4 h-4" />
              Yetishmaydi ({documentCheck.missingDocuments.length})
            </TabsTrigger>
            <TabsTrigger value="expiring" className="gap-2">
              <Clock className="w-4 h-4" />
              Muddati tugaydi ({documentCheck.expiringDocuments.length})
            </TabsTrigger>
            <TabsTrigger value="valid" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Tayyor ({documentCheck.validDocuments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="missing" className="space-y-3">
            {documentCheck.missingDocuments.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Barcha kerakli hujjatlar mavjud!
                </AlertDescription>
              </Alert>
            ) : (
              documentCheck.missingDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(doc.category)}</span>
                        <div>
                          <h4 className="font-semibold">{doc.displayName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {countries.find(c => c.code === doc.countryCode)?.nameUz || doc.countryCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={doc.isMandatory ? "destructive" : "secondary"}>
                          {doc.isMandatory ? "Majburiy" : "Ixtiyoriy"}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatProcessingTime(doc.processingTimeHours)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className={getStatusColor(doc.priority)}>
                          {doc.priority === 'critical' ? 'Muhim' :
                           doc.priority === 'high' ? 'Yuqori' :
                           doc.priority === 'medium' ? 'O\'rta' : 'Past'} prioritet
                        </span>
                        <span className="text-muted-foreground ml-2">
                          • {formatCurrency(doc.estimatedCost, doc.currency)}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => onUploadRequest(doc.documentType, doc.countryCode)}
                        className="gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Yuklash
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="expiring" className="space-y-3">
            {documentCheck.expiringDocuments.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Muddati tugaydigan hujjatlar yo'q.
                </AlertDescription>
              </Alert>
            ) : (
              documentCheck.expiringDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{doc.documentType?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.documentNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={doc.daysUntilExpiry <= 7 ? "destructive" : "secondary"}>
                          {doc.daysUntilExpiry} kun qoldi
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {doc.expiryDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {doc.issuingAuthority}
                      </span>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Ko'rish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="valid" className="space-y-3">
            {documentCheck.validDocuments.length === 0 ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Hozircha yaroqli hujjatlar yo'q.
                </AlertDescription>
              </Alert>
            ) : (
              documentCheck.validDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {doc.documentType?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.documentNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                          {doc.daysUntilExpiry} kun yaroqli
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {doc.expiryDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {doc.issuingAuthority}
                      </span>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Ko'rish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}