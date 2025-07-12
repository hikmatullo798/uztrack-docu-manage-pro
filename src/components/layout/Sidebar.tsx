import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  AlertTriangle,
  BarChart3,
  Truck,
  Globe,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  color?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home
  },
  {
    title: "Hujjatlar Nazorati",
    href: "/documents",
    icon: FileText,
    badge: 6
  },
  {
    title: "Kritik Eslatmalar",
    href: "/alerts",
    icon: AlertTriangle,
    badge: 3,
    color: "bg-red-600"
  },
  {
    title: "Hujjatlar Statistikasi",
    href: "/statistics",
    icon: BarChart3
  },
  {
    title: "Mashinalar",
    href: "/trucks",
    icon: Truck
  },
  {
    title: "Yevroosiyo Moduli",
    href: "/eurasian",
    icon: Globe
  },
  {
    title: "Eslatmalar Sozlamalari",
    href: "/notifications",
    icon: Bell
  },
  {
    title: "Tizim Sozlamalari",
    href: "/settings",
    icon: Settings
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    return path !== "/" && location.pathname.startsWith(path);
  };

  return (
    <div className={cn(
      "relative flex flex-col bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">UZTRUCK</h1>
              <p className="text-xs text-muted-foreground">Hujjatlar Boshqaruvi</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                active && "bg-primary text-primary-foreground shadow-sm",
                collapsed && "justify-center"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "text-primary-foreground")} />
              {!collapsed && (
                <>
                  <span className="font-medium flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant={active ? "secondary" : "default"}
                      className={cn(
                        "text-xs",
                        item.color || "bg-red-600",
                        active && "bg-primary-foreground text-primary"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed ? (
          <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@uztruck.uz</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}