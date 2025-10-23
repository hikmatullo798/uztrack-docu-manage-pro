import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Car,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Package,
  BarChart3,
  Settings,
  Bell
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
    icon: LayoutDashboard
  },
  {
    title: "Hujjatlar",
    href: "/documents",
    icon: FolderOpen,
    badge: 6
  },
  {
    title: "Mashinalar",
    href: "/trucks",
    icon: Car
  },
  {
    title: "Statistika",
    href: "/statistics",
    icon: BarChart3
  },
  {
    title: "Eslatmalar",
    href: "/notifications",
    icon: Bell,
    badge: 3
  },
  {
    title: "Sozlamalar",
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
      "relative flex flex-col bg-card border-r-2 border-border transition-all duration-300",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Header - Modern Logo */}
      <div className="flex items-center justify-between p-6 border-b-2 border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg border-2 border-primary">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground tracking-tight">UZTRUCK</h1>
              <p className="text-xs text-muted-foreground font-medium">Boshqaruv Tizimi</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg border-2 border-primary mx-auto">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-accent transition-colors border-2 border-transparent hover:border-border"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation - Modern Style */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group border-2",
                "hover:bg-accent/50 hover:border-accent",
                active 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "border-transparent",
                collapsed && "justify-center px-2"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                active 
                  ? "bg-primary-foreground/20" 
                  : "bg-transparent group-hover:bg-accent"
              )}>
                <Icon className={cn(
                  "w-5 h-5", 
                  active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
              </div>
              {!collapsed && (
                <>
                  <span className={cn(
                    "font-medium flex-1 text-sm",
                    active ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {item.title}
                  </span>
                  {item.badge && (
                    <Badge 
                      className={cn(
                        "text-xs font-bold px-2",
                        active 
                          ? "bg-primary-foreground text-primary" 
                          : "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-destructive-foreground">{item.badge}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer - User Profile */}
      <div className="p-4 border-t-2 border-border">
        {!collapsed ? (
          <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full border-2 border-primary-foreground/20">
              <UserCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-muted-foreground font-medium">admin@uztruck.uz</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-primary-foreground/20 cursor-pointer hover:scale-110 transition-transform">
              <UserCircle className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}