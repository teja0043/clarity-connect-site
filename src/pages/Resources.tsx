import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Headphones, FileText, ExternalLink, Play, Download } from "lucide-react";

const resources = {
  videos: [
    { title: "Mindfulness for Students", duration: "15 min", category: "Meditation", url: "#" },
    { title: "Managing Test Anxiety", duration: "12 min", category: "Academic", url: "#" },
    { title: "Sleep Hygiene Tips", duration: "8 min", category: "Wellness", url: "#" }
  ],
  podcasts: [
    { title: "Student Mental Health Matters", duration: "25 min", category: "Mental Health", url: "#" },
    { title: "Stress-Free Study Sessions", duration: "18 min", category: "Academic", url: "#" }
  ],
  guides: [
    { title: "Campus Mental Health Guide", pages: "24 pages", category: "General", url: "#" },
    { title: "Crisis Resources Handbook", pages: "16 pages", category: "Emergency", url: "#" }
  ],
  audio: [
    { title: "Deep Breathing Exercise", duration: "10 min", category: "Relaxation", url: "#" },
    { title: "Progressive Muscle Relaxation", duration: "15 min", category: "Relaxation", url: "#" }
  ]
};

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Resource Hub</h1>
        <p className="text-muted-foreground">Wellness tools, guides, and educational content</p>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Podcasts
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Audio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4">
            {resources.videos.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{item.category}</Badge>
                          <span className="text-sm text-muted-foreground">{item.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4">
            {resources.guides.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{item.category}</Badge>
                          <span className="text-sm text-muted-foreground">{item.pages}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Similar structure for podcasts and audio tabs */}
      </Tabs>
    </div>
  );
}