import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Monitor, 
  Sun, 
  Moon, 
  Bell, 
  Mail, 
  MessageSquare, 
  Shield, 
  User, 
  Database,
  Settings as SettingsIcon,
  Save
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    telegram: false,
    push: true,
    critical: true,
    warning: true,
    daily: false
  });
  
  const [userSettings, setUserSettings] = useState({
    name: "Administrator",
    email: "admin@uztruck.uz",
    phone: "+998901234567",
    telegram: "@admin_uztruck",
    language: "uz",
    timezone: "Asia/Tashkent"
  });

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    toast({
      title: isDark ? "Yorug' rejim yoqildi" : "Qorong'u rejim yoqildi",
      description: "Tema muvaffaqiyatli o'zgartirildi"
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Sozlamalar saqlandi",
      description: "Barcha o'zgarishlar muvaffaqiyatli saqlandi"
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Tizim Sozlamalari
          </h1>
          <p className="text-muted-foreground mt-2">
            Tizim va foydalanuvchi sozlamalarini boshqaring
          </p>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Barcha o'zgarishlarni saqlash
        </Button>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">Ko'rinish</TabsTrigger>
          <TabsTrigger value="notifications">Bildirishnomalar</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Xavfsizlik</TabsTrigger>
          <TabsTrigger value="system">Tizim</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Tema sozlamalari
              </CardTitle>
              <CardDescription>
                Dastur ko'rinishini sozlang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Qorong'u/Yorug' rejim</Label>
                  <p className="text-sm text-muted-foreground">
                    Dastur ranglari temasi
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={handleThemeToggle}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                  <Badge variant={isDark ? "default" : "secondary"}>
                    {isDark ? "Qorong'u" : "Yorug'"}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <div className="w-full h-20 bg-gradient-primary rounded mb-2"></div>
                  <p className="text-sm font-medium">Asosiy ranglar</p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <div className="w-full h-20 bg-gradient-alert rounded mb-2"></div>
                  <p className="text-sm font-medium">Ogohlantirish ranglari</p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <div className="w-full h-20 bg-gradient-status rounded mb-2"></div>
                  <p className="text-sm font-medium">Status ranglari</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Bildirishnoma sozlamalari
              </CardTitle>
              <CardDescription>
                Qanday bildirishnomalarni qabul qilishni sozlang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Bildirishnoma kanallari</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <Label>Email bildirishnomalar</Label>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, email: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <Label>SMS bildirishnomalar</Label>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, sms: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <Label>Telegram bildirishnomalar</Label>
                    </div>
                    <Switch
                      checked={notifications.telegram}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, telegram: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Bildirishnoma turlari</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Kritik ogohlantirishlar</Label>
                    <Switch
                      checked={notifications.critical}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, critical: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Ogohlantirish xabarlari</Label>
                    <Switch
                      checked={notifications.warning}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, warning: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Kunlik hisobotlar</Label>
                    <Switch
                      checked={notifications.daily}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, daily: checked})
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Foydalanuvchi profili
              </CardTitle>
              <CardDescription>
                Shaxsiy ma'lumotlaringizni o'zgartiring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">To'liq ism</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email manzil</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <Input
                    id="phone"
                    value={userSettings.phone}
                    onChange={(e) => setUserSettings({...userSettings, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={userSettings.telegram}
                    onChange={(e) => setUserSettings({...userSettings, telegram: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Til</Label>
                  <Select value={userSettings.language} onValueChange={(value) => setUserSettings({...userSettings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uz">O'zbek</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Vaqt zonasi</Label>
                  <Select value={userSettings.timezone} onValueChange={(value) => setUserSettings({...userSettings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tashkent">Toshkent (UTC+5)</SelectItem>
                      <SelectItem value="Asia/Almaty">Almaty (UTC+6)</SelectItem>
                      <SelectItem value="Europe/Moscow">Moskva (UTC+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Xavfsizlik sozlamalari
              </CardTitle>
              <CardDescription>
                Hisob xavfsizligi va parol sozlamalari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Parolni o'zgartirish
                </Button>
                <Button variant="outline" className="w-full">
                  2-bosqichli autentifikatsiyani yoqish
                </Button>
                <Button variant="outline" className="w-full">
                  Sessiyalar tarixi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Tizim ma'lumotlari
              </CardTitle>
              <CardDescription>
                Tizim holati va texnik ma'lumotlar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Versiya</h4>
                  <p className="text-sm text-muted-foreground">UZTRUCK v2.1.0</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Ma'lumotlar bazasi</h4>
                  <p className="text-sm text-muted-foreground">PostgreSQL 14.2</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Oxirgi backup</h4>
                  <p className="text-sm text-muted-foreground">12.01.2025 09:30</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Server holati</h4>
                  <p className="text-sm text-green-600">Faol</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Backup yaratish
                </Button>
                <Button variant="outline" className="w-full">
                  Tizimni tekshirish
                </Button>
                <Button variant="outline" className="w-full">
                  Log fayllarini yuklab olish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;