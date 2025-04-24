
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function UserMenu() {
  const { user, signOut, isAdmin } = useAuth();

  return (
    <div className="hidden md:flex items-center gap-3">
      {user ? (
        <>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin Panel
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={() => signOut()}
            className="text-sm font-medium"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Link to="/auth">
          <Button variant="secondary" size="sm">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
}
