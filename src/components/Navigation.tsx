import { useState } from "react";
import { User } from "lucide-react";
import campusLogo from "@/assets/campus-circle-logo.png";
import maheLogo from "@/assets/mahe-logo.png";
import { ProfileModal } from "./ProfileModal";

export const Navigation = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img src={campusLogo} alt="Campus Circle" className="h-10 w-10" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">Campus Circle</h1>
                <p className="text-xs text-muted-foreground">Smart Hostel Utility Platform</p>
              </div>
            </div>
            
            <img src={maheLogo} alt="MAHE" className="h-12 w-12" />
            
            <button
              onClick={() => setShowProfile(true)}
              className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
            >
              <User className="h-6 w-6 text-secondary-foreground" />
            </button>
          </div>
        </div>
      </nav>

      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};
