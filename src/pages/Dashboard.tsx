import {
  CloudUpload,
  Car,
  Timer,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DocumentStatusChart } from "@/components/dashboard/DocumentStatusChart";
import { UpcomingExpirations } from "@/components/dashboard/UpcomingExpirations";
import { dashboardStats } from "@/data/mockData";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 max-h-screen overflow-hidden">
      <Header 
        title="Dashboard" 
        subtitle="Hujjatlar boshqaruv tizimi umumiy ko'rinishi"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard
          title="Jami Mashinalar"
          value={dashboardStats.totalTrucks}
          icon={Car}
          color="primary"
          trend={{ value: 12, isPositive: true }}
          className="h-24"
        />
        
        <StatsCard
          title="Muddati Tugagan"
          value={dashboardStats.expiredDocuments}
          icon={AlertCircle}
          color="danger"
          className="h-24"
        />
        
        <StatsCard
          title="Xavfsiz Hujjatlar"
          value={dashboardStats.safeDocuments}
          icon={CheckCircle2}
          color="success"
          trend={{ value: 8, isPositive: true }}
          className="h-24"
        />
      </div>

      {/* Hujjatlar Boshqaruvi - Unified Document Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left Column - Document Status Chart */}
        <div className="min-h-0">
          <DocumentStatusChart />
        </div>

        {/* Right Column - Upcoming Expirations */}
        <div className="min-h-0">
          <UpcomingExpirations />
        </div>
      </div>
    </div>
  );
}