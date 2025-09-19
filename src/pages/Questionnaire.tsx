import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Question {
  id: number;
  category: string;
  text: string;
  type: "scale" | "yesno" | "frequency";
  options?: { value: string; label: string }[];
}

const questions: Question[] = [
  // PHQ-9 Depression Questions
  {
    id: 1,
    category: "Depression",
    text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
    type: "frequency",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 2,
    category: "Depression",
    text: "How often have you felt down, depressed, or hopeless?",
    type: "frequency",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  // GAD-7 Anxiety Questions
  {
    id: 3,
    category: "Anxiety",
    text: "How often have you felt nervous, anxious, or on edge?",
    type: "frequency",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 4,
    category: "Anxiety",
    text: "How often have you been unable to stop or control worrying?",
    type: "frequency",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  // Sleep Quality
  {
    id: 5,
    category: "Sleep",
    text: "How would you rate your sleep quality over the past week?",
    type: "scale",
    options: [
      { value: "1", label: "Very poor" },
      { value: "2", label: "Poor" },
      { value: "3", label: "Fair" },
      { value: "4", label: "Good" },
      { value: "5", label: "Excellent" }
    ]
  },
  // Academic Stress
  {
    id: 6,
    category: "Academic",
    text: "How stressed have you felt about your academic performance?",
    type: "scale",
    options: [
      { value: "1", label: "Not stressed" },
      { value: "2", label: "Slightly stressed" },
      { value: "3", label: "Moderately stressed" },
      { value: "4", label: "Very stressed" },
      { value: "5", label: "Extremely stressed" }
    ]
  },
  // Social Connection
  {
    id: 7,
    category: "Social",
    text: "How connected do you feel to your peers and community?",
    type: "scale",
    options: [
      { value: "1", label: "Very disconnected" },
      { value: "2", label: "Somewhat disconnected" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Somewhat connected" },
      { value: "5", label: "Very connected" }
    ]
  },
  // ADHD Screening
  {
    id: 8,
    category: "ADHD",
    text: "How often do you have trouble concentrating on tasks or activities?",
    type: "frequency",
    options: [
      { value: "0", label: "Never" },
      { value: "1", label: "Rarely" },
      { value: "2", label: "Sometimes" },
      { value: "3", label: "Often" },
      { value: "4", label: "Very often" }
    ]
  },
  // PTSD Screening
  {
    id: 9,
    category: "PTSD",
    text: "Have you experienced nightmares or intrusive thoughts about a past event?",
    type: "yesno",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" }
    ]
  },
  // Suicidality (Handled with care)
  {
    id: 10,
    category: "Safety",
    text: "Have you had thoughts that you would be better off not being here?",
    type: "yesno",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes, but I'm safe" }
    ]
  }
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate mood based on answers
      const scores = calculateMoodScore(answers);
      localStorage.setItem('questionnaire_scores', JSON.stringify(scores));
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateMoodScore = (answers: Record<number, string>) => {
    // Simple scoring logic - in production this would be more sophisticated
    let depressionScore = 0;
    let anxietyScore = 0;
    let overallMood = "neutral";

    // Calculate depression score (questions 1-2)
    depressionScore = parseInt(answers[1] || "0") + parseInt(answers[2] || "0");
    
    // Calculate anxiety score (questions 3-4)
    anxietyScore = parseInt(answers[3] || "0") + parseInt(answers[4] || "0");

    // Determine overall mood
    if (depressionScore >= 4 || anxietyScore >= 4) {
      overallMood = "struggling";
    } else if (depressionScore <= 1 && anxietyScore <= 1) {
      overallMood = "good";
    } else {
      overallMood = "neutral";
    }

    // Check for critical responses
    const needsSupport = answers[10] === "yes";

    return {
      depression: depressionScore,
      anxiety: anxietyScore,
      mood: overallMood,
      needsSupport,
      timestamp: new Date().toISOString()
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mental Health Assessment</h1>
          <p className="text-muted-foreground">
            Your responses help us provide personalized support
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 animate-fade-in">
          <div className="mb-2">
            <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
              {question.category}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 mt-4">
            {question.text}
          </h2>

          <RadioGroup 
            value={answers[question.id] || ""} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div 
                key={option.value} 
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Safety Notice */}
        {question.category === "Safety" && (
          <Card className="mt-4 p-4 bg-destructive/10 border-destructive/20">
            <p className="text-sm">
              If you're in crisis, please reach out immediately:
              <br />
              <strong>Crisis Helpline: 988</strong> (24/7 Support)
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}