import { useState, useEffect } from "react";
import { User, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import campusLogo from "@/assets/campus-circle-logo.png";
import maheLogo from "@/assets/mahe-logo.png";
import { ProfileModal } from "./ProfileModal";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check login state on mount
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('authChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
              <img src={campusLogo} alt="Campus Circle" className="h-10 w-10" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">Campus Circle</h1>
                <p className="text-xs text-muted-foreground">Smart Campus Utility Platform</p>
              </div>
            </div>
            
            <img src={maheLogo} alt="MAHE" className="h-16 w-16" />
            
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
              
              <button
                onClick={() => setShowProfile(true)}
                className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
              >
                <User className="h-6 w-6 text-secondary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};
