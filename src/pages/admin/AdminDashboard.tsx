import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MessageSquare, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active This Week", 
      value: "856",
      icon: BarChart3,
      change: "+5%",
      trend: "up"
    },
    {
      title: "Pending Posts",
      value: "23",
      icon: MessageSquare,
      change: "+3",
      trend: "neutral"
    },
    {
      title: "Reports",
      value: "7",
      icon: AlertTriangle,
      change: "-2",
      trend: "down"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage the MindEase platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                <div className="text-sm">New user registration</div>
                <div className="text-xs text-muted-foreground ml-auto">2m ago</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                <div className="text-sm">Forum post moderated</div>
                <div className="text-xs text-muted-foreground ml-auto">5m ago</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                <div className="text-sm">Counseling session booked</div>
                <div className="text-xs text-muted-foreground ml-auto">12m ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Status</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Response</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">~200ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}