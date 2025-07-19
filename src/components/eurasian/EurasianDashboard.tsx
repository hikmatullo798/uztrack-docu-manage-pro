import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  Clock,
  Download,
  Settings,
  RefreshCw,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { trucks, documents } from "@/data/mockData";
import { allDocumentRequirements, eurasianRoutes } from "@/data/eurasianData";

interface DashboardStats {
  totalTrucks: number;
  readyTrucks: number;
  documentsUploaded: number;
  totalDocumentsRequired: number;
  expiringDocuments: number;
  missingDocuments: number;
  averageReadiness: number;
  popularRoutes: Array<{
    route: string;
    count: number;
    readiness: number;
  }>;
  documentsByCountry: Array<{
    country: string;
    required: number;
    uploaded: number;
    missing: number;
  }>;
  expirationCalendar: Array<{
    date: string;
    count: number;
    severity: 'low' | 'medium' | 'high';
  }>;
}

interface EurasianDashboardProps {
  selectedTruckId?: number;
  selectedCountries?: string[];
}

export function EurasianDashboard({ selectedTruckId, selectedCountries }: EurasianDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    generateDashboardStats();
  }, [selectedTruckId, selectedCountries, timeFilter]);

  const generateDashboardStats = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Filter data based on selections
    const filteredTrucks = selectedTruckId ? 
      trucks.filter(t => t.id === selectedTruckId) : trucks;
    
    const filteredDocuments = selectedTruckId ? 
      documents.filter(d => d.truckId === selectedTruckId) : documents;

    const filteredRequirements = selectedCountries?.length ? 
      allDocumentRequirements.filter(req => 
        selectedCountries.includes(req.countryCode) || req.countryCode === 'ALL'
      ) : allDocumentRequirements;

    // Calculate stats
    const totalTrucks = filteredTrucks.length;
    const readyTrucks = filteredTrucks.filter(t => 
      (t.safeDocuments / t.documentsCount) >= 0.8
    ).length;
    
    const documentsUploaded = filteredDocuments.length;
    const totalDocumentsRequired = filteredRequirements.length * totalTrucks;
    
    const expiringDocuments = filteredDocuments.filter(d => 
      d.daysUntilExpiry <= 30 && d.daysUntilExpiry > 0
    ).length;
    
    const missingDocuments = Math.max(0, totalDocumentsRequired - documentsUploaded);
    
    const averageReadiness = totalTrucks > 0 ? 
      Math.round((readyTrucks / totalTrucks) * 100) : 0;

    // Popular routes data
    const popularRoutes = eurasianRoutes.slice(0, 5).map(route => ({
      route: route.name,
      count: Math.floor(Math.random() * 50) + 10,
      readiness: Math.floor(Math.random() * 40) + 60
    }));

    // Documents by country
    const countryGroups = ['RU', 'KZ', 'BY', 'PL', 'DE'];
    const documentsByCountry = countryGroups.map(country => {
      const required = allDocumentRequirements.filter(req => 
        req.countryCode === country || req.countryCode === 'ALL'
      ).length;
      const uploaded = Math.floor(Math.random() * required);
      return {
        country: country === 'RU' ? 'Rossiya' :
                country === 'KZ' ? 'Qozog\'iston' :
                country === 'BY' ? 'Belarus' :
                country === 'PL' ? 'Polsha' : 'Germaniya',
        required,
        uploaded,
        missing: Math.max(0, required - uploaded)
      };
    });

    // Expiration calendar
    const expirationCalendar = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const count = Math.floor(Math.random() * 5);
      return {
        date: date.toISOString().split('T')[0],
        count,
        severity: (count > 3 ? 'high' : count > 1 ? 'medium' : 'low') as 'high' | 'medium' | 'low'
      };
    });

    setStats({
      totalTrucks,
      readyTrucks,
      documentsUploaded,
      totalDocumentsRequired,
      expiringDocuments,
      missingDocuments,
      averageReadiness,
      popularRoutes,
      documentsByCountry,
      expirationCalendar
    });

    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await generateDashboardStats();
    setRefreshing(false);
  };

  const exportData = () => {
    // Mock export functionality
    const data = {
      stats,
      exportDate: new Date().toISOString(),
      filters: { selectedTruckId, selectedCountries, timeFilter }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eurasian-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Boshqaruv paneli
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-20 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#e74c3c'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Yevroosiyo Moduli Dashboard</h1>
          <p className="text-muted-foreground">
            Xalqaro hujjatlar va marshrut tayyorligi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 kun</SelectItem>
              <SelectItem value="30">30 kun</SelectItem>
              <SelectItem value="90">90 kun</SelectItem>
              <SelectItem value="365">1 yil</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={exportData} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Yangilash
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avtomobillar</p>
                <div className="text-2xl font-bold">
                  {stats.readyTrucks}/{stats.totalTrucks}
                </div>
                <p className="text-xs text-success">
                  {stats.averageReadiness}% tayyor
                </p>
              </div>
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hujjatlar</p>
                <div className="text-2xl font-bold">
                  {stats.documentsUploaded}/{stats.totalDocumentsRequired}
                </div>
                <p className="text-xs text-warning">
                  {stats.missingDocuments} yetishmaydi
                </p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Muddati tugaydi</p>
                <div className="text-2xl font-bold text-warning">
                  {stats.expiringDocuments}
                </div>
                <p className="text-xs text-muted-foreground">
                  30 kun ichida
                </p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">O'rtacha tayyor</p>
                <div className="text-2xl font-bold text-success">
                  {stats.averageReadiness}%
                </div>
                <Progress value={stats.averageReadiness} className="mt-2" />
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="routes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="routes">Mashhur yo'nalishlar</TabsTrigger>
          <TabsTrigger value="countries">Davlatlar bo'yicha</TabsTrigger>
          <TabsTrigger value="timeline">Vaqt jadvali</TabsTrigger>
          <TabsTrigger value="analytics">Tahlil</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mashhur yo'nalishlar va tayyorlik darajasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.popularRoutes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="route" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="readiness" fill="#8884d8" name="Tayyorlik %" />
                  <Bar dataKey="count" fill="#82ca9d" name="Ishlatilishlar" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Davlatlar bo'yicha hujjat holati</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.documentsByCountry.map((country, index) => (
                  <div key={country.country} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {country.uploaded}/{country.required}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((country.uploaded / country.required) * 100)}%
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={(country.uploaded / country.required) * 100} 
                      className="h-2"
                    />
                    {country.missing > 0 && (
                      <p className="text-sm text-destructive">
                        {country.missing} ta hujjat yetishmayapti
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hujjat muddatlari taqvimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {stats.expirationCalendar.slice(0, 28).map((day, index) => (
                  <div 
                    key={day.date}
                    className={`
                      aspect-square rounded-lg border text-center p-2 text-xs
                      ${day.severity === 'high' ? 'bg-destructive/20 border-destructive text-destructive' :
                        day.severity === 'medium' ? 'bg-warning/20 border-warning text-warning' :
                        day.count > 0 ? 'bg-muted border-muted-foreground/50' :
                        'bg-background border-muted'}
                    `}
                  >
                    <div className="font-medium">
                      {new Date(day.date).getDate()}
                    </div>
                    {day.count > 0 && (
                      <div className="text-xs">
                        {day.count}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-destructive/20 border border-destructive rounded" />
                  <span>Yuqori xavf</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-warning/20 border border-warning rounded" />
                  <span>O'rta xavf</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-muted border border-muted-foreground/50 rounded" />
                  <span>Past xavf</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Hujjat kategoriyalari</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Yuklangan', value: stats.documentsUploaded },
                        { name: 'Yetishmaydi', value: stats.missingDocuments },
                        { name: 'Muddati tugaydi', value: stats.expiringDocuments }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {[0, 1, 2].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tez harakatlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <AlertTriangle className="w-4 h-4" />
                  Muddati tugayotgan hujjatlarni ko'rish
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <FileText className="w-4 h-4" />
                  Yetishmayotgan hujjatlarni yuklash
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <MapPin className="w-4 h-4" />
                  Yangi marshrut rejalashtirish
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Download className="w-4 h-4" />
                  Hisobot eksport qilish
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Settings className="w-4 h-4" />
                  Sozlamalarni o'zgartirish
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}