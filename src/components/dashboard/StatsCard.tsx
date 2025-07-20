import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "warning" | "danger" | "success";
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = "primary",
  className 
}: StatsCardProps) {
  const colorClasses = {
    primary: "from-primary to-primary/80",
    warning: "from-yellow-500 to-yellow-600",
    danger: "from-red-500 to-red-600",
    success: "from-green-500 to-green-600"
  };

  const iconBgClasses = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-yellow-500/10 text-yellow-600",
    danger: "bg-red-500/10 text-red-600",
    success: "bg-green-500/10 text-green-600"
  };

  return (
    <Card className={cn("relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", colorClasses[color])} />
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                iconBgClasses[color]
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-3xl font-bold block">{value}</span>
              {trend && (
                <div className="flex items-center space-x-1">
                  <span className={cn(
                    "text-sm font-semibold px-2 py-1 rounded-full",
                    trend.isPositive 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  )}>
                    {trend.isPositive ? "↗" : "↘"} {trend.value}%
                  </span>
                  <span className="text-xs text-muted-foreground">dan oldingi oy</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.min(100, (value / 100) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className={cn("h-1.5 rounded-full bg-gradient-to-r transition-all duration-500", colorClasses[color])}
              style={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}