import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Phone,
  Video,
  MessageCircle,
  Star,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  experience: string;
  image?: string;
  availability: string[];
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedCounselor, setSelectedCounselor] = useState<string>("");
  const [sessionType, setSessionType] = useState<"in-person" | "video" | "phone">("video");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"counselor" | "datetime" | "details" | "confirmation">("counselor");

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress"],
      rating: 4.9,
      experience: "8 years",
      availability: ["Monday", "Tuesday", "Wednesday", "Friday"]
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      title: "Licensed Professional Counselor",
      specialties: ["Social Anxiety", "Relationship Issues", "Life Transitions"],
      rating: 4.8,
      experience: "6 years",
      availability: ["Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Family Issues", "Trauma", "PTSD", "Self-Esteem"],
      rating: 4.9,
      experience: "10 years",
      availability: ["Monday", "Wednesday", "Thursday", "Saturday"]
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    setStep("confirmation");
  };

  const resetBooking = () => {
    setStep("counselor");
    setSelectedCounselor("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setNotes("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Book Counseling Session
        </h1>
        <p className="text-muted-foreground">
          Schedule a confidential session with one of our licensed counselors
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {["counselor", "datetime", "details", "confirmation"].map((stepName, index) => (
          <div key={stepName} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === stepName 
                ? "bg-primary text-primary-foreground" 
                : index < ["counselor", "datetime", "details", "confirmation"].indexOf(step)
                ? "bg-success text-success-foreground"
                : "bg-muted text-muted-foreground"
            }`}>
              {index < ["counselor", "datetime", "details", "confirmation"].indexOf(step) ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            {index < 3 && (
              <div className={`w-12 h-1 mx-2 ${
                index < ["counselor", "datetime", "details", "confirmation"].indexOf(step)
                  ? "bg-success"
                  : "bg-muted"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Counselor */}
      {step === "counselor" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Choose Your Counselor</h2>
          <div className="grid gap-4">
            {counselors.map((counselor) => (
              <Card 
                key={counselor.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCounselor === counselor.id 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : ""
                }`}
                onClick={() => setSelectedCounselor(counselor.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={counselor.image} />
                      <AvatarFallback>
                        {counselor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{counselor.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{counselor.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">{counselor.title}</p>
                      <p className="text-sm text-muted-foreground mb-3">{counselor.experience} experience</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {counselor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Available: {counselor.availability.join(", ")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            onClick={() => setStep("datetime")} 
            disabled={!selectedCounselor}
            className="w-full"
          >
            Continue to Date & Time
          </Button>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === "datetime" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Date</h2>
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Time</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="justify-start"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 flex gap-4">
            <Button variant="outline" onClick={() => setStep("counselor")}>
              Back
            </Button>
            <Button 
              onClick={() => setStep("details")} 
              disabled={!selectedDate || !selectedTime}
              className="flex-1"
            >
              Continue to Details
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Session Details */}
      {step === "details" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Session Details</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Session Type</CardTitle>
              <CardDescription>Choose how you'd like to attend your session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={sessionType === "video" ? "default" : "outline"}
                  onClick={() => setSessionType("video")}
                  className="h-20 flex-col"
                >
                  <Video className="h-6 w-6 mb-2" />
                  Video Call
                </Button>
                <Button
                  variant={sessionType === "phone" ? "default" : "outline"}
                  onClick={() => setSessionType("phone")}
                  className="h-20 flex-col"
                >
                  <Phone className="h-6 w-6 mb-2" />
                  Phone Call
                </Button>
                <Button
                  variant={sessionType === "in-person" ? "default" : "outline"}
                  onClick={() => setSessionType("in-person")}
                  className="h-20 flex-col"
                >
                  <MapPin className="h-6 w-6 mb-2" />
                  In Person
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>Share anything you'd like your counselor to know beforehand (optional)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What would you like to discuss? Any specific concerns or goals for this session?"
                className="min-h-24"
              />
            </CardContent>
          </Card>
          
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Counselor:</span>
                <span className="font-medium">{selectedCounselorData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {selectedDate ? format(selectedDate, "PPPP") : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Type:</span>
                <span className="font-medium capitalize">{sessionType.replace("-", " ")}</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep("datetime")}>
              Back
            </Button>
            <Button onClick={handleBooking} className="flex-1">
              Book Session
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === "confirmation" && (
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-success mb-2">Session Booked Successfully!</h2>
              <p className="text-muted-foreground">
                Your counseling session has been scheduled. You'll receive a confirmation email shortly.
              </p>
            </div>
            
            <Card className="text-left mb-6">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Counselor:</span>
                  <span className="font-medium">{selectedCounselorData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="font-medium">
                    {selectedDate ? format(selectedDate, "PPP") : ""} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Type:</span>
                  <span className="font-medium capitalize">{sessionType.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="font-medium">#ME{Date.now().toString().slice(-6)}</span>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={resetBooking} variant="outline">
                Book Another Session
              </Button>
              <Button>
                Add to Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}