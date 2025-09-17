import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  BarChart3
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface MoodEntry {
  id: string;
  mood: "happy" | "calm" | "neutral" | "sad" | "stressed";
  energy: number;
  anxiety: number;
  notes?: string;
  date: Date;
}

const moodOptions = [
  { value: "happy", label: "Happy", icon: Smile, color: "mood-happy" },
  { value: "calm", label: "Calm", icon: Heart, color: "mood-calm" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "text-muted-foreground" },
  { value: "sad", label: "Sad", icon: Frown, color: "mood-sad" },
  { value: "stressed", label: "Stressed", icon: Zap, color: "mood-stressed" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [energy, setEnergy] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([
    {
      id: "1",
      mood: "calm",
      energy: 7,
      anxiety: 3,
      date: new Date(Date.now() - 86400000),
      notes: "Had a good study session, feeling prepared for tomorrow's exam"
    },
    {
      id: "2", 
      mood: "happy",
      energy: 8,
      anxiety: 2,
      date: new Date(Date.now() - 172800000),
      notes: "Great day with friends, feeling energized"
    },
    {
      id: "3",
      mood: "stressed",
      energy: 4,
      anxiety: 8,
      date: new Date(Date.now() - 259200000),
      notes: "Multiple deadlines approaching, feeling overwhelmed"
    }
  ]);

  const submitEntry = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood as any,
      energy,
      anxiety,
      notes: notes || undefined,
      date: new Date()
    };

    setEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setSelectedMood("");
    setEnergy(5);
    setAnxiety(5);
    setNotes("");
  };

  // Prepare chart data
  const chartData = entries
    .slice(0, 7)
    .reverse()
    .map((entry, index) => ({
      day: `Day ${index + 1}`,
      mood: moodOptions.find(m => m.value === entry.mood)?.value === "happy" ? 5 :
            moodOptions.find(m => m.value === entry.mood)?.value === "calm" ? 4 :
            moodOptions.find(m => m.value === entry.mood)?.value === "neutral" ? 3 :
            moodOptions.find(m => m.value === entry.mood)?.value === "sad" ? 2 : 1,
      energy: entry.energy,
      anxiety: 10 - entry.anxiety // Invert anxiety for better visualization
    }));

  const averageMood = entries.length > 0 
    ? entries.reduce((sum, entry) => {
        const moodValue = moodOptions.find(m => m.value === entry.mood)?.value === "happy" ? 5 :
                         moodOptions.find(m => m.value === entry.mood)?.value === "calm" ? 4 :
                         moodOptions.find(m => m.value === entry.mood)?.value === "neutral" ? 3 :
                         moodOptions.find(m => m.value === entry.mood)?.value === "sad" ? 2 : 1;
        return sum + moodValue;
      }, 0) / entries.length
    : 0;

  const averageEnergy = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + entry.energy, 0) / entries.length
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Mood Tracker
        </h1>
        <p className="text-muted-foreground">
          Track your daily mood and mental wellness journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageMood > 4 ? "Great" : averageMood > 3 ? "Good" : averageMood > 2 ? "Okay" : "Low"}
            </div>
            <Progress value={averageMood * 20} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEnergy.toFixed(1)}/10</div>
            <Progress value={averageEnergy * 10} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entries This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length}</div>
            <p className="text-xs text-muted-foreground">
              Keep tracking daily!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Daily Check-in
          </CardTitle>
          <CardDescription>
            How are you feeling today? Take a moment to reflect on your mental state.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div>
            <h3 className="font-semibold mb-3">Select your mood</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                return (
                  <Button
                    key={mood.value}
                    variant={selectedMood === mood.value ? "default" : "outline"}
                    onClick={() => setSelectedMood(mood.value)}
                    className="h-20 flex-col gap-2"
                  >
                    <Icon className={`h-6 w-6 ${selectedMood === mood.value ? "" : mood.color}`} />
                    <span className="text-sm">{mood.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <h3 className="font-semibold mb-3">Energy Level: {energy}/10</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Low</span>
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <Button
                    key={level}
                    variant={energy >= level ? "default" : "outline"}
                    size="sm"
                    className="flex-1 h-8"
                    onClick={() => setEnergy(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">High</span>
            </div>
          </div>

          {/* Anxiety Level */}
          <div>
            <h3 className="font-semibold mb-3">Anxiety Level: {anxiety}/10</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Low</span>
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <Button
                    key={level}
                    variant={anxiety >= level ? "destructive" : "outline"}
                    size="sm"
                    className="flex-1 h-8"
                    onClick={() => setAnxiety(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">High</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold mb-3">Notes (Optional)</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Any specific thoughts or events affecting your mood today?"
              className="min-h-20"
            />
          </div>

          <Button 
            onClick={submitEntry} 
            disabled={!selectedMood}
            className="w-full"
          >
            Save Today's Entry
          </Button>
        </CardContent>
      </Card>

      {/* Mood Trends Chart */}
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Mood Trends
            </CardTitle>
            <CardDescription>
              Your mood, energy, and anxiety levels over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Mood"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Energy"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="anxiety" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    name="Calm (inverted anxiety)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>
            Your mood tracking history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => {
              const moodData = moodOptions.find(m => m.value === entry.mood);
              const Icon = moodData?.icon || Meh;
              
              return (
                <div key={entry.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full bg-${moodData?.color}/10`}>
                    <Icon className={`h-5 w-5 ${moodData?.color || "text-muted-foreground"}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium capitalize">{entry.mood}</span>
                      <Badge variant="outline" className="text-xs">
                        {entry.date.toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                      <span>Energy: {entry.energy}/10</span>
                      <span>Anxiety: {entry.anxiety}/10</span>
                    </div>
                    
                    {entry.notes && (
                      <p className="text-sm text-foreground">{entry.notes}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}