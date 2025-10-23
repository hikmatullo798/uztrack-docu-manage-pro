import { Bell, Search, UserCircle, AlertOctagon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 bg-card border-b-2 border-border">
      {/* Title Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Qidirish..."
            className="pl-10 w-80 border-2 focus-visible:ring-0 focus-visible:border-primary"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative border-2 hover:border-primary">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-destructive-foreground">6</span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96 bg-popover border-2 p-0">
            <DropdownMenuLabel className="text-foreground font-bold text-base px-4 py-3 border-b-2">
              Eslatmalar
            </DropdownMenuLabel>
            
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="flex items-start space-x-3 p-4 hover:bg-accent cursor-pointer border-b">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertOctagon className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">CMR guvohnomasi tugaydi</p>
                  <p className="text-xs text-muted-foreground mt-1">01A123BC - 3 kun qoldi</p>
                  <p className="text-xs text-muted-foreground mt-1">2 soat oldin</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-start space-x-3 p-4 hover:bg-accent cursor-pointer border-b">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertOctagon className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Ro'yxat guvohnomasi</p>
                  <p className="text-xs text-muted-foreground mt-1">01B456DE - 25 kun qoldi</p>
                  <p className="text-xs text-muted-foreground mt-1">5 soat oldin</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-start space-x-3 p-4 hover:bg-accent cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Yangi hujjat yuklandi</p>
                  <p className="text-xs text-muted-foreground mt-1">TIR Carnet - 01C789FG</p>
                  <p className="text-xs text-muted-foreground mt-1">1 kun oldin</p>
                </div>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-primary font-semibold p-3 hover:bg-accent cursor-pointer">
              Barchasini ko'rish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border-2 hover:border-primary">
              <UserCircle className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover border-2 p-0">
            <DropdownMenuLabel className="text-foreground font-bold px-4 py-3 border-b-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold">Admin User</p>
                  <p className="text-xs text-muted-foreground font-normal">admin@uztruck.uz</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="px-4 py-2 hover:bg-accent cursor-pointer">
              Profil sozlamalari
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-accent cursor-pointer">
              Bildirishnomalar
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-accent cursor-pointer">
              Yordam
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive px-4 py-2 hover:bg-destructive/10 cursor-pointer font-semibold">
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}