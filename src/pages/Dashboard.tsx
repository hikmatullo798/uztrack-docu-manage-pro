import {
  AlertTriangle,
  FileText,
  Truck,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DocumentStatusChart } from "@/components/dashboard/DocumentStatusChart";
import { CriticalAlerts } from "@/components/dashboard/CriticalAlerts";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Jami Mashinalar"
          value={dashboardStats.totalTrucks}
          icon={Truck}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Kritik Eslatmalar"
          value={dashboardStats.criticalAlerts}
          icon={AlertTriangle}
          color="danger"
          trend={{ value: 5, isPositive: false }}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Status Chart */}
        <DocumentStatusChart />
        
        {/* Critical Alerts */}
        <CriticalAlerts />
        
        {/* Quick Actions Card */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-primary to-primary-glow rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tezkor Harakatlar</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Eng muhim vazifalarni bajaring
                  </p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => window.location.href = '/documents/add'}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors w-full text-left"
                    >
                      📋 Yangi hujjat yuklash
                    </button>
                    <button 
                      onClick={() => window.location.href = '/trucks/add'}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors w-full text-left"
                    >
                      🚛 Mashina qo'shish
                    </button>
                    <button 
                      onClick={() => window.location.href = '/eurasian'}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors w-full text-left"
                    >
                      🌍 Yo'l rejasi tuzish
                    </button>
                  </div>
                </div>
                <FileText className="w-12 h-12 opacity-50" />
              </div>
            </div>
            
            {/* System Status */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Tizim Holati</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monitoring</span>
                  <span className="text-green-600 font-medium">Ishlaydi</span>
                </div>
                <div className="flex justify-between">
                  <span>Eslatmalar</span>
                  <span className="text-green-600 font-medium">Faol</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup</span>
                  <span className="text-green-600 font-medium">Oxirgi: Bugun</span>
                </div>
                <div className="flex justify-between">
                  <span>Foydalanuvchilar</span>
                  <span className="text-blue-600 font-medium">3 onlayn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Expirations */}
      <div className="grid grid-cols-1">
        <UpcomingExpirations />
      </div>
    </div>
  );
}