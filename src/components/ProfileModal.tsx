import { useState } from "react";
import { X, User, Smile, Heart, Star, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const profileIcons = [
  { icon: User, name: "User" },
  { icon: Smile, name: "Smile" },
  { icon: Heart, name: "Heart" },
  { icon: Star, name: "Star" },
  { icon: Zap, name: "Zap" },
];

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
  const [username, setUsername] = useState("Student");
  const [email, setEmail] = useState("student@mahe.edu.in");
  const [selectedIcon, setSelectedIcon] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Profile Icon</Label>
            <div className="flex gap-3">
              {profileIcons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setSelectedIcon(index)}
                    className={`p-3 rounded-lg transition-all ${
                      selectedIcon === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                );
              })}
            </div>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
