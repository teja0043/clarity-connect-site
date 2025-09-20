import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Shield, Bell, Database } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system">
            <Database className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="MindEase" />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea 
                  id="siteDescription" 
                  defaultValue="Your Campus Mental Wellness Hub"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="maintenance" />
                <Label htmlFor="maintenance">Maintenance Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="registrations" defaultChecked />
                <Label htmlFor="registrations">Allow New Registrations</Label>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="2fa" />
                  <Label htmlFor="2fa">Require Two-Factor Authentication</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="sessionTimeout" defaultChecked />
                  <Label htmlFor="sessionTimeout">Auto Session Timeout</Label>
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="sessionLength">Session Length (minutes)</Label>
                  <Input id="sessionLength" type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="autoModeration" defaultChecked />
                  <Label htmlFor="autoModeration">Auto-Moderation</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="profanityFilter" defaultChecked />
                  <Label htmlFor="profanityFilter">Profanity Filter</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Admin Notifications</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="newUsers" defaultChecked />
                    <Label htmlFor="newUsers">New User Registrations</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="reportedContent" defaultChecked />
                    <Label htmlFor="reportedContent">Reported Content</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="systemAlerts" defaultChecked />
                    <Label htmlFor="systemAlerts">System Alerts</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Email Settings</h4>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input id="adminEmail" type="email" defaultValue="admin@mindease.edu" />
                </div>
              </div>
              
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Version</Label>
                    <p className="text-sm text-muted-foreground">v1.0.0</p>
                  </div>
                  <div>
                    <Label>Database Status</Label>
                    <p className="text-sm text-green-600">Connected</p>
                  </div>
                  <div>
                    <Label>Server Status</Label>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                  <div>
                    <Label>Last Backup</Label>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Run Backup</Button>
                  <Button variant="outline">Export Data</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                  <Button variant="destructive">Reset System</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}