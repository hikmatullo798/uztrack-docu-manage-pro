import {
  Car,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Package
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DocumentStatusChart } from "@/components/dashboard/DocumentStatusChart";
import { UpcomingExpirations } from "@/components/dashboard/UpcomingExpirations";
import { dashboardStats } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6 max-h-screen overflow-auto bg-background">
      <Header 
        title="Dashboard" 
        subtitle="Hujjatlar boshqaruv tizimi umumiy ko'rinishi"
      />
      
      {/* Stats Cards - Modern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jami Mashinalar
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalTrucks}</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-muted-foreground ml-1">o'tgan oyga nisbatan</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-destructive/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Muddati Tugagan
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{dashboardStats.expiredDocuments}</div>
            <div className="flex items-center mt-2 text-sm">
              <Badge variant="destructive" className="font-medium">Zudlik bilan</Badge>
              <span className="text-muted-foreground ml-2">Yangilash kerak</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-green-500/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Xavfsiz Hujjatlar
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{dashboardStats.safeDocuments}</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-muted-foreground ml-1">yaxshi holat</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jami Hujjatlar
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalDocuments}</div>
            <div className="mt-2">
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">75% faol hujjatlar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentStatusChart />
        <UpcomingExpirations />
      </div>
    </div>
  );
}