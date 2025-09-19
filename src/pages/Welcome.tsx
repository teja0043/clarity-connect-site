import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Brain, Users, Shield } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/questionnaire");
    }, 500);
  };

  const features = [
    {
      icon: Heart,
      title: "Mood-Reflecting Pet",
      description: "Your emotional companion that responds to your feelings"
    },
    {
      icon: Brain,
      title: "AI-Powered Support",
      description: "Get personalized mental health guidance 24/7"
    },
    {
      icon: Users,
      title: "Peer Community",
      description: "Connect anonymously with others who understand"
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "Your mental health journey stays confidential"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to MindEase
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your Digital Mental Health Companion
          </p>
          <p className="text-lg text-muted-foreground/80">
            Supporting students through their wellness journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-card/50 backdrop-blur animate-scale-in">
            <h2 className="text-2xl font-semibold mb-4">Begin Your Wellness Journey</h2>
            <p className="text-muted-foreground mb-6">
              Start with a comprehensive mental health assessment to understand your current state
              and receive personalized support tailored to your needs.
            </p>
            <Button 
              size="lg" 
              onClick={handleStart}
              className={`px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all ${
                isAnimating ? 'scale-95' : ''
              }`}
            >
              Start Assessment
              <Heart className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Takes only 5-10 minutes • Completely confidential
            </p>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              HIPAA Compliant
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              End-to-End Encrypted
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              10,000+ Students Supported
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}