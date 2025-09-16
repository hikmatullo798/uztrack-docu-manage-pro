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
    <div className="flex-1 space-y-6 p-6">
      <Header 
        title="Dashboard" 
        subtitle="Hujjatlar boshqaruv tizimi umumiy ko'rinishi"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Jami Mashinalar"
          value={dashboardStats.totalTrucks}
          icon={Car}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Muddati Tugagan"
          value={dashboardStats.expiredDocuments}
          icon={AlertCircle}
          color="danger"
        />
        
        <StatsCard
          title="Xavfsiz Hujjatlar"
          value={dashboardStats.safeDocuments}
          icon={CheckCircle2}
          color="success"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Hujjatlar Boshqaruvi - Unified Document Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Document Status & Quick Actions */}
        <div className="space-y-6">
          <DocumentStatusChart />
        </div>

        {/* Right Column - Critical Alerts & Expiring Documents */}
        <div>
          <UpcomingExpirations />
        </div>
      </div>
    </div>
  );
}