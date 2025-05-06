
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, checkAdminStatus } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in using the AuthContext
      await signIn(email, password);
      
      // After successful login, check if the user is an admin
      const isUserAdmin = await checkAdminStatus(undefined);
      
      if (isUserAdmin) {
        navigate("/admin/dashboard");
        toast({
          title: "Welcome back",
          description: "You've successfully logged in as administrator",
        });
      } else {
        toast({
          title: "Access denied",
          description: "You don't have administrator privileges",
          variant: "destructive",
        });
        // Sign out if not admin - handled by AuthContext
      }
      
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Authentication failed",
        description: error.message || "An unexpected error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access the admin panel
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        <p>Please use your admin credentials to log in.</p>
      </div>
    </div>
  );
}
