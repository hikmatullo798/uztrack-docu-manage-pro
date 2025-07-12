import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Send, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Plus,
  Trash2
} from "lucide-react";

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  message: string;
  type: 'email' | 'sms' | 'telegram';
  isActive: boolean;
}

interface NotificationRule {
  id: string;
  name: string;
  trigger: string;
  channels: string[];
  recipients: string[];
  isActive: boolean;
}

const Notifications = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: '1',
      name: 'Hujjat muddati tugaydi',
      subject: 'Hujjat muddati tugaydi - {document_name}',
      message: 'Hurmatli foydalanuvchi, {truck_plate} raqamli mashina uchun {document_name} hujjatining muddati {days} kundan keyin tugaydi.',
      type: 'email',
      isActive: true
    },
    {
      id: '2',
      name: 'Kritik ogohlantirish',
      subject: 'KRITIK: Hujjat muddati tugagan',
      message: 'DIQQAT! {truck_plate} - {document_name} hujjati muddati tugagan. Zudlik bilan yangilang!',
      type: 'sms',
      isActive: true
    }
  ]);

  const [rules, setRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: '30 kun oldin eslatma',
      trigger: 'document_expires_in_30_days',
      channels: ['email', 'telegram'],
      recipients: ['admin@uztruck.uz'],
      isActive: true
    },
    {
      id: '2',
      name: '7 kun oldin kritik eslatma',
      trigger: 'document_expires_in_7_days',
      channels: ['email', 'sms', 'telegram'],
      recipients: ['admin@uztruck.uz', '+998901234567'],
      isActive: true
    }
  ]);

  const [testRecipient, setTestRecipient] = useState('');
  const [testChannel, setTestChannel] = useState<'email' | 'sms' | 'telegram'>('email');

  const sendTestNotification = () => {
    if (!testRecipient) {
      toast({
        title: "Xato",
        description: "Qabul qiluvchini kiriting",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Test bildirishnoma yuborildi",
      description: `${testChannel} orqali ${testRecipient} ga yuborildi`
    });
  };

  const toggleTemplate = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8 text-primary" />
            Bildirishnomalar Sozlamalari
          </h1>
          <p className="text-muted-foreground mt-2">
            Avtomatik bildirishnomalar va eslatmalarni sozlang
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yangi qoida yaratish
        </Button>
      </div>

      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Qoidalar</TabsTrigger>
          <TabsTrigger value="templates">Shablonlar</TabsTrigger>
          <TabsTrigger value="test">Test yuborish</TabsTrigger>
          <TabsTrigger value="history">Tarix</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Bildirishnoma qoidalari
              </CardTitle>
              <CardDescription>
                Qachon va kimga bildirishnoma yuborilishini belgilang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Faol" : "Nofaol"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Trigger: {rule.trigger}
                      </p>
                      <div className="flex gap-2">
                        {rule.channels.map(channel => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <Button variant="outline" size="sm">
                        Tahrirlash
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Xabar shablonlari
              </CardTitle>
              <CardDescription>
                Yuboriladi xabarlar uchun shablonlarni boshqaring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant={template.isActive ? "default" : "secondary"}>
                          {template.isActive ? "Faol" : "Nofaol"}
                        </Badge>
                        <Badge variant="outline">
                          {template.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={template.isActive}
                          onCheckedChange={() => toggleTemplate(template.id)}
                        />
                        <Button variant="outline" size="sm">
                          Tahrirlash
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Mavzu:</Label>
                        <p className="text-sm">{template.subject}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Xabar:</Label>
                        <p className="text-sm">{template.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Test bildirishnoma yuborish
              </CardTitle>
              <CardDescription>
                Bildirishnoma tizimini test qiling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Qabul qiluvchi</Label>
                  <Input
                    id="recipient"
                    placeholder="email@example.com yoki +998901234567"
                    value={testRecipient}
                    onChange={(e) => setTestRecipient(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kanal</Label>
                  <Select value={testChannel} onValueChange={(value: 'email' | 'sms' | 'telegram') => setTestChannel(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={sendTestNotification} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Test bildirishnoma yuborish
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Bildirishnomalar tarixi
              </CardTitle>
              <CardDescription>
                Yuborilgan bildirishnomalar tarixi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: '1',
                    type: 'email',
                    recipient: 'admin@uztruck.uz',
                    subject: 'Hujjat muddati tugaydi - Texnik ko\'rik',
                    status: 'delivered',
                    time: '2025-01-12 14:30'
                  },
                  {
                    id: '2',
                    type: 'sms',
                    recipient: '+998901234567',
                    subject: 'KRITIK: Sug\'urta muddati tugagan',
                    status: 'failed',
                    time: '2025-01-12 14:25'
                  },
                  {
                    id: '3',
                    type: 'telegram',
                    recipient: '@admin_uztruck',
                    subject: 'Haftalik hisobot',
                    status: 'delivered',
                    time: '2025-01-12 09:00'
                  }
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{notification.type.toUpperCase()}</Badge>
                        <span className="text-sm font-medium">{notification.subject}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.recipient} • {notification.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.status === 'delivered' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={notification.status === 'delivered' ? "default" : "destructive"}>
                        {notification.status === 'delivered' ? 'Yuborildi' : 'Xato'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;