import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

export default function ContentModeration() {
  const pendingPosts = [
    {
      id: 1,
      title: "Struggling with exam anxiety",
      content: "I've been having severe anxiety attacks before exams. Has anyone found effective coping strategies?",
      author: "Anonymous User",
      timestamp: "2 hours ago",
      reports: 0,
      category: "Anxiety"
    },
    {
      id: 2,
      title: "Campus counseling experience",
      content: "Just wanted to share my positive experience with the campus counseling center...",
      author: "Student123",
      timestamp: "5 hours ago", 
      reports: 0,
      category: "General"
    },
    {
      id: 3,
      title: "Depression support group",
      content: "Looking for others who might be interested in forming a depression support group...",
      author: "HelpSeeker",
      timestamp: "1 day ago",
      reports: 1,
      category: "Depression"
    }
  ];

  const reportedPosts = [
    {
      id: 4,
      title: "Inappropriate content example",
      content: "This post contains inappropriate content that needs review...",
      author: "ReportedUser",
      timestamp: "3 hours ago",
      reports: 3,
      category: "General",
      reason: "Inappropriate content"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Content Moderation</h1>
        <p className="text-muted-foreground mt-2">
          Review and moderate forum posts and user content
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            <Clock className="w-4 h-4 mr-2" />
            Pending ({pendingPosts.length})
          </TabsTrigger>
          <TabsTrigger value="reported">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Reported ({reportedPosts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{post.title}</h3>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>{post.timestamp}</span>
                          {post.reports > 0 && (
                            <span className="text-orange-600">{post.reports} reports</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        Request Changes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reported">
          <Card>
            <CardHeader>
              <CardTitle>Reported Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 space-y-3 border-red-200 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{post.title}</h3>
                          <Badge variant="destructive">{post.reports} reports</Badge>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>{post.timestamp}</span>
                          <span className="text-red-600">Reason: {post.reason}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Keep Post
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Remove Post
                      </Button>
                      <Button size="sm" variant="outline">
                        Warn User
                      </Button>
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
}