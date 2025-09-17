import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  TrendingUp, 
  Users,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [recentMood] = useState("calm");
  const [weeklyProgress] = useState(75);

  const quickActions = [
    {
      title: "Start AI Chat",
      description: "Talk to our wellness AI companion",
      icon: Brain,
      href: "/chat",
      color: "primary"
    },
    {
      title: "Book Counseling",
      description: "Schedule a session with a counselor",
      icon: Calendar,
      href: "/booking",
      color: "secondary"
    },
    {
      title: "Join Community",
      description: "Connect with fellow students",
      icon: MessageCircle,
      href: "/forum",
      color: "accent"
    },
    {
      title: "Explore Resources",
      description: "Videos, guides, and wellness tools",
      icon: BookOpen,
      href: "/resources",
      color: "success"
    }
  ];

  const moodIcons = {
    happy: Smile,
    calm: Meh,
    sad: Frown
  };

  const MoodIcon = moodIcons[recentMood as keyof typeof moodIcons] || Meh;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="wellness-gradient rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to MindEase
        </h1>
        <p className="text-muted-foreground text-lg">
          Your campus mental wellness companion. How are you feeling today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
            <MoodIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{recentMood}</div>
            <p className="text-xs text-muted-foreground">
              Last updated 2 hours ago
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyProgress}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Great progress this week!
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Active students this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <Link to={action.href}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-3 rounded-full bg-${action.color}/10 w-fit`}>
                    <action.icon className={`h-6 w-6 text-${action.color}`} />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Wellness chat session</p>
                <p className="text-sm text-muted-foreground">Discussed anxiety management</p>
              </div>
            </div>
            <Badge variant="secondary">2 hours ago</Badge>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-full">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="font-medium">Mood check-in completed</p>
                <p className="text-sm text-muted-foreground">Feeling calm and focused</p>
              </div>
            </div>
            <Badge variant="secondary">1 day ago</Badge>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-full">
                <MessageCircle className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="font-medium">Forum post liked</p>
                <p className="text-sm text-muted-foreground">"Study tips for finals week"</p>
              </div>
            </div>
            <Badge variant="secondary">2 days ago</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Tip of the Day */}
      <Card className="primary-gradient text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5" />
            Wellness Tip of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            "Take a few minutes today to practice deep breathing. Inhale for 4 counts, 
            hold for 4, and exhale for 6. This simple technique can help reduce stress and anxiety."
          </p>
          <Button variant="secondary" className="mt-4" asChild>
            <Link to="/resources">
              Learn More Techniques
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}