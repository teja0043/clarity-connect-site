import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  mood: string;
  energy: number;
  anxiety: number;
  sleep: number;
  notes: string;
  timestamp: string;
}

const moodEmojis = [
  { value: "very-sad", emoji: "😢", label: "Very Sad" },
  { value: "sad", emoji: "😔", label: "Sad" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "very-happy", emoji: "😄", label: "Very Happy" }
];

export default function MoodTrackerWidget({ onMoodUpdate }: { onMoodUpdate?: (mood: MoodEntry) => void }) {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState("");
  const [energy, setEnergy] = useState([50]);
  const [anxiety, setAnxiety] = useState([50]);
  const [sleep, setSleep] = useState([7]);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive"
      });
      return;
    }

    const entry: MoodEntry = {
      mood: selectedMood,
      energy: energy[0],
      anxiety: anxiety[0],
      sleep: sleep[0],
      notes,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage (in production, this would go to backend)
    const existing = JSON.parse(localStorage.getItem('mood_entries') || '[]');
    existing.push(entry);
    localStorage.setItem('mood_entries', JSON.stringify(existing));

    toast({
      title: "Mood logged successfully",
      description: "Your mood entry has been saved"
    });

    if (onMoodUpdate) {
      onMoodUpdate(entry);
    }

    // Reset form
    setSelectedMood("");
    setEnergy([50]);
    setAnxiety([50]);
    setSleep([7]);
    setNotes("");
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Daily Mood Check-in</h3>
      
      {/* Mood Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">How are you feeling?</Label>
        <div className="flex justify-between gap-2">
          {moodEmojis.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMood === mood.value ? "default" : "outline"}
              size="sm"
              className="flex-1 flex-col h-auto py-3"
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Energy Level */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <Label className="text-sm">Energy Level</Label>
          <span className="text-sm text-muted-foreground">{energy[0]}%</span>
        </div>
        <Slider
          value={energy}
          onValueChange={setEnergy}
          max={100}
          step={10}
          className="w-full"
        />
      </div>

      {/* Anxiety Level */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <Label className="text-sm">Anxiety Level</Label>
          <span className="text-sm text-muted-foreground">{anxiety[0]}%</span>
        </div>
        <Slider
          value={anxiety}
          onValueChange={setAnxiety}
          max={100}
          step={10}
          className="w-full"
        />
      </div>

      {/* Sleep Hours */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <Label className="text-sm">Hours of Sleep</Label>
          <span className="text-sm text-muted-foreground">{sleep[0]} hours</span>
        </div>
        <Slider
          value={sleep}
          onValueChange={setSleep}
          min={0}
          max={12}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Notes */}
      <div className="mb-4">
        <Label className="text-sm mb-2 block">Additional Notes (Optional)</Label>
        <Textarea
          placeholder="How was your day? Any specific events or feelings?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-primary to-secondary"
      >
        Log Mood Entry
      </Button>
    </Card>
  );
}