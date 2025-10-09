import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Frown, Meh, Smile, Laugh, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ratingIcons = [
  { icon: Frown, label: "Poor", color: "text-red-500" },
  { icon: Meh, label: "Fair", color: "text-orange-500" },
  { icon: Smile, label: "Good", color: "text-yellow-500" },
  { icon: Laugh, label: "Great", color: "text-green-500" },
  { icon: Heart, label: "Excellent", color: "text-primary" },
];

const Feedback = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Student");
  const [email, setEmail] = useState("student@mahe.edu.in");
  const [feedback, setFeedback] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!feedback || selectedRating === null) {
      toast.error("Please provide feedback and a rating");
      return;
    }

    toast.success("Thank you for your feedback!");
    setFeedback("");
    setSelectedRating(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>

          <div className="bg-card rounded-2xl shadow-[var(--card-shadow)] p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Share Your Feedback</h1>
            <p className="text-muted-foreground mb-8">
              Help us improve Campus Circle by sharing your thoughts and suggestions
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label>How would you rate your experience?</Label>
                <div className="flex gap-4 justify-center py-4">
                  {ratingIcons.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => setSelectedRating(index)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                          selectedRating === index
                            ? "bg-primary/10 scale-110"
                            : "hover:bg-secondary"
                        }`}
                      >
                        <Icon
                          className={`h-8 w-8 ${
                            selectedRating === index ? item.color : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think about Campus Circle..."
                  rows={6}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
