import { useState } from "react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 Crisis support",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 Crisis counseling via text",
    },
    {
      name: "Campus Counseling Center",
      number: "(555) 123-4567",
      description: "Campus emergency counseling",
    },
    {
      name: "Campus Security",
      number: "(555) 123-4568",
      description: "Campus safety and emergency response",
    },
  ];

  return (
    <>
      {/* Floating Emergency Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-lg emergency-pulse z-50 h-14 w-14 rounded-full p-0"
        size="lg"
      >
        <Phone className="h-6 w-6" />
        <span className="sr-only">Emergency Help</span>
      </Button>

      {/* Emergency Contacts Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emergency">
              <Phone className="h-5 w-5" />
              Emergency Help
            </DialogTitle>
            <DialogDescription>
              If you're in immediate danger or having thoughts of self-harm, please reach out for help immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4"
                    onClick={() => {
                      if (contact.number.startsWith("Text")) {
                        // Handle text instructions
                        alert("Please text HOME to 741741 from your phone");
                      } else {
                        // Handle phone calls
                        window.location.href = `tel:${contact.number}`;
                      }
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.number.startsWith("Text") ? "Text" : "Call"}
                  </Button>
                </div>
                <div className="mt-2 text-lg font-mono text-primary">
                  {contact.number}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary-light rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Remember:</strong> You are not alone. Help is available 24/7, and your life has value. 
              These services are confidential and staffed by trained professionals.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}