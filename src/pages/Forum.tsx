import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MessageCircle, Heart, Search, Plus, Clock, TrendingUp } from "lucide-react";

const forumCategories = [
  { id: "stress", name: "Stress", color: "bg-red-100 text-red-800", count: 24 },
  { id: "exams", name: "Exams", color: "bg-yellow-100 text-yellow-800", count: 18 },
  { id: "sleep", name: "Sleep", color: "bg-blue-100 text-blue-800", count: 15 },
  { id: "social", name: "Social Anxiety", color: "bg-purple-100 text-purple-800", count: 21 },
  { id: "burnout", name: "Burnout", color: "bg-orange-100 text-orange-800", count: 12 },
  { id: "positivity", name: "Positivity", color: "bg-green-100 text-green-800", count: 30 }
];

const samplePosts = [
  {
    id: "1",
    title: "Study tips for finals week - what works for you?",
    content: "Finals are approaching and I'm feeling overwhelmed. What study techniques help you stay calm and focused?",
    author: "Anonymous",
    category: "exams",
    likes: 15,
    replies: 8,
    timestamp: "2 hours ago",
    isAnonymous: true
  },
  {
    id: "2", 
    title: "Celebrating small wins today!",
    content: "Got out of bed early, had a healthy breakfast, and finished one assignment. Sometimes it's the little things that matter most.",
    author: "Sarah M.",
    category: "positivity", 
    likes: 32,
    replies: 12,
    timestamp: "4 hours ago",
    isAnonymous: false
  }
];

export default function Forum() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Community Forum</h1>
        <p className="text-muted-foreground">Connect, share experiences, and support each other</p>
      </div>

      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {forumCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Search and New Post */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowNewPost(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {samplePosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{post.isAnonymous ? "A" : post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    <Badge className={forumCategories.find(c => c.id === post.category)?.color}>
                      {forumCategories.find(c => c.id === post.category)?.name}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}