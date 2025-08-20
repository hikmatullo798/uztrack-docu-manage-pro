import {
  FileText,
  Truck,
  Clock,
  CheckCircle,
  XCircle
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
          icon={Truck}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Muddati Tugagan"
          value={dashboardStats.expiredDocuments}
          icon={XCircle}
          color="danger"
        />
        
        <StatsCard
          title="Xavfsiz Hujjatlar"
          value={dashboardStats.safeDocuments}
          icon={CheckCircle}
          color="success"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Hujjatlar Boshqaruvi - Unified Document Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Document Status & Quick Actions */}
        <div className="space-y-6">
          <DocumentStatusChart />
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Tezkor Harakatlar</h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => window.location.href = '/documents/add'}
                className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg text-sm transition-colors text-left flex items-center space-x-3"
              >
                <FileText className="w-4 h-4" />
                <span>Yangi hujjat yuklash</span>
              </button>
              <button 
                onClick={() => window.location.href = '/trucks/add'}
                className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg text-sm transition-colors text-left flex items-center space-x-3"
              >
                <Truck className="w-4 h-4" />
                <span>Mashina qo'shish</span>
              </button>
              <button 
                onClick={() => window.location.href = '/eurasian'}
                className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg text-sm transition-colors text-left flex items-center space-x-3"
              >
                <Clock className="w-4 h-4" />
                <span>Yo'l rejasi tuzish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Critical Alerts & Expiring Documents */}
        <div>
          <UpcomingExpirations />
        </div>
      </div>
    </div>
  );
}