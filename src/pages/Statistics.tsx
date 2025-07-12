import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  FileText,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

const Statistics = () => {
  const [period, setPeriod] = useState('month');
  
  // Mock data for charts
  const documentStatusData = [
    { name: 'Yanvar', expired: 5, warning: 12, safe: 78 },
    { name: 'Fevral', expired: 3, warning: 8, safe: 82 },
    { name: 'Mart', expired: 7, warning: 15, safe: 75 },
    { name: 'Aprel', expired: 2, warning: 10, safe: 85 },
    { name: 'May', expired: 4, warning: 13, safe: 80 },
    { name: 'Iyun', expired: 6, warning: 9, safe: 83 }
  ];

  const truckEfficiencyData = [
    { name: 'AA 777 AA', efficiency: 95, documents: 12, expired: 0 },
    { name: 'BB 888 BB', efficiency: 87, documents: 15, expired: 2 },
    { name: 'CC 999 CC', efficiency: 92, documents: 11, expired: 1 },
    { name: 'DD 111 DD', efficiency: 78, documents: 18, expired: 4 },
    { name: 'EE 222 EE', efficiency: 88, documents: 14, expired: 2 }
  ];

  const documentTypeDistribution = [
    { name: 'Texnik passport', value: 35, count: 45 },
    { name: 'Sug\'urta', value: 25, count: 32 },
    { name: 'Texnik ko\'rik', value: 20, count: 26 },
    { name: 'Xalqaro hujjatlar', value: 15, count: 19 },
    { name: 'Boshqalar', value: 5, count: 6 }
  ];

  const costAnalysisData = [
    { month: 'Yanvar', renewal: 1500, penalty: 200, total: 1700 },
    { month: 'Fevral', renewal: 1200, penalty: 150, total: 1350 },
    { month: 'Mart', renewal: 1800, penalty: 300, total: 2100 },
    { month: 'Aprel', renewal: 1000, penalty: 100, total: 1100 },
    { month: 'May', renewal: 1600, penalty: 250, total: 1850 },
    { month: 'Iyun', renewal: 1400, penalty: 180, total: 1580 }
  ];

  const COLORS = ['#0EA5E9', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'];

  const exportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Statistika va Tahlillar
          </h1>
          <p className="text-muted-foreground mt-2">
            Hujjatlar va yuk mashinalari bo'yicha batafsil tahlil
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Bu hafta</SelectItem>
              <SelectItem value="month">Bu oy</SelectItem>
              <SelectItem value="quarter">Bu chorak</SelectItem>
              <SelectItem value="year">Bu yil</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami hujjatlar</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faol mashinalar</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -2% o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Muddati tugagan</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">6</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -25% o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Samaradorlik</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Umumiy ko'rinish</TabsTrigger>
          <TabsTrigger value="documents">Hujjatlar</TabsTrigger>
          <TabsTrigger value="trucks">Mashinalar</TabsTrigger>
          <TabsTrigger value="costs">Xarajatlar</TabsTrigger>
          <TabsTrigger value="trends">Tendensiyalar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hujjatlar holati (oylar bo'yicha)</CardTitle>
                <CardDescription>
                  Hujjatlarning amal qilish holati dinamikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={documentStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="safe" stackId="1" stroke="#10B981" fill="#10B981" />
                    <Area type="monotone" dataKey="warning" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                    <Area type="monotone" dataKey="expired" stackId="1" stroke="#EF4444" fill="#EF4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hujjat turlari taqsimoti</CardTitle>
                <CardDescription>
                  Hujjat turlari bo'yicha statistika
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={documentTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {documentTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hujjatlar batafsil tahlili</CardTitle>
              <CardDescription>
                Har bir hujjat turi bo'yicha batafsil ma'lumot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentTypeDistribution.map((doc, index) => (
                  <div key={doc.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.count} ta hujjat
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{doc.value}%</div>
                      <Progress value={doc.value} className="w-20 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trucks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mashinalar samaradorligi</CardTitle>
              <CardDescription>
                Har bir mashina bo'yicha hujjatlar holati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {truckEfficiencyData.map((truck) => (
                  <div key={truck.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{truck.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {truck.documents} ta hujjat
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Samaradorlik: {truck.efficiency}%
                        </div>
                        <Progress value={truck.efficiency} className="w-24 mt-1" />
                      </div>
                      <Badge variant={truck.expired === 0 ? "default" : "destructive"}>
                        {truck.expired === 0 ? "Yaxshi" : `${truck.expired} muddati tugagan`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Xarajatlar tahlili</CardTitle>
              <CardDescription>
                Hujjatlar yangilash va jarima xarajatlari
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Bar dataKey="renewal" fill="#10B981" name="Yangilash xarajatlari" />
                  <Bar dataKey="penalty" fill="#EF4444" name="Jarima xarajatlari" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami xarajatlar</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$9,680</div>
                <p className="text-xs text-muted-foreground">6 oy davomida</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yangilash xarajatlari</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$8,500</div>
                <p className="text-xs text-muted-foreground">87.8% umumiy xarajatlardan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jarima xarajatlari</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">$1,180</div>
                <p className="text-xs text-muted-foreground">12.2% umumiy xarajatlardan</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendensiyalar va prognoz</CardTitle>
              <CardDescription>
                Kelajakdagi muddatlar va prognozlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={documentStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="safe" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="warning" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="expired" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kelayotgan muddatlar</CardTitle>
                <CardDescription>Yaqin kunlarda tugaydigan hujjatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { doc: "Texnik ko'rik", truck: "AA 777 AA", days: 5, level: "critical" },
                    { doc: "Sug'urta", truck: "BB 888 BB", days: 12, level: "warning" },
                    { doc: "TIR Carnet", truck: "CC 999 CC", days: 18, level: "warning" },
                    { doc: "Texnik passport", truck: "DD 111 DD", days: 25, level: "safe" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.doc}</h4>
                        <p className="text-sm text-muted-foreground">{item.truck}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.days} kun</span>
                        <Badge 
                          variant={
                            item.level === "critical" ? "destructive" : 
                            item.level === "warning" ? "secondary" : "default"
                          }
                        >
                          {item.level === "critical" ? "Kritik" : 
                           item.level === "warning" ? "Ogohlantirish" : "Xavfsiz"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tavsiyalar</CardTitle>
                <CardDescription>Tizim tavsiylari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900">Hujjatlarni yangilash</h4>
                    <p className="text-sm text-blue-700">
                      6 ta hujjat keyingi 30 kun ichida yangilanishi kerak
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900">Samaradorlik yaxshi</h4>
                    <p className="text-sm text-green-700">
                      O'rtacha samaradorlik 87% - bu yaxshi ko'rsatkich
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900">Xarajatlarni kamaytirish</h4>
                    <p className="text-sm text-yellow-700">
                      Vaqtida yangilash jarima xarajatlarini 80% ga kamaytiradi
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;