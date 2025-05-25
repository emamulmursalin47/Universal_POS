import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Header */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your platform configuration and preferences
          </p>
        </div>

        {/* Content */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="general" className="space-y-6">
              
              {/* Tab Navigation */}
              <TabsList className="grid w-full grid-cols-4 h-10 sm:h-11">
                <TabsTrigger value="general" className="text-xs sm:text-sm font-medium">
                  General
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm font-medium">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-xs sm:text-sm font-medium">
                  Alerts
                </TabsTrigger>
                <TabsTrigger value="api" className="text-xs sm:text-sm font-medium">
                  API
                </TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">General Settings</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Configure your platform's basic information and preferences
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="platform-name" className="text-sm font-medium">
                        Platform Name
                      </Label>
                      <Input 
                        id="platform-name"
                        defaultValue="Multi-Role POS System" 
                        className="h-10"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="support-email" className="text-sm font-medium">
                        Support Email
                      </Label>
                      <Input 
                        id="support-email"
                        type="email" 
                        defaultValue="support@example.com" 
                        className="h-10"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="currency" className="text-sm font-medium">
                        Default Currency
                      </Label>
                      <Input 
                        id="currency"
                        defaultValue="USD" 
                        className="h-10"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-t">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Maintenance Mode</Label>
                        <p className="text-xs text-muted-foreground">
                          Temporarily disable platform access
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Manage authentication and security preferences
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">
                          Require 2FA for admin accounts
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Session Timeout</Label>
                        <p className="text-xs text-muted-foreground">
                          Auto-logout inactive users
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Control system alerts and notifications
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive updates via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">System Alerts</Label>
                        <p className="text-xs text-muted-foreground">
                          Show critical notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              {/* API Tab */}
              <TabsContent value="api" className="space-y-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">API Settings</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Manage API access and authentication
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="api-key" className="text-sm font-medium">
                        API Key
                      </Label>
                      <div className="flex gap-2">
                        <Input 
                          id="api-key"
                          defaultValue="sk_live_..." 
                          type="password" 
                          className="h-10 flex-1"
                        />
                        <Button variant="outline" className="shrink-0">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-t">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">API Access</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable external integrations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}