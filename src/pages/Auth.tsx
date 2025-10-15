import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import campusLogo from "@/assets/campus-circle-logo.png";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    
    try {
      // Dummy login for testing - navigates directly to dashboard
      // Replace with actual Azure auth later:
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'azure',
      //   options: {
      //     scopes: 'email',
      //   }
      // });
      // if (error) throw error;
      
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login Successful",
        description: "Welcome to Campus Circle!",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={campusLogo} 
              alt="Campus Circle" 
              className="h-20 w-20"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-base">
            Sign in with your university email to access Campus Circle
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h11v11H0z" fill="#f25022" />
                  <path d="M12 0h11v11H12z" fill="#00a4ef" />
                  <path d="M0 12h11v11H0z" fill="#7fba00" />
                  <path d="M12 12h11v11H12z" fill="#ffb900" />
                </svg>
                Sign in with Microsoft
              </div>
            )}
          </Button>

          <div className="pt-4 text-center text-sm text-muted-foreground">
            By signing in, you agree to Campus Circle's terms of service
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
