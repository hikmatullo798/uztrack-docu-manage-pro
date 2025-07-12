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
    primary: "bg-primary text-primary-foreground",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white"
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{value}</span>
              {trend && (
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
          </div>
          
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg",
            colorClasses[color]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        {/* Animated background */}
        <div className={cn(
          "absolute inset-0 opacity-5 animate-pulse",
          colorClasses[color].split(" ")[0]
        )} />
      </CardContent>
    </Card>
  );
}