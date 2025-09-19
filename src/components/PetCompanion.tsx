import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Cloud, Sun, Moon, Zap } from "lucide-react";

interface PetState {
  mood: "happy" | "sad" | "anxious" | "calm" | "sleepy";
  energy: number;
  message: string;
}

interface PetCompanionProps {
  userMood?: string;
  onInteract?: () => void;
}

export default function PetCompanion({ userMood = "neutral", onInteract }: PetCompanionProps) {
  const [petState, setPetState] = useState<PetState>({
    mood: "calm",
    energy: 70,
    message: "Hi there! I'm here to support you."
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Pet appearance based on mood
  const petStyles = {
    happy: {
      body: "bg-gradient-to-br from-yellow-200 to-yellow-300",
      face: "😊",
      animation: "animate-bounce",
      glow: "shadow-yellow-300/50"
    },
    sad: {
      body: "bg-gradient-to-br from-blue-200 to-blue-300",
      face: "😔",
      animation: "animate-pulse",
      glow: "shadow-blue-300/50"
    },
    anxious: {
      body: "bg-gradient-to-br from-purple-200 to-purple-300",
      face: "😟",
      animation: "animate-pulse",
      glow: "shadow-purple-300/50"
    },
    calm: {
      body: "bg-gradient-to-br from-green-200 to-green-300",
      face: "😌",
      animation: "",
      glow: "shadow-green-300/50"
    },
    sleepy: {
      body: "bg-gradient-to-br from-indigo-200 to-indigo-300",
      face: "😴",
      animation: "",
      glow: "shadow-indigo-300/50"
    }
  };

  // Update pet based on user mood
  useEffect(() => {
    if (userMood === "struggling") {
      setPetState({
        mood: "sad",
        energy: 40,
        message: "I can sense you're having a tough time. Let's work through this together."
      });
    } else if (userMood === "good") {
      setPetState({
        mood: "happy",
        energy: 90,
        message: "You're doing great! Keep up the positive energy!"
      });
    } else if (userMood === "anxious") {
      setPetState({
        mood: "anxious",
        energy: 60,
        message: "I notice you're feeling anxious. Try some deep breaths with me."
      });
    }
  }, [userMood]);

  const handlePetClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    
    // Cycle through encouraging messages
    const messages = [
      "You're stronger than you think!",
      "Take a deep breath. You've got this.",
      "Remember to be kind to yourself today.",
      "Small steps lead to big changes.",
      "Your feelings are valid and temporary."
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPetState(prev => ({ ...prev, message: randomMessage }));
    
    if (onInteract) onInteract();
  };

  const currentStyle = petStyles[petState.mood];

  const suggestions = {
    happy: [
      { icon: Sun, text: "Keep up the positive activities!" },
      { icon: Heart, text: "Share your joy with others" }
    ],
    sad: [
      { icon: Heart, text: "Try a 5-minute walk outside" },
      { icon: Sparkles, text: "Listen to uplifting music" }
    ],
    anxious: [
      { icon: Cloud, text: "Practice breathing exercises" },
      { icon: Moon, text: "Try progressive muscle relaxation" }
    ],
    calm: [
      { icon: Sun, text: "Maintain your peaceful routine" },
      { icon: Heart, text: "Continue mindfulness practice" }
    ],
    sleepy: [
      { icon: Moon, text: "Consider a short power nap" },
      { icon: Zap, text: "Try light stretching" }
    ]
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card/90 to-primary/5">
      <div className="flex flex-col items-center">
        {/* Pet Visualization */}
        <div 
          className={`relative cursor-pointer transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}
          onClick={handlePetClick}
        >
          <div className={`w-32 h-32 rounded-full ${currentStyle.body} ${currentStyle.animation} shadow-xl ${currentStyle.glow} flex items-center justify-center text-5xl`}>
            {currentStyle.face}
          </div>
          
          {/* Energy Indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.floor(petState.energy / 20) 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pet Message */}
        <div className="mt-6 text-center">
          <p className="text-sm font-medium mb-2">Your Wellness Companion</p>
          <p className="text-muted-foreground italic">"{petState.message}"</p>
        </div>

        {/* Mood State */}
        <div className="mt-4 px-3 py-1 bg-primary/10 rounded-full">
          <span className="text-xs font-medium text-primary">
            Mood: {petState.mood.charAt(0).toUpperCase() + petState.mood.slice(1)}
          </span>
        </div>

        {/* Suggestions */}
        <div className="mt-6 w-full space-y-2">
          <p className="text-sm font-medium mb-2">Pet's Suggestions:</p>
          {suggestions[petState.mood].map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // In production, these would trigger actual actions
                console.log(`Triggered: ${suggestion.text}`);
              }}
            >
              <suggestion.icon className="w-4 h-4 mr-2" />
              {suggestion.text}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}